package org.example.server.Serializers;


import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.example.server.domain.Models.Cell;

import java.io.IOException;

public class CellSerializer extends JsonSerializer<Cell[][]> {
    @Override
    public void serialize(Cell[][] value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        gen.writeObject(value);
    }
}
