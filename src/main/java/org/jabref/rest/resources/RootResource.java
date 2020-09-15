package org.jabref.rest.resources;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonParseException;
import javafx.collections.ObservableList;
import org.jabref.gui.Globals;
import org.jabref.gui.StateManager;
import org.jabref.model.entry.BibEntry;
import org.jabref.model.entry.BibEntryAdapter;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.List;

@Path("/")
public class RootResource {

    @GET
    @Path("libraries/current/entries")
    @Produces(MediaType.APPLICATION_JSON)
    public String getEntries() {
        StateManager stateManager = Globals.stateManager;
        if (stateManager.getActiveDatabase().isPresent()) {
            List<BibEntry> bibEntries = new ArrayList<>();
            ObservableList<BibEntry> observableList = stateManager.getActiveDatabase().get().getDatabase().getEntries();
            for (BibEntry b : observableList) {
                if (!b.getType().getName().equals("Map")) {
                    bibEntries.add(b);
                }
            }
            Gson gson = new GsonBuilder().registerTypeAdapter(BibEntry.class, new BibEntryAdapter()).create();
            return gson.toJson(bibEntries);
        } else {
            throw new JsonParseException("Error parsing bib entries");
        }
    }
}

