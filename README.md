# comp5347

## RUNNING APP - 3 STEPS ##

**Running database - starting MongoDB database engine daemon**

* In C:/Program Files/MongoDB/server/3.4/bin 
* Run the following command:

``` mongod.exe --dbpath <path to mongoDB directory> ```

**Starting the server - backend runs on port 5000** 

``` node server.js ```

**Starting the frontend - react app runs on port 3000**

* React app is in views
* To run react:
``` cd frontend ```
``` npm start ```
* app should be running on localhost:3000

## Database set up and installing dependencies 

**Install all dependencies in package.json**

```npm install ---save package.json```

**Set up MongoDB database and import sample data (Lab 7)**

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

Change timestamp format to ISODate:

```db.articles.find().forEach(function(doc){ doc.timestamp = new ISODate(doc.timestamp); db.articles.save(doc)});```
