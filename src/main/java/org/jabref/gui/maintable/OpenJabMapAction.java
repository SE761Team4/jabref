package org.jabref.gui.maintable;

import java.util.List;

import javafx.scene.Node;
import javafx.scene.control.SplitPane;
import javafx.scene.layout.Pane;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;

import org.jabref.gui.JabRefFrame;
import org.jabref.gui.actions.SimpleCommand;

/**
 * Open JabMap inside Jabref.
 */

public class OpenJabMapAction extends SimpleCommand {
    private final JabRefFrame jabRefFrame;
    private final SplitPane splitPane;
    private Pane jabMapPane;
    private WebView browser;

    public OpenJabMapAction(JabRefFrame jabRefFrame, SplitPane splitPane) {
        this.jabRefFrame = jabRefFrame;

        this.splitPane = splitPane;
        jabMapPane = new Pane();

        initJabMapPane();
    }

    private void initJabMapPane() {
        browser = new WebView();
        WebEngine webEngine = browser.getEngine();

        // webEngine.load("http://google.com");
        webEngine.load(getClass().getResource("jabmap/index.html").toString());
        browser.setPrefSize(jabMapPane.getWidth(), jabMapPane.getHeight());
        jabMapPane.getChildren().add(browser);
    }

    @Override
    public void execute() {
        List<Node> toolBarNode = jabRefFrame.getToolBarOfFrame();
        if (splitPane.getItems().contains(jabMapPane)) {
            splitPane.getItems().removeAll(jabMapPane);
            jabRefFrame.restoreAfterJabMapClosed();
            for (Node node : toolBarNode) {
                node.setVisible(true);
            }
        } else {
            browser.getEngine().reload();
            splitPane.getItems().removeAll(splitPane.getItems());
            browser.setPrefSize(splitPane.getWidth(), splitPane.getHeight());
            splitPane.getItems().add(jabMapPane);
            for (Node node : toolBarNode) {
                node.setVisible(false);
            }
        }

    }
}
