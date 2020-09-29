package org.jabref.rest.resources;

import java.util.List;
import java.util.stream.Collectors;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import javafx.application.Platform;

import org.jabref.gui.Globals;
import org.jabref.gui.StateManager;
import org.jabref.logic.jabmap.BibtexMindMapAdapter;
import org.jabref.model.database.BibDatabase;
import org.jabref.model.entry.BibEntry;
import org.jabref.model.entry.BibEntryAdapter;
import org.jabref.model.entry.types.MindMapEntryType;
import org.jabref.model.jabmap.MindMap;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

@Path("/")
public class RootResource {
    public static DatabaseAccess databaseAccess = new DatabaseAccess();

    @GET
    @Path("libraries/current/entries")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getEntries() {
        // Filter out map and edge entries from list
        List<BibEntry> entries = databaseAccess.getActiveDatabase()
                .getEntries().stream()
                .filter(b -> !(b.getType() == MindMapEntryType.Node) && !(b.getType() == MindMapEntryType.Edge))
                .collect(Collectors.toList());
        Gson gson = new GsonBuilder().registerTypeAdapter(BibEntry.class, new BibEntryAdapter()).create();
        return Response.status(Response.Status.OK).entity(gson.toJson(entries)).build();
    }

    @GET
    @Path("libraries/current/map")
    @Produces(MediaType.APPLICATION_JSON)
    public Response createBlankMap() {
        Gson gson = new GsonBuilder().create();
        // Retrieve mind map object from database
        BibtexMindMapAdapter adapter = new BibtexMindMapAdapter();
        // Attempt to get a map saved in the current database
        MindMap map = adapter.convert(databaseAccess.getActiveDatabase().getEntries());
        return Response.status(Response.Status.OK).entity(new Gson().toJson(map)).build();
    }

    @PUT
    @Path("libraries/current/map")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response saveMindMap(String jsonMindMap) {
        Gson gBuilder = new GsonBuilder().create();
        MindMap map = gBuilder.fromJson(jsonMindMap, MindMap.class);

        // Get adapter to convert to bib entries
        BibtexMindMapAdapter adapter = new BibtexMindMapAdapter();
        addToDatabase(adapter.reverse().convert(map));

        Response.ResponseBuilder builder = Response.ok();
        return builder.build();
    }


    /**
     * Helper method to insert map related entries into database, and remove out of date ones
     */
    private void addToDatabase(List<BibEntry> newMapEntries) {
        BibDatabase bibDatabase = databaseAccess.getActiveDatabase();
        List<BibEntry> oldMapEntries = bibDatabase
                .getEntries().stream()
                .filter(b -> (b.getType() == MindMapEntryType.Node) || (b.getType() == MindMapEntryType.Edge))
                .collect(Collectors.toList());

        databaseAccess.replaceEntries(newMapEntries, oldMapEntries, bibDatabase);
    }
}

