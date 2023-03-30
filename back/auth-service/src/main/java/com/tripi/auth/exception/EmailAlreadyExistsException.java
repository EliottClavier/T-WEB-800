package com.tripi.auth.exception;

public class EmailAlreadyExistsException extends Exception {

    public EmailAlreadyExistsException() {
        super("Email already exists");
    }

    public EmailAlreadyExistsException(String email) {
        super(String.format("Email %s already exists", email));
    }

    public EmailAlreadyExistsException(String email, Throwable cause) {
        super(String.format("Email %s already exists", email), cause);
    }
}
