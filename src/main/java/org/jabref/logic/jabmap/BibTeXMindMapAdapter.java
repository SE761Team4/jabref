package org.jabref.logic.jabmap;

import java.util.Arrays;
import java.util.List;

import org.jabref.model.entry.BibEntry;
import org.jabref.model.entry.field.Field;
import org.jabref.model.entry.field.InternalField;
import org.jabref.model.jabmap.EdgeDirection;
import org.jabref.model.jabmap.MindMap;
import org.jabref.model.jabmap.MindMapEdge;
import org.jabref.model.jabmap.MindMapNode;
import org.jabref.model.jabmap.NodeIcon;

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

    /**
     * Method for converting BibEntry to MindMap
     * @param bibtex
     * @return
     */
    public MindMap bibTeX2MindMap(List<BibEntry> bibtex) {

        MindMap mindMap = new MindMap();

        for (BibEntry bib : bibtex) {
            if (bib.getType().getName().equals("mapnode")) {
                mindMap.addNode(bibtex2Node(bib));
            } else if (bib.getType().getName().equals("mapedge")) {
                mindMap.addEdge(bibtex2Edge(bib));
            }
        }

        return mindMap;
    }

    /**
     * Method to convert mapnode BibEntry to MindMapNode
     */
    private MindMapNode bibtex2Node(BibEntry bibNode) {

        String id = bibNode.getField(InternalField.KEY_FIELD).get();
        String text = "";
        NodeIcon[] icons = new NodeIcon[0];
        String bibEntry = "";
        int x_pos = 0;
        int y_pos = 0;

        for (Field field : bibNode.getFields()) {
            if (field.getName().equals("text")) {
                text = bibNode.getField(field).get();
            } else if (field.getName().equals("icons")) {
                icons = makeIcons(bibNode.getField(field).get().split(","));
            } else if (field.getName().equals("bibentry")) {
                bibEntry = bibNode.getField(field).get();
            } else if (field.getName().equals("x_pos")) {
                x_pos = Integer.parseInt(bibNode.getField(field).get());
            } else if (field.getName().equals("y_pos")) {
                y_pos = Integer.parseInt(bibNode.getField(field).get());
            }
        }
        return new MindMapNode(id, text, bibEntry, Arrays.asList(icons), x_pos, y_pos);
    }

    /**
     * Method to convert mapedge BibEntry to MindMapEdge
     */
    private MindMapEdge bibtex2Edge(BibEntry bibEdge) {

        String parent = "";
        String child = "";
        String label = "";
        EdgeDirection direction = EdgeDirection.DEFAULT;

        for (Field field : bibEdge.getFields()) {
            if (field.getName().equals("parent")) {
                parent = bibEdge.getField(field).get();
            } else if (field.getName().equals("child")) {
                child = bibEdge.getField(field).get();
            } else if (field.getName().equals("label")) {
                label = bibEdge.getField(field).get();
            } else if (field.getName().equals("direction")) {
                direction = EdgeDirection.valueOf(bibEdge.getField(field).get());
            }
        }

        return new MindMapEdge(parent, child, label, direction);
    }


    /**
     * Method to convert string to NodeIcon
     */
    private NodeIcon[] makeIcons(String[] stringIcons) {
        NodeIcon[] icons = new NodeIcon[stringIcons.length];
        for (int i = 0; i < stringIcons.length; i++) {
            icons[i] = NodeIcon.valueOf(stringIcons[i]);
        }
        return icons;
    }

    // TODO: Method for converting mm object to bibtex
    public void mindMap2BibTeX() {
    }

}
