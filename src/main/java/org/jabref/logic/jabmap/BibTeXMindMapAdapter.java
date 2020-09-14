package org.jabref.logic.jabmap;

import java.util.Arrays;
import java.util.List;

import org.jabref.model.entry.BibEntry;
import org.jabref.model.entry.field.Field;
import org.jabref.model.entry.field.InternalField;
import org.jabref.model.jabmap.MindMap;
import org.jabref.model.jabmap.MindMapNode;

/**
 * This class handles converting data from BibTeX format, which is stored in the database, to JSON to be sent to JapMap
 * It also does the reverse, converting JSON to BibTeX to be stored.
 */
public class BibTeXMindMapAdapter {

    private static BibTeXMindMapAdapter _instance = null;

    public static BibTeXMindMapAdapter instance() {
        if (_instance == null) {
            _instance = new BibTeXMindMapAdapter();
        }
        return _instance;
    }

    // TODO: Method for converting bibtex to mindmap object
    public MindMap bibTeX2MindMap(List<BibEntry> bibtex) {
        MindMap mindMap = new MindMap();

        for (BibEntry bibNode : bibtex) {
            String name = bibNode.getField(InternalField.KEY_FIELD).get();
            String text = "";
            String[] icons = new String[0];
            String bibEntry = "";
            String[] children = new String[0];

            for (Field field : bibNode.getFields()) {
                if (field.getName().equals("text")) {
                    text = bibNode.getField(field).get();
                } else if (field.getName().equals("icons")) {
                    icons = bibNode.getField(field).get().split(",");
                } else if (field.getName().equals("bibentry")) {
                    bibEntry = bibNode.getField(field).get();
                } else if (field.getName().equals("children")) {
                    children = bibNode.getField(field).get().split(",");
                }
            }

            mindMap.addNode(new MindMapNode(name, Arrays.asList(children), text, bibEntry, Arrays.asList(icons)));
        }

        return mindMap;
    }

    // TODO: Method for converting mm object to bibtex
    public void mindMap2BibTeX() {
    }

}
