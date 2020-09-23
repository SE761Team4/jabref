package org.jabref.logic.jabmap;

import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

import javafx.collections.ObservableList;

import org.jabref.gui.Globals;
import org.jabref.gui.StateManager;
import org.jabref.gui.util.BackgroundTask;
import org.jabref.model.database.BibDatabase;
import org.jabref.model.entry.BibEntry;
import org.jabref.model.entry.field.Field;
import org.jabref.model.entry.field.InternalField;
import org.jabref.model.entry.field.UnknownField;
import org.jabref.model.entry.types.StandardEntryType;
import org.jabref.model.jabmap.EdgeDirection;
import org.jabref.model.jabmap.MindMap;
import org.jabref.model.jabmap.MindMapEdge;
import org.jabref.model.jabmap.MindMapNode;

import static org.jabref.model.jabmap.MindMapEdge.MAP_EDGE_DIRECTION;
import static org.jabref.model.jabmap.MindMapEdge.MAP_EDGE_ENTRY_NAME;
import static org.jabref.model.jabmap.MindMapEdge.MAP_EDGE_LABEL;
import static org.jabref.model.jabmap.MindMapEdge.MAP_EDGE_NODE1_ID;
import static org.jabref.model.jabmap.MindMapEdge.MAP_EDGE_NODE2_ID;
import static org.jabref.model.jabmap.MindMapNode.MAP_NODE_BIBENTRY;
import static org.jabref.model.jabmap.MindMapNode.MAP_NODE_ENTRY_NAME;
import static org.jabref.model.jabmap.MindMapNode.MAP_NODE_ID;
import static org.jabref.model.jabmap.MindMapNode.MAP_NODE_NAME;
import static org.jabref.model.jabmap.MindMapNode.MAP_NODE_XPOS;
import static org.jabref.model.jabmap.MindMapNode.MAP_NODE_YPOS;

/**
 * This class handles converting data from BibTeX format, which is stored in the database, to MindMap to be sent to JapMap It also does the reverse, converting JSON to BibTeX to be stored.
 */
public class BibtexMindMapAdapter {

    public static final String DEFAULT_MAP_NAME = "New Map";

    /**
     * Method for loading MindMap class from bibtex database. Returns the mindmap object if present, a blank map otherwise
     */
    public MindMap bibtex2MindMap(BibDatabase database) {
        ObservableList<BibEntry> observableList = database.getEntries();
        // TODO: Where to handle/generate node & edge citation keys, which JabRef needs to read into database
        // Retrieve the first mind map node if present, meaning this database contains a mind map
        boolean containsMap = observableList.stream().anyMatch(entry -> entry.getType().getDisplayName().equals(MAP_NODE_ENTRY_NAME));
        if (containsMap) {
            // We know this file contains a mind map so...
            MindMap map = new MindMap();
            try {
                for (BibEntry b : observableList) {
                    switch (b.getType().getDisplayName()) {
                        case MAP_NODE_ENTRY_NAME -> // Instantiate MindMapNode object and add to MindMap nodes
                                map.addNode(createNodeFromBibEntry(b));
                        case MAP_EDGE_ENTRY_NAME -> // Instantiate MindMapEdge object and add to MindMap edges
                                map.addEdge(createEdgeFromBibEntry(b));
                    }
                }
                return map;
            } catch (IllegalArgumentException e) {
                System.out.println("Error parsing map from bibtex, returning new one instead");
            }
        }
        // Return blank mind map
        MindMap newMap = new MindMap();
        newMap.addNode(new MindMapNode(DEFAULT_MAP_NAME));
        return newMap;
    }

    /**
     * Method to convert MindMap class to bibtex entries that can then be saved in the database
     */
    public void mindMap2Bibtex(MindMap mindMap) {
        // Get active database to insert bib entries into
        StateManager stateManager = Globals.stateManager;
        BibDatabase database;
        if (stateManager.getActiveDatabase().isPresent()) {
            database = stateManager.getActiveDatabase().get().getDatabase();
        } else {
            return;
        }

        // Instantiate appropriate bib entries containing mind map, node, and edge data and return them all to be
        List<BibEntry> newEntries = mindMap
                .getNodes().stream()
                .map(node -> {
                    BibEntry newEntry = new BibEntry(StandardEntryType.MindMapNode);
                    Random random = new SecureRandom();
                    String token = new BigInteger(130, random).toString(32);
                    newEntry.setField(InternalField.KEY_FIELD, token);
                    // Node will always have an id
                    newEntry.setField(new UnknownField(MAP_NODE_ID), node.getId().toString());
                    if (node.getName() != null) {
                        newEntry.setField(new UnknownField(MAP_NODE_NAME), node.getName());
                    }
                    if (node.getBibEntry() != null) {
                        newEntry.setField(new UnknownField(MAP_NODE_BIBENTRY), node.getBibEntry());
                    }
                    // Node will always have x and y pos
                    newEntry.setField(new UnknownField(MAP_NODE_XPOS), String.valueOf(node.getX_pos()));
                    newEntry.setField(new UnknownField(MAP_NODE_YPOS), String.valueOf(node.getY_pos()));
                    return newEntry;
                })
                .collect(Collectors.toList());

        // Add entries to database (currently non-functional)
        BackgroundTask.wrap(() -> database.insertEntries(newEntries)).executeWith(Globals.TASK_EXECUTOR);
    }

    /**
     * Helper method that takes a bib entry and iteratively converts the fields & values to those of a MindMapNode
     */
    private MindMapNode createNodeFromBibEntry(BibEntry entry) throws IllegalArgumentException {
        // TODO: there's definitely a cleaner way to do this
        MindMapNode newNode = new MindMapNode();
        for (Map.Entry<Field, String> field : entry.getFieldMap().entrySet()) {
            Field fieldName = field.getKey();
            String fieldValue = field.getValue();
            switch (fieldName.getName()) {
                case MAP_NODE_ID -> newNode.setId(Long.parseLong(fieldValue));
                case MAP_NODE_NAME -> newNode.setName(fieldValue);
                case MAP_NODE_BIBENTRY -> newNode.setBibEntry(fieldValue);
                case MAP_NODE_XPOS -> newNode.setX_pos(Integer.parseInt(fieldValue));
                case MAP_NODE_YPOS -> newNode.setY_pos(Integer.parseInt(fieldValue));
            }
        }
        return newNode;
    }

    /**
     * Helper method that takes a bib entry and iteratively converts the fields & values to those of a MindMapEdge
     */
    private MindMapEdge createEdgeFromBibEntry(BibEntry entry) throws IllegalArgumentException {
        MindMapEdge newEdge = new MindMapEdge();
        for (Map.Entry<Field, String> field : entry.getFieldMap().entrySet()) {
            Field fieldName = field.getKey();
            String fieldValue = field.getValue();
            switch (fieldName.getName()) {
                case MAP_EDGE_NODE1_ID -> newEdge.setNode1_Id(Long.parseLong(fieldValue));
                case MAP_EDGE_NODE2_ID -> newEdge.setNode2_Id(Long.parseLong(fieldValue));
                case MAP_EDGE_LABEL -> newEdge.setLabel(fieldValue);
                case MAP_EDGE_DIRECTION -> newEdge.setDirection(EdgeDirection.valueOf(fieldValue));
            }
        }
        return newEdge;
    }
}
