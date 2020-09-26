package org.jabref.logic.jabmap;

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
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

class BibtexMindMapAdapterTest {

    @Test
    void mindMap2BibtexTest() {
        MindMap testMap = new MindMap();
        MindMapNode node1 = new MindMapNodeBuilder()
                .withCitationKey("cite1")
                .withId(1L)
                .withLabel("node1")
                .withXPos(50)
                .withYPos(50)
                .build();

        MindMapNode node2 = new MindMapNodeBuilder()
                .withCitationKey("cite2")
                .withId(2L)
                .withLabel("node2")
                .withXPos(70)
                .withYPos(70)
                .build();

        MindMapEdge edge1 = new MindMapEdgeBuilder()
                .withDirection(EdgeDirection.DEFAULT)
                .withLabel("edge1")
                .withNode1Id(1L)
                .withNode2Id(2L)
                .build();

        testMap.addNode(node1);
        testMap.addNode(node2);
        testMap.addEdge(edge1);

        BibtexMindMapAdapter adapter = new BibtexMindMapAdapter();
        List<BibEntry> entries = adapter.doBackward(testMap);

        BibEntry node1Entry = new BibEntry(MindMapEntryType.Node)
                .withField(MindMapField.NODE_LABEL,"node1")
                .withField(InternalField.KEY_FIELD,MindMapNode.getCitationKeyFromId(1l))
                .withField(MindMapField.NODE_CITATION_KEY,"cite1")
                .withField(MindMapField.NODE_XPOS,String.valueOf(50))
                .withField(MindMapField.NODE_YPOS,String.valueOf(50));

        BibEntry node2Entry = new BibEntry(MindMapEntryType.Node)
                .withField(MindMapField.NODE_LABEL,"node2")
                .withField(InternalField.KEY_FIELD,MindMapNode.getCitationKeyFromId(2l))
                .withField(MindMapField.NODE_CITATION_KEY,"cite2")
                .withField(MindMapField.NODE_XPOS,String.valueOf(70))
                .withField(MindMapField.NODE_YPOS,String.valueOf(70));


        BibEntry edgeEntry = new BibEntry(MindMapEntryType.Edge)
                .withField(InternalField.KEY_FIELD, "mindmapedge_from_1_to_2")
                .withField(MindMapField.EDGE_LABEL, "edge1")
                .withField(MindMapField.EDGE_DIRECTION, EdgeDirection.DEFAULT.toString());
        assertEquals(List.of(node1Entry, node2Entry, edgeEntry), entries);
    }

    //@Test
    //void mindMap2BibtexEdgeTest() {
    //    MindMap testMap = new MindMap();
    //    MindMapNode node1 = new MindMapNode(1L, "node1", "citation_key", null, 0,10);
    //    MindMapNode node2 = new MindMapNode(2L, "node2", "citation_key", null, 10,20);
    //    MindMapEdge edge1 = new MindMapEdge(1L, 2L, "label", EdgeDirection.DEFAULT);
    //    testMap.addNode(node1);
    //    testMap.addNode(node2);
    //    testMap.addEdge(edge1);
//
    //    BibtexMindMapAdapter adapter = new BibtexMindMapAdapter();
    //    List<BibEntry> entries = adapter.doBackward(testMap);
//
    //    BibEntry node1Entry = new BibEntry(MindMapEntryType.Node).withField(new UnknownField(MAP_NODE_ID), "1");
    //    BibEntry node2Entry = new BibEntry(MindMapEntryType.Node).withField(new UnknownField(MAP_NODE_ID), "2");
    //    BibEntry edgeEntry = new BibEntry(MindMapEntryType.Edge).withField(new UnknownField(MAP_EDGE_NODE1_ID), "1");
    //    assertEquals(List.of(node1Entry, node2Entry, edgeEntry), entries);
    //}
}
