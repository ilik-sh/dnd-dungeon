package org.example.server.Exceptions;

public class RefreshTokenExpirationException extends RuntimeException {
    public RefreshTokenExpirationException(String message) {
        super(message);
    }
}
