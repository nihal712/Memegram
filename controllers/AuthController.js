
const UserModel = require("../models/user")

const bcrypt = require('bcrypt');





module.exports = {

    createUser: async (req,res) =>{
        let {err,user} = await UserValidation(req.body);
        if(err.error)
        {
            res.status(422);
            res.send(err.error.details);
            return;
        }
        
        user.save((err,result) => {
            if(err)
            {
                res.status("500");
                res.send();
                return;
            }
            
            res.send({jwt:result.generateJwtToken(result.user_name)});           
        })
    },

    autologin : (req,res) =>
    {
        const header = req.headers['Authorization'];

        if(typeof header != undefined)
        {
            const bearer = header.split(' ');
            const token = bearer[1];
            req.token = token;
            jwt.verify(token,constants.PRIVATE_KEY,(err) =>{
                if(err){
                    res.status(401);
                    res.send({"error":"unauthorized"})
                    return;
                }
            

                //show news feed of result.user_name
            })

        }else{
            //redirect to login
        }
    },

    login: async (req,res) =>{        
        let {user_name,password}=req.body;
         UserModel. findOne({user_name},async (err,result) =>{
            if(err)
            {
                res.status(500);
                res.send();
                return;
            }
            if(!result){
                res.status(401);
                res.send({"error":"unauthorized"});
                return;
            }

            const match = await bcrypt.compare(password, result.password)
                           
                if(match){
                    res.send({jwt:result.generateJwtToken(result._id)});
                }else{
                    res.status(401);
                    res.send({"error":"unauthorized"});
                    return;
                }
                      
        })
    }
}

