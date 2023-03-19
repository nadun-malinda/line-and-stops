# Getting Started with the App

## Instruction to up and run the project.

- In the project directory, run `yarn` to install dependancies.

- Create a `.env` file in the root and copy the content from `.env.example` file. Add your Trafiklab API key as the value of the `REACT_APP_TRAFIKLAB_API_KEY`.

- Then in an another terminal, in the project directory, run `node server.js` to start the server.

- Then in an another terminal, in the project directory, run `yarn start` to start the react app.

## Important!

Disable CORS in the browser when running this app localy since we are calling Trafiklab API from the localhost.
