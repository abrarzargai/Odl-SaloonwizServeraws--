const express = require('express');
const route = express.Router();
const PackagesServices = require('../../Services/PackagesServices')
const middleware = require('../../utils/Middleware_validation')
const { authenticate } = require('../Middleware/auth')
/***************Routes************/

route.post('/add',
    middleware.AddPackagesValidation,
    middleware.validationFunction,
    PackagesServices.Add);

route.get('/getall',
    PackagesServices.GetAll);

route.post('/update',
    middleware.UpdatePackagesValidation,
    middleware.validationFunction,
    PackagesServices.Update);

route.post('/delete',
    middleware.DeletePackagesValidation,
    middleware.validationFunction,
    PackagesServices.Delete);



module.exports = route;