# We use gradle 7.5.1 in order to not use .gradlew that takes the most recent gradle version
# and could create imcompatibility issues
FROM gradle:7.5.1-jdk17-alpine as builder
ENV HOME=/api-build
RUN mkdir $HOME
COPY .. /$HOME
WORKDIR /$HOME

RUN export LANG='en_US.UTF-8'

# Build war file
RUN gradle war

# Retrieve built war file from builder image
FROM tomcat:10.1-jdk17-corretto
COPY --from=builder ./api-build/build/libs/ROOT.war /usr/local/tomcat/webapps/