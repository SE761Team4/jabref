package org.jabref.logic.jabmap;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.jabref.model.entry.BibEntry;
import org.jabref.model.entry.field.Field;
import org.jabref.model.entry.field.InternalField;
import org.jabref.model.entry.field.MindMapField;
import org.jabref.model.entry.types.EntryType;
import org.jabref.model.entry.types.MindMapEntryType;
import org.jabref.model.jabmap.MindMap;
import org.jabref.model.jabmap.MindMapEdge;
import org.jabref.model.jabmap.MindMapEdgeBuilder;
import org.jabref.model.jabmap.MindMapNode;
import org.jabref.model.jabmap.MindMapNodeBuilder;

import com.google.common.base.Converter;

/**
 * This class handles converting data from BibTeX format, which is stored in the database, to MindMap java data model, and back again. Follows Google's abstract Converter format
 */
public class BibtexMindMapAdapter extends Converter<List<BibEntry>, MindMap> {

    public static final String DEFAULT_MAP_LABEL = "New Map";

    /**
     * Method for loading MindMap class from bibtex database. Returns the mindmap object if present, a blank map otherwise
     */
    @Override
    protected MindMap doForward(List<BibEntry> bibEntries) {
        // Retrieve the first mind map node if present, meaning this database contains a mind map
        boolean containsMap = bibEntries.stream().anyMatch(entry -> entry.getType() == MindMapEntryType.Node);
        if (containsMap) {
            // We know this file contains a mind map so...
            MindMap map = new MindMap();
            try {
                for (BibEntry b : bibEntries) {
                    EntryType type = b.getType();
                    if (type == MindMapEntryType.Node) {
                        // Instantiate MindMapNode object and add to MindMap nodes
                        map.addNode(createNodeFromBibEntry(b));
                    } else if (type == MindMapEntryType.Edge) {
                        // Instantiate MindMapEdge object and add to MindMap edges
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
        newMap.addNode(new MindMapNodeBuilder().withLabel(DEFAULT_MAP_LABEL).withId(-1L).build());
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
                    BibEntry newEntry = new BibEntry(MindMapEntryType.Node);
                    newEntry.setField(InternalField.KEY_FIELD, MindMapNode.getCitationKeyFromId(node.getId()));
                    if (node.getLabel() != null) {
                        newEntry.setField(MindMapField.NODE_LABEL, node.getLabel());
                    }
                    if (node.getCitationKey() != null) {
                        newEntry.setField(MindMapField.NODE_CITATION_KEY, node.getCitationKey());
                    }
                    // Node will always have x and y pos
                    newEntry.setField(MindMapField.NODE_XPOS, String.valueOf(node.getX_pos()));
                    newEntry.setField(MindMapField.NODE_YPOS, String.valueOf(node.getY_pos()));
                    if (node.getColour() != null) {
                        newEntry.setField(MindMapField.NODE_COLOUR, node.getColour());
                    }
                    return newEntry;
                })
                .collect(Collectors.toList());

        List<BibEntry> edgeEntries = mindMap
                .getEdges().stream()
                .map(edge -> {
                    BibEntry newEntry = new BibEntry(MindMapEntryType.Edge);
                    newEntry.setField(InternalField.KEY_FIELD, MindMapEdge.getCitationKeyFromIds(edge.getNode1_Id(), edge.getNode2_Id()));
                    newEntry.setField(MindMapField.EDGE_LABEL, edge.getLabel() == null ? "" : edge.getLabel());
                    newEntry.setField(MindMapField.EDGE_DIRECTION, edge.getDirection() == null ? "" : edge.getDirection().toString());
                    return newEntry;
                })
                .collect(Collectors.toList());

        nodeEntries.addAll(edgeEntries);
        return nodeEntries;
    }

    /**
     * Helper method that takes a bib entry and iteratively converts the fields & values to those of a MindMapNode
     */
    MindMapNode createNodeFromBibEntry(BibEntry entry) throws IllegalArgumentException {
        MindMapNodeBuilder newNodeBuilder = new MindMapNodeBuilder();
        // Create id field from citation key of Bibtex entry
        String id = getNodeIdFromNodeKey(entry.getCiteKeyOptional().orElse(""));
        newNodeBuilder.withId(Long.parseLong(id));
        for (Map.Entry<Field, String> field : entry.getFieldMap().entrySet()) {
            String fieldName = field.getKey().getName();
            String fieldValue = field.getValue();
            if (MindMapField.NODE_LABEL.getName().equals(fieldName)) {
                newNodeBuilder.withLabel(fieldValue);
            } else if (MindMapField.NODE_CITATION_KEY.getName().equals(fieldName)) {
                newNodeBuilder.withCitationKey(fieldValue);
            } else if (MindMapField.NODE_ICONS.getName().equals(fieldName)) {
                newNodeBuilder.withIcons(Arrays.asList(fieldValue.split(",")));
            } else if (MindMapField.NODE_XPOS.getName().equals(fieldName)) {
                newNodeBuilder.withXPos(Float.parseFloat(fieldValue));
            } else if (MindMapField.NODE_YPOS.getName().equals(fieldName)) {
                newNodeBuilder.withYPos(Float.parseFloat(fieldValue));
            } else if (MindMapField.NODE_COLOUR.getName().equals(fieldName)) {
                newNodeBuilder.withColour(fieldValue);
            }
        }
        return newNodeBuilder.build();
    }

    /**
     * Helper method that takes a bib entry and iteratively converts the fields & values to those of a MindMapEdge
     */
     MindMapEdge createEdgeFromBibEntry(BibEntry entry) throws IllegalArgumentException {
        MindMapEdgeBuilder newEdge = new MindMapEdgeBuilder();
        // Create id fields from citation key ids
        String[] ids = getNodeIdsFromEdgeKey(entry.getCiteKeyOptional().orElse(""));
        newEdge.withNode1Id(Long.parseLong(ids[0]));
        newEdge.withNode2Id(Long.parseLong(ids[1]));
        for (Map.Entry<Field, String> field : entry.getFieldMap().entrySet()) {
            String fieldName = field.getKey().getName();
            String fieldValue = field.getValue();
            if (MindMapField.EDGE_LABEL.getName().equals(fieldName)) {
                newEdge.withLabel(fieldValue);
            } else if (MindMapField.EDGE_DIRECTION.getName().equals(fieldName)) {
                newEdge.withDirection(fieldValue);
            }
        }
        return newEdge.build();
    }

    String[] getNodeIdsFromEdgeKey(String key) {
        // Regex to extract node ids from citation key format
        Pattern pattern = Pattern.compile("(\\d+)_to_(\\d+)");
        Matcher matcher = pattern.matcher(key);
        if (matcher.find()) {
            String[] ids = new String[2];
            ids[0] = matcher.group(1);
            ids[1] = matcher.group(2);
            return ids;
        }
        return new String[2];
    }

    String getNodeIdFromNodeKey(String key) {
        // Regex to extract node id from citation key format
        Pattern pattern = Pattern.compile("(\\d+)");
        Matcher matcher = pattern.matcher(key);
        if (matcher.find()) {
            return matcher.group(1);
        }
        return "";
    }
}
