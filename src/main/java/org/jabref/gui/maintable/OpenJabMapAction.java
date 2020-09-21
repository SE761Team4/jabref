package org.jabref.gui.maintable;

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

        // gwl for next step, please modify here to show jabmap index.html
        webEngine.load("http://google.com");
        browser.setPrefSize(jabMapPane.getWidth(), jabMapPane.getHeight());
        jabMapPane.getChildren().add(browser);
    }

    @Override
    public void execute() {

        if (splitPane.getItems().contains(jabMapPane)) {
            splitPane.getItems().removeAll(jabMapPane);
            jabRefFrame.restoreAfterJabMapClosed();

        } else {
            splitPane.getItems().removeAll(splitPane.getItems());
            browser.setPrefSize(splitPane.getWidth(), splitPane.getHeight());
            splitPane.getItems().add(jabMapPane);
        }

    }
}
