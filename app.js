const express = require('express');
const exp = express();
require('dotenv').config();

// modules
const nodemailer = require('./NodeMailer/Email')
 const cookieParser = require('cookie-parser');
 const RouteAuth = require('./AppRoutes/RouteAuth');
 const RouteAttendees = require('./AppRoutes/RouteAttendees');
 const RouteEvents = require('./AppRoutes/RouteEvents');
const connectdb = require('./dbConfig/db.js');
const { authClient,authRole } = require('./Middleware/ClientAuth')
const { canViewEvents, scopeEvents, canDeleteEvent,canEditEvent } = require('./permissions')
const auth = require('./Middleware/Authenication');
const role = require('./data');
const { events } = require('./Models/Event');

var bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded
exp.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
exp.use(bodyParser.json())


exp.use('/auth',RouteAuth);
exp.use('/event' ,auth, RouteEvents);
exp.use('/attendee', auth,RouteAttendees);

// middleware
 exp.use(express.json());
 exp.use(cookieParser())
 //exp.use(setClient)
 

// routes
 exp.get('/', (req, res) => {
     res.send('Welcome to My Event Management');

 });

// exp.get('/', authClient, (req, res) => {
//      res.json(scopeEvents(req.client,events))

// })  
//  exp.get('/dashboard',authClient,(req, res) => {
//     res.send("Dashboard Page")
//  })

//  exp.get('/admin',authClient,authRole(role.admin), (req, res) => {
//     res.send("Admin Page")
//  })


// exp.get('/eventId', setEvent, authClient, authGetEvent,(req,res) => {
//     res.json(req.project)
// })


// exp.delete('/:eventId', setEvent, authClient, authDeleteEvent, (req,res)=> {
//     res.send('Event Deleted')
// }) 

// exp.put('/:eventId', setEvent, authClient, authDeleteEvent, authEdit, (req,res)=> {
//     res.send('Event Editted')
// }) 

// function setEvent(req, res, next){
//     const eventId =parseInt(req.params.eventId)
//     req.event = events.find(event => event.id === eventId) 

//     if (req.project == null){
//         res.status(404)
//         return res.send ('Event not found')
//     }
//     next()
// }

// function authGetEvent(req,res, next){
//     if (!canViewEvents(req.client, req.event)){
//         res.status(401)
//         return res.send('Not allowed')
//     }
//     next()
// }

// function authDeleteEvent(req,res, next){
//     if (!authDeleteEvent(req.client, req.event)){
//         res.status(401)
//         return res.send('Event Deleted')
//     }
//     next()
// }
 
// function authEdit(req,res, next){
//     if (!authEdit(req.client, req.event)){
//         res.status(401)
//         return res.send('Event Editted')
//     }
//     next()
// }
 
// function setClient(req, res, next){
//     const clientId = req.body.clientId
//     if (clientId){
//         req.Client = clients.find(clients => client.id === clientId)
//     }
// }



const port = process.env.PORT
connectdb();
exp.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

module.exports = exp;