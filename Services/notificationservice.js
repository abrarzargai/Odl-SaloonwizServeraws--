const notificationModel = require('../models/notification');
const catchAsync = require('../utils/catchAsync');
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;
/***************Services************/

exports.Add = catchAsync(async (req, res, next) => {

    const Record = await notificationModel.create({ ...req.body })
    if (!Record) {
        throw new Error('Error!  Cannot be added');
    }
    else {
        return res.status(201).json({
            success: true, message: " Added Successfully", Record
        })
    }

})

//GetAll
exports.GetAll = catchAsync(async (req, res, next) => {

    const Data = await notificationModel.aggregate([
        {
            $lookup: {
                from: "users",       // other table name
                localField: "User",   // name of users table field
                foreignField: "_id", // name of userinfo table field
                as: "User"         // alias for userinfo table
            }
        },
        {
            $lookup: {
                from: "users",       // other table name
                localField: "For",   // name of users table field
                foreignField: "_id", // name of userinfo table field
                as: "For"         // alias for userinfo table
            }
        }
    ])
    console.log("Data", Data)
    if (Data[0]) {

        return res.status(200).json({
            success: true, message: " Found ", Data
        })

    }
    else {
        return next(new Error('No  Found'))

    }
})//GetAll
exports.GetOne = catchAsync(async (req, res, next) => {

    const Data = await notificationModel.aggregate([
        {
            $match: {
                For: ObjectId(req.body.For)
            }
        },
        {
            $lookup: {
                from: "users",       // other table name
                localField: "User",   // name of users table field
                foreignField: "_id", // name of userinfo table field
                as: "User"         // alias for userinfo table
            }
        },
        {
            $lookup: {
                from: "users",       // other table name
                localField: "For",   // name of users table field
                foreignField: "_id", // name of userinfo table field
                as: "For"         // alias for userinfo table
            }
        }
    ])
    console.log("Data", Data)
    if (Data[0]) {

        return res.status(200).json({
            success: true, message: " Found", Data
        })

    }
    else {
        return next(new Error('Not Found '))

    }
})


exports.GetAllAdmin = catchAsync(async (req, res, next) => {

    const Data = await notificationModel.aggregate([
        {
            $match: {
                Role: 'user'||'User'
            }
        },
        {
            $lookup: {
                from: "users",       // other table name
                localField: "User",   // name of users table field
                foreignField: "_id", // name of userinfo table field
                as: "User"         // alias for userinfo table
            }
        },
        {
            $lookup: {
                from: "users",       // other table name
                localField: "For",   // name of users table field
                foreignField: "_id", // name of userinfo table field
                as: "For"         // alias for userinfo table
            }
        }
    ])
    console.log("Data", Data)
    if (Data[0]) {

        return res.status(200).json({
            success: true, message: "Utility Found for this User", Data
        })

    }
    else {
        return next(new Error('No Utility Found for this User'))

    }
})