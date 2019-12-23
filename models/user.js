const mongoose = require('mongoose');
const constants = require ('../constants');
const jwt = require('jsonwebtoken');
const schema = mongoose.Schema;
const joi = require('joi');
const bcrypt = require('bcrypt');

const User = new schema ({
    
    email:String,
    password : String,
    fullname : String,
    mobile_no : Number,
    user_name : String,
    dob : Date,
    profile_creation_time : Date,
    posts :[{
        post_id : String,
    }],
    no_of_followers: Number,
    no_of_posts : Number,
    no_of_following:Number,
    Bio : String,
    dpImage : String

})

User.methods.generateJwtToken = (id) =>
{
    const token = jwt.sign({"_id":id},constants.PRIVATE_KEY,{expiresIn:'1h'});
    return token;
}
async function UserValidation (body){
    const schema = {
        email : joi.string().min(3).max(100).required().email(),
        password: joi.string().regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@&$^*#%])[a-zA-Z0-9!@&$^*#%]{8,}$/).required(),
        fullname : joi.string().min(3).max(100).required(),
        mobile_no : joi.number().regex(/^(\+\d{1,3}[- ]?)?\d{10}$/).required(),
        user_name : joi.string().min(3),
    };

    let {email,password} = body;
    password = await bcrypt.hash(password,10);

    return {err:joi.validate(body,schema),
            user : UserModel({email,password})
        };

}

function UserAssembler (body){
    const schema = {
        email : joi.string().min(3).max(100).required().email().required(),
        dob : joi.date(),
        fullname : joi.string().min(3).max(100).required(),
        mobile_no : joi.number().regex(/^(\+\d{1,3}[- ]?)?\d{10}$/).required(),
        user_name : joi.string().min(3).required(),
        Bio : joi.string(),
        dp_img_id : string()
    };
    return {err:joi.validate(body,schema)};

}



const UserModel = mongoose.model('User',User)

module.exports = UserModel;