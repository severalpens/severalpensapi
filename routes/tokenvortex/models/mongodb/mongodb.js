var MongoClient = require('mongodb').MongoClient;
const url  = `mongodb+srv://${process.env.usr}:${process.env.password}@${process.env.url}/token_vortex?retryWrites=true&w=majority`;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});