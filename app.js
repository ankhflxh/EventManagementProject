const express = require('express');
require('dotenv').config();

// modules
 const cookieParser = require('cookie-parser');
 const RouteAuth = require('./AppRoutes/RouteAuth');
 const RouteAttendees = require('./AppRoutes/RouteAttendees');
 const RouteEvents = require('./AppRoutes/RouteEvents');
const connectdb = require('./dbConfig/db.js');
const authentication = require('./Middleware/Authentication');
const auth = require('./Middleware/Authenication');


const exp = express();

// middleware
 exp.use(express.json());
 exp.use(cookieParser())

// routes
 app.get('/', (req, res) => {
     res.send('Welcome to My Event Management');
 });

exp.use('/api/v1/auth', RouteAuth);
exp.use('/api/v1/event' ,authentication, RouteEvents);
exp.use('/api/v1/attendees', authentication,RouteAttendees);
 


const PORT = 2021;
connectdb();
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})