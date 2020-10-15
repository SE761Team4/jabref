package org.jabref.model.jabmap;

import java.util.Locale;

public enum NodeIcon {
    READ("READ"),
    TO_READ("TO_READ"),
    HIGH_PRIORITY("HIGH_PRIORITY"),
    MEDIUM_PRIORITY("MEDIUM_PRIORITY"),
    LOW_PRIORITY("LOW_PRIORITY"),
    FAVOURITE("FAVOURITE"),
    NOT_FAVOURITE("NOT_FAVOURITE");

    private final String displayName;

    NodeIcon(String displayName) {
        this.displayName = displayName;
    }

    public String getName() {
        return displayName.toLowerCase(Locale.ENGLISH);
    }

    public String getDisplayName() {
        return displayName;
    }
}
