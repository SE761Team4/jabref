package org.jabref.model.entry.types;

import java.util.Locale;

public enum MindMapEntryType implements EntryType {

    Node("MindMapNode"),
    Edge("MindMapEdge");

    private final String displayName;

    MindMapEntryType(String displayName) {
        this.displayName = displayName;
    }

    @Override
    public String getName() {
        return displayName.toLowerCase(Locale.ENGLISH);
    }

    @Override
    public String getDisplayName() {
        return displayName;
    }
}
