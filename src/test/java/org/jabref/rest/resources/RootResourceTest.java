package org.jabref.rest.resources;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.microsoft.applicationinsights.core.dependencies.http.util.EntityUtils;
import javafx.application.Platform;
import javafx.collections.ObservableList;

import org.jabref.gui.Globals;
import org.jabref.gui.StateManager;
import org.jabref.logic.importer.fileformat.endnote.Database;
import org.jabref.model.database.BibDatabase;
import org.jabref.model.entry.BibEntry;
import org.jabref.model.entry.field.InternalField;
import org.jabref.model.entry.field.MindMapField;
import org.jabref.model.entry.types.MindMapEntryType;
import org.jabref.model.entry.types.StandardEntryType;
import org.jabref.model.jabmap.EdgeDirection;
import org.jabref.model.jabmap.MindMapEdge;
import org.jabref.model.jabmap.MindMapNode;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class RootResourceTest {

    private static String WEB_SERVICE_URI = "http://localhost:9898/";
    private static Client client;

    @BeforeAll
    static void setUp() {
        JabMapHTTPServer.startHttpEndPoint();
        client = ClientBuilder.newClient();
    }

    @AfterAll
    static void close() {
        client.close();
    }

    @BeforeEach
    void initMockDatabase() {
        RootResource.databaseAccess = new MockDatabaseAccess();
    }

    @Test
    void getReferenceEntries() {
        List<BibEntry> bibEntries = setUpEntriesForGetReferenceEntries();
        RootResource.databaseAccess.getActiveDatabase().insertEntries(bibEntries);

        Response response = null;
        try {
            response = client.target(WEB_SERVICE_URI).path("libraries/current/entries").request().accept(MediaType.APPLICATION_JSON).get();
            assertEquals(200, response.getStatus());
            String responseBody = response.readEntity(String.class);
            String expectedJson = "[{\"type\":{\"bibtex_metadata\":\"Article\",\"key\":\"article1\"}},{\"type\":{\"bibtex_metadata\":\"Book\",\"key\":\"book1\"}},{\"type\":{\"bibtex_metadata\":\"MastersThesis\",\"key\":\"MastersThesis1\"}}]";
            assertEquals(expectedJson, responseBody);
        } finally {
            response.close();
        }
    }

    @Test
    void getMindMapEntries() {
        List<BibEntry> bibEntries = setupExpectedForSaveCompleteMap();
        RootResource.databaseAccess.getActiveDatabase().insertEntries(bibEntries);

        Response response = null;
        try {
            response = client.target(WEB_SERVICE_URI).path("libraries/current/entries").request().accept(MediaType.APPLICATION_JSON).get();
            assertEquals(200, response.getStatus());
            String responseBody = response.readEntity(String.class);
            String expectedJson = "[]";
            assertEquals(expectedJson, responseBody);
        } finally {
            response.close();
        }
    }

    @Test
    void getMindMapAndReferenceEntries() {
        List<BibEntry> bibEntries = setUpGetMindMapAndReferenceEntries();
        RootResource.databaseAccess.getActiveDatabase().insertEntries(bibEntries);

        Response response = null;
        try {
            response = client.target(WEB_SERVICE_URI).path("libraries/current/entries").request().accept(MediaType.APPLICATION_JSON).get();
            assertEquals(200, response.getStatus());
            String responseBody = response.readEntity(String.class);
            String expectedJson = "[{\"type\":{\"bibtex_metadata\":\"Article\",\"key\":\"article1\"}},{\"type\":{\"bibtex_metadata\":\"Book\",\"key\":\"book1\"}},{\"type\":{\"bibtex_metadata\":\"MastersThesis\",\"key\":\"MastersThesis1\"}}]";
            assertEquals(expectedJson, responseBody);
        } finally {
            response.close();
        }
    }

    @Test
    void getEmptyEntries() {
        List<BibEntry> bibEntries = new ArrayList<>();
        RootResource.databaseAccess.getActiveDatabase().insertEntries(bibEntries);

        Response response = null;
        try {
            response = client.target(WEB_SERVICE_URI).path("libraries/current/entries").request().accept(MediaType.APPLICATION_JSON).get();
            assertEquals(200, response.getStatus());
            String responseBody = response.readEntity(String.class);
            String expectedJson = "[]";
            assertEquals(expectedJson, responseBody);
        } finally {
            response.close();
        }
    }

    @Test
    void getRequestSingleNodeMindMap() {
        RootResource.databaseAccess = new MockDatabaseAccess();

        Response response = null;
        try {
            // Add single node map to the db
            response = client.target(WEB_SERVICE_URI).path("libraries/current/map").request()
                    .put(Entity.json("{\"nodes\":[{\"id\":1,\"label\":\"New Map\",\"icons\":[],\"x_pos\":0,\"y_pos\":0}],\"edges\":[]}"));

            // Make get request to retrieve map
            response = client.target(WEB_SERVICE_URI).path("libraries/current/map").request()
                    .get();

            assertEquals(200, response.getStatus());

            assertEquals("{\"nodes\":[{\"id\":1,\"label\":\"New Map\",\"icons\":[],\"x_pos\":0,\"y_pos\":0}],\"edges\":[]}",
                    response.readEntity(String.class));

        } finally {
            // Close the Response object.
            response.close();
        }
    }

    @Test
    void getRequestCompleteMindMap() {
        RootResource.databaseAccess = new MockDatabaseAccess();

        Response response = null;
        try {
            // Add complete mindmap to the db
            response = client.target(WEB_SERVICE_URI).path("libraries/current/map").request()
                    .put(Entity.json("{\"nodes\":[{\"id\":1,\"label\":\"node 1\",\"icons\":[],\"x_pos\":0,\"y_pos\":0}," +
                            "{\"id\":2,\"label\":\"node 2\",\"icons\":[],\"x_pos\":10,\"y_pos\":0}]," +
                            "\"edges\":[{\"node1_Id\":1,\"node2_Id\":2,\"label\":\"test edge\",\"direction\":\"DEFAULT\"}]}"));

            // Make get request to retrieve map
            response = client.target(WEB_SERVICE_URI).path("libraries/current/map").request()
                    .get();

            assertEquals(200, response.getStatus());

            assertEquals("{\"nodes\":[{\"id\":1,\"label\":\"node 1\",\"icons\":[],\"x_pos\":0,\"y_pos\":0}," +
                            "{\"id\":2,\"label\":\"node 2\",\"icons\":[],\"x_pos\":10,\"y_pos\":0}]," +
                            "\"edges\":[{\"node1_Id\":1,\"node2_Id\":2,\"label\":\"test edge\",\"direction\":\"DEFAULT\"}]}",
                    response.readEntity(String.class));

        } finally {
            // Close the Response object.
            response.close();
        }
    }

    @Test
    void getRequestBibAndMapEntries() {
        RootResource.databaseAccess = new MockDatabaseAccess();

        Response response = null;
        try {
            // Add a reference Bib entry to the db
            response = client.target(WEB_SERVICE_URI).path("libraries/current/map").request()
                    .put(Entity.json("[{\"type\":{\"bibtex_metadata\":\"Article\",\"key\":\"article1\"}}," +
                            "{\"type\":{\"bibtex_metadata\":\"Book\",\"key\":\"book1\"}}," +
                            "{\"type\":{\"bibtex_metadata\":\"MastersThesis\",\"key\":\"MastersThesis1\"}}]"
                    ));
            // Add complete mindmap to the db
            response = client.target(WEB_SERVICE_URI).path("libraries/current/map").request()
                    .put(Entity.json("{\"nodes\":[{\"id\":1,\"label\":\"node 1\",\"icons\":[],\"x_pos\":0,\"y_pos\":0}," +
                            "{\"id\":2,\"label\":\"node 2\",\"icons\":[],\"x_pos\":10,\"y_pos\":0}]," +
                            "\"edges\":[{\"node1_Id\":1,\"node2_Id\":2,\"label\":\"test edge\",\"direction\":\"DEFAULT\"}]}"));

            // Make get request to retrieve map
            response = client.target(WEB_SERVICE_URI).path("libraries/current/map").request()
                    .get();

            assertEquals(200, response.getStatus());

            assertEquals("{\"nodes\":[{\"id\":1,\"label\":\"node 1\",\"icons\":[],\"x_pos\":0,\"y_pos\":0}," +
                            "{\"id\":2,\"label\":\"node 2\",\"icons\":[],\"x_pos\":10,\"y_pos\":0}]," +
                            "\"edges\":[{\"node1_Id\":1,\"node2_Id\":2,\"label\":\"test edge\",\"direction\":\"DEFAULT\"}]}",
                    response.readEntity(String.class));

        } finally {
            // Close the Response object.
            response.close();
        }
    }

    @Test
    void getRequestNoMindMaps() {
        RootResource.databaseAccess = new MockDatabaseAccess();

        Response response = null;
        try {
            // Make get request to retrieve map
            response = client.target(WEB_SERVICE_URI).path("libraries/current/map").request()
                    .get();

            assertEquals(200, response.getStatus());

            assertEquals("{\"nodes\":[{\"label\":\"New Map\",\"icons\":[],\"x_pos\":0,\"y_pos\":0}],\"edges\":[]}",
                    response.readEntity(String.class));

        } finally {
            // Close the Response object.
            response.close();
        }
    }

    @Test
    void getRequestOnlyBibEntries() {
        RootResource.databaseAccess = new MockDatabaseAccess();

        Response response = null;
        try {
            // Add a reference Bib entry to the db
            response = client.target(WEB_SERVICE_URI).path("libraries/current/map").request()
                    .put(Entity.json("[{\"type\":{\"bibtex_metadata\":\"Article\",\"key\":\"article1\"}}," +
                            "{\"type\":{\"bibtex_metadata\":\"Book\",\"key\":\"book1\"}}," +
                            "{\"type\":{\"bibtex_metadata\":\"MastersThesis\",\"key\":\"MastersThesis1\"}}]"
                    ));

            // Make get request to retrieve map
            response = client.target(WEB_SERVICE_URI).path("libraries/current/map").request()
                    .get();

            assertEquals(200, response.getStatus());

            assertEquals("{\"nodes\":[{\"label\":\"New Map\",\"icons\":[],\"x_pos\":0,\"y_pos\":0}],\"edges\":[]}",
                    response.readEntity(String.class));

        } finally {
            // Close the Response object.
            response.close();
        }
    }

    @Test
    void saveCompleteMindMap() {
        List<BibEntry> expectedBibEntries = setupExpectedForSaveCompleteMap();

        Response response = null;
        try {
            // Make an invocation on a Concert URI and specify Java-
            // serialization as the required data format.
            response = client.target(WEB_SERVICE_URI).path("libraries/current/map").request()
                             .put(Entity.json("{\n" +
                                     "  \"nodes\": [\n" +
                                     "    {\n" +
                                     "      \"id\": 1,\n" +
                                     "      \"label\": \"node 1\",\n" +
                                     "      \"x_pos\": 0,\n" +
                                     "      \"y_pos\": 0\n" +
                                     "    },\n" +
                                     "    {\n" +
                                     "      \"id\": 2,\n" +
                                     "      \"label\": \"node 2\",\n" +
                                     "      \"x_pos\": 10,\n" +
                                     "      \"y_pos\": 0\n" +
                                     "    }\n" +
                                     "  ],\n" +
                                     "  \"edges\": [\n" +
                                     "    {\n" +
                                     "      \"node1_Id\": 1,\n" +
                                     "      \"node2_Id\": 2,\n" +
                                     "      \"label\": \"test edge\",\n" +
                                     "      \"direction\": \"DEFAULT\"\n" +
                                     "    }\n" +
                                     "  ]\n" +
                                     "}\n"));

            assertEquals(200, response.getStatus());

            ArrayList<BibEntry> actualBibEntries = new ArrayList<>(RootResource.databaseAccess.getActiveDatabase().getEntries());

            assertEquals(expectedBibEntries.size(), actualBibEntries.size());
            for (BibEntry bibEntry : expectedBibEntries) {
                assertTrue(actualBibEntries.contains(bibEntry));
                actualBibEntries.remove(bibEntry);
            }
        } finally {
            // Close the Response object.
            response.close();
        }
    }

    @Test
    void saveEmptyMap() {
        BibEntry expectedBibEntry = setupExpectedForSaveEmptyMap();

        Response response = null;
        try {
            // Make an invocation on a Concert URI and specify Java-
            // serialization as the required data format.
            response = client.target(WEB_SERVICE_URI).path("libraries/current/map").request()
                             .put(Entity.json("{\n" +
                                     "  \"nodes\": [\n" +
                                     "    {\n" +
                                     "      \"id\": 1,\n" +
                                     "      \"label\": \"New Map\",\n" +
                                     "      \"x_pos\": 0,\n" +
                                     "      \"y_pos\": 0\n" +
                                     "    }\n" +
                                     "  ],\n" +
                                     "  \"edges\": []\n" +
                                     "}\n"));

            assertEquals(200, response.getStatus());

            List<BibEntry> actualBibEntries = RootResource.databaseAccess.getActiveDatabase().getEntries();

            assertEquals(1, actualBibEntries.size());
            assertEquals(expectedBibEntry, actualBibEntries.get(0));
        } finally {
            // Close the Response object.
            response.close();
        }
    }

    @Test
    void saveOverrideMap() {
        List<BibEntry> expectedBibEntries = setupExpectedForSaveOverrideMap();

        Response response = null;
        try {
            // Make an invocation on a Concert URI and specify Java-
            // serialization as the required data format.
            response = client.target(WEB_SERVICE_URI).path("libraries/current/map").request()
                             .put(Entity.json("{\n" +
                                     "  \"nodes\": [\n" +
                                     "    {\n" +
                                     "      \"id\": 1,\n" +
                                     "      \"label\": \"node 1\",\n" +
                                     "      \"x_pos\": 0,\n" +
                                     "      \"y_pos\": 0\n" +
                                     "    },\n" +
                                     "    {\n" +
                                     "      \"id\": 2,\n" +
                                     "      \"label\": \"node 2\",\n" +
                                     "      \"x_pos\": 10,\n" +
                                     "      \"y_pos\": 0\n" +
                                     "    }\n" +
                                     "  ],\n" +
                                     "  \"edges\": [\n" +
                                     "    {\n" +
                                     "      \"node1_Id\": 1,\n" +
                                     "      \"node2_Id\": 2,\n" +
                                     "      \"label\": \"test edge\",\n" +
                                     "      \"direction\": \"DEFAULT\"\n" +
                                     "    }\n" +
                                     "  ]\n" +
                                     "}\n"));

            response = client.target(WEB_SERVICE_URI).path("libraries/current/map").request()
                             .put(Entity.json("{\n" +
                                     "  \"nodes\": [\n" +
                                     "    {\n" +
                                     "      \"id\": 1,\n" +
                                     "      \"label\": \"my updated node\",\n" +
                                     "      \"x_pos\": 40,\n" +
                                     "      \"y_pos\": 20\n" +
                                     "    },\n" +
                                     "    {\n" +
                                     "      \"id\": 2,\n" +
                                     "      \"label\": \"node 2\",\n" +
                                     "      \"x_pos\": 10,\n" +
                                     "      \"y_pos\": 0\n" +
                                     "    },\n" +
                                     "    {\n" +
                                     "      \"id\": 3,\n" +
                                     "      \"label\": \"node 3\",\n" +
                                     "      \"x_pos\": 10,\n" +
                                     "      \"y_pos\": 10\n" +
                                     "    }\n" +
                                     "  ],\n" +
                                     "  \"edges\": [\n" +
                                     "    {\n" +
                                     "      \"node1_Id\": 1,\n" +
                                     "      \"node2_Id\": 3,\n" +
                                     "      \"label\": \"test update edge\",\n" +
                                     "      \"direction\": \"LEFT\"\n" +
                                     "    },\n" +
                                     "    {\n" +
                                     "      \"node1_Id\": 2,\n" +
                                     "      \"node2_Id\": 3,\n" +
                                     "      \"label\": \"added edge\",\n" +
                                     "      \"direction\": \"DEFAULT\"\n" +
                                     "    }\n" +
                                     "  ]\n" +
                                     "}\n"));

            assertEquals(200, response.getStatus());

            ArrayList<BibEntry> actualBibEntries = new ArrayList<>(RootResource.databaseAccess.getActiveDatabase().getEntries());

            assertEquals(expectedBibEntries.size(), actualBibEntries.size());

            for (BibEntry bibEntry : expectedBibEntries) {
                assertTrue(actualBibEntries.contains(bibEntry));
                actualBibEntries.remove(bibEntry);
            }
        } finally {
            // Close the Response object.
            response.close();
        }
    }

    private List<BibEntry> setupExpectedForSaveOverrideMap() {
        BibEntry node1 = new BibEntry(MindMapEntryType.Node)
                .withField(MindMapField.NODE_LABEL, "my updated node")
                // .withField(MindMapField.NODE_ICONS,iconstr)
                .withField(InternalField.KEY_FIELD, MindMapNode.getCitationKeyFromId(1L))
                .withField(MindMapField.NODE_XPOS, String.valueOf(40))
                .withField(MindMapField.NODE_YPOS, String.valueOf(20));

        BibEntry node2 = new BibEntry(MindMapEntryType.Node)
                .withField(MindMapField.NODE_LABEL, "node 2")
                // .withField(MindMapField.NODE_ICONS,iconstr)
                .withField(InternalField.KEY_FIELD, MindMapNode.getCitationKeyFromId(2L))
                .withField(MindMapField.NODE_XPOS, String.valueOf(10))
                .withField(MindMapField.NODE_YPOS, String.valueOf(0));

        BibEntry node3 = new BibEntry(MindMapEntryType.Node)
                .withField(MindMapField.NODE_LABEL, "node 3")
                // .withField(MindMapField.NODE_ICONS,iconstr)
                .withField(InternalField.KEY_FIELD, MindMapNode.getCitationKeyFromId(3L))
                .withField(MindMapField.NODE_XPOS, String.valueOf(10))
                .withField(MindMapField.NODE_YPOS, String.valueOf(10));

        BibEntry edge1 = new BibEntry(MindMapEntryType.Edge)
                .withField(InternalField.KEY_FIELD, MindMapEdge.getCitationKeyFromIds(1L, 3L))
                .withField(MindMapField.EDGE_LABEL, "test update edge")
                .withField(MindMapField.EDGE_DIRECTION, String.valueOf(EdgeDirection.LEFT));

        BibEntry edge2 = new BibEntry(MindMapEntryType.Edge)
                .withField(InternalField.KEY_FIELD, MindMapEdge.getCitationKeyFromIds(2L, 3L))
                .withField(MindMapField.EDGE_LABEL, "added edge")
                .withField(MindMapField.EDGE_DIRECTION, String.valueOf(EdgeDirection.DEFAULT));

        return Arrays.asList(node1, node2, node3, edge1, edge2);
    }

    private BibEntry setupExpectedForSaveEmptyMap() {
        BibEntry node1 = new BibEntry(MindMapEntryType.Node)
                .withField(MindMapField.NODE_LABEL, "New Map")
                // .withField(MindMapField.NODE_ICONS,iconstr)
                .withField(InternalField.KEY_FIELD, MindMapNode.getCitationKeyFromId(1L))
                .withField(MindMapField.NODE_XPOS, String.valueOf(0))
                .withField(MindMapField.NODE_YPOS, String.valueOf(0));
        return node1;
    }

    private List<BibEntry> setupExpectedForSaveCompleteMap() {
        BibEntry node1 = new BibEntry(MindMapEntryType.Node)
                .withField(MindMapField.NODE_LABEL, "node 1")
                // .withField(MindMapField.NODE_ICONS,iconstr)
                .withField(InternalField.KEY_FIELD, MindMapNode.getCitationKeyFromId(1L))
                .withField(MindMapField.NODE_XPOS, String.valueOf(0))
                .withField(MindMapField.NODE_YPOS, String.valueOf(0));

        BibEntry node2 = new BibEntry(MindMapEntryType.Node)
                .withField(MindMapField.NODE_LABEL, "node 2")
                // .withField(MindMapField.NODE_ICONS,iconstr)
                .withField(InternalField.KEY_FIELD, MindMapNode.getCitationKeyFromId(2L))
                .withField(MindMapField.NODE_XPOS, String.valueOf(10))
                .withField(MindMapField.NODE_YPOS, String.valueOf(0));

        BibEntry edge1 = new BibEntry(MindMapEntryType.Edge)
                .withField(InternalField.KEY_FIELD, MindMapEdge.getCitationKeyFromIds(1L, 2L))
                .withField(MindMapField.EDGE_LABEL, "test edge")
                .withField(MindMapField.EDGE_DIRECTION, String.valueOf(EdgeDirection.DEFAULT));

        return Arrays.asList(node1, node2, edge1);
    }

    private List<BibEntry> setUpEntriesForGetReferenceEntries() {
        BibEntry entry1 = new BibEntry(StandardEntryType.Article)
                .withField(InternalField.KEY_FIELD, "article1");

        BibEntry entry2 = new BibEntry(StandardEntryType.Book)
                .withField(InternalField.KEY_FIELD, "book1");

        BibEntry entry3 = new BibEntry(StandardEntryType.MastersThesis)
                .withField(InternalField.KEY_FIELD, "MastersThesis1");

        return Arrays.asList(entry1, entry2, entry3);
    }

    private List<BibEntry> setUpGetMindMapAndReferenceEntries() {
        BibEntry entry1 = new BibEntry(StandardEntryType.Article)
                .withField(InternalField.KEY_FIELD, "article1");

        BibEntry entry2 = new BibEntry(StandardEntryType.Book)
                .withField(InternalField.KEY_FIELD, "book1");

        BibEntry entry3 = new BibEntry(StandardEntryType.MastersThesis)
                .withField(InternalField.KEY_FIELD, "MastersThesis1");

        BibEntry node3 = new BibEntry(MindMapEntryType.Node)
                .withField(MindMapField.NODE_LABEL, "node 3")
                // .withField(MindMapField.NODE_ICONS,iconstr)
                .withField(InternalField.KEY_FIELD, MindMapNode.getCitationKeyFromId(3L))
                .withField(MindMapField.NODE_XPOS, String.valueOf(10))
                .withField(MindMapField.NODE_YPOS, String.valueOf(10));

        BibEntry edge1 = new BibEntry(MindMapEntryType.Edge)
                .withField(InternalField.KEY_FIELD, MindMapEdge.getCitationKeyFromIds(1L, 3L))
                .withField(MindMapField.EDGE_LABEL, "test update edge")
                .withField(MindMapField.EDGE_DIRECTION, String.valueOf(EdgeDirection.LEFT));

        return Arrays.asList(entry1, entry2, entry3, node3, edge1);
    }
}
