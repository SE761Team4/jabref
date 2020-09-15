package org.jabref.model.entry;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import org.jabref.logic.TypedBibEntry;
import org.jabref.model.database.BibDatabaseMode;
import org.jabref.model.entry.field.Field;
import org.jabref.model.entry.field.InternalField;

import java.io.IOException;
import java.util.*;

public class BibEntryAdapter extends TypeAdapter<BibEntry> {

    @Override
    public void write(JsonWriter writer, BibEntry entry) throws IOException {
        if (entry == null) {
            writer.nullValue();
            return;
        }
        writer.beginObject();
        writer.name("bibtex_metadata");
        writer.beginObject();
        writer.name("type").value(new TypedBibEntry(entry, BibDatabaseMode.BIBTEX).getTypeForDisplay());
        writer.name("key").value(entry.getCiteKeyOptional().orElse(""));
        writer.endObject();

        //Grab field entries and place in map
        Map<String, String> mapFieldToValue = new HashMap<>();
        // determine sorted fields -- all fields lower case
        SortedSet<String> sortedFields = new TreeSet<>();
        for (Map.Entry<Field, String> field : entry.getFieldMap().entrySet()) {
            Field fieldName = field.getKey();
            String fieldValue = field.getValue();
            // JabRef stores the key in the field KEY_FIELD, which must not be serialized
            if (!fieldName.equals(InternalField.KEY_FIELD)) {
                String lowerCaseFieldName = fieldName.getName().toLowerCase(Locale.US);
                sortedFields.add(lowerCaseFieldName);
                mapFieldToValue.put(lowerCaseFieldName, fieldValue);
            }
        }

        //Add to writer
        for (String fieldName : sortedFields) {
            writer.name(fieldName).value(String.valueOf(mapFieldToValue.get(fieldName)).replaceAll("\\r\\n", "\n"));
        }
        writer.endObject();
    }

    @Override
    public BibEntry read(JsonReader in) throws IOException {
        //TODO: implement deserializer
        return null;
    }
}
