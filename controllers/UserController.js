
const UserModel = require("../models/user")


module.exports = {

    getUser : (req,res) => {
        
        UserModel.findOne(req.params.user_name,(err,result) =>{
            if(err)
            {
                res.status(500);
                res.send();
                return;
            }
            res.send(result);
        })

    },


    updateUser: (req, res) => {
        let id = req.params.id;
        let {err} = UserAssembler(req.body);
        if(err) {
            res.status(422);
            res.send(err.error.details);
            return;
        }
        UserModel.findByIdAndUpdate(id, {$set:req.body} , (err, result) => {
            if(err)
            {
                res.status(500);
                res.send();
                return;
            }
            
            res.send(result);
        })
    },
    deleteUser: (req, res) => {
        let id = req.params.id;
        UserModel.findByIdAndDelete(id, (err, result) => {
            res.send(result)
        })
    },


    

}