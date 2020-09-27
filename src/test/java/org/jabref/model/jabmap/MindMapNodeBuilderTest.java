package org.jabref.model.jabmap;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MindMapNodeBuilderTest {

    @Test
    void withIdTest() throws NoSuchFieldException, IllegalAccessException {
        MindMapNodeBuilder mindMapNodeBuilder = new MindMapNodeBuilder();

        mindMapNodeBuilder.withId(1L);

        // then
        final Field field = mindMapNodeBuilder.getClass().getDeclaredField("id");
        field.setAccessible(true);
        assertEquals(1L, field.get(mindMapNodeBuilder));
    }

    @Test
    void withLabelTest() throws NoSuchFieldException, IllegalAccessException {
        MindMapNodeBuilder mindMapNodeBuilder = new MindMapNodeBuilder();

        mindMapNodeBuilder.withLabel("node1");

        // then
        final Field field = mindMapNodeBuilder.getClass().getDeclaredField("label");
        field.setAccessible(true);
        assertEquals("node1", field.get(mindMapNodeBuilder));
    }

    @Test
    void withCitationKeyTest() throws NoSuchFieldException, IllegalAccessException {
        MindMapNodeBuilder mindMapNodeBuilder = new MindMapNodeBuilder();

        mindMapNodeBuilder.withCitationKey("cite1");

        // then
        final Field field = mindMapNodeBuilder.getClass().getDeclaredField("citationKey");
        field.setAccessible(true);
        assertEquals("cite1", field.get(mindMapNodeBuilder));
    }

    @Test
    void withIconsTest() throws NoSuchFieldException, IllegalAccessException {
        MindMapNodeBuilder mindMapNodeBuilder = new MindMapNodeBuilder();
        List<String> icons = new ArrayList<>();
        icons.add("READ");
        icons.add("HIGH_PRIORITY");
        mindMapNodeBuilder.withIcons(icons);
        List<NodeIcon> nodeIcons = new ArrayList<>();
        nodeIcons.add(NodeIcon.READ);
        nodeIcons.add(NodeIcon.HIGH_PRIORITY);

        // then
        final Field field = mindMapNodeBuilder.getClass().getDeclaredField("icons");
        field.setAccessible(true);
        assertEquals(nodeIcons, field.get(mindMapNodeBuilder));
    }

    @Test
    void withXPosTest() throws NoSuchFieldException, IllegalAccessException {
        MindMapNodeBuilder mindMapNodeBuilder = new MindMapNodeBuilder();

        mindMapNodeBuilder.withXPos(10);

        // then
        final Field field = mindMapNodeBuilder.getClass().getDeclaredField("xPos");
        field.setAccessible(true);
        assertEquals(10, field.get(mindMapNodeBuilder));
    }

    @Test
    void withYPosTest() throws NoSuchFieldException, IllegalAccessException {
        MindMapNodeBuilder mindMapNodeBuilder = new MindMapNodeBuilder();

        mindMapNodeBuilder.withYPos(10);

        // then
        final Field field = mindMapNodeBuilder.getClass().getDeclaredField("yPos");
        field.setAccessible(true);
        assertEquals(10, field.get(mindMapNodeBuilder));
    }

    @Test
    void buildTest() throws NoSuchFieldException, IllegalAccessException {
        MindMapNodeBuilder mindMapNodeBuilder = new MindMapNodeBuilder();
        Field labelfield = mindMapNodeBuilder.getClass().getDeclaredField("label");
        labelfield.setAccessible(true);
        labelfield.set(mindMapNodeBuilder, "node1");

        Field idfield = mindMapNodeBuilder.getClass().getDeclaredField("id");
        idfield.setAccessible(true);
        idfield.set(mindMapNodeBuilder, 1L);

        Field citationKeyfield = mindMapNodeBuilder.getClass().getDeclaredField("citationKey");
        citationKeyfield.setAccessible(true);
        citationKeyfield.set(mindMapNodeBuilder, "cite1");

        Field xPosField = mindMapNodeBuilder.getClass().getDeclaredField("xPos");
        xPosField.setAccessible(true);
        xPosField.set(mindMapNodeBuilder, 10);

        Field yPosField = mindMapNodeBuilder.getClass().getDeclaredField("yPos");
        yPosField.setAccessible(true);
        yPosField.set(mindMapNodeBuilder, 10);

        Field iconField = mindMapNodeBuilder.getClass().getDeclaredField("icons");
        iconField.setAccessible(true);
        List<NodeIcon> nodeIcons = new ArrayList<>();
        nodeIcons.add(NodeIcon.READ);
        nodeIcons.add(NodeIcon.HIGH_PRIORITY);
        iconField.set(mindMapNodeBuilder, nodeIcons);

        MindMapNode expect = new MindMapNode(1L, "node1", "cite1", nodeIcons, 10, 10);
        assertEquals(expect, mindMapNodeBuilder.build());
    }

}
