const likeCommentModel = require('../models/likecomment');
const CommentModel = require('../models/comment');

function incdecLikeComment(comment_id,counter){
       CommentModel.findByIdAndUpdate(comment_id,{$inc:{numberOfLikes:counter}},(err,result) => {
           if(err){
             throw err;
           }
       });    
}        

module.exports ={
     PostlikeComment : (req,res) => {
         let {comment_id,user_id,likeCommentTime} = req.body;
       
         let user = new UserModel ({comment_id,user_id,likeCommentTime});

         user.save((err,result) => {
             if(err){
                 res.status(500);
                 res.send();
                 return;
             }

             incdecLikeComment(comment_id,1);
             if(err){
                res.status(500);
                res.send();
                return;
             }
             res.send(result);
         });
       
     },
      
     getlikeComment : (req,res) => {
         let likeCommentid = req.params.id;
         likeCommentModel.findById(likeCommentid,(err,result) => {
              if(err){
                  res.status(500);
                  res.send();
                  return;

              }
              res.send(result);
         })

     },

     deleteLikeComment: (req, res) => {
        let likeCommentid = req.params.id;
        likeCommentModel.findById(likeCommentid,(err,result) => {
            if(err){
                res.status(500);
                res.send();
                return;

            }
            likeCommentModel.findByIdAndDelete(likeCommentid, (err, result) => {
                
                if(err){
                    res.status(500);
                    res.send();
                    return;
                }
                res.send();
            })
            incdecLikeComment(result.comment_id,-1);
            if(err){
                res.status(500);
                res.send();
                return;

            }
        })
    },

};