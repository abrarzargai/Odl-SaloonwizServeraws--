const express = require('express');
const route = express.Router();
const KnowledgedBaseService = require('../../Services/KnowledgedBaseService')
const middleware = require('../../utils/Middleware_validation')
const { authenticate } = require('../Middleware/auth')
/***************Routes************/

route.post('/add',
    middleware.AddKnowledgedBaseValidation,
    middleware.validationFunction,
    KnowledgedBaseService.Add);

route.get('/getall',
    KnowledgedBaseService.GetAll);

route.post('/update',
    middleware.UpdateKnowledgedBaseValidation,
    middleware.validationFunction,
    KnowledgedBaseService.Update);

route.post('/delete',
    middleware.DeleteKnowledgedBaseValidation,
    middleware.validationFunction,
    KnowledgedBaseService.Delete);

route.get('/get',
    KnowledgedBaseService.Get);

module.exports = route;