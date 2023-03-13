const Client = require('../models/Client');

// import modules
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SendEmail = require('../NodeMailer/Email')

exports.registerClient = async(req, res) => {
    const {email, password} = req.body;
    
    if(!email || !password) {
        return res.status(400).json({error: 'Please provide email and password'});
    }

    try {
        // find client already exists
        const existingClient = await Client.findOne({email});
        if(existingClient) {
            return res.status(400).json({error: `Client with email ${email} already exists`});
        }
        const newClient = await Client.create({email, password: await bcrypt.hash(password, 10)});
        res.status(201).json({
            message: 'Client created successfully',
            newClient
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }

}

exports.loginClient = async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(400).json({error: 'Please provide email and password'});
    }
    
    try {
        // check if client exists
        const foundClient = await Client.findOne({email});
        if(!foundClient) {
            return res.status(404).json({error: `Client with email "${email}" not found`});
        }
        
        if(!await bcrypt.compare(password, foundClient.password)){
            return res.status(400).json({error: 'Password is incorrect'})
        }

        const authToken = jwt.sign(
            { email: foundClient.email },
            process.env.AUTH_SECRET_KEY,
            { expiresIn: 3600 * 60 }
        )
        res.cookie('jwt', authToken, { httpOnly: true, maxAge: 3600 * 60 * 1000 });
        res.status(200).json({
            message: "Found Client",
            foundClient, 
            jwt: authToken
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

exports.logoutClient = (req, res) => {
    const authToken = req.cookies.jwt;
    if(!authToken) {
        return res.json({"message": "You are not logged in"})
    }

    res.clearCookie('jwt', {httpOnly: true});
    res.status(200).json({message: "Logged out successfully"});
};