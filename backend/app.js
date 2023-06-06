const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const tasksRoutes = require("./routes/tasks-routes");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
  });

app.use("/api/tasks", tasksRoutes);

mongoose.connect(
  "mongodb+srv://mukundrs:mukund1@task-manager-crisp.d6gb7v8.mongodb.net/?retryWrites=true&w=majority"
).then(() => {
    app.listen(5000);
});
