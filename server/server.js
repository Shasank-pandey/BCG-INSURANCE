const express = require('express')
const app = express();
const port = 8000;
const csvtojson = require("csvtojson");
var cors = require('cors');

//Connecting to DB
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
MongoClient.connect(url,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).
then((db)=>console.log(db))
.catch(err=>console.log('refuse',err));

//enabling CORS for frontend
app.use(cors());

//converting CSV to JSON
csvtojson()
  .fromFile("../DataSet.csv")
  .then(csvData => {
     csvData; 
    //creating the API for frontend
    app.get('/api/data', (req, res) => {
        res.send(csvData);
    });
    //test
    // MongoClient.connect(url, function(err, db) {
    //   if (err) throw err;
    //   // db pointing to newdb
    //   console.log("Switched to "+db.databaseName+" database");
    //   // insert multiple documents to 'users' collection using insertOne
    //   db.collection("users").insertMany(csvData, function(err, res) {
    //       if (err) throw err;
    //       console.log(res.insertedCount+" documents inserted");
    //       // close the connection to db when you are done with it
    //       db.close();
    //    });
    // });
    //
  });

//testing port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});