const express = require('express');
const route = express.Router();
const UserUtilitiesServices = require('../../Services/UserUtilities')
const middleware = require('../../utils/Middleware_validation')
const { authenticate } = require('../Middleware/auth')
/***************Routes************/

route.post('/add',
    UserUtilitiesServices.Add);
route.post('/update',
    UserUtilitiesServices.Update);
route.post('/UpdateLOAForm',
    UserUtilitiesServices.UpdateLOAForm);
route.post('/delete',
    UserUtilitiesServices.Delete);
route.post('/getOne',
    UserUtilitiesServices.GetOne);
route.get('/getall',
    UserUtilitiesServices.GetAll);
route.post('/AddDeal',
    UserUtilitiesServices.AddDeal);
route.post('/DeleteDeal',
    UserUtilitiesServices.DeleteDeal);
route.post('/AcceptDeal',
    UserUtilitiesServices.AcceptDeal);
route.post('/getUtilitiesOfOneUser',
    UserUtilitiesServices.getUtilitiesOfOneUser);


module.exports = route;
