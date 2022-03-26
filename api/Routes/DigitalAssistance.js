const express = require('express');
const route = express.Router();
const DigitalAssistanceService = require('../../Services/DigitalAssistanceService')
const middleware = require('../../utils/Middleware_validation')
const { authenticate } = require('../Middleware/auth')
/***************Routes************/

route.post('/add',
    middleware.AddDigitalAssistanceValidation,
    middleware.validationFunction,
    DigitalAssistanceService.Add);

route.get('/getall',
    DigitalAssistanceService.GetAll);

route.post('/update',
    middleware.UpdateDigitalAssistanceValidation,
    middleware.validationFunction,
    DigitalAssistanceService.Update);

module.exports = route;