package org.jabref.logic.jabmap;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.jabref.model.entry.BibEntry;
import org.jabref.model.entry.field.InternalField;
import org.jabref.model.entry.field.MindMapField;
import org.jabref.model.entry.types.MindMapEntryType;
import org.jabref.model.jabmap.EdgeDirection;
import org.jabref.model.jabmap.MindMap;
import org.jabref.model.jabmap.MindMapEdge;
import org.jabref.model.jabmap.MindMapEdgeBuilder;
import org.jabref.model.jabmap.MindMapNode;
import org.jabref.model.jabmap.MindMapNodeBuilder;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class BibtexMindMapAdapterTest {

    private static List<String> icons;
    private static String iconstr;
    private static BibEntry node1Entry;
    private static BibEntry node2Entry;
    private static MindMapNode node1;
    private static MindMapNode node2;
    private static MindMap testMap;
    private static MindMapEdge edge1;
    private static BibEntry edgeEntry;

    BibtexMindMapAdapter adapter = new BibtexMindMapAdapter();

    @BeforeAll
    static void setup() {
        icons = new ArrayList<>();
        iconstr = "";
        iconstr = iconstr + "READ,HIGH_PRIORITY";
        icons.add("READ");
        icons.add("HIGH_PRIORITY");
        testMap = new MindMap();

        node1Entry = new BibEntry(MindMapEntryType.Node)
                .withField(MindMapField.NODE_LABEL, "node1")
                // .withField(MindMapField.NODE_ICONS,iconstr)
                .withField(InternalField.KEY_FIELD, MindMapNode.getCitationKeyFromId(1L))
                .withField(MindMapField.NODE_CITATION_KEY, "cite1")
                .withField(MindMapField.NODE_XPOS, String.valueOf(50))
                .withField(MindMapField.NODE_YPOS, String.valueOf(50));

        node2Entry = new BibEntry(MindMapEntryType.Node)
                .withField(MindMapField.NODE_LABEL, "node2")
                .withField(InternalField.KEY_FIELD, MindMapNode.getCitationKeyFromId(2L))
                .withField(MindMapField.NODE_CITATION_KEY, "cite2")
                .withField(MindMapField.NODE_XPOS, String.valueOf(70))
                .withField(MindMapField.NODE_YPOS, String.valueOf(70));

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

        edgeEntry = new BibEntry(MindMapEntryType.Edge)
                .withField(InternalField.KEY_FIELD, "mindmapedge_from_1_to_2")
                .withField(MindMapField.EDGE_LABEL, "edge1")
                .withField(MindMapField.EDGE_DIRECTION, EdgeDirection.DEFAULT.toString());

        testMap.addNode(node1);
        testMap.addNode(node2);
        testMap.addEdge(edge1);
    }

    @Test
    void getNodeIdsFromEdgeKeyTest() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        String key = "mindmapedge_from_1_to_2";

        String[] result = adapter.getNodeIdsFromEdgeKey(key);
        String[] expect = new String[] {"1", "2"};

        assertTrue(Arrays.equals(result, expect));
    }

    @Test
    void getNodeIdFromNodeKeyTest() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        String key = "mindmapnode_1";

        String result = adapter.getNodeIdFromNodeKey(key);
        String expect = "1";

        assertEquals(expect, result);
    }

    @Test
    void createNodeFromBibEntryTest() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        MindMapNode newnode = adapter.createNodeFromBibEntry(node1Entry);

        assertEquals(newnode, node1);
    }

    @Test
    void createEdgeFromBibEntryTest() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        MindMapEdge newedge = adapter.createEdgeFromBibEntry(edgeEntry);

        assertEquals(edge1, newedge);
    }

    @Test
    void mindMap2BibtexTest() {
        List<BibEntry> entries = adapter.doBackward(testMap);

        assertEquals(List.of(node1Entry, node2Entry, edgeEntry), entries);
    }

    @Test
    void mindMap2BibtexEdgeTest() {
        MindMap newmap = adapter.doForward(List.of(node1Entry, node2Entry, edgeEntry));

        assertEquals(newmap, testMap);
    }
}
