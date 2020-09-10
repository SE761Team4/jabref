package org.jabref.rest.resources;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.jabref.logic.jabmap.MindMapManager;
import org.jabref.model.entry.BibEntry;
import org.jabref.model.entry.BibEntrySerializer;
import org.jabref.model.entry.field.Field;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/root")
public class RootResource {

    @GET
    @Path("entries")
    @Produces(MediaType.APPLICATION_JSON)
    public String getEntries() {
        List<BibEntry> entries = MindMapManager.instance().getBibEntries();
        Gson gson = new GsonBuilder().registerTypeAdapter(BibEntry.class, new BibEntrySerializer()).create();
        return gson.toJson(entries.get(0));
    }
}

