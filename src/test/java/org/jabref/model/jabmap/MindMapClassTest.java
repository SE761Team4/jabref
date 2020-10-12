package org.jabref.model.jabmap;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MindMapClassTest {
    private static MindMapNode node1;
    private static MindMapNode node2;
    private static MindMapEdge edge1;

    // should use local instead
    // private static final MindMap MYMINDMAP = new MindMap();

    @BeforeAll
    public static void setup() {
        node1 = new MindMapNodeBuilder()
                .withCitationKey("cite1")
                .withId(1L)
                .withLabel("node1")
                .withXPos(50)
                .withYPos(50)
                .build();

        node2 = new MindMapNodeBuilder()
                .withCitationKey("cite2")
                .withId(2L)
                .withLabel("node2")
                .withXPos(70)
                .withYPos(70)
                .build();

        edge1 = new MindMapEdgeBuilder()
                .withDirection(EdgeDirection.DEFAULT)
                .withLabel("edge1")
                .withNode1Id(1L)
                .withNode2Id(2L)
                .build();
    }

    @Test
    void getNodesTest() throws NoSuchFieldException, IllegalAccessException {
        final MindMap MYMINDMAP = new MindMap();
        final Field field = MYMINDMAP.getClass().getDeclaredField("nodes");
        field.setAccessible(true);
        field.set(MYMINDMAP, List.of(node1, node2));

        final List<MindMapNode> result = MYMINDMAP.getNodes();

        assertEquals(List.of(node1, node2), result);
    }

    @Test
    void addNodeTest() throws NoSuchFieldException, IllegalAccessException {
        final MindMap MYMINDMAP = new MindMap();

        MYMINDMAP.addNode(node1);

        final Field field = MYMINDMAP.getClass().getDeclaredField("nodes");
        field.setAccessible(true);
        assertEquals(List.of(node1), field.get(MYMINDMAP));
    }

    @Test
    void getEdgesTest() throws IllegalAccessException, NoSuchFieldException {
        final MindMap MYMINDMAP = new MindMap();
        final Field field = MYMINDMAP.getClass().getDeclaredField("edges");
        field.setAccessible(true);
        field.set(MYMINDMAP, List.of(edge1));

        final List<MindMapEdge> result = MYMINDMAP.getEdges();

        assertEquals(List.of(edge1), result);
    }

    @Test
    void addEdgeTest() throws NoSuchFieldException, IllegalAccessException {
        final MindMap MYMINDMAP = new MindMap();

        MYMINDMAP.addEdge(edge1);

        final Field field = MYMINDMAP.getClass().getDeclaredField("edges");
        field.setAccessible(true);
        assertEquals(List.of(edge1), field.get(MYMINDMAP));
    }

    @Test
    void removeEdgeTest() throws NoSuchFieldException, IllegalAccessException {
        final MindMap MYMINDMAP = new MindMap();
        final Field field = MYMINDMAP.getClass().getDeclaredField("edges");
        field.setAccessible(true);
        List<MindMapEdge> newlist = new ArrayList<>();
        newlist.add(edge1);

        field.set(MYMINDMAP, newlist);

        MYMINDMAP.removeEdge(edge1);

        assertEquals(List.of(), field.get(MYMINDMAP));
    }

}
