const DigitalAssistanceModel = require('../models/DigitalAssistanceModel');
const catchAsync = require('../utils/catchAsync');

/***************Services************/

exports.Add = catchAsync(async (req, res, next) => {

    const Record = await DigitalAssistanceModel.create({ ...req.body })
    if (!Record) {
        throw new Error('Error! Message Details Cannot be added');
    }
    else {
        return res.status(201).json({
            success: true, message: "New Message Added Successfully", Record
        })
    }

})

exports.GetAll = catchAsync(async (req, res, next) => {

    const Data = await DigitalAssistanceModel.find()
    if (Data[0]) {

        return res.status(200).json({
            success: true, message: "Message Details Found", Data
        })

    }
    else {
        return next(new Error('No Message Details Found'))

    }

})


exports.Update = catchAsync(async (req, res, next) => {
    try {
        const Record = await DigitalAssistanceModel.updateOne({ "_id": req.body.Id }, { ...req.body });
        if (Record.nModified > 0) {
            return res.status(200).json({
                success: true, message: "Message Updated Successfully"
            })
        }
        return res.status(500).json({
            success: false, message: "Error!  Message Detail not found for this Id"
        })
    } catch (error) {
        return res.status(500).json({
            success: false, message: "Error! Message Details not found for this Id"
        })
    }
})

