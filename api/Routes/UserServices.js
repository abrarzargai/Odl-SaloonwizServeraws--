const express = require('express');
const route = express.Router();
const UserPackageServices = require('../../Services/UserPackageServices')

/***************Routes************/

route.post('/add',
    UserPackageServices.Add);
route.post('/update',
    UserPackageServices.Update);
route.get('/getall',
    UserPackageServices.GetAll);



module.exports = route;