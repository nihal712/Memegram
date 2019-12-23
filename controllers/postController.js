const PostModel = require('../models/post')
const UserModel = require("../models/user")



module.exports = {

    createPost : (req,res) =>{

        
        let post = new PostModel({
            user_name : req.body.user_name,
            caption : req.body.caption,            
            postingtime : new Date(),
            postImage : req.file.filename
        });

        post.save((err,result)=>{
            if(err)
            {
                res.status("500");
                res.send();
                return;
            }
            UserModel.findOneAndUpdate(result.user_name,
                {$set:{
                    posts:[{
                        post_id:result._id}]
                }
            })
            res.send();
        })
    },


    getPost : (req,res)=>{
        PostModel.findById(req.params.id,(err,result)=>{
            if(err){
                res.status(500);
                res.send();
                return;
            }
            if(!result)
            {
                res.status(404);
                res.send();
                return;
            }
            res.send(result);
        })
    },

    deletePost: (req,res)=>{
        PostModel.findByIdAndDelete(req.params.id,(err,result)=>{
            if(err){
                res.status(500);
                res.send();
                return;
            }
            res.send();
        })
    }

}


