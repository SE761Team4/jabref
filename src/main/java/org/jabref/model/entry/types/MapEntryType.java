package org.jabref.model.entry.types;

public class MapEntryType implements EntryType {
    private final String name;

    public MapEntryType(String name) {
        this.name = name;
    }

    @Override
    public String getName() {
        return this.name;
    }

    @Override
    public String getDisplayName() {
        return this.name;
    }
}
