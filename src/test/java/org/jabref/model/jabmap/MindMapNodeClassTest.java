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
        // given
        List<NodeIcon> icons = new ArrayList<>();
        icons.add(NodeIcon.HIGH_PRIORITY);
        icons.add(NodeIcon.READ);
        node1 = new MindMapNode(1L, "node1", "cite1", icons, 10, 10);
    }

    @Test
    void getIdTest() {
        // when
        final Long result = node1.getId();

        // then
        assertEquals(1L, result);
    }

    @Test
    void getLabelTest() {
        // when
        final String result = node1.getLabel();

        // then
        assertEquals("node1", result);
    }

    @Test
    void getCitationKeyTest() {
        // when
        final String result = node1.getCitationKey();

        // then
        assertEquals("cite1", result);
    }

    @Test
    void getIconsTest() {
        // when
        final List<NodeIcon> result = node1.getIcons();

        // then
        assertEquals(List.of(NodeIcon.HIGH_PRIORITY, NodeIcon.READ), result);
    }

    @Test
    void getX_posTest() {
        // when
        final int result = node1.getX_pos();

        // then
        assertEquals(10, result);
    }

    @Test
    void getY_posTest() {
        // when
        final int result = node1.getY_pos();

        // then
        assertEquals(10, result);
    }

    @Test
    void getCitationKeyFromIdTest() {
        // when
        final String result = node1.getCitationKeyFromId(1L);

        // then
        assertEquals("mindmapnode_1", result);
    }
}
