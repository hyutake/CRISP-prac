const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/tasks');
const mongoConnect = require('./util/database').mongoConnect;

// configuring backend
const app = express();
app.use(bodyParser.json());

// To workaround the CORS thing that restricts communications between different ports
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
  });

app.use('/tasks', taskRoutes);

mongoConnect(() => {
    console.log('Listening on port 8080');
    app.listen(8080);
})