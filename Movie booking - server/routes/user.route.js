const { signUp, login, logout, getCouponCode, bookShow } = require('../controllers/user.controller');
const express = require("express");
const router = express.Router()

router.post('/auth/signup',signUp);
router.post('/auth/login',login);
router.post('/auth/logout',logout);
router.get('/auth/coupons',getCouponCode);
router.post('/auth/bookings',bookShow);

module.exports = router;    


