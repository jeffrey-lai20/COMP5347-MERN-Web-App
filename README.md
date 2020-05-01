# comp5347

## Instructions to run code:

1. Install all dependencies in package.json

```npm install ---save package.json```

2. Set up MongoDB database and import sample data (Lab 7)

* Create a directory comp5347/mongodb on your U drive.
* Open a command window or power shell window and change to directory C:/Program Files/MongoDB/Server/3.4/bin
* Run the following command mongod.exe --dbpath U:/comp5347/mongodb --smallfiles

In Robomongo:
* Connect to localhost:27017
* Create database: WikipediaAnalytics

In terminal:
```cd C:/Program Files/MongoDB/Server/3.4/bin.```

```mongoimport --jsonArray --db wikipedia --collection revisions --file <full-path-to-downloaded-revision-json-file>```


To import all the json files into mongodb:

```for %i in (C:\full-path-to-database-file\*.json)do "C:\Program Files\MongoDB\Server\4.2\bin\mongoimport.exe" --db wikidb --collection wikicollection --type json --file %i --jsonArray```

3. Starting the server

    This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
   
   ## Available Scripts
   
   In the project directory, you can run:
   
   ### `npm start`
   
   Runs the app in the development mode.<br />
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
   
   The page will reload if you make edits.<br />
   You will also see any lint errors in the console.
   
   ### `npm test`
   
   Launches the test runner in the interactive watch mode.<br />
   See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
   
   ### `npm run build`
   
   Builds the app for production to the `build` folder.<br />
   It correctly bundles React in production mode and optimizes the build for the best performance.
   
   The build is minified and the filenames include the hashes.<br />
   Your app is ready to be deployed!
   
   See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
   
   ### `npm run eject`
   
   **Note: this is a one-way operation. Once you `eject`, you can’t go back!**
   
   If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.
   
   Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.
   
   You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
   
   ## Alternative Server
   
   This can also be used as an alternative to run the server.
   
   ###`npm install -g serve`
   
   To run the server:
   
   ###`serve -s build`