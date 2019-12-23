const CommentModel = require('../models/comment');
const postModel = require('../models/post')


function incdecPostComment(post_id,counter){
    postModel.findByIdAndUpdate(post_id,{$inc:{no_comment:counter}},(err,result)=>{
        if(err)
        {
            throw err;
        }
    })
}

module.exports ={
     PostComment : (req,res) => {
         let {content,user_id,post_id,commentTime,numberOfLikes} = req.body;

       
         let comment = new CommentModel ({content,user_id,post_id,commentTime,numberOfLikes});

         comment.save((err,results) => {
             if(err){
                 res.status(500);
                 res.send();
                 return;
             }
             incdecPostComment(post_id,1);
             if(err)
             {
                res.status(500);
                res.send();
                return;
             }
             res.send();
         });
       
     },
      
     getComment : (req,res) => {
         let commentid = req.params.id;
          CommentModel.findById(commentid,(err,result) => {
              if(err){
                  res.status(500);
                  res.send();
                  return;

              }
              res.send(result);
         })

     },

     deleteComment: (req, res) => {
        let commentid = req.params.id;
        CommentModel.findById(commentid,(err,result) => {
            if(err){
                res.status(500);
                res.send();
                return;

            }
            postid = result.post_id;
            CommentModel.findByIdAndDelete(commentid, (err, result) => {
                if(err){
                    res.status(500);
                    res.send();
                    return;
    
                }               
                res.send();
            })
            incdecPostComment(postid,-1);
            if(err)
            {
               res.status(500);
               res.send();
               return;
            }
        })
    },

}