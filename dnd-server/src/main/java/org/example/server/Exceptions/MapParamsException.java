package org.example.server.Exceptions;

import lombok.experimental.StandardException;

@StandardException
public class MapParamsException extends Exception{
    private final String message;

    public MapParamsException(String message) {
        super(message);
        this.message = message;
    }

    public MapParamsException(String message, Throwable cause) {
        super(message, cause);
        this.message = message;
    }
}
