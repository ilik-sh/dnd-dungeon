package org.example.server.Exceptions;

import org.springframework.security.core.AuthenticationException;

public class IncorrectPasswordException extends AuthenticationException {
    public IncorrectPasswordException(String message, Throwable cause) {
        super(message, cause);
    }
}
