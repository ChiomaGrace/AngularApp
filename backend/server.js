const express = require('express'); 
//a routing and middleware (middle way is a function that has access to request/response objects) web framework that has minimal functionality of its own and is essentially a series of middleware function calls. must require('express') to use the package before attempting to invoke it,otherwise an error 'express is not defined' will occur
const app = express(); //this is the function that then invokes express
const mongoose = require('mongoose'); //needed in order to connect a database
const routes = require('./server/config/routes'); //links the routes.js file that's located in server/config
const port = 8000; //declares the port number
const dotenv = require("dotenv"); //needed in order to use .env for database
dotenv.config();

const connectDatabase = mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Could not connect to MongoDB', error));

console.log("Mongo URL:", process.env.MONGO_URI);

app.use('/', routes);  //this invokes the routes.js file

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

