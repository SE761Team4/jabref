package org.jabref.model.jabmap;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MindMapEdgeClassTest {
    private static MindMapEdge edge1;

    @BeforeAll
    public static void setup() {
        edge1 = new MindMapEdge(1L, 2L, "edge1", EdgeDirection.DEFAULT);
    }

    @Test
    void getNode1_IdTest() throws IllegalAccessException, NoSuchFieldException {
        final Long result = edge1.getNode1_Id();

        assertEquals(1L, result);
    }

    @Test
    void getNode2_IdTest() {
        final Long result = edge1.getNode2_Id();

        assertEquals(2L, result);
    }

    @Test
    void getLabelTest() {
        final String result = edge1.getLabel();

        assertEquals("edge1", result);
    }

    @Test
    void getDirectionTest() {
        final EdgeDirection result = edge1.getDirection();

        assertEquals(EdgeDirection.DEFAULT, result);
    }

    @Test
    void getCitationKeyFromIdsTest() {
        final String result = edge1.getCitationKeyFromIds(1L, 2L);

        assertEquals("mindmapedge_from_1_to_2", result);
    }

}
