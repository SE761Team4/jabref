package org.jabref.model.jabmap;

/**
 * This class is a model for a mind map edge object Refs to other mind map data objects are kept as strings to simplify serialisation to JSON
 */
public class MindMapEdge {

    // Strings of how these entries are stored in bibtex
    public static final transient String MAP_EDGE_ENTRY_NAME = "MindMapEdge";
    public static final transient String MAP_EDGE_NODE1_ID = "node1_id";
    public static final transient String MAP_EDGE_NODE2_ID = "node2_id";
    public static final transient String MAP_EDGE_LABEL = "label";
    public static final transient String MAP_EDGE_DIRECTION = "direction";

    // Node 1 and 2 are
    private Long node1_Id;
    private Long node2_Id;
    private String label;
    private EdgeDirection direction;

    public MindMapEdge() {
    }

    public MindMapEdge(Long node1_Id, Long node2_Id, String label, EdgeDirection direction) {
        this.node1_Id = node1_Id;
        this.node2_Id = node2_Id;
        this.label = label;
        this.direction = direction;
    }

    public Long getNode1_Id() {
        return node1_Id;
    }

    public void setNode1_Id(Long node1_Id) {
        this.node1_Id = node1_Id;
    }

    public Long getNode2_Id() {
        return node2_Id;
    }

    public void setNode2_Id(Long node2_Id) {
        this.node2_Id = node2_Id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public EdgeDirection getDirection() {
        return direction;
    }

    public void setDirection(EdgeDirection direction) {
        this.direction = direction;
    }
}
