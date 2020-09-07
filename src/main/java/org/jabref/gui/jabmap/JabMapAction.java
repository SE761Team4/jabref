package org.jabref.gui.jabmap;

import javafx.collections.ObservableList;
import org.jabref.gui.DialogService;
import org.jabref.gui.StateManager;
import org.jabref.gui.actions.SimpleCommand;
import org.jabref.gui.copyfiles.CopyFilesDialogView;
import org.jabref.gui.copyfiles.CopyFilesResultItemViewModel;
import org.jabref.gui.copyfiles.CopyFilesResultListDependency;
import org.jabref.logic.l10n.Localization;
import org.jabref.model.entry.BibEntry;
import java.util.List;
import static org.jabref.gui.actions.ActionHelper.needsDatabase;
import static org.jabref.gui.actions.ActionHelper.needsEntriesSelected;
//import javax.ws.rs.*;

public class JabMapAction extends SimpleCommand {

    private final DialogService dialogService;
    private final StateManager stateManager;

    public JabMapAction(StateManager stateManager, DialogService dialogService) {
        this.stateManager = stateManager;
        this.dialogService = dialogService;

        this.executable.bind(needsDatabase(this.stateManager).and(needsEntriesSelected(stateManager)));
    }

    private void showDialog(List<CopyFilesResultItemViewModel> data) {
        if (data.isEmpty()) {
            dialogService.showInformationDialogAndWait(Localization.lang("Copy linked files to folder..."), Localization.lang("No linked files found for export."));
            return;
        }
        CopyFilesDialogView dialog = new CopyFilesDialogView(new CopyFilesResultListDependency(data));
        dialog.showAndWait();
    }

    @Override
    public void execute() {
        //TODO: Note to self, fix
        ObservableList<BibEntry> var = stateManager.getActiveDatabase().get().getDatabase().getEntries();
        for(BibEntry entry : var) {
            System.out.println(entry);
        }
        //Call commandline to start TomCat server
        //Import resource class
        //Instantiate with database
    }
}
