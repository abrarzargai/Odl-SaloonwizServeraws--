const UserServicesModel = require('../models/UserServices');
const catchAsync = require('../utils/catchAsync');
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;
const nodemailer = require("nodemailer");
const EmailHandler = require('../utils/EmailHandler');
const ImgBase = 'https://api.salonwizz.co.uk/images/';
/***************Services************/

exports.Add = catchAsync(async (req, res, next) => {


    const Record = await UserServicesModel.create({...req.body})
        const Data = await UserServicesModel.aggregate([
              {
            $match: {
                User: ObjectId(req.body.User)
            }
        },
        {
            $lookup: {
                from: "users",       // other table name
                localField: "User",   // name of users table field
                foreignField: "_id", // name of userinfo table field
                as: "User"         // alias for userinfo table
            }
        }
    ])
    console.log(Data)
    /**EMAIL***/
    
    const Email =  EmailHandler.EmailHandler('SalonWizz Package Request',`
     User have request for Package<br/>
     Name : ${Data[0].User[0].FirstName || 'not available'}<br/>
     Email : ${Data[0].User[0].Email || 'not available'} <br/>
     ContactNumber : ${Data[0].User[0].ContactNumber || 'not available'}<br/>
     `);
    if (!Record) {
        throw new Error('Error! Utilities Cannot be added');
    }
    else {
        return res.status(201).json({
            success: true, message: "Added", Record,Data
        })
    }

})

exports.Update = catchAsync(async (req, res, next) => {
    console.log("hit", req.files)

    const IsFound = await UserServicesModel.findOne({ "_id": req.body.Id })
    console.log("IsFound", IsFound)
    if (!IsFound) {
        throw new Error('Error! User have not applied for this Utility');
    }

    console.log("data")

    const Record = await UserServicesModel.updateOne({ "_id": req.body.Id }, {...req.body})
    if (!Record.nModified > 0) {
        throw new Error('Error! Cannot be updated');
    }
    else {
        return res.status(201).json({
            success: true, message: "updated"
        })
    }

})


//Getone
exports.GetAll = catchAsync(async (req, res, next) => {

    const Data = await UserServicesModel.aggregate([
        {
            $lookup: {
                from: "users",       // other table name
                localField: "User",   // name of users table field
                foreignField: "_id", // name of userinfo table field
                as: "User"         // alias for userinfo table
            }
        }
    ])
    console.log("Data", Data)
    if (Data[0]) {

        return res.status(200).json({
            success: true, message: "get", Data
        })

    }
    else {
        return next(new Error(''))

    }
})

