# T-WEB-800

## Summary

- [Contributors](#contributors)
- [Introduction](#introduction)
- [Architecture](#architecture)
- [Server application](#server-application)
    - [Getting started](#getting-started)
        - [Prerequisites](#prerequisites)
        - [Installing](#installing)
        - [Running the tests](#running-the-tests)
        - [Deployment](#deployment)
    - [Documentation](#documentation)
        - [Swagger](#swagger)
- [Client application](#client-application)

## Contributors

Our team is composed of:
- CLAVIER Eliott
- MATHÉ Clément
- RIPAULT Paul
- MARTIN Maxime
- PIGNON Nathan

## Introduction

This project aims to create a microservice travel application following the TDD methodology.

Our goal is to create a user-friendly platform where users can easily plan their trip by selecting cities and creating their own itinerary. In addition to that, our website also provides detailed information about local activities, events, bars, restaurants, hotels and sports activities that are available around the cities selected by the user.

Our approach to building this application focused on microservice design rather than creating a monolithic API, which allows us to have a more flexible and easily maintainable architecture.

Using the TDD method, we sought to maximize the quality and reliability of our code. We wrote tests for each of the features we implemented, to ensure that our application works correctly and predictably.

We hope that this platform will meet our users' expectations for travel planning and help them discover new destinations around the world.

## Architecture  

Our architecture is based on microservices design for our travel application. We use Angular for the front-end development and Spring Boot Java 17 for our back-end. We store the data in a MySQL database.

Here is the list of microservices we have developed and the sources used for their implementation:
- gateway: This is a single point of entry for all services, which manages the routing of user requests to the appropriate service.
- auth-service: Manages the authentication of users.
- user-service: Manages users and their personal information.
- discovery: Manages the discovery of the different services available in the architecture.
- restaurant-service, bar-service, accommodation-service, location-service and activity-service: These services use the Google Maps API to provide information about restaurants, bars, accommodation, locations and tourist activities around the cities selected by the user.
- transport-service: Uses the Google Maps and Amadeus APIs to provide information about available transportation for users.
- trip-service: Handles personalized trip planning for users.

Our data-services are based on the "Adapter" design pattern in order to easily and quickly add new sources. We can also manage the sources in order to activate only the desired sources

We also developed a common module, tripi-common, to share models and enumerations between the different modules of the application.

This microservices architecture allows us to have a modular, scalable and easily maintainable application, while providing a complete user experience for travel planning.

## Server application

The server application is a Spring Boot application that provides the REST API for the client application.

The online url of the server application is https://gateway.epitech-projects.me

### Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

#### Prerequisites

- Java 17
- Gradle 7.2
- MySQL 8.0.26
- Intellij (optional)
- Get a Google Maps API key
- Get an Amadeus API key and secret

#### Installing

1. Clone the repository
```git clone https://github.com/EliottClavier/T-WEB-800.git```
2. In ./env, create a files named "api.env" and "database.env" based on the .example in the folder
3. If you use Intellij as an IDE, you need to download a plugin to integrate the environment files into your configurations. Follow the instructions below:
    - Go to File > Settings > Plugins
    - Search for "envfile" and install the plugin
    - Go to edit configurations and add the environment files to the configuration you want to use
    - Select "Enable envfile" and select the environment files you want to use with the "+" button
    - Click on "Apply" and "OK"
    - Restart Intellij
4. Before running the application, change the server port in the application.properties file of each service to avoid conflicts with other services
5. At first, run the discovery service to register the other services in the Eureka server
6. Run the other services in the following order:
    - auth-service
    - user-service
    - gateway
    - restaurant-service
    - bar-service
    - accommodation-service
    - location-service
    - activity-service
    - transport-service
    - trip-service
7. The server is now running on http://localhost:8080 and the Eureka server is available on http://localhost:8761 (default port)

#### Running the tests

To run the tests, you need to run the following command in the root folder of the project:

```./gradlew test```

#### Deployment

To deploy the application, you need to run the following command in the root folder of the project:

```./gradlew build```

### Documentation

#### Swagger

Swagger is available on :
- accommodation-service: http://gateway.epitech-projects.me/accommodation/swagger-ui.html
- activity-service: http://gateway.epitech-projects.me/enjoy/swagger-ui.html
- auth-service: http://gateway.epitech-projects.me/auth/swagger-ui.html
- bar-service: http://gateway.epitech-projects.me/bar/swagger-ui.html
- location-service: http://gateway.epitech-projects.me/locations/swagger-ui.html
- restaurant-service: http://gateway.epitech-projects.me/restaurant/swagger-ui.html
- transport-service: http://gateway.epitech-projects.me/transports/swagger-ui.html
- trip-service: http://gateway.epitech-projects.me/trip/swagger-ui.html

## Client application
The client application is an Angular-based front-end for the Trippi platform. It consumes the REST API provided by the server application to display and manage user data, trip planning, and various other travel-related features.

### Getting started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
#### Prerequisites
- Node.js
- Angular CLI
- A modern web browser (e.g., Google Chrome)
#### Installing
1. Clone the repository `git clone https://github.com/EliottClavier/T-WEB-800.git`
2. Navigate to the client application directory `cd front`
3. Install the required dependencies by running `npm install`
4. Set up environment variables for the client application by creating an `.env` file in the root of the client application directory, based on the `.env.example` file provided.
5. Update the environment variables with the appropriate API keys and secrets for the Google Maps and Amadeus APIs.
### Running the client application
1. In the client application directory, run `ng serve` to start the development server.
2. Open your web browser and navigate to `http://localhost:4200/` to access the client application.
`ng test`
This command will run the unit tests using the default test runner (Karma) and the testing framework (Jasmine) configured for the Angular project. The test results will be displayed in the terminal, and a browser window will open to show the test execution progress.
