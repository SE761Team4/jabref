package org.jabref.model.entry.types;

import java.util.Arrays;
import java.util.List;

import org.jabref.model.entry.BibEntryType;
import org.jabref.model.entry.BibEntryTypeBuilder;
import org.jabref.model.entry.field.MindMapField;

public class MindMapEntryTypeDefinitions {
    private static final BibEntryType NODE = new BibEntryTypeBuilder()
            .withType(MindMapEntryType.Node)
            .withRequiredFields(MindMapField.NODE_XPOS, MindMapField.NODE_YPOS)
            .withImportantFields(MindMapField.NODE_LABEL, MindMapField.NODE_CITATION_KEY, MindMapField.NODE_ICONS)
            .build();

    private static final BibEntryType EDGE = new BibEntryTypeBuilder()
            .withType(MindMapEntryType.Edge)
            .withRequiredFields(MindMapField.EDGE_DIRECTION)
            .withImportantFields(MindMapField.EDGE_LABEL)
            .build();

    public static final List<BibEntryType> ALL = Arrays.asList(NODE, EDGE);

    private MindMapEntryTypeDefinitions() {
    }
}
