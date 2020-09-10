package org.jabref.model.entry;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;
import org.jabref.model.entry.field.Field;
import org.jabref.model.entry.field.InternalField;

import java.lang.reflect.Type;
import java.util.*;

public class BibEntrySerializer implements JsonSerializer<BibEntry> {
    @Override
    public JsonElement serialize(BibEntry entry, Type typeOfSrc, JsonSerializationContext context) {
        JsonObject obj = new JsonObject();

        obj.addProperty("type", entry.getType().getName());
        obj.addProperty("cite_key", entry.getCiteKeyOptional().orElse(""));

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

        for (String fieldName : sortedFields) {
            obj.addProperty(fieldName, String.valueOf(mapFieldToValue.get(fieldName)).replaceAll("\\r\\n", "\n"));
        }

        return obj;
    }
}
