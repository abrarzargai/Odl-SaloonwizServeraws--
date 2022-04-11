const express = require('express');
const route = express.Router();
const UserServices = require('../../Services/userService')
const middleware = require('../../utils/Middleware_validation')
const { authenticate } = require('../Middleware/auth')
/***************Routes************/

route.post('/signup',
    UserServices.SignUp);

route.post('/login',
    middleware.UserLoginValidation,
    middleware.validationFunction,
    UserServices.Login);

route.post('/update',
    middleware.UserUpdateValidation,
    middleware.validationFunction,
    UserServices.Update);

route.post('/updatepassword',
    middleware.UserUpdatePasswordValidation,
    middleware.validationFunction,
    UserServices.Updatepassword);


route.post('/resetpassword',
    middleware.UserPasswordResetValidation,
    middleware.validationFunction,
    UserServices.RestPassword);    

route.get('/GetAllUsers',
    UserServices.GetAllUsers);

route.post('/Getoneuser',
    UserServices.Getoneuser);

route.post('/addlink',
    middleware.AddSocialMediaAccountValidation,
    middleware.validationFunction,
    UserServices.AddSocialMediaAccount);

route.post('/updatelink',
    middleware.UpdateSocialMediaAccountValidation,
    middleware.validationFunction,
    UserServices.UpdateSocialMediaAccount);

route.post('/deletelink',
    middleware.DeleteSocialMediaAccountValidation,
    middleware.validationFunction,
    UserServices.DeleteSocialMediaAccount);

route.post('/addfile',
    middleware.AddFileValidation,
    middleware.validationFunction,
    UserServices.AddFile);

route.post('/deletefile',
    middleware.DeleteFileValidation,
    middleware.validationFunction,
    UserServices.DeleteFile);

route.get('/get',
    UserServices.Get);

route.get('/getFilling',
    UserServices.getFilling);
    
module.exports = route;
