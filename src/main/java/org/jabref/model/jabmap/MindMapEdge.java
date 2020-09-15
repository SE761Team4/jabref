package org.jabref.model.jabmap;

/**
 * This class is a model for a mind map edge object
 * Refs to other mind map data objects are kept as strings to simplify serialisation to JSON
 */
public class MindMapEdge {

    private String parent;
    private String child;
    private String label;
    private EdgeDirection direction;

    public MindMapEdge(String parent, String child, String label, EdgeDirection direction) {
        this.parent = parent;
        this.child = child;
        this.label = label;
        this.direction = direction;
    }

    public String getParent() {
        return parent;
    }

    public void setParent(String parent) {
        this.parent = parent;
    }

    public String getChild() {
        return child;
    }

    public void setChild(String child) {
        this.child = child;
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
