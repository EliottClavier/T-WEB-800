package com.tripi.user.exception;

public class UserDoesNotExistsException extends Exception {
    public UserDoesNotExistsException() {
        super("User does not exist");
    }

    public UserDoesNotExistsException(Integer id) {
        super(String.format("User with id %d does not exist", id));
    }

    public UserDoesNotExistsException(Integer id, Throwable cause) {
        super(String.format("User with id %d does not exist", id), cause);
    }
}
