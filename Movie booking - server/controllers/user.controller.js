const { Users } = require('../models/user.model');
const { v4: uuidv4 } = require('uuid');
const TokenGenerator = require('uuid-token-generator');
const b2a = require('b2a');

var user; // Keep track of the user
var id;

async function signUp(req, res) {
    const { firstName, lastName, email, password, contactNumber } = req.body;
    const newUser = new Users({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        contactNumber: contactNumber
    });

    try {
        const savedUser = await newUser.save();
        // Respond with the saved user data or a success message
        res.status(201).json(savedUser);
    } catch (error) {
        // Handle any errors and respond with an error message
        res.status(500).json({ error: 'Error saving user to the database' });
    }
}

async function logout(req, res) {
    // const sessionId = req.headers.authorization;
    const sessionId = req.body.uuid;

    if (sessionId) {
        // Invalidate the session (remove it from the userSessions map)
        user.uuid = '';
        user.accesstoken = '';
        res.json({ "message": 'Logged Out successfully.' });
    } else {
        res.status(401).json({ "message": 'Unauthorized' });
    }
}

async function login(req, res) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header is missing' });
    }

    const base64Credentials = authHeader.replace('Basic ', '');

    // Decode the base64 string to obtain the username and password
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');

    const user = await Users.findOne({ username }).select('-_id');

    if (!user) {
        return res.status(401).send("This user has not been registered!");
    }

    const validPassword = (password === user.password) ? true : false;

    if (!validPassword) {
        return res.status(401).send("Invalid Credentials!");
    }

    const tokenGenerator = new TokenGenerator(256, TokenGenerator.BASE62);
    const uuid = uuidv4();
    const token = Buffer.from(tokenGenerator.generate(uuid)).toString('base64');

    user.uuid = uuid;
    user.accesstoken = token;
    const resData = {
        "username": username,
        "id": uuid,
        "access_token": token,
        "isLoggedIn": true
    };
    res.header('access_token', token).json(resData);
    console.log(user);
    console.log(user.coupens);
    console.log(typeof user);
}

// Adapted getCouponCode function to match couponApplyHandler
async function getCouponCode(req, res) {
    const code = req.query.code; // Use query parameter to get code
   
    console.log(user);
    console.log(user.coupens);
    console.log(user.first_name);
    console.log(user);
    console.log(user["username"]);

    if (!user || !user.coupens) {
        return res.status(404).json({ message: "Invalid user or missing coupens array" });
    }

    const coupon = user.coupens.find(coupon => coupon.id == code); // Use == for loose comparison

    if (!coupon) {
        return res.status(404).json({ message: "Invalid coupon code" });
    }

    res.json(coupon);
}

async function bookShow(req, res) {
    const ref = "5019457";
    const { code, show, tickets } = req.body;
    const request = {
        reference_number: ref,
        coupon_code: code,
        show_id: show,
        tickets: tickets
    };
    user.bookingRequests.push(request);
    res.json({ reference_number: ref });
}

module.exports = { signUp, login, logout, getCouponCode, bookShow };
