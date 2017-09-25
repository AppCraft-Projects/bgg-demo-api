// Dependencies

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');

// General setup

const buffer = fs.readFileSync('./data.json');
const restaurants = JSON.parse(buffer);

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/static', express.static('uploads'));

// File upload setup

var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './uploads');
  },
  filename: function(req, file, callback) {
    callback(null, file.originalname);
  }
});
var upload = multer({ storage: storage }).single('image');

// Routes

app.get('/restaurants', (req, res) => {
  if (restaurants.length > 0) {
    timeoutDuration = Math.floor(Math.random() * 5000);
    setTimeout(() => res.json(restaurants), timeoutDuration);
  } else {
    console.log(404, 'all');
    res.status(404).json({ error: 'Restaurant not found :_(' });
  }
});

app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurants.find(item => item.id === req.params.id);
  if (restaurant) {
    console.log(restaurant.name);
    timeoutDuration = Math.floor(Math.random() * 5000);
    setTimeout(() => res.json(restaurant), timeoutDuration);
  } else {
    console.log(404, req.params.id);
    res.status(404).json({ error: 'Restaurant not found :_(' });
  }
});

// Save new restaurant
app.post('/restaurants', function(req, res) {
  const nextIndexObj = { id: restaurants.length };
  const newRestaurant = Object.assign(nextIndexObj, req.body);
  restaurants.push(newRestaurant);
  console.log(newRestaurant);
  res.json(newRestaurant);
});

// Upload a photo
app.post('/upload', function(req, res) {
  console.log('upload called');
  upload(req, res, function(err) {
    if (err) {
      console.log(err);
      return res.end('Error uploading file.');
    }
    res.end('File is uploaded successfully!');
  });
});

console.log(`Starting server on port 8080`);
app.listen(8080);
