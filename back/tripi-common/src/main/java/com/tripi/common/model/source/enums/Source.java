package com.tripi.common.model.source.enums;

public enum Source {

    GOOGLE_MAPS("google-maps"),
    ALLEVENTS("allevents");

    private final String source;

    Source(String source) {
        this.source = source;
    }

    public String getSource() {
        return source;
    }

    public static Source fromValue(String value) {
        for (Source source : Source.values()) {
            if (source.getSource().equals(value)) {
                return source;
            }
        }
        return null;
    }
}
