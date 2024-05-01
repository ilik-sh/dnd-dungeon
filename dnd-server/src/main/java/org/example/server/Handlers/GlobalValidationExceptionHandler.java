package org.example.server.Handlers;

import org.example.server.Exceptions.IllegalUsersArgumentException;
import org.example.server.Exceptions.IncorrectPasswordException;
import org.example.server.Exceptions.NoSuchTokenException;
import org.example.server.Exceptions.RefreshTokenExpirationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalValidationExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, List<String>>> handleValidationError(
            MethodArgumentNotValidException error
    ){
        List<String> errors = error.getBindingResult().getFieldErrors()
                .stream().map(FieldError::getDefaultMessage).collect(Collectors.toList());
        return new ResponseEntity<>(getErrorsMap(errors), new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }

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
