package com.tripi.auth.auth.exception;

public class CredentialsDoesNotExistsException extends Exception {
    public CredentialsDoesNotExistsException() {
        super("Credentials does not exist");
    }

    public CredentialsDoesNotExistsException(Integer id) {
        super(String.format("Credentials with id %d does not exist", id));
    }

    public CredentialsDoesNotExistsException(Integer id, Throwable cause) {
        super(String.format("Credentials with id %d does not exist", id), cause);
    }
}
