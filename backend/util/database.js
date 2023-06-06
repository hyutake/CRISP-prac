const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://mukundrs:mukund1@task-manager-crisp.d6gb7v8.mongodb.net/?retryWrites=true&w=majority"
  )
    .then((result) => {
      console.log("Connected!");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = mongoConnect;
