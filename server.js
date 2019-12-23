const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const constants = require('./constants');
const {initroutes} = require('./routes');
const app = express();
const bodyparser = require('body-parser');

mongoose.connect(constants.DB_URI,
    {useNewUrlParser:true,useUnifiedTopology:true});

app.use(bodyParser.json());
initroutes(app);
app.listen(constants.PORT,()=>{
    console.log(`server is listening on: ${constants.PORT}`)
})
