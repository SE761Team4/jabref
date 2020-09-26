package org.jabref.model.jabmap;

import java.util.ArrayList;
import java.util.List;

/**
 * This class is a data model for a complete mind map
 */
public class MindMap {

    private List<MindMapNode> nodes = new ArrayList<>();
    private List<MindMapEdge> edges = new ArrayList<>();

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

    @Override
    public boolean equals(Object mindMap) {
        if (mindMap == null) {
            System.out.println(1);
            return false;
        }

        if (mindMap.getClass() != MindMap.class) {
            return false;
        }

        if (this.getEdges().size() != ((MindMap) mindMap).getEdges().size()) {
            return false;
        }

        if (this.getNodes().size() != ((MindMap) mindMap).getNodes().size()) {
            return false;
        }

        if (!this.getNodes().containsAll(((MindMap) mindMap).getNodes())) {
            return false;
        }

        return this.getEdges().containsAll(((MindMap) mindMap).getEdges());
    }

    @Override
    public int hashCode() {
        // no need
        return 0;
    }
}
