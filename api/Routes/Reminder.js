const express = require('express');
const route = express.Router();
const ReminderServices = require('../../Services/ReminderServices')
const middleware = require('../../utils/Middleware_validation')
const { authenticate } = require('../Middleware/auth')
/***************Routes************/

route.post('/add',
    middleware.AddReminderValidation,
    middleware.validationFunction,
    ReminderServices.Add);

route.get('/getall',
    ReminderServices.GetAll);

route.post('/update',
    middleware.UpdateReminderValidation,
    middleware.validationFunction,
    ReminderServices.Update);

route.post('/delete',
    middleware.DeleteReminderValidation,
    middleware.validationFunction,
    ReminderServices.Delete);


module.exports = route;