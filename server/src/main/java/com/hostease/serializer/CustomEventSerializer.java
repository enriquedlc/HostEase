package com.hostease.serializer;

import java.io.IOException;
import java.util.Set;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.hostease.entity.Event;

public class CustomEventSerializer extends StdSerializer<Set<Event>> {

    public CustomEventSerializer() {
        this(null);
    }

    public CustomEventSerializer(Class<Set<Event>> t) {
        super(t);
    }

    @Override
    public void serialize(Set<Event> events, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartArray();
        for (Event event : events) {
            jsonGenerator.writeObject(event.getId());
        }
        jsonGenerator.writeEndArray();
    }
}
