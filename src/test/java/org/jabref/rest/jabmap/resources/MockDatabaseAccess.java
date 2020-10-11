package org.jabref.rest.jabmap.resources;

import java.util.List;

import org.jabref.model.database.BibDatabase;
import org.jabref.model.entry.BibEntry;
import org.jabref.rest.jabmap.utils.DatabaseAccess;

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
