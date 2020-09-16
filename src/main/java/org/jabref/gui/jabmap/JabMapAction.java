package org.jabref.gui.jabmap;

import org.jabref.gui.JabRefFrame;
import org.jabref.gui.actions.SimpleCommand;
import org.jabref.logic.jabmap.MindMapWriter;


public class JabMapAction extends SimpleCommand {

    JabRefFrame jabRefFrame;

    public JabMapAction(JabRefFrame jabRefFrame) {
        this.jabRefFrame = jabRefFrame;
    }

    @Override
    public void execute() {
        new MindMapWriter(jabRefFrame);
    }
}
