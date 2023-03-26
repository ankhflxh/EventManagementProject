const mongoose = require('mongoose')
require('dotenv').config();


const url = process.env.Mongo_URL;
const connectdb = async () =>{
    
    await mongoose.connect(url)
        .then( () => {
            console.log('Connected to the database ')
        })
        .catch( (err) => {
            console.error(`Error connecting to the database. n${err}`);
        })
    
}
module.exports = connectdb;
