const mongoose = require('mongoose');

let blog_schema = mongoose.Schema({
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
            
        },
        content:{
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        date_created: {
            type: String, 
            default: new Date()
        }
});

const blog_model = mongoose.model('Blog',blog_schema);

module.exports = blog_model