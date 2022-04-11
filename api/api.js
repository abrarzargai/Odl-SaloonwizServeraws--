const express = require('express');
const router = express.Router();

//Required api's 

const User = require('./Routes/Userapi')
const Email = require('./Routes/Email')
const KnowledgedBase = require('./Routes/KnowledgedBase')
const Packages = require('./Routes/Packages')
const Utilities = require('./Routes/Utilities')
const Reminder = require('./Routes/Reminder')
const DigitalAssistance = require('./Routes/DigitalAssistance')
const UserUtilities = require('./Routes/UserUtilities')
const UserServices = require('./Routes/UserServices')
const notificationService = require('./Routes/notification')

/*********Main Api**********/
router.use('/user',User);
router.use('/email', Email);
router.use('/KnowledgedBase', KnowledgedBase);
router.use('/Packages', Packages);
router.use('/Utilities', Utilities);
router.use('/Reminder', Reminder);
router.use('/DigitalAssistance', DigitalAssistance);
router.use('/UserUtilities', UserUtilities);
router.use('/UserServices', UserServices);
router.use('/notification', notificationService);


module.exports = router;