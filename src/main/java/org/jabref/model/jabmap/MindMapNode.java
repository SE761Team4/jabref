package org.jabref.model.jabmap;

import java.util.List;
import java.util.Objects;

/**
 * This class is a data object for a mind map node References to BibEntry objects and kept as strings to simplify serialisation to JSON
 */
public class MindMapNode {

    // Strings of how these entries are stored in bibtex

    private static final transient String NODE_KEY_PART = "mindmapnode_";

    private final Long id;
    private final String label;
    // Citation key of bib entry to act as id
    private final String citationKey;
    private final List<NodeIcon> icons;
    private final int x_pos;
    private final int y_pos;

    MindMapNode(Long id, String label, String citationKey, List<NodeIcon> icons, int x_pos, int y_pos) {
        this.id = id;
        this.label = label;
        this.citationKey = citationKey;
        this.icons = icons;
        this.x_pos = x_pos;
        this.y_pos = y_pos;
    }

    public Long getId() {
        return id;
    }

    public String getLabel() {
        return label;
    }

    public String getCitationKey() {
        return citationKey;
    }

    public List<NodeIcon> getIcons() {
        return icons;
    }

    public int getX_pos() {
        return x_pos;
    }

    public int getY_pos() {
        return y_pos;
    }

    public static String getCitationKeyFromId(Long id) {
        return NODE_KEY_PART + id;
    }

    @Override
    public boolean equals(Object mindMapNode) {
        if (this == mindMapNode) {
            return true;
        }

        if (mindMapNode == null || mindMapNode.getClass() != this.getClass()) {
            return false;
        }

        MindMapNode other = (MindMapNode) mindMapNode;

        return Objects.equals(this.citationKey, other.getCitationKey())
                && Objects.equals(this.icons, other.getIcons())
                && Objects.equals(this.id, other.getId())
                && Objects.equals(this.label, other.getLabel())
                && Objects.equals(this.x_pos, other.getX_pos())
                && Objects.equals(this.y_pos, other.getY_pos());

    }

    @Override
    public int hashCode() {
        return Objects.hashCode(this);
    }
}
