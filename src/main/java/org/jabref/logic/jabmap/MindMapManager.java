package org.jabref.logic.jabmap;

import javafx.collections.ObservableList;
import org.jabref.model.entry.BibEntry;

import java.util.ArrayList;
import java.util.List;

/**
Singleton class that manages the active mind maps and list of references associated with them
 **/
public class MindMapManager {
    private static MindMapManager _instance = null;
    private MindMap map;
    private List<BibEntry> bibEntries;

    public MindMapManager() {}

    public MindMap getMap() {
        return map;
    }

    public List<BibEntry> getBibEntries() {
        return bibEntries;
    }

    public void setEntries(ObservableList<BibEntry> bibEntries) {
        List<BibEntry> entries = new ArrayList<>();
        for(BibEntry b : bibEntries) {
            if(!b.getType().getName().equals("Map")) {
                entries.add(b);
            }
        }
        this.bibEntries = entries;
    }

    public static MindMapManager instance() {
        if (_instance == null) {
            _instance = new MindMapManager();
        }
        return _instance;
    }
}
