package org.example.server;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.example.server.RoomDirection;

import java.io.IOException;
import java.util.Map;
import java.util.stream.Collectors;

public class RoomDirectionSerializer extends JsonSerializer<Map<RoomDirection, Boolean>> {

    @Override
    public void serialize(Map<RoomDirection, Boolean> map, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        // Filter out null keys from the map before serializing
        Map<RoomDirection, Boolean> filteredMap = map.entrySet().stream()
                .filter(entry -> entry.getKey() != null)
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

        jsonGenerator.writeObject(filteredMap);
    }
}
