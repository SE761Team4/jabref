package org.jabref.model.jabmap;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MindMapNodeClassTest {
    private static MindMapNode node1;

    @BeforeAll
    public static void setup() {
        List<NodeIcon> icons = new ArrayList<>();
        icons.add(NodeIcon.HIGH_PRIORITY);
        icons.add(NodeIcon.READ);
        node1 = new MindMapNode(1L, "node1", "cite1", icons, 10, 10);
    }

    @Test
    void getIdTest() {
        final Long result = node1.getId();

        assertEquals(1L, result);
    }

    @Test
    void getLabelTest() {
        final String result = node1.getLabel();

        assertEquals("node1", result);
    }

    @Test
    void getCitationKeyTest() {
        final String result = node1.getCitationKey();

        assertEquals("cite1", result);
    }

    @Test
    void getIconsTest() {
        final List<NodeIcon> result = node1.getIcons();

        assertEquals(List.of(NodeIcon.HIGH_PRIORITY, NodeIcon.READ), result);
    }

    @Test
    void getX_posTest() {
        final int result = node1.getX_pos();

        assertEquals(10, result);
    }

    @Test
    void getY_posTest() {
        final int result = node1.getY_pos();

        assertEquals(10, result);
    }

    @Test
    void getCitationKeyFromIdTest() {
        final String result = node1.getCitationKeyFromId(1L);

        assertEquals("mindmapnode_1", result);
    }
}
