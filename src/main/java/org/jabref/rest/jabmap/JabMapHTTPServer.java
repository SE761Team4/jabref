package org.jabref.rest.jabmap;

import org.jabref.gui.JabRefMain;
import org.jabref.rest.jabmap.resources.RootResource;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class JabMapHTTPServer {

    private static final Logger LOGGER = LoggerFactory.getLogger(JabRefMain.class);

    public static void startHttpEndPoint() {
        Server server = createHttpServer();

        try {
            // Starts server to http://localhost:9898/
            server.start();
        } catch (Exception e) {
            LOGGER.error("Problem starting HTTP Server", e);
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
}
