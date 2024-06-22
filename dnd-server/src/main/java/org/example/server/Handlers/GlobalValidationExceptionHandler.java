package org.example.server.Handlers;

import io.jsonwebtoken.ExpiredJwtException;
import org.example.server.Exceptions.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestControllerAdvice
public class GlobalValidationExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(IllegalUsersArgumentException.class)
    public final ResponseEntity<Map<String, List<String>>> handleIllegalUsersArgumentExceptions(Exception error) {
        List<String> errors = Collections.singletonList(error.getMessage());
        return new ResponseEntity<>(getErrorsMap(errors), new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(UsernameNotFoundException.class)
    public final ResponseEntity<Map<String, List<String>>> handleNotFoundExceptions(Exception error) {
        List<String> errors = Collections.singletonList(error.getMessage());
        return new ResponseEntity<>(getErrorsMap(errors), new HttpHeaders(), HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(IncorrectPasswordException.class)
    public final ResponseEntity<Map<String, List<String>>> handleIncorrectPasswordExceptions(Exception error) {
        List<String> errors = Collections.singletonList(error.getMessage());
        return new ResponseEntity<>(getErrorsMap(errors), new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }



    @ExceptionHandler(RefreshTokenExpirationException.class)
    public final ResponseEntity<Map<String, List<String>>> handleRefreshTokenExceptions(Exception error) {
        List<String> errors = Collections.singletonList(error.getMessage());
        return new ResponseEntity<>(getErrorsMap(errors), new HttpHeaders(), HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(NoSuchTokenException.class)
    public final ResponseEntity<Map<String, List<String>>> handleNoSuchTokenExceptions(Exception error) {
        List<String> errors = Collections.singletonList(error.getMessage());
        return new ResponseEntity<>(getErrorsMap(errors), new HttpHeaders(), HttpStatus.FORBIDDEN);
    }
    @ExceptionHandler(ExpiredJwtException.class)
    public final ResponseEntity<Map<String, List<String>>> handleExpiredJwtExceptions(Exception error) {
        List<String> errors = Collections.singletonList(error.getMessage());
        return new ResponseEntity<>(getErrorsMap(errors), new HttpHeaders(), HttpStatus.FORBIDDEN);
    }




    @ExceptionHandler(Exception.class)
    public final ResponseEntity<Map<String, List<String>>> handleGeneralExceptions(Exception error) {
        List<String> errors = Collections.singletonList(error.getMessage());
        return new ResponseEntity<>(getErrorsMap(errors), new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @ExceptionHandler(RuntimeException.class)
    public final ResponseEntity<Map<String, List<String>>> handleRuntimeExceptions(RuntimeException error) {
        List<String> errors = Collections.singletonList(error.getMessage());
        return new ResponseEntity<>(getErrorsMap(errors), new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private Map<String, List<String>> getErrorsMap(List<String> errors) {
        Map<String, List<String>> errorResponse = new HashMap<>();
        errorResponse.put("errors", errors);
        return errorResponse;
    }

}
