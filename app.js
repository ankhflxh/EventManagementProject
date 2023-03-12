const express = require('express');
require('dotenv').config();

// internal and external modules
// const cookieParser = require('cookie-parser');
// const authRoutes = require('./routes/authRoutes');
// const attendeesRoutes = require('./routes/attendeesRoutes');
// const eventsRoutes = require('./routes/eventsRoutes');
const connectdb = require('./dbConfig/db.js');
//const authenticate = require('./middlewares/authenticate');


// express app
const app = express();

// middlewares
// app.use(express.json());
// app.use(cookieParser())

// routes
 app.get('/', (req, res) => {
     res.send('Welcome to the Event Management API');
 });
// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/events', authenticate, eventsRoutes);
// app.use('/api/v1/attendees', authenticate, attendeesRoutes);
 

// start app
const PORT = 2021;
connectdb();
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})