const mongoose =require('mongoose');

const CommentSchema = mongoose.Schema({
  content:String,
  user_id:String,  
  post_id:String,
  commentTime:Date,
  numberOfLikes:Number,
});

const CommentModel =  mongoose.model('Comment',CommentSchema);
module.exports = CommentModel;


