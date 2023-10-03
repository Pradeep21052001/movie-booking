const { Users } = require('../models/user.model');
const { v4: uuidv4 } = require('uuid');
const { TokenGenerator } = require('uuid-token-generator');


async function signUp(req, res) {
    const { firstName, lastName, email, password, contactNumber } = req.body;
    const newUser = new Users({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        contactNumber: contactNumber
    })

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
    const sessionId = req.headers.authorization;
    if (sessionId && userSessions.has(sessionId)) {
        // Invalidate the session (remove it from the userSessions map)
        userSessions.delete(sessionId);
        res.json({ message: 'Logout successful' });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
}

let user;
async function login(req, res) {
    const authHeader = req.headers.authorization;

    // Check if the Authorization header is present
    if (!authHeader || !authHeader.startsWith("Basic ")) {
        return res.status(401).json({ error: "Unauthorized: Missing or invalid Authorization header" });
    }

    // Decode and extract the base64-encoded credentials
    const credentials = authHeader.split(" ")[1];
    const decodedCredentials = Buffer.from(credentials, "base64").toString("utf-8");
    const [username, password] = decodedCredentials.split(":");

    user = await Users.findOne({ username });

    if (!user) {
        return res.status(401).json({ error: "This email has not been registered!" });
    }

    const validPassword = password === user.password;

    if (!validPassword) {
        return res.status(401).json({ error: "Invalid Credentials!" });
    }

    const tokenGenerator = new TokenGenerator(256, TokenGenerator.BASE62);
    const token = tokenGenerator.generate();

    const uuid = uuidv4();

    res.header('access_token', token).json({
        username: `${user.firstName}`+`${user.lastName}`,
        id: uuid,
        access_token: token,
        isLoggedIn: true,
    });
}


function getCouponCode (req,res) {
    res.body.json(user.coupens);
}

async function bookShow (req,res) {
    
}

module.exports = { signUp, login, logout, getCouponCode, bookShow }