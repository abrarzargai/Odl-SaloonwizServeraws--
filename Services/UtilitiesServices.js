const UtilitiesModel = require('../models/UtilitiesModel');
const catchAsync = require('../utils/catchAsync');
// const ImgBase = 'http://localhost:8080/images/'
const ImgBase = 'https://api.salonwizz.co.uk/images/'
/***************Services************/

exports.Add = catchAsync(async (req, res, next) => {

    const IsFound = await UtilitiesModel.find({Title:req.body.Title})
    console.log("IsFound")
    if (IsFound[0]){
        throw new Error('Error! Utilities with this name already exist');
    }
    const Record = await UtilitiesModel.create({ ...req.body, image:ImgBase+req.files[0].filename })
    if (!Record) {
        throw new Error('Error! Utilities Details Cannot be added');
    }
    else {
        return res.status(201).json({
            success: true, message: "New Utilities Added Successfuly", Record
        })
    }

})

exports.GetAll = catchAsync(async (req, res, next) => {

    const Data = await UtilitiesModel.find()
    if (Data[0]) {

        return res.status(200).json({
            success: true, message: "Utilities Details Found", Data
        })

    }
    else {
        return next(new Error('No Utilities Details Found'))

    }

})


exports.AddSupplier = catchAsync(async (req, res, next) => {

    const Response = await UtilitiesModel.find({ "_id": req.body.Id })

    if (Response[0]) {
       
        const index = Response[0].Supplier.find((x) => x == req.body.Supplier)
        console.log("index", index)
        if (!index) {
            Response[0].Supplier.push(req.body.Supplier)
            await Response[0].save()
            let Data = Response[0]
            return res.status(200).json({
                success: true, message: "Supplier Added Successfully", Data
            })
        }
        throw new Error(`Error!  You Have Already added ${req.body.Supplier} Supplier  `);


    }
    else {
        return next(new Error('Utility with this Id not found'))

    }
})

exports.DeleteSupplier = catchAsync(async (req, res, next) => {

    const Response = await UtilitiesModel.find({ "_id": req.body.Id })
    if (Response[0]) {
        console.log("req.body", req.body)
        const index = Response[0].Supplier.findIndex((x) => x == req.body.Supplier)
        console.log("index", index)
        if (index > -1) {
            Response[0].Supplier.splice(index, 1)
            await Response[0].save()
            let Data = Response[0]
            return res.status(200).json({
                success: true, message: "Supplier Deleted Successfully", Data
            })
        }
        throw new Error(`Error!  No ${req.body.Supplier} Supplier added yet `);


    }
    else {
        return next(new Error('Utility with this Id Not Found'))

    }
})

exports.Delete = catchAsync(async (req, res, next) => {
    try {
        console.log("record")
        const Record = await UtilitiesModel.deleteOne({ "_id": req.body.Id });
        console.log("record",Record)
        if (Record.deletedCount == 0) {
            return res.status(500).json({
                success: false, message: "Error!  Utilities Details Not found for this Id"
            })
        }

        return res.status(200).json({
            success: true, message: "Utilities Deleted Successfully"
        })


    } catch (error) {
        return res.status(500).json({
            success: false, message: "Error!  Utilities Details Not found for this Id"
        })
    }
})


exports.Update = catchAsync(async (req, res, next) => {
    try {
        const Record = await UtilitiesModel.updateOne({ "_id": req.body.Id }, { ...req.body });
        if (Record.nModified > 0) {
            return res.status(200).json({
                success: true, message: "Utilities Updated Successfully"
            })
        }
        return res.status(500).json({
            success: false, message: "Error!  Utilities Details not found for this Id"
        })
    } catch (error) {
        return res.status(500).json({
            success: false, message: "Error!  Utilities Details not found for this Id"
        })
    }
})
