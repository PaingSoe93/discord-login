# Discord Login with Fatisfy and Supabase

This project was generated with [Fastify](https://www.fastify.io/)

## Prerequisites

Before you start, make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/en/) (version 14.x or later)
- [Yarn](https://yarnpkg.com/) (version 1.x or later)
- [Concurrently](https://github.com/kimmobrunfeldt/concurrently) (installed globally using `npm install -g concurrently`)

## Installation

After cloning the repository, run the following command to install the dependencies:

```
yarn postinstall
```

## Usage

To start the application, run the following command:

```
yarn start
```

This command will start the backend server on `http://localhost:8000` and the frontend server on `http://localhost:3000`. You can access the frontend application by opening your browser and navigating to `http://localhost:3000`.

### Backend API documentation

The API documentation is generated automatically using [Swagger](https://swagger.io/) and can be accessed by navigating to `http://localhost:8000/docs` in your browser.


### Backend

To start the backend server, run the following command:

```
yarn start:server
```

This command will start the backend server

### Frontend

To start the frontend, run the following command:

```
yarn start:client
```

This command will start the frontend

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.