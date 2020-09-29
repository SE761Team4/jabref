package org.jabref.rest.resources;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

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
import org.jabref.model.jabmap.EdgeDirection;
import org.jabref.model.jabmap.MindMapEdge;
import org.jabref.model.jabmap.MindMapNode;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.testfx.framework.junit5.Start;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class RootResourceTest {

    private static String WEB_SERVICE_URI = "http://localhost:9898/";

    private static Client client;

    private static void startHttpEndPoint() {
        Server server = createHttpServer();

        try {
            // Starts server to http://localhost:9898/
            // The current implementation serves libraries/current/entries
            server.start();
        } catch (Exception e) {
//            LOGGER.error("Problem starting HTTP Server", e);
        }
    }

    private static Server createHttpServer() {
        ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
        context.setContextPath("/");

        Server server = new Server(9898);
        server.setHandler(context);
        addServlet(context);
        return server;
    }

    private static void addServlet(ServletContextHandler context) {
        // this mirrors a webapp/WEB-INF/web.xml
        ServletHolder jerseyServlet = context.addServlet(
                org.glassfish.jersey.servlet.ServletContainer.class, "/*");
        jerseyServlet.setInitOrder(0);

        // Tells the Jersey Servlet which REST service/class to load.
        jerseyServlet.setInitParameter(
                "jersey.config.server.provider.classnames",
                RootResource.class.getCanonicalName());
    }

    @BeforeAll
    static void setUp() {
        startHttpEndPoint();
        client = ClientBuilder.newClient();
    }

    @AfterAll
    static void close() {
        client.close();
    }

    @Test
    void getEntries() {
        //Create BibEntries and add to database using addToDataBase(List<BibEntry>) in RootResource.databaseAccess

//        List<BibEntry> expectedBibEntries = setupExpectedForSaveCompleteMap();
//        RootResource.databaseAccess = new MockDatabaseAccess();
//        RootResource.databaseAccess.addToDatabase(expectedBibEntries);
//
//        Response response = client.target(WEB_SERVICE_URI).path("libraries/current/map").request().get();
//        assertEquals(response.getBibEntries());


        // TEST CASES
        //1. Only BibEntries for references
        //2. Mix of Mindmap bibEntries and reference bibentries
        //3. Only mindmap bibentries
        //4. No bibentries
    }

    @Test
    void createBlankMap() {
        // TEST CASES
        //3. Mix of Mindmap bibEntries and reference bibentries
        //4. Only BibEntries for references
        //5. No bibentries
    }


    @Test
    void getMindMapSingleNode() {
        BibEntry expectedBibEntry = setupExpectedForSaveEmptyMap();

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
    void saveCompleteMindMap() {
        List<BibEntry> expectedBibEntries = setupExpectedForSaveCompleteMap();

        RootResource.databaseAccess = new MockDatabaseAccess();

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

            List<BibEntry> actualBibEntries = RootResource.databaseAccess.getActiveDatabase().getEntries();

            assertEquals(expectedBibEntries.size(), actualBibEntries.size());
            for (BibEntry bibEntry : expectedBibEntries) {
                assertTrue(actualBibEntries.contains(bibEntry));
            }
        } finally {
            // Close the Response object.
            response.close();
        }
    }

    @Test
    void saveEmptyMap() {
        BibEntry expectedBibEntry = setupExpectedForSaveEmptyMap();

        RootResource.databaseAccess = new MockDatabaseAccess();

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

        RootResource.databaseAccess = new MockDatabaseAccess();

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

            List<BibEntry> actualBibEntries = RootResource.databaseAccess.getActiveDatabase().getEntries();

            assertEquals(expectedBibEntries.size(), actualBibEntries.size());

            for (BibEntry bibEntry : expectedBibEntries) {
                assertTrue(actualBibEntries.contains(bibEntry));
                if (!actualBibEntries.contains(bibEntry)) {
                    System.out.println(bibEntry);
                }
            }
//            for (int i = 0; i < expectedBibEntries.size(); i++) {
//                assertEquals(actualBibEntries.get());
//            }
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
}
