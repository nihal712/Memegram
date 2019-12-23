const mongoose = require('mongoose');
const constants = require ('../constants');
const jwt = require('jsonwebtoken');
const schema = mongoose.Schema;

const Post = new schema ({
    user_id : String,
    caption : String,
    no_like : Number,
    no_comment : Number,
    postingtime : Date,
    postImage : String
})

const PostModel = mongoose.model('Post',Post);

module.exports = PostModel;