const NotificationModel = require('../models/notificationmodel');
const catchAsync = require('../utils/catchAsync');
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
/***************Services************/

exports.Add = catchAsync(async (req, res, next) => {

    const Record = await NotificationModel.create({ ...req.body })
    if (!Record) {
        throw new Error('Error! Cannot Added');
    }
    else {
        return res.status(201).json({
            success: true, message: "New Record Added Successfully", Record
        })
    }

})

exports.GetAll = catchAsync(async (req, res, next) => {

    const Data = await UserUtilitiesModel.aggregate([
        {
          $lookup: {
            from: "users", // other table name
            localField: "To", // name of users table field
            foreignField: "_id", // name of userinfo table field
            as: "To", // alias for userinfo table
          },
        },
        {
            $lookup: {
              from: "users", // other table name
              localField: "From", // name of users table field
              foreignField: "_id", // name of userinfo table field
              as: "From", // alias for userinfo table
            },
          },
      ]);
    if (Data[0]) {

        return res.status(200).json({
            success: true, message: " Details Found", Data
        })

    }
    else {
        return next(new Error('No Details Found'))

    }

})

exports.GetOne = catchAsync(async (req, res, next) => {
    console.log(req.body)
    const Data = await NotificationModel.aggregate([
        {
            $match: {
              To: ObjectId(req.body.To),
            },
          },
        {
          $lookup: {
            from: "users", // other table name
            localField: "To", // name of users table field
            foreignField: "_id", // name of userinfo table field
            as: "To", // alias for userinfo table
          },
        },
        {
            $lookup: {
              from: "users", // other table name
              localField: "From", // name of users table field
              foreignField: "_id", // name of userinfo table field
              as: "From", // alias for userinfo table
            },
          },
      ]);
      console.log(Data)
   

        return res.status(200).json({
            success: true, message: " Details Found", Data
        })

  

})

exports.Update = catchAsync(async (req, res, next) => {
    try {
        const Record = await NotificationModel.updateOne({ "_id": req.body.Id }, { IsRead:true });
        if (Record.nModified > 0) {
            return res.status(200).json({
                success: true, message: "Record Updated Successfully"
            })
        }
        return res.status(500).json({
            success: false, message: "Error!  Record Details not found for this Id"
        })
    } catch (error) {
        return res.status(500).json({
            success: false, message: "Error!  Record Details not found for this Id"
        })
    }
})


exports.Delete = catchAsync(async (req, res, next) => {
    try {
        const Record = await NotificationModel.deleteOne({ "_id": req.body.Id });
        if (Record.deletedCount == 0) {
            return res.status(500).json({
                success: false, message: "Error!  Record Details Not found for this Id"
            })
        }

        return res.status(200).json({
            success: true, message: "Record Deleted Successfully"
        })


    } catch (error) {
        return res.status(500).json({
            success: false, message: "Error!  Record not found for this Id"
        })
    }
})