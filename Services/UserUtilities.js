const UserUtilitiesModel = require('../models/UserUtilitiesModel');
const UtilitiesModel = require('../models/UtilitiesModel');

const catchAsync = require('../utils/catchAsync');
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;
const ImgBase = 'https://odl-saloonwizz-app.herokuapp.com/images/'
/***************Services************/

exports.Add = catchAsync(async (req, res, next) => {
    console.log("hit",req.files)

    const IsFound = await UserUtilitiesModel.findOne({
        User: req.body.User, Utilities: {
            Title: req.body.UtilitiesTitle
        }
    })
    console.log("IsFound", IsFound)
    if (IsFound) {
        throw new Error('Error! User already have applied for this Utility');
    }
    
    console.log("data")

    const Record = await UserUtilitiesModel.create({
        ...req.body,
        Utilities: {
            Title: req.body.UtilitiesTitle,
            ...(req.body.UtilitiesSupplier && { Supplier: req.body.UtilitiesSupplier })
        },
        ...(req.files[0] && { LastBill: ImgBase + req.files[0].filename }),
        ...(req.files[1] && { LOAForm: ImgBase + req.files[1].filename })
    })
    if (!Record) {
        throw new Error('Error! Utilities Cannot be added');
    }
    else {
        return res.status(201).json({
            success: true, message: "Utilities has been added to User Record Successfully", Record
        })
    }

})

exports.Update = catchAsync(async (req, res, next) => {
    console.log("hit", req.files)

    const IsFound = await UserUtilitiesModel.findOne({"_id":req.body.Id})
    console.log("IsFound", IsFound)
    if (!IsFound) {
        throw new Error('Error! User have not applied for this Utility');
    }

    console.log("data")

    const Record = await UserUtilitiesModel.updateOne({"_id":req.body.Id},{
        ...req.body,
        Utilities: {
            Title: req.body.UtilitiesTitle,
            ...(req.body.UtilitiesSupplier && { Supplier: req.body.UtilitiesSupplier })
        },
        ...(req.files[0] && { LastBill: ImgBase + req.files[0].filename }),
        ...(req.files[1] && { LOAForm: ImgBase + req.files[1].filename })
    })
    if (!Record.nModified > 0) {
        throw new Error('Error! User Utilities Cannot be updated');
    }
    else {
        return res.status(201).json({
            success: true, message: "User Utilities has been updated  Successfully"
        })
    }

})

exports.Delete = catchAsync(async (req, res, next) => {
    try {
        const Record = await UserUtilitiesModel.deleteOne({ "_id": req.body.Id });
        if (Record.deletedCount == 0) {
            return res.status(500).json({
                success: false, message: "Error!  User Utilities Details Not found for this Id"
            })
        }

        return res.status(200).json({
            success: true, message: " User Utilities Deleted Successfully"
        })


    } catch (error) {
        return res.status(500).json({
            success: false, message: "Error!  User Utilities Details Not found for this Id"
        })
    }
})

//Getone
exports.GetOne = catchAsync(async (req, res, next) => {

    const Data = await UserUtilitiesModel.aggregate([
        {
            $match: {
                User:  ObjectId(req.body.User)
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
    const Utilities = await UtilitiesModel.find()
    let active = [];
    let inaactive = [];
    console.log("Data",Data)
    console.log("Utilities", Utilities)
    Utilities.map((utilityMap)=>{
        Data.map((DataMap)=>{
            if (utilityMap.Title === DataMap.Utilities.Title){
                active.push(utilityMap)
            }
            else{
                inaactive.push(utilityMap)
            }
        })

    })

    if (Data[0]) {

        return res.status(200).json({
            success: true, message: "Utility Found for this User",active,inaactive, Data
        })

    }
    else {
        return next(new Error('No Utility Found for this User'))

    }
})


//Getone
exports.GetAll = catchAsync(async (req, res, next) => {

    const Data = await UserUtilitiesModel.aggregate([
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
            success: true, message: "Utility Found for this User", Data
        })

    }
    else {
        return next(new Error('No Utility Found for this User'))

    }
})

exports.AddDeal = catchAsync(async (req, res, next) => {

    const User = await UserUtilitiesModel.find({ "_id": req.body.Id })
    if (User[0]) {
        console.log("req.body", req.body)
        const index = User[0].DealList.find((x) => x.Title == req.body.Title)
        console.log("index", index)
        if (!index) {
            User[0].DealList.push({
                Title: req.body.Title,
                Description: req.body.Description,
            })
            await User[0].save()
            let Data = User[0]
            return res.status(200).json({
                success: true, message: "Deal Added Successfully", Data
            })
        }
        throw new Error(`Error!  You Have Already send Deal ${req.body.Title} to This User  `);


    }
    else {
        return next(new Error('Utility not found'))

    }

})


exports.DeleteDeal = catchAsync(async (req, res, next) => {

    const User = await UserUtilitiesModel.find({ "_id": req.body.Id })
    if (User[0]) {
        console.log("req.body", req.body)
        const index = User[0].DealList.findIndex((x) => x.Title == req.body.Title)
        console.log("index", index)
        if (index > -1) {
            User[0].DealList.splice(index, 1)
            await User[0].save()
            let Data = User[0]
            return res.status(200).json({
                success: true, message: "Social Media Account Deleted Successfully", Data
            })
        }
        throw new Error(`Error!  No ${req.body.Title} Deal added yet `);


    }
    else {
        return next(new Error('Utility not found'))

    }

})

exports.AcceptDeal = catchAsync(async (req, res, next) => {

    const User = await UserUtilitiesModel.find({ "_id": req.body.Id })
    if (User[0]) {
        console.log("User[0].DealList", User[0].Deal.Title)
        if (!User[0].Deal.Title) {
            User[0].Deal.Title = req.body.Title;
            User[0].Deal.Description = req.body.Description;
            await User[0].save()
            let Data = User[0]
            return res.status(200).json({
                success: true, message: "Deal Accepted Successfully", Data
            })
        }
        throw new Error(`Error!  You Have Already Subscribed any other Deal `);


    }
    else {
        return next(new Error('Utility not found'))

    }

})