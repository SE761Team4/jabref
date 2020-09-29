package org.jabref.rest.resources;

import java.util.List;
import java.util.stream.Collectors;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;

import javafx.application.Platform;

import org.jabref.gui.Globals;
import org.jabref.gui.StateManager;
import org.jabref.model.database.BibDatabase;
import org.jabref.model.entry.BibEntry;
import org.jabref.model.entry.types.MindMapEntryType;

public class MockDatabaseAccess extends DatabaseAccess {
    private BibDatabase bibDatabase = new BibDatabase();

    @Override
    public BibDatabase getActiveDatabase() {
        return bibDatabase;
    }

    @Override
    public void replaceEntries(List<BibEntry> newEntries, List<BibEntry> oldMapEntries, BibDatabase bibDatabase) {
        bibDatabase.removeEntries(oldMapEntries);
        bibDatabase.insertEntries(newEntries);
    }
}
