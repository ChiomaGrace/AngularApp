const express = require('express'); 
//a routing and middleware (middle way is a function that has access to request/response objects) web framework that has minimal functionality of its own and is essentially a series of middleware function calls. must require('express') to use the package before attempting to invoke it,otherwise an error 'express is not defined' will occur
const app = express(); //this is the function that then invokes express
const mongoose = require('mongoose'); //needed in order to connect a database
const routes = require('./server/config/routes'); //links the routes.js file that's located in server/config
const port = process.env.PORT || 8000; //declares the port number
const cors = require("cors"); //needed in order to setup local and deployed environments
const dotenv = require("dotenv"); //needed in order to use .env for database
dotenv.config();
const multer = require('multer');
const upload = multer();


const connectDatabase = mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Could not connect to MongoDB', error));
// console.log("Mongo URL:", process.env.MONGO_URL);

app.use(cors({
  origin: [process.env.FRONTEND_URL, "http://127.0.0.1:4200", "http://localhost:4200"]
}));

app.use(express.json()); // middleware that parses incoming requests with JSON payloads (HTTP post, put, patch requests) and is based on body-parser aka so you can see/work with form data

app.use(express.urlencoded()); // middleware that parses incoming requests with URL-ecnoded payloads (HTTP post, put, patch requests) and is based on body-parser aka so you can see/work with form data

app.use('/', routes);  //this invokes the routes.js file

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

