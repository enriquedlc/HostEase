package com.hostease.serializer;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.hostease.entity.Category;

public class CustomCategorySerializer extends StdSerializer<Category> {

    public CustomCategorySerializer() {
        this(null);
    }

    public CustomCategorySerializer(Class<Category> t) {
        super(t);
    }

    @Override
    public void serialize(Category category, JsonGenerator jsonGenerator, SerializerProvider serializerProvider)
            throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeNumberField("id", category.getId());
        jsonGenerator.writeStringField("categoryName", category.getCategoryName());
        jsonGenerator.writeEndObject();
    }

}
