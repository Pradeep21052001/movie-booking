const mongoose = require('mongoose');

const Users = mongoose.model(
  'users',
  new mongoose.Schema({
    userid: {
      type: Number,
      default: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
    },
    contact: {
      type: Number,
      min: 1000000000,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
    },
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
    uuid: {
      type: String,
      default: '',
    },
    accesstoken: {
      type: String,
      default: '',
    },
    coupens: [
      {
        id: Number,
        discountValue: Number,
      },
    ],
    bookingRequests: [
      {
        reference_number: Number,
        coupon_code: Number,
        show_id: Number,
        tickets: [Number],
      },
    ],
  })
);

module.exports = { Users };
