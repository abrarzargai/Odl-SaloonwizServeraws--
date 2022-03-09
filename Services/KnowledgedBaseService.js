const KnowledgedBaseModel = require('../models/KnowledgedBaseModel');
const catchAsync = require('../utils/catchAsync');
const ImgBase = 'https://54.226.251.96/images/'

/***************Services************/

exports.Add = catchAsync(async (req, res, next) => {
    if (!req.files[0]) {
        return next(new Error('Error! File not found'))
    }
    const Record = await KnowledgedBaseModel.create({ ...req.body, URL: ImgBase + req.files[0].filename })
    if (!Record) {
        throw new Error('Error! File Cannot be added');
    }
    else {
        return res.status(201).json({
            success: true, message: "New File Added Successfully", Record
        })
    }

})

exports.GetAll = catchAsync(async (req, res, next) => {

    const Data = await KnowledgedBaseModel.find()
    if (Data[0]) {

        return res.status(200).json({
            success: true, message: "Files Found", Data
        })

    }
    else {
        return next(new Error('No File Found'))

    }

})


exports.Update = catchAsync(async (req, res, next) => {
    try {
        const Record = await KnowledgedBaseModel.updateOne({ "_id": req.body.Id }, { ...req.body });
        if (Record.nModified > 0) {
            return res.status(200).json({
                success: true, message: "file Updated Successfully"
            })
        }
        return res.status(500).json({
            success: false, message: "Error!  File Not found for this Id"
        })
    } catch (error) {
        return res.status(500).json({
            success: false, message: "Error!  File Not found for this Id"
        })
    }
})


exports.Delete = catchAsync(async (req, res, next) => {
    try {
        const Record = await KnowledgedBaseModel.deleteOne({ "_id": req.body.Id });
        if (Record.deletedCount == 0) {
            return res.status(500).json({
                success: false, message: "Error!  File Not found for this Id"
            })
        }
        
            return res.status(200).json({
                success: true, message: "file Deleted Successfully"
            })
        
       
    } catch (error) {
        return res.status(500).json({
            success: false, message: "Error!  File Not found for this Id"
        })
    }
})


//pagination query 
exports.Get = catchAsync(async (req, res, next) => {
    console.log(req.query.page)
    const start = (req.query.page * 10) - 9 ; 
    const end = req.query.page * 10 
    console.log(start, end)
    const Data = await KnowledgedBaseModel.find(
        {
            ...(req.query.Type && {Type: req.query.Type})
        }
    ).limit(end).skip(start-1)
    if (Data[0]) {

        return res.status(200).json({
            success: true, message: "Files Found", Data
        })

    }
    else {
        return next(new Error('No File Found'))

    }

})
