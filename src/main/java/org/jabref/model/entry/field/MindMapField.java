package org.jabref.model.entry.field;

import java.util.Collections;
import java.util.EnumSet;
import java.util.Set;

/**
 * MindMap fields
 */
public enum MindMapField implements Field {
    NODE_LABEL("label"),
    NODE_CITATION_KEY("bibentry"),
    NODE_ICONS("icons"),
    NODE_XPOS("x_pos", FieldProperty.NUMERIC),
    NODE_YPOS("y_pos", FieldProperty.NUMERIC),

    EDGE_LABEL("label"),
    EDGE_DIRECTION("direction");

    private final String name;
    private final Set<FieldProperty> properties;

    MindMapField(String name, FieldProperty fieldProperty) {
        this.name = name;
        this.properties = EnumSet.of(fieldProperty);
    }

    MindMapField(String name) {
        this.name = name;
        this.properties = Collections.emptySet();
    }

    @Override
    public Set<FieldProperty> getProperties() {
        return this.properties;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public boolean isStandardField() {
        return false;
    }
}
