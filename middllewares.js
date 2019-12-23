const express = require('express');
const constants = require('./constants');
const jwt = require('jsonwebtoken');


module.exports = {


checkToken : (req,res,next) =>
{
    const header = req.headers['Authorization'];

    if(typeof header != undefined)
    {
        const bearer = header.split(' ');
        const token = bearer[1];
        req.token = token;
        jwt.verify(token,constants.PRIVATE_KEY,(err,result) =>{
            if(err){
                res.status(401);
                res.send({"error":"unauthorized"})
                return;
            }
            req.id = result.id;

            if((req.id!= req.params.id)&& req.params.id){
                res.status(401);
                res.send({"error":"unauthorized"});
                return;
            }
            next();
        })

    }else{
        res.status(403);
    }
},



}