package org.jabref.model.jabmap;

import java.util.ArrayList;
import java.util.List;

/**
 * This class is a data object for a mind map node
 * References to BibEntry objects and kept as strings to simplify serialisation to JSON
 */
public class MindMapNode {

    private String id;
    private List<String> children;
    private String text;
    private String bibEntry;
    private List<String> icons;

    public MindMapNode() {

    }

    public MindMapNode(String id, List<String> children, String text, String bibEntry, List<String> icons) {
        this.id = id;
        this.children = children;
        this.text = text;
        this.bibEntry = bibEntry;
        this.icons = icons;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<String> getChildren() {
        return children;
    }

    private void addChild(String node) {
        this.children.add(node);
    }

    private void removeChild(MindMapNode node) {
        this.children.remove(node);
    }

    public void setChildren(ArrayList<String> children) {
        this.children = children;
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

    public List<String> getIcons() {
        return icons;
    }

    public void addIcon(String icon) {
        this.icons.add(icon);
    }

    public void removeIcon(String icon) {
        this.icons.remove(icon);
    }

    public void setIcons(ArrayList<String> icons) {
        this.icons = icons;
    }
}
