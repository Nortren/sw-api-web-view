# Star Wars Web API

## Tech stack (crutial clauses)

* [React](https://reactjs.org/docs/getting-started.html)
* [Next.js](https://nextjs.org/docs/getting-started)
* [Nest.js](https://docs.nestjs.com/)

## Installation

Install `nodejs` and `yarn` for your OS.

Install project dependencies:

```sh
yarn
```

## Development

### Running dev server

Add an `.env` file in the root directory (typical configuration):

```
# this one is used to disable some checks
BASE_URL=http://localhost:8080
GOOGLE_SEARCH_API_KEY = Ajdfd9ii-84kjnf-23kvms-323vs-sdf
GOOGLE_SEARCH_ENGINE_ID = 123jklj45435kjkl12
```

To run development server execute the following command (it starts dev server that automatically rebuilds):

```sh
yarn start:dev
```

The application will be available on http://localhost:8080

### Linting

To lint code and fix it (if possible) run the following command:

```sh
yarn lint:fix
```

## Deployment

### Building and running on stage/prod server

*There is a Dockerfile that covers all these jobs and even more. Env variables like NODE_ENV and PORT are already set there.*

To build the app run:

```sh
yarn build
```

To start the server run:

```sh
yarn start:prod
```

To build the docker-compose:
```sh
docker-compose build --build-arg BASE_URL=some_value
```

To start the docker-compose:
```sh
docker-compose up
```

The application is running on port 8080 by default.
The port can be set by changing `PORT` environment variable.
