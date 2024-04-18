//Import package install before
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//Create an instance to embedded middleware
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


//Start server
const port= 3000;
app.listen(port, ()=>{console.log(`running on localhost: ${port}`)})