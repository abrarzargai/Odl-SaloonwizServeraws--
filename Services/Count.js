const userModel = require('../models/userModel');
const KnowledgedBaseModel = require('../models/KnowledgedBaseModel');
const PackagesModel = require('../models/PackagesModel');
const ReminderModel = require('../models/ReminderModel');
const DigitalAssistanceModel = require('../models/DigitalAssistanceModel');
const UtilitiesModel = require('../models/UtilitiesModel');
const UserUtilitiesModel = require('../models/UserUtilitiesModel');
const catchAsync = require('../utils/catchAsync');

exports.GetAll = catchAsync(async (req, res, next) => {

    const user = await userModel.count()
    const KnowledgedBase = await KnowledgedBaseModel.count()
    const Reminder = await ReminderModel.count()
    const DigitalAssistance = await DigitalAssistanceModel.count()
    const Utilities = await UtilitiesModel.count()
    const UsersUtilities = await UserUtilitiesModel.count()
    const Services = await PackagesModel.count()

    const data = {
        user: user || 0,
        KnowledgedBase: KnowledgedBase || 0,
        Reminder: Reminder || 0,
        DigitalAssistance: DigitalAssistance || 0,
        Utilities: Utilities || 0,
        Services: Services||0,
        UsersUtilities: UsersUtilities||0

    }
    console.log(data)
        return res.status(200).json({
            success: true, message: "Message Details Found", Data:data
        })



})