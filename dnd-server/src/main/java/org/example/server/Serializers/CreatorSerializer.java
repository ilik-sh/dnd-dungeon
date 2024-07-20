package org.example.server.Serializers;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import org.example.server.domain.Models.account.User;

import java.io.IOException;

public class CreatorSerializer extends JsonDeserializer<User> {


    @Override
    public User deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JacksonException {
        User user = p.readValueAs(User.class);
        return user;
    }
}
