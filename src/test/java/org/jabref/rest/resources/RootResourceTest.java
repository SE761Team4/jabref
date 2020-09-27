package org.jabref.rest.resources;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class RootResourceTest {

    private static String WEB_SERVICE_URI = "http://localhost:9898/";

    private static Client client;

//    @BeforeClass
//    public static void createClient() {
//        // Use ClientBuilder to create a new client that can be used to create
//        // connections to the Web service.
//        client = ClientBuilder.newClient();
//    }
//
//    @AfterClass
//    public static void closeConnection() {
//        // After all tests have run, close the client.
//
//    }



    private void startHttpEndPoint() {
        Server server = this.createHttpServer();

        try {
            // Starts server to http://localhost:9898/
            // The current implementation serves libraries/current/entries
            server.start();
        } catch (Exception e) {
//            LOGGER.error("Problem starting HTTP Server", e);
        }
    }

    private Server createHttpServer() {
        ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
        context.setContextPath("/");

        Server server = new Server(9898);
        server.setHandler(context);
        this.addServlet(context);
        return server;
    }

    private void addServlet(ServletContextHandler context) {
        // this mirrors a webapp/WEB-INF/web.xml
        ServletHolder jerseyServlet = context.addServlet(
                org.glassfish.jersey.servlet.ServletContainer.class, "/*");
        jerseyServlet.setInitOrder(0);

        // Tells the Jersey Servlet which REST service/class to load.
        jerseyServlet.setInitParameter(
                "jersey.config.server.provider.classnames",
                RootResource.class.getCanonicalName());
    }

    @Test
    void getEntries() {
        startHttpEndPoint();
        client = ClientBuilder.newClient();
        Response response = null;
        try {
            // Make an invocation on a Concert URI and specify Java-
            // serialization as the required data format.
            response = client.target(WEB_SERVICE_URI).path("libraries/current/map").request()
                                      .put(Entity.json("{\n" +
                            "  \"nodes\": [\n" +
                            "    {\n" +
                            "      \"id\": 1,\n" +
                            "      \"name\": \"node 1\",\n" +
                            "      \"x_pos\": 0,\n" +
                            "      \"y_pos\": 0\n" +
                            "    },\n" +
                            "    {\n" +
                            "      \"id\": 2,\n" +
                            "      \"name\": \"node 2\",\n" +
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

        } finally {
            // Close the Response object.
            response.close();
            client.close();
        }
    }

    @Test
    void createBlankMap() {
    }

    @Test
    void saveMindMap() {
    }
}
