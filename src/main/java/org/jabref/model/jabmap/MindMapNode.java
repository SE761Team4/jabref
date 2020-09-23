package org.jabref.model.jabmap;

import java.util.ArrayList;
import java.util.List;

/**
 * This class is a data object for a mind map node
 * References to BibEntry objects and kept as strings to simplify serialisation to JSON
 */
public class MindMapNode {

    // Strings of how these entries are stored in bibtex
    public static final transient String MAP_NODE_ENTRY_NAME = "MindMapNode";
    public static final transient String MAP_NODE_NAME = "name";
    public static final transient String MAP_NODE_BIBENTRY = "bibentry";
    public static final transient String MAP_NODE_ICONS = "icons";
    public static final transient String MAP_NODE_XPOS = "x_pos";
    public static final transient String MAP_NODE_YPOS = "y_pos";
    private static final transient String NODE_KEY_PART = "mindmapnode_";

    private Long id;
    private String name;
    // Citation key of bib entry to act as id
    private String bibEntry;
    private List<NodeIcon> icons = new ArrayList<>();
    private int x_pos;
    private int y_pos;

    public MindMapNode() {
    }

    public MindMapNode(String name) {
        this.name = name;
    }

    public MindMapNode(Long id, String name, String bibEntry, int x_pos, int y_pos) {
        this.id = id;
        this.name = name;
        this.bibEntry = bibEntry;
        this.x_pos = x_pos;
        this.y_pos = y_pos;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBibEntry() {
        return bibEntry;
    }

    public void setBibEntry(String bibEntry) {
        this.bibEntry = bibEntry;
    }

    public List<NodeIcon> getIcons() {
        return icons;
    }

    public void setIcons(ArrayList<NodeIcon> icons) {
        this.icons = icons;
    }

    public void setIcons(List<String> icons) {

        for (String icon : icons ) {
            NodeIcon newIcon = NodeIcon.valueOf(icon.toUpperCase());
            this.icons.add(newIcon);
        }
    }

    public int getX_pos() {
        return x_pos;
    }

    public void setX_pos(int x_pos) {
        this.x_pos = x_pos;
    }

    public int getY_pos() {
        return y_pos;
    }

    public void setY_pos(int y_pos) {
        this.y_pos = y_pos;
    }

    public static String getCitationKeyFromId(Long id) {
        return NODE_KEY_PART + id;
    }
}
