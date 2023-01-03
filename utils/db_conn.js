const e = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
async function connect_db(){
    try{
const data =await mongoose.connect(process.env.MONGODB_URI);
    }
    catch(err){
        console.log(err.message);
    }
}

module.exports = connect_db;