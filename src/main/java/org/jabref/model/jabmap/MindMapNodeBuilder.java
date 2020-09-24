package org.jabref.model.jabmap;

import java.util.ArrayList;
import java.util.List;

public class MindMapNodeBuilder {

    private Long id;
    private String label;
    private String citationKey;
    private List<NodeIcon> icons = new ArrayList<>();
    private int xPos;
    private int yPos;

    public MindMapNodeBuilder withId(Long id) {
        this.id = id;
        return this;
    }

    public MindMapNodeBuilder withLabel(String label) {
        this.label = label;
        return this;
    }

    public MindMapNodeBuilder withCitationKey(String citationKey) {
        this.citationKey = citationKey;
        return this;
    }

    public MindMapNodeBuilder withIcons(List<String> icons) {
        for (String icon : icons) {
            NodeIcon newIcon = NodeIcon.valueOf(icon.toUpperCase());
            this.icons.add(newIcon);
        }
        return this;
    }

    public MindMapNodeBuilder withXPos(int xPos) {
        this.xPos = xPos;
        return this;
    }

    public MindMapNodeBuilder withYPos(int yPos) {
        this.yPos = yPos;
        return this;
    }

    public MindMapNode build() {
        return new MindMapNode(id, label, citationKey, icons, xPos, yPos);
    }
}
