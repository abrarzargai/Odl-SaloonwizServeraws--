const express = require('express');
const route = express.Router();
const notificationservice = require('../../Services/notificationservice')
const middleware = require('../../utils/Middleware_validation')
const { authenticate } = require('../Middleware/auth')
/***************Routes************/

route.post('/add', 
    notificationservice.Add);

route.get('/getall',
    notificationservice.GetAll);

route.get('/getall/admin',
    notificationservice.GetAllAdmin);

route.post('/GetOne',
    notificationservice.GetOne);

module.exports = route;