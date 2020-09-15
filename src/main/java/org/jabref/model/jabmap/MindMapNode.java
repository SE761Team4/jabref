package org.jabref.model.jabmap;

import java.util.ArrayList;
import java.util.List;

/**
 * This class is a data object for a mind map node
 * References to BibEntry objects and kept as strings to simplify serialisation to JSON
 */
public class MindMapNode {

    private Long id;
    private String text;
    private String bibEntry;
    private List<NodeIcon> icons;
    private int x_pos;
    private int y_pos;

    public MindMapNode() {

    }

    public MindMapNode(Long id, String text, String bibEntry, List<NodeIcon> icons, int x_pos, int y_pos) {
        this.id = id;
        this.text = text;
        this.bibEntry = bibEntry;
        this.icons = icons;
        this.x_pos = x_pos;
        this.y_pos = y_pos;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
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

    public void addIcon(NodeIcon icon) {
        this.icons.add(icon);
    }

    public void removeIcon(String icon) {
        this.icons.remove(icon);
    }

    public void setIcons(ArrayList<NodeIcon> icons) {
        this.icons = icons;
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
}
