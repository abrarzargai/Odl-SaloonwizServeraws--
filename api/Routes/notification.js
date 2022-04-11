const express = require('express');
const route = express.Router();
const notficationService = require('../../Services/notficationService')
const middleware = require('../../utils/Middleware_validation')
const { authenticate } = require('../Middleware/auth')
/***************Routes************/

route.post('/add',
notficationService.Add);
route.post('/update',
notficationService.Update);
route.post('/delete',
notficationService.Delete);
route.post('/getOne',
notficationService.GetOne);
route.get('/getall',
notficationService.GetAll);

module.exports = route;
