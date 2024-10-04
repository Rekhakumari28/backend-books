const mongoose = require('mongoose')
require('dotenv').config()

const mongoUri = process.env.MOBGODB

const initializeDatabase = async ()=>{
    await mongoose
    .connect(mongoUri)
    .then(()=>{
        console.log("Connected to database.")
    }).catch((error)=>{
        console.log("Error connecting to database.", error)
    })    
}

module.exports = {initializeDatabase}