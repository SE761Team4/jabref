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
    private final String colour;
    private final List<NodeIcon> icons;
    private final float x_pos;
    private final float y_pos;

    MindMapNode(Long id, String label, String citationKey, String colour, List<NodeIcon> icons, float x_pos, float y_pos) {
        this.id = id;
        this.label = label;
        this.colour = colour;
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

    public String getColour() {
        return colour;
    }

    public String getCitationKey() {
        return citationKey;
    }

    public List<NodeIcon> getIcons() {
        return icons;
    }

    public String getIconsString() {
        String iconsString = icons.toString();
        iconsString = iconsString.substring(iconsString.indexOf('[') + 1, iconsString.indexOf(']'));
        iconsString = iconsString.replace(" ", "");
        return iconsString;
    }

    public float getX_pos() {
        return x_pos;
    }

    public float getY_pos() {
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
