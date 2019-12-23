const mongoose =require('mongoose');

const LikePostSchema = mongoose.Schema({
    post_id:String,
    user_id:String,
    likePostTime:Date,
});

const LikePostModel =  mongoose.model('likePost',LikePostSchema);
module.exports = LikePostModel;