const express = require('express');
const multer = require('multer');


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./Images');
    },
    filename: (req,file,cb)=>{
        cb(null,new Date().toISOString()+req.user_name+path.extname(file.originalname));
    }
})
const upload = multer({storage:storage});



const UserController = require('./controllers/UserController');
const AuthController = require('./controllers/AuthController');
const router = express.Router();
const {checkToken} = require('./middllewares')
function initroutes(app){ 
    router.post('/signup' , AuthController.createUser);
    router.post('/login' ,AuthController.login);
    router.get('/:user_name' ,checkToken,UserController.getUser);
    router.get('/',autologin);
    router.post('/user/post',upload.single('postImage'),PostController.createPost);
    router.get('/user/post',PostController.getPost);
    router.patch('/user/edit',upload.single('dpImage'),UserController.updateUser);
    router.patch('/user/delete',UserController.deleteUser);
    app.use(router);
}

module.exports = {initroutes};









