package org.jabref.rest.resources;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import javafx.collections.ObservableList;
import org.jabref.gui.Globals;
import org.jabref.gui.StateManager;
import org.jabref.model.database.BibDatabase;
import org.jabref.model.database.BibDatabaseContext;
import org.jabref.model.entry.BibEntry;
import org.jabref.model.entry.BibEntryAdapter;
import org.jabref.model.entry.types.MapEntryType;
import org.jabref.model.jabmap.MindMap;
import org.jabref.model.jabmap.MindMapNode;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Path("/")
public class RootResource {

    @GET
    @Path("libraries/current/entries")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getEntries() {
        List<BibEntry> bibEntries = new ArrayList<>();
        ObservableList<BibEntry> observableList = getActiveDatabase().getEntries();
        for (BibEntry b : observableList) {
            if (!b.getType().getName().equals("Map")) {
                bibEntries.add(b);
            }
        }
        Gson gson = new GsonBuilder().registerTypeAdapter(BibEntry.class, new BibEntryAdapter()).create();
        Response.ResponseBuilder builder = Response.ok(gson.toJson(bibEntries));
        return builder.build();

    }

    @GET
    @Path("libraries/current/map")
    @Produces(MediaType.APPLICATION_JSON)
    public Response createBlankMap() {
        insertEntry();
        Gson gson = new GsonBuilder().create();
        Response.ResponseBuilder builder = Response.ok(gson.toJson(new MindMap(new MindMapNode((long) 1, getActiveDatabaseName()))));
        return builder.build();
    }

    private void insertEntry() {

    }

    /**
     * Helper method to get the active database and check it's present
     */
    private BibDatabase getActiveDatabase() {
        StateManager stateManager = Globals.stateManager;
        if (stateManager.getActiveDatabase().isPresent()) {
            return stateManager.getActiveDatabase().get().getDatabase();
        } else {
            throw new WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Helper method to get active database name as string or empty string otherwise
     */
    private String getActiveDatabaseName() {
        StateManager stateManager = Globals.stateManager;
        if (stateManager.getActiveDatabase().isPresent()) {
            Optional<java.nio.file.Path> temp = stateManager.getActiveDatabase().get().getDatabasePath();
            if (temp.isPresent()) {
                return temp.get().toAbsolutePath().toFile().getName().replaceFirst("[.][^.]+$", ""); //TODO regex won't work if filename has dots in it
            }
        }
        return "";
    }
}

