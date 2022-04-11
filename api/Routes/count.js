const express = require('express');
const route = express.Router();
const Count = require('../../Services/Count')

/***************Routes************/


route.get('/',Count.GetAll);


module.exports = route;