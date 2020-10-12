package org.jabref.model.jabmap;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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
        if (this == mindMap) {
            return true;
        }

        if (mindMap == null || mindMap.getClass() != MindMap.class) {
            return false;
        }

        MindMap other = (MindMap) mindMap;

        return Objects.equals(this.nodes, other.getNodes())
                && Objects.equals(this.edges, other.getEdges());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(this);
    }
}
