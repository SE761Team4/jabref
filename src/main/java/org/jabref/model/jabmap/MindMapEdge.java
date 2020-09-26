package org.jabref.model.jabmap;

/**
 * This class is a model for a mind map edge object Refs to other mind map data objects are kept as strings to simplify serialisation to JSON
 */
public class MindMapEdge {

    private static final transient String EDGE_KEY_PART1 = "mindmapedge_from_";
    private static final transient String EDGE_KEY_PART2 = "_to_";

    private final Long node1_Id;
    private final Long node2_Id;
    private final String label;
    private final EdgeDirection direction;

    MindMapEdge(Long node1_Id, Long node2_Id, String label, EdgeDirection direction) {
        this.node1_Id = node1_Id;
        this.node2_Id = node2_Id;
        this.label = label;
        this.direction = direction;
    }

    public Long getNode1_Id() {
        return node1_Id;
    }

    public Long getNode2_Id() {
        return node2_Id;
    }

    public String getLabel() {
        return label;
    }

    public EdgeDirection getDirection() {
        return direction;
    }

    public static String getCitationKeyFromIds(Long id1, Long id2) {
        return EDGE_KEY_PART1 + id1 + EDGE_KEY_PART2 + id2;
    }

    @Override
    public boolean equals(Object mindMapEdge) {
        if (mindMapEdge == null) {
            return false;
        }

        if (mindMapEdge.getClass() != this.getClass()) {
            return false;
        }

        if (!this.getNode1_Id().equals(((MindMapEdge) mindMapEdge).getNode1_Id())) {
            return false;
        }

        if (!this.getLabel().equals(((MindMapEdge) mindMapEdge).getLabel())) {
            return false;
        }

        if (!this.getNode2_Id().equals(((MindMapEdge) mindMapEdge).getNode2_Id())) {
            return false;
        }

        return this.getDirection().equals(((MindMapEdge) mindMapEdge).getDirection());
    }

    @Override
    public int hashCode() {
        // no need
        return 0;
    }
}
