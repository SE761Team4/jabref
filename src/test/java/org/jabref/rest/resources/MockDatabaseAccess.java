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
    public void addToDatabase(List<BibEntry> newEntries) {
        // Get old map entries to remove from database
        List<BibEntry> oldMapEntries = bibDatabase
                .getEntries().stream()
                .filter(b -> (b.getType() == MindMapEntryType.Node) || (b.getType() == MindMapEntryType.Edge))
                .collect(Collectors.toList());

        // Need to run this on the JavaFX thread
        // We opted to remove the old entries and insert the updated entries returned by JabMap rather than updating them as the code
        // to do so is complicated
        bibDatabase.removeEntries(oldMapEntries);
        bibDatabase.insertEntries(newEntries);
    }
}
