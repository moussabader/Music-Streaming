# Backend

## Stack
We’ll use a simple NodeJS service with a MongoDB for our backend.

* NodeJS

* MongoDB

* Docker

## Microservices

* Auth Service

* User Service

* Streaming Service

## Service structure

Every service will have a **index.js** entry point

The service will also contain the following folders:

- api/               for our routes
- config/          for configurations
- repository/    for db queries and abstractions
- server/           for server setup and start code


## Create a .env file in the server and put this data:
* MONGODB_URL = mongodb+srv://memoryMern:megaman500@realmcluster.xqs34.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
* DB_NAME = memoryMern
* ACCESS_TOKEN_SECRET=1e86601fb7d798e8ab8226cbd6a2daed894e05d0e194e03b024f84aaf86fd856
* REFRESH_TOKEN_SECRET=f88214748589ea7770b1cb9f45b70100b24fee6ec6541adc3f1db715abbd87c3
