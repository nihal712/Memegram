const mongoose =require('mongoose');

const LikeCommentSchema = mongoose.Schema({
    comment_id:String,
    user_id:String,
    likeCommentTime:Date,
});




const LikeCommentModel =  mongoose.model('likeComment',LikeCommentSchema);
module.exports = LikeCommentModel;