package org.jabref.model.jabmap;

/**
 * This class is a model for a mind map edge object
 */
public class MindMapEdge {

    private MindMapNode parent;
    private MindMapNode child;

    public MindMapEdge(MindMapNode parent, MindMapNode child){
        this.parent = parent;
        this.child = child;
    }

    public MindMapNode getParent() {
        return parent;
    }

    public void setParent(MindMapNode parent) {
        this.parent = parent;
    }

    public MindMapNode getChild() {
        return child;
    }

    public void setChild(MindMapNode child) {
        this.child = child;
    }


}
