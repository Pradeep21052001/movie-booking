const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
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

app.use(bodyParser.json());

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


// const a = {
//   userid: 1,
//   email: 'a@b.com',
//   first_name: 'user1',
//   last_name: 'user1',
//   username: 'test',
//   contact: '9898989898',
//   password: 'test@123',
//   role: 'user',
//   isLoggedIn: false,
//   uuid: '',
//   accesstoken: '',
//   coupens: [
//     { id: 101, discountValue: 101 },
//     { id: 102, discountValue: 102 }
//   ],
//   bookingRequests: [
//     {
//       reference_number: 29783,
//       coupon_code: 101,
//       show_id: 1003,
//       tickets: [ 1, 3 ]
//     },
//     {
//       reference_number: 19009,
//       coupon_code: 201,
//       show_id: 1002,
//       tickets: [ 1 ]
//     }
//   ]
// };

// console.log(a.coupens);
// console.log(a);
