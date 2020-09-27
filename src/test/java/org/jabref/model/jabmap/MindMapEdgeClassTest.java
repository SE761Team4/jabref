package org.jabref.model.jabmap;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MindMapEdgeClassTest {
    private static MindMapEdge edge1;

    @BeforeAll
    public static void setup() {
        // given
        edge1 = new MindMapEdge(1L, 2L, "edge1", EdgeDirection.DEFAULT);
    }

    @Test
    void getNode1_IdTest() throws IllegalAccessException, NoSuchFieldException {
        // when
        final Long result = edge1.getNode1_Id();

        // then
        assertEquals(1L, result);
    }

    @Test
    void getNode2_IdTest() {
        // when
        final Long result = edge1.getNode2_Id();

        // then
        assertEquals(2L, result);
    }

    @Test
    void getLabelTest() {
        // when
        final String result = edge1.getLabel();

        // then
        assertEquals("edge1", result);
    }

    @Test
    void getDirectionTest() {
        // when
        final EdgeDirection result = edge1.getDirection();

        // then
        assertEquals(EdgeDirection.DEFAULT, result);
    }

    @Test
    void getCitationKeyFromIdsTest() {
        // when
        final String result = edge1.getCitationKeyFromIds(1L, 2L);

        // then
        assertEquals("mindmapedge_from_1_to_2", result);
    }

}
