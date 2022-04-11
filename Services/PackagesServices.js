const PackagesModel = require('../models/PackagesModel');
const catchAsync = require('../utils/catchAsync');

/***************Services************/

exports.Add = catchAsync(async (req, res, next) => {
   
    const Record = await PackagesModel.create({ ...req.body })
    if (!Record) {
        throw new Error('Error! Package Details Cannot be added');
    }
    else {
        return res.status(201).json({
            success: true, message: "New Package Added Successfully", Record
        })
    }

})

exports.GetAll = catchAsync(async (req, res, next) => {

    const Data = await PackagesModel.find()
    if (Data[0]) {

        return res.status(200).json({
            success: true, message: "Package Details Found", Data
        })

    }
    else {
        return next(new Error('No Package Details Found'))

    }

})


exports.Update = catchAsync(async (req, res, next) => {
    try {
        const Record = await PackagesModel.updateOne({ "_id": req.body.Id }, { ...req.body });
        if (Record.nModified > 0) {
            return res.status(200).json({
                success: true, message: "file Updated Successfully"
            })
        }
        return res.status(500).json({
            success: false, message: "Error!  Package Details not found for this Id"
        })
    } catch (error) {
        return res.status(500).json({
            success: false, message: "Error!  Package Details not found for this Id"
        })
    }
})


exports.Delete = catchAsync(async (req, res, next) => {
    try {
        const Record = await PackagesModel.deleteOne({ "_id": req.body.Id });
        if (Record.deletedCount == 0) {
            return res.status(500).json({
                success: false, message: "Error!  Package Details Not found for this Id"
            })
        }

        return res.status(200).json({
            success: true, message: "Package Deleted Successfully"
        })


    } catch (error) {
        return res.status(500).json({
            success: false, message: "Error!  Package Details Not found for this Id"
        })
    }
})

