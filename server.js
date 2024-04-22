//Import dependency
const express = require('express');

//Save data
let projectData = {};
const data = [];
//Import package install before
const bodyParser = require('body-parser');
const cors = require('cors');

//Create an instance to embedded middleware
const app = express();

app.use(bodyParser.urlencoded({ extended: false })); //convert from raw data to JS 
app.use(bodyParser.json());
app.use(cors());


//Point to direct folder UI
app.use(express.static('website'));
//Start server
const port= 3000;
app.listen(port, startServer)

function startServer () {
  console.log("running on localhost:", port)
}

app.get('/all', function (req, res) {
  res.send(projectData);
})

app.post('/add', function (req, res) {
  data.push(req.body);
  projectData = { ...data }
  // res.send('POST received');
})