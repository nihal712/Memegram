const likePostModel = require('../models/likepost');
const postModel = require('../models/post')



function incdecPostLike(post_id,counter){
    postModel.findByIdAndUpdate(post_id,{$inc:{no_like:counter}},(err,result)=>{
        if(err)
        {
            throw err;
        }
    })
}
module.exports ={
     PostlikePost : (req,res) => {
         let {post_id,user_id,likePostTime} = req.body;

       
         let post = new likePostModel ({post_id,user_id,likePostTime});

         post.save((err,result) => {
             if(err){
                 res.status(500);
                 res.send();
                 return;
             }
             incdecPostLike(post_id,1);
             if(err)
             {
                res.status(500);
                res.send();
                return;
             }
             res.send(result);
         });
       
     },
      
     getLikePost : (req,res) => {
         let likePostid = req.params.id;
         likePostModel.findById(likePostid,(err,result) => {
              if(err){
                  res.status(500);
                  res.send();
                  return;

              }
              res.send(result);
         })

     },

     unlikePost: (req, res) => {
        let likePostid = req.params.id;
        likePostModel.findById(likePostid,(err,result) => {
            if(err){
                res.status(500);
                res.send();
                return;
            }

            likePostModel.findByIdAndDelete(likePostid, (err, result) => {
                if(err){
                    res.status(500);
                    res.send();
                    return;
    
                }
               
                res.send();
            })       
            incdecPostLike(result.post_id,-1);
            if(err){
                res.status(500);
                res.send();
                return;

            }
        })
    },

};