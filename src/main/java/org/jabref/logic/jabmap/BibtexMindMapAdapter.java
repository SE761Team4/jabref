package org.jabref.logic.jabmap;

import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.jabref.model.entry.BibEntry;
import org.jabref.model.entry.field.Field;
import org.jabref.model.entry.field.InternalField;
import org.jabref.model.entry.field.UnknownField;
import org.jabref.model.entry.types.StandardEntryType;
import org.jabref.model.jabmap.MindMap;
import org.jabref.model.jabmap.MindMapEdge;
import org.jabref.model.jabmap.MindMapNode;

import com.google.common.base.Converter;

import static org.jabref.model.jabmap.MindMapEdge.MAP_EDGE_DIRECTION;
import static org.jabref.model.jabmap.MindMapEdge.MAP_EDGE_ENTRY_NAME;
import static org.jabref.model.jabmap.MindMapEdge.MAP_EDGE_LABEL;
import static org.jabref.model.jabmap.MindMapNode.MAP_NODE_BIBENTRY;
import static org.jabref.model.jabmap.MindMapNode.MAP_NODE_ENTRY_NAME;
import static org.jabref.model.jabmap.MindMapNode.MAP_NODE_ICONS;
import static org.jabref.model.jabmap.MindMapNode.MAP_NODE_NAME;
import static org.jabref.model.jabmap.MindMapNode.MAP_NODE_XPOS;
import static org.jabref.model.jabmap.MindMapNode.MAP_NODE_YPOS;

/**
 * This class handles converting data from BibTeX format, which is stored in the database, to MindMap java data model, and back again. Follows Google's abstract Converter format
 */
public class BibtexMindMapAdapter extends Converter<List<BibEntry>, MindMap> {

    public static final String DEFAULT_MAP_NAME = "New Map";

    /**
     * Method for loading MindMap class from bibtex database. Returns the mindmap object if present, a blank map otherwise
     */
    @Override
    protected MindMap doForward(List<BibEntry> bibEntries) {
        // Retrieve the first mind map node if present, meaning this database contains a mind map
        boolean containsMap = bibEntries.stream().anyMatch(entry -> entry.getType().getDisplayName().equals(MAP_NODE_ENTRY_NAME));
        if (containsMap) {
            // We know this file contains a mind map so...
            MindMap map = new MindMap();
            try {
                for (BibEntry b : bibEntries) {
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
    @Override
    protected List<BibEntry> doBackward(MindMap mindMap) {
        // Instantiate appropriate bib entries containing mind map, node, and edge data and return them all to be
        List<BibEntry> nodeEntries = mindMap
                .getNodes().stream()
                .map(node -> {
                    BibEntry newEntry = new BibEntry(StandardEntryType.MindMapNode);
                    newEntry.setField(InternalField.KEY_FIELD, MindMapNode.getCitationKeyFromId(node.getId()));
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

        List<BibEntry> edgeEntries = mindMap
                .getEdges().stream()
                .map(edge -> {
                    BibEntry newEntry = new BibEntry(StandardEntryType.MindMapEdge);
                    newEntry.setField(InternalField.KEY_FIELD, MindMapEdge.getCitationKeyFromIds(edge.getNode1_Id(), edge.getNode2_Id()));
                    newEntry.setField(new UnknownField(MAP_EDGE_LABEL), edge.getLabel());
                    newEntry.setField(new UnknownField(MAP_EDGE_DIRECTION), edge.getDirection().toString());
                    return newEntry;
                })
                .collect(Collectors.toList());

        nodeEntries.addAll(edgeEntries);
        return nodeEntries;
    }

    /**
     * Helper method that takes a bib entry and iteratively converts the fields & values to those of a MindMapNode
     */
    private MindMapNode createNodeFromBibEntry(BibEntry entry) throws IllegalArgumentException {
        MindMapNode newNode = new MindMapNode();
        // Create id field from citation key of Bibtex entry
        String id = getNodeIdFromNodeKey(entry.getCiteKeyOptional().orElse(""));
        newNode.setId(Long.parseLong(id));
        for (Map.Entry<Field, String> field : entry.getFieldMap().entrySet()) {
            Field fieldName = field.getKey();
            String fieldValue = field.getValue();
            switch (fieldName.getName()) {
                case MAP_NODE_NAME -> newNode.setName(fieldValue);
                case MAP_NODE_BIBENTRY -> newNode.setBibEntry(fieldValue);
                case MAP_NODE_ICONS -> newNode.setIcons(Arrays.asList(fieldValue.split(",")));
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
        // Create id fields from citation key ids
        String[] ids = getNodeIdsFromEdgeKey(entry.getCiteKeyOptional().orElse(""));
        newEdge.setNode1_Id(Long.parseLong(ids[0]));
        newEdge.setNode2_Id(Long.parseLong(ids[1]));
        for (Map.Entry<Field, String> field : entry.getFieldMap().entrySet()) {
            Field fieldName = field.getKey();
            String fieldValue = field.getValue();
            switch (fieldName.getName()) {
                case MAP_EDGE_LABEL -> newEdge.setLabel(fieldValue);
                case MAP_EDGE_DIRECTION -> newEdge.setDirection(fieldValue);
            }
        }
        return newEdge;
    }

    private String[] getNodeIdsFromEdgeKey(String key) {
        // Regex to extract node ids from citation key format
        Pattern pattern = Pattern.compile(".*(\\d+)_to_(\\d+)");
        Matcher matcher = pattern.matcher(key);
        if (matcher.find()) {
            String[] ids = new String[2];
            ids[0] = matcher.group(1);
            ids[1] = matcher.group(2);
            return ids;
        }
        return new String[2];
    }

    private String getNodeIdFromNodeKey(String key) {
        // Regex to extract node id from citation key format
        Pattern pattern = Pattern.compile(".*(\\d+)");
        Matcher matcher = pattern.matcher(key);
        if (matcher.find()) {
            return matcher.group(1);
        }
        return "";
    }
}
