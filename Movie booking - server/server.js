const express = require('express');
const mongoose = require('mongoose');
const db = require("./config/db.config.js");
const routes = require('./routes/artist.router');
const routes1 = require('./routes/genre.router.js');
const routes2 = require('./routes/movie.router');
const routes3 = require('./routes/user.route');


//DB connection
mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");

  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

const app = express();
const port = 8085;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization,cache-control');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/api', routes);
app.use('/api', routes1);
app.use('/api', routes2);
app.use('/api', routes3);


app.get("/", (req, res) => {
  res.json({ message: "Welcome to Upgrad Movie booking application development." });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})


