const mongoose = require(
'mongoose'
);
const bcrypt = require('bcrypt');
const user_schema = mongoose.Schema({
    user_name:{
        type: String,
        required: true,
        unique: true
        
    },
    password: {
        type: String,
        required: true
    },
    blogs: [
        {type: mongoose.Schema.ObjectId,
            
        ref: 'Blog',
    default:[]}
    ],
    image_path: {
        type: String
    },
    created_at: {
        type: String,
        default: new Date()
    }
});
user_schema.pre('save',async function(next){
    this.password =await bcrypt.hash(this.password,10);
});


const user_model = mongoose.model('User',user_schema);

module.exports  = user_model;