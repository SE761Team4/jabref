package org.jabref.model.jabmap;

/**
 * This class is a model for a mind map edge object
 * Refs to other mind map data objects are kept as strings to simplify serialisation to JSON
 */
public class MindMapEdge {

    private String parent;
    private String child;

    public MindMapEdge(String parent, String child) {
        this.parent = parent;
        this.child = child;
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
}
