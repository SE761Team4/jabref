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
                // .withIcons(icons)
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
        // given
        final MindMap MYMINDMAP = new MindMap();
        final Field field = MYMINDMAP.getClass().getDeclaredField("nodes");
        field.setAccessible(true);
        field.set(MYMINDMAP, List.of(node1, node2));

        // when
        final List<MindMapNode> result = MYMINDMAP.getNodes();

        // then
        assertEquals(List.of(node1, node2), result);
    }

    @Test
    void addNodeTest() throws NoSuchFieldException, IllegalAccessException {
        // given MYMINDMAP
        final MindMap MYMINDMAP = new MindMap();
        // when
        MYMINDMAP.addNode(node1);

        // then
        final Field field = MYMINDMAP.getClass().getDeclaredField("nodes");
        field.setAccessible(true);
        assertEquals(List.of(node1), field.get(MYMINDMAP));
    }

    @Test
    void getEdgesTest() throws IllegalAccessException, NoSuchFieldException {
        // given
        final MindMap MYMINDMAP = new MindMap();
        final Field field = MYMINDMAP.getClass().getDeclaredField("edges");
        field.setAccessible(true);
        field.set(MYMINDMAP, List.of(edge1));

        // when
        final List<MindMapEdge> result = MYMINDMAP.getEdges();

        // then
        assertEquals(List.of(edge1), result);
    }

    @Test
    void addEdgeTest() throws NoSuchFieldException, IllegalAccessException {
        // given MYMINDMAP
        final MindMap MYMINDMAP = new MindMap();
        // when
        MYMINDMAP.addEdge(edge1);

        // then
        final Field field = MYMINDMAP.getClass().getDeclaredField("edges");
        field.setAccessible(true);
        assertEquals(List.of(edge1), field.get(MYMINDMAP));
    }

    @Test
    void removeEdgeTest() throws NoSuchFieldException, IllegalAccessException {
        // given MYMINDMAP
        final MindMap MYMINDMAP = new MindMap();
        final Field field = MYMINDMAP.getClass().getDeclaredField("edges");
        field.setAccessible(true);
        List<MindMapEdge> newlist = new ArrayList<>();
        newlist.add(edge1);

        field.set(MYMINDMAP, newlist);
        // when
        MYMINDMAP.removeEdge(edge1);

        // then
        assertEquals(List.of(), field.get(MYMINDMAP));
    }

}
