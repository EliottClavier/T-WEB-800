package com.tripi.user.exception;

public class EmailDoesNotExistException extends Exception {

    EmailDoesNotExistException() {
        super("Email does not exist");
    }

    public EmailDoesNotExistException(String email) {
        super(String.format("Email %s does not exist", email));
    }

    EmailDoesNotExistException(String email, Throwable cause) {
        super(String.format("Email %s does not exist", email), cause);
    }
}
