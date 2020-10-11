package org.jabref.model.jabmap;

import java.lang.reflect.Field;
import java.util.List;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MindMapEdgeBuilderTest {

    @Test
    void withNode1IdTest() throws NoSuchFieldException, IllegalAccessException {
        MindMapEdgeBuilder mindMapEdgeBuilder = new MindMapEdgeBuilder();

        mindMapEdgeBuilder.withNode1Id(1L);

        final Field field = mindMapEdgeBuilder.getClass().getDeclaredField("node1Id");
        field.setAccessible(true);
        assertEquals(1L, field.get(mindMapEdgeBuilder));
    }

    @Test
    void withNode2IdTest() throws NoSuchFieldException, IllegalAccessException {
        MindMapEdgeBuilder mindMapEdgeBuilder = new MindMapEdgeBuilder();

        mindMapEdgeBuilder.withNode2Id(2L);

        final Field field = mindMapEdgeBuilder.getClass().getDeclaredField("node2Id");
        field.setAccessible(true);
        assertEquals(2L, field.get(mindMapEdgeBuilder));
    }

    @Test
    void withLabelTest() throws NoSuchFieldException, IllegalAccessException {
        MindMapEdgeBuilder mindMapEdgeBuilder = new MindMapEdgeBuilder();

        mindMapEdgeBuilder.withLabel("edge1");

        final Field field = mindMapEdgeBuilder.getClass().getDeclaredField("label");
        field.setAccessible(true);
        assertEquals("edge1", field.get(mindMapEdgeBuilder));
    }

    @Test
    void withStringDirectionTest() throws NoSuchFieldException, IllegalAccessException {
        MindMapEdgeBuilder mindMapEdgeBuilder = new MindMapEdgeBuilder();

        mindMapEdgeBuilder.withDirection(String.valueOf(EdgeDirection.DEFAULT));

        final Field field = mindMapEdgeBuilder.getClass().getDeclaredField("direction");
        field.setAccessible(true);
        assertEquals(EdgeDirection.DEFAULT, field.get(mindMapEdgeBuilder));
    }

    @Test
    void withEnumDirectionTest() throws NoSuchFieldException, IllegalAccessException {
        MindMapEdgeBuilder mindMapEdgeBuilder = new MindMapEdgeBuilder();

        mindMapEdgeBuilder.withDirection(EdgeDirection.DEFAULT);

        final Field field = mindMapEdgeBuilder.getClass().getDeclaredField("direction");
        field.setAccessible(true);
        assertEquals(EdgeDirection.DEFAULT, field.get(mindMapEdgeBuilder));
    }

    @Test
    void buildTest() throws NoSuchFieldException, IllegalAccessException {
        MindMapEdgeBuilder mindMapEdgeBuilder = new MindMapEdgeBuilder();
        Field labelfield = mindMapEdgeBuilder.getClass().getDeclaredField("label");
        labelfield.setAccessible(true);
        labelfield.set(mindMapEdgeBuilder, "edge1");

        Field node1 = mindMapEdgeBuilder.getClass().getDeclaredField("node1Id");
        node1.setAccessible(true);
        node1.set(mindMapEdgeBuilder, 1L);

        Field node2 = mindMapEdgeBuilder.getClass().getDeclaredField("node2Id");
        node2.setAccessible(true);
        node2.set(mindMapEdgeBuilder, 2L);

        Field direction = mindMapEdgeBuilder.getClass().getDeclaredField("direction");
        direction.setAccessible(true);
        direction.set(mindMapEdgeBuilder, EdgeDirection.DEFAULT);

        MindMapEdge expect = new MindMapEdge(1L, 2L, "edge1", EdgeDirection.DEFAULT);
        assertEquals(expect, mindMapEdgeBuilder.build());
    }
}
