package org.jabref.model.jabmap;

import java.util.ArrayList;
import java.util.List;

/**
 * This class is a data model for a complete mind map
 */
public class MindMap {

    private List<MindMapNode> nodes;
    private List<MindMapEdge> edges;

    public MindMap() {
        nodes = new ArrayList<>();
        edges = new ArrayList<>();
    }

    public MindMap(MindMapNode node) {
        nodes = new ArrayList<>();
        edges = new ArrayList<>();
        this.nodes.add(node);
    }

    public MindMap(ArrayList<MindMapNode> nodes, ArrayList<MindMapEdge> edges) {
        this.nodes = nodes;
        this.edges = edges;
    }

    public List<MindMapNode> getNodes() {
        return this.nodes;
    }

    public void addNode(MindMapNode node) {
        this.nodes.add(node);
    }

    public List<MindMapEdge> getEdges() {
        return this.edges;
    }

    public void addEdge(MindMapEdge edge) {
        this.edges.add(edge);
    }

    public void removeEdge(MindMapEdge edge) {
        this.edges.remove(edge);
    }
}
