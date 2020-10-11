package org.jabref.rest.jabmap.utils;

import java.util.List;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;

import javafx.application.Platform;

import org.jabref.gui.Globals;
import org.jabref.gui.StateManager;
import org.jabref.model.database.BibDatabase;
import org.jabref.model.entry.BibEntry;

public class DatabaseAccess {
    public BibDatabase getActiveDatabase() {
        StateManager stateManager = Globals.stateManager;
        if (stateManager.getActiveDatabase().isPresent()) {
            return stateManager.getActiveDatabase().get().getDatabase();
        } else {
            throw new WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR);
        }
    }

    public void replaceEntries(List<BibEntry> newEntries, List<BibEntry> oldMapEntries, BibDatabase bibDatabase) {
        Platform.runLater(() -> {
                    // Need to run this on the JavaFX thread
                    // We opted to remove the old entries and insert the updated entries returned by JabMap rather than updating them as the code
                    // to do so is complicated
                    bibDatabase.removeEntries(oldMapEntries);
                    bibDatabase.insertEntries(newEntries);
                }
        );
    }
}
