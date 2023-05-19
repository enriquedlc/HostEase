package com.hostease.serializer;

import java.io.IOException;
import java.util.Set;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.hostease.entity.Tag;

public class CustomTagSerializer extends StdSerializer<Set<Tag>> {

    public CustomTagSerializer() {
        this(null);
    }

    public CustomTagSerializer(Class<Set<Tag>> t) {
        super(t);
    }

    @Override
    public void serialize(Set<Tag> tags, JsonGenerator jsonGenerator, SerializerProvider serializerProvider)
            throws IOException {
        jsonGenerator.writeStartArray();
        for (Tag tag : tags) {
            jsonGenerator.writeStartObject();
            jsonGenerator.writeNumberField("id", tag.getId());
            jsonGenerator.writeStringField("tag", tag.getTag());
            jsonGenerator.writeStringField("color", tag.getColor());
            jsonGenerator.writeEndObject();
        }
        jsonGenerator.writeEndArray();
    }

}
