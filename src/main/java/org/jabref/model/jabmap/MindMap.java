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

        if (this == null) {
            System.out.println(2);
            return false;
        }

        if (mindMap.getClass() != MindMap.class) {
            System.out.println(3);
            return false;
        }

        if (this.getEdges().size() != ((MindMap) mindMap).getEdges().size()) {
            System.out.println(4);
            return false;
        }

        if (this.getNodes().size() != ((MindMap) mindMap).getNodes().size()) {
            System.out.println(5);
            return false;
        }

        if (this.getNodes().equals(((MindMap) mindMap).getNodes())) {
            System.out.println(6);
            return false;
        }

        if (this.getEdges().equals(((MindMap) mindMap).getEdges())) {
            System.out.println(7);
            return false;
        }

        return true;
    }

    @Override
    public int hashCode() {
        // no need
        return 0;
    }
}
