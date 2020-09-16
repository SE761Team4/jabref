package org.jabref.logic.jabmap;

import org.jabref.gui.JabRefFrame;
import org.jabref.model.entry.BibEntry;

import java.util.List;

public class MindMapWriter {
    private static MindMapWriter _instance = null;

    private JabRefFrame jabRefFrame;

    private MindMapWriter() {
    }

    public MindMapWriter(JabRefFrame jabRefFrame) {
        this.jabRefFrame = jabRefFrame;
    }

    public static MindMapWriter instance() {
        if (_instance == null) {
            _instance = new MindMapWriter();
        }
        return _instance;
    }

    public void writeMindMap(List<BibEntry> bibEntries) {
        for (BibEntry b : bibEntries) {
            jabRefFrame.getCurrentBasePanel().insertEntry(b);
        }
    }
}
