const express = require('express');
require('dotenv').config();

// modules
const nodemailer = require('./NodeMailer/Email')
 const cookieParser = require('cookie-parser');
 const RouteAuth = require('./AppRoutes/RouteAuth');
 const RouteAttendees = require('./AppRoutes/RouteAttendees');
 const RouteEvents = require('./AppRoutes/RouteEvents');
const connectdb = require('./dbConfig/db.js');
const { authClient,authRole } = require('./Middleware/ClientAuth')
const auth = require('./Middleware/Authenication');


const exp = express();

// middleware
 exp.use(express.json());
 exp.use(cookieParser())
 exp.use(setClient)
 

// routes
 exp.get('/', (req, res) => {
     res.send('Welcome to My Event Management');

 });

 exp.get('/dashboard',authClient,(req, res) => {
    res.send("Dashboard Page")
 })

 exp.get('/admin',authClient,authRole(ROLE.admin), (req, res) => {
    res.send("Admin Page")
 })

exp.use('/auth',RouteAuth);
exp.use('/event' ,auth, RouteEvents);
exp.use('/attendee', auth,RouteAttendees);
 
function setClient(req, res, next){
    const clientId = req.body.clientId
    if (clientId){
        req.Client = clients.find(clients => client.id === clientId)
    }
}


const port = process.env.PORT
connectdb();
exp.listen(port, () => {
    console.log(`Listening on port ${port}`);
})