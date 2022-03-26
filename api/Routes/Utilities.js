const express = require('express');
const route = express.Router();
const UtilitiesServices = require('../../Services/UtilitiesServices')
const middleware = require('../../utils/Middleware_validation')
const { authenticate } = require('../Middleware/auth')
/***************Routes************/

route.post('/add',
    middleware.AddUtilitiesValidation,
    middleware.validationFunction,
    UtilitiesServices.Add);

route.get('/getall',
    UtilitiesServices.GetAll);

route.post('/update',
    middleware.UpdateUtilitiesValidation,
    middleware.validationFunction,
    UtilitiesServices.Update);

route.post('/delete',
    middleware.DeleteUtilitiesValidation,
    middleware.validationFunction,
    UtilitiesServices.Delete);


route.post('/addSupplier',
    middleware.AddSupplierUtilitiesValidation,
    middleware.validationFunction,
    UtilitiesServices.AddSupplier);

route.post('/deleteSupplier',
    middleware.AddSupplierUtilitiesValidation,
    middleware.validationFunction,
    UtilitiesServices.DeleteSupplier);

module.exports = route;