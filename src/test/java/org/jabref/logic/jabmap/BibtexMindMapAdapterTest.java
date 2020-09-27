//package org.jabref.logic.jabmap;
//
//import java.util.List;
//
//import org.jabref.model.entry.BibEntry;
//import org.jabref.model.jabmap.EdgeDirection;
//import org.jabref.model.jabmap.MindMap;
//import org.jabref.model.jabmap.MindMapEdge;
//import org.jabref.model.jabmap.MindMapNode;
//
//import org.junit.jupiter.api.Test;
//
//class BibtexMindMapAdapterTest {
//
//    @Test
//    void mindMap2Bibtex() {
//        MindMap testMap = new MindMap();
//        MindMapNode node1 = new MindMapNode(1L, "node1", "citation_key", 0, 0);
//        MindMapNode node2 = new MindMapNode(2L, "node2", "citation_key", 0, 10);
//        MindMapEdge edge1 = new MindMapEdge(1L, 2L, "label", EdgeDirection.DEFAULT);
//        testMap.addNode(node1);
//        testMap.addNode(node2);
//        testMap.addEdge(edge1);
//
//        BibtexMindMapAdapter adapter = new BibtexMindMapAdapter();
//        List<BibEntry> entries = adapter.mindMap2Bibtex(testMap);
//
//        // BibEntry node1Entry = new BibEntry(StandardEntryType.MindMapNode).withField(new UnknownField(MAP_NODE_ID), "1");
//        // BibEntry node2Entry = new BibEntry(StandardEntryType.MindMapNode).withField(new UnknownField(MAP_NODE_ID), "2");
//        // BibEntry edgeEntry = new BibEntry(StandardEntryType.MindMapEdge).withField(new UnknownField(MAP_EDGE_NODE1_ID), "1");
//        // assertEquals(List.of(node1Entry, node2Entry, edgeEntry), entries);
//    }
//
//    @Test
//    void mindMap2BibtexEdge() {
//        MindMap testMap = new MindMap();
//        MindMapNode node1 = new MindMapNode(1L, "node1", "citation_key", 0, 0);
//        MindMapNode node2 = new MindMapNode(2L, "node2", "citation_key", 0, 10);
//        MindMapEdge edge1 = new MindMapEdge(1L, 2L, "label", EdgeDirection.DEFAULT);
//        testMap.addNode(node1);
//        testMap.addNode(node2);
//        testMap.addEdge(edge1);
//
//        BibtexMindMapAdapter adapter = new BibtexMindMapAdapter();
//        List<BibEntry> entries = adapter.mindMap2Bibtex(testMap);
//
//        // BibEntry node1Entry = new BibEntry(StandardEntryType.MindMapNode).withField(new UnknownField(MAP_NODE_ID), "1");
//        // BibEntry node2Entry = new BibEntry(StandardEntryType.MindMapNode).withField(new UnknownField(MAP_NODE_ID), "2");
//        // BibEntry edgeEntry = new BibEntry(StandardEntryType.MindMapEdge).withField(new UnknownField(MAP_EDGE_NODE1_ID), "1");
//        // assertEquals(List.of(node1Entry, node2Entry, edgeEntry), entries);
//    }
//}
