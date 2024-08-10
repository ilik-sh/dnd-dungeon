package org.example.server.Exceptions;

public class NoSuchTokenException extends RuntimeException{
    public NoSuchTokenException(String message) {
        super(message);
    }
}
