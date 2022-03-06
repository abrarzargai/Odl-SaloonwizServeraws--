const ReminderModel = require('../models/ReminderModel');
const catchAsync = require('../utils/catchAsync');

/***************Services************/

exports.Add = catchAsync(async (req, res, next) => {

    const Record = await ReminderModel.create({ ...req.body })
    if (!Record) {
        throw new Error('Error! Reminder Details Cannot be added');
    }
    else {
        return res.status(201).json({
            success: true, message: "New Reminder Added Successfully", Record
        })
    }

})

exports.GetAll = catchAsync(async (req, res, next) => {

    const Data = await ReminderModel.find()
    if (Data[0]) {

        return res.status(200).json({
            success: true, message: "Reminder Details Found", Data
        })

    }
    else {
        return next(new Error('No Reminder Details Found'))

    }

})


exports.Update = catchAsync(async (req, res, next) => {
    try {
        const Record = await ReminderModel.updateOne({ "_id": req.body.Id }, { ...req.body });
        if (Record.nModified > 0) {
            return res.status(200).json({
                success: true, message: "Reminder Updated Successfully"
            })
        }
        return res.status(500).json({
            success: false, message: "Error!  Reminder Details not found for this Id"
        })
    } catch (error) {
        return res.status(500).json({
            success: false, message: "Error!  Reminder Details not found for this Id"
        })
    }
})


exports.Delete = catchAsync(async (req, res, next) => {
    try {
        const Record = await ReminderModel.deleteOne({ "_id": req.body.Id });
        if (Record.deletedCount == 0) {
            return res.status(500).json({
                success: false, message: "Error!  Reminder Details Not found for this Id"
            })
        }

        return res.status(200).json({
            success: true, message: "Reminder Deleted Successfully"
        })


    } catch (error) {
        return res.status(500).json({
            success: false, message: "Error!  Reminder Details Not found for this Id"
        })
    }
})