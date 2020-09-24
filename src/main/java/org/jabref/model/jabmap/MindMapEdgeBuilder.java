package org.jabref.model.jabmap;

public class MindMapEdgeBuilder {

    private Long node1Id;
    private Long node2Id;
    private String label;
    private EdgeDirection direction;

    public MindMapEdgeBuilder withNode1Id(Long node1Id) {
        this.node1Id = node1Id;
        return this;
    }

    public MindMapEdgeBuilder withNode2Id(Long node2Id) {
        this.node2Id = node2Id;
        return this;
    }

    public MindMapEdgeBuilder withLabel(String label) {
        this.label = label;
        return this;
    }

    public MindMapEdgeBuilder withDirection(EdgeDirection direction) {
        this.direction = direction;
        return this;
    }

    public MindMapEdgeBuilder withDirection(String direction) {
        direction = direction.toUpperCase();
        this.direction = EdgeDirection.valueOf(direction);
        return this;
    }

    public MindMapEdge build() {
        return new MindMapEdge(node1Id, node2Id, label, direction);
    }
}
