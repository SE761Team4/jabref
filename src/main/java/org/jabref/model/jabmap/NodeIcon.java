package org.jabref.model.jabmap;

import java.util.Locale;

public enum NodeIcon {
    READ("READ"),
    TO_READ("TO_READ"),
    HIGH_PRIORITY("HIGH_PRIORITY"),
    MEDIUM_PRIORITY("MEDIUM_PRIORITY"),
    LOW_PRIORITY("LOW_PRIORITY");

    private final String displayName;

    NodeIcon(String displayname) {
        this.displayName = displayname;
    }

    public String getName() {
        return displayName.toLowerCase(Locale.ENGLISH);
    }

    public String getDisplayName() {
        return displayName;
    }
}
