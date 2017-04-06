# Address Book

## Project Structure

|  Folder/File |  Description |
|---|---|
|  config/ | Config files for setting environment variables  |
|  app/ | Controllers, Models and routes  |
|  test/ | Integration tests |
|  index.js/ |  server for running application  |

## Getting Started

### Prerequisites

The following packages must be installed before running the service:

- [Node.js](https://nodejs.org)
- [Npm](https://www.npmjs.com/get-npm)

### Installation

After cloning the [repository](https://github.com/andela-idurotola/AddressBook.git):

- Go to the root of the directory by running:
```
cd AddressBook
```

- Set up the environment variable: 
You can create a new firebase project @ [Firebase](https://firebase.google.com/docs/database/web/start):

|  Variable Name |  Description |
|---|---|
|  NODE_PORT or PORT | port to run the server defaults to 4000 |
|  DATABASE_URL | mongodb database url  |
|  AUTH_SIGN_KEY | a hash to use as a sign key - could be any length  |
|  FIREBASE_API_KEY | provided by firebase  |
|  FIREBASE_AUTH_DOMAIN | provided by firebase |
|  FIREBASE_DB_URL | provided by firebase |
|  FIREBASE_PROJECT_ID | provided by firebase |
|  FIREBASE_STORAGE_BUCKET | provided by firebase |
|  FIREBASE_MSG_SENDER_ID | provided by firebase |


- Install all npm packages by running:
```
npm install or yarn
```

### Test The App

- Run server tests by running:
```
 yarn test or npm run test
```

### Start The App

- Start the server by running:
```
 yarn start or npm start
```

- SignUp using email and password cerdentials e.g. `test-email@gmail.com`, and `password`.
