package org.jabref.logic.jabmap;

import javafx.collections.ObservableList;
import org.jabref.model.database.BibDatabase;
import org.jabref.model.entry.BibEntry;
import org.jabref.model.entry.field.Field;
import org.jabref.model.entry.field.InternalField;
import org.jabref.model.jabmap.EdgeDirection;
import org.jabref.model.jabmap.MindMap;
import org.jabref.model.jabmap.MindMapEdge;
import org.jabref.model.jabmap.MindMapNode;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.jabref.model.jabmap.MindMapEdge.*;
import static org.jabref.model.jabmap.MindMapNode.*;

/**
 * This class handles converting data from BibTeX format, which is stored in the database, to MindMap to be sent to JapMap
 * It also does the reverse, converting JSON to BibTeX to be stored.
 */
public class BibtexMindMapAdapter {

    public static final String DEFAULT_MAP_NAME = "New Map";

    /**
     * Method for loading MindMap class from bibtex file. Returns the mindmap object if present, a blank map otherwise
     */
    public MindMap bibtex2MindMap(BibDatabase database) {
        ObservableList<BibEntry> observableList = database.getEntries();
        // TODO: Where to handle/generate node & edge citation keys, which JabRef needs to read into database
        // Retrieve map, nodes, and edges from list of bib entries
        Optional<BibEntry> optionalMapEntry = observableList.stream().filter(o -> o.getType().getDisplayName().equals("Mapnode")).findFirst();
        if (optionalMapEntry.isPresent()) {
            // We know this file contains a mind map so...
            MindMap map = new MindMap();
            try {
                for (BibEntry b : observableList) {
                    switch (b.getType().getDisplayName()) {
                        case MAP_NODE_ENTRY_NAME -> {
                            // Instantiate MindMapNode object and add to MindMap nodes
                            map.addNode(createNodeFromBibEntry(b));
                        }
                        case MAP_EDGE_ENTRY_NAME -> {
                            // Instantiate MindMapEdge object and add to MindMap edges
                            map.addEdge(createEdgeFromBibEntry(b));
                        }
                    }
                }
                return map;
            } catch (IllegalArgumentException e) {
                System.out.println("Error parsing map from bibtex, returning clean one instead");
            }
        }
        //Return blank mind map
        MindMap newMap = new MindMap();
        newMap.addNode(new MindMapNode(DEFAULT_MAP_NAME));
        return newMap;
    }

    /**
     * Method to convert MindMap class to bibtex entries that can then be saved in the database
     */
    public List<BibEntry> mindMap2Bibtex(MindMap mindMap) {
        // Instantiate appropriate bib entries containing mind map, node, and edge data and return them all to be
        // saved in the database
        return null;
    }

    /**
     * Helper method that takes a bib entry and iteratively converts the fields & values to those of a MindMapNode
     */
    private MindMapNode createNodeFromBibEntry(BibEntry entry) throws IllegalArgumentException {
        // TODO: there's definitely a cleaner way to do this
        MindMapNode newNode = new MindMapNode();

        newNode.setId(Long.parseLong(entry.getField(InternalField.KEY_FIELD).get()));

        for (Map.Entry<Field, String> field : entry.getFieldMap().entrySet()) {
            Field fieldName = field.getKey();
            String fieldValue = field.getValue();
            switch (fieldName.getName()) {
                // case MAP_NODE_ID -> newNode.setId(Long.parseLong(fieldValue));
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
