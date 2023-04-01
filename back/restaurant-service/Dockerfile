# We use gradle 7.5.1 in order to not use .gradlew that takes the most recent gradle version
# and could create imcompatibility issues
FROM gradle:7.5.1-jdk17-alpine as builder
ENV HOME=/app-build
RUN mkdir $HOME
COPY . /$HOME
WORKDIR /$HOME
RUN export LANG='en_US.UTF-8'
RUN gradle build

FROM eclipse-temurin:17-jre-alpine
WORKDIR /
RUN apk add --no-cache bash
COPY --from=builder /app-build/build/libs/restaurant-service.jar /restaurant.jar