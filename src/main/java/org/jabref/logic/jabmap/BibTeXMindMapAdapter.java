package org.jabref.logic.jabmap;

import org.jabref.model.jabmap.MindMap;
import org.jabref.model.jabmap.MindMapEdge;
import org.jabref.model.jabmap.MindMapNode;
import org.jabref.model.entry.BibtexString;

import java.util.ArrayList;
import java.util.Collections;

/**
 * This class handles converting data from BibTeX format, which is stored in the database, to JSON to be sent to JapMap
 * It also does the reverse, converting JSON to BibTeX to be stored.
 */
public class BibTeXMindMapAdapter {
    // TODO: Method for converting bibtex to mindmap object
    public MindMap bibTeX2MindMap(ArrayList<BibtexString> bibtex) {
        MindMap mindMap = new MindMap();

        // Add all nodes to mindmap
        for (BibtexString item : bibtex) {
            if (item.getName().equals("mindmapnode")) {
                MindMapNode node = bibTeX2Node(item);
                mindMap.addNode(node);
            }
        }

        for (MindMapNode node : mindMap.getNodes()) {
            for (String child : node.getChildren()) {
                MindMapEdge edge = new MindMapEdge(node, mindMap.getNode(child));
                mindMap.addEdge(edge);
            }
        }

        return mindMap;
    }

    /**
     * Method to create a MindMapNode object from a BibtexString object
     * @param bibtexString object containing bibtex data from the db
     * @return a MindMapNode object
     * @throws IllegalArgumentException thrown if bibtex object is not a mindmap node
     */
    private MindMapNode bibTeX2Node(BibtexString bibtexString) throws IllegalArgumentException {

        if (!bibtexString.getName().equals("mindmapnode")) {
            throw new IllegalArgumentException("BibTeX string is not mof type MindMapNode");
        }

        // Extract data from bibtex content
        ArrayList<String[]> entryData = contentParser(bibtexString.getContent());

        // Make arraylist of children
        ArrayList<String> children = new ArrayList<>();
        Collections.addAll(children, entryData.get(1));

        // Make arraylist of icons
        ArrayList<String> icons = new ArrayList<>();
        Collections.addAll(icons, entryData.get(4));

        MindMapNode node = new MindMapNode(entryData.get(0)[0], children, entryData.get(2)[0], entryData.get(3)[0], icons);

        return node;
    }

    /**
     * Method to extract node id, children, text, bibentry name and icons from bibtex data
     * @param content the main body of a bibtex entry
     * @return an arraylist with the extracted data
     */
    private ArrayList<String[]> contentParser(String content) {
        String[] id = new String[1];
        String[] children;
        String[] text = new String[1];
        String[] bibEntryName = new String[1];
        String[] icons;

        // node id
        id[0] = content.substring(0, content.indexOf(','));

        // Array of children
        children = content.substring(content.indexOf("children = {"), content.indexOf('}', content.indexOf("children = {"))).split(",");

        // Text of the node
        text[0] = content.substring(content.indexOf("text = {"), content.indexOf('}', content.indexOf("text = {")));

        // Name of bibEntry
        bibEntryName[0] = content.substring(content.indexOf("bibEntry = {"), content.indexOf('}', content.indexOf("bibEntry = {")));

        // Array of icons
        icons = content.substring(content.indexOf("icons = {"), content.indexOf('}', content.indexOf("icons = {"))).split(",");

        ArrayList<String[]> retValues = new ArrayList<>();
        retValues.add(id);
        retValues.add(children);
        retValues.add(text);
        retValues.add(bibEntryName);
        retValues.add(icons);

        return retValues;

    }

    // TODO: Method for converting mm object to bibtex
    public void mindMap2BibTeX() {
    }

}
