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