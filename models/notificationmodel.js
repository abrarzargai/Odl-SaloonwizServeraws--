const mongoose = require("mongoose");
const NotificationSchema = new mongoose.Schema({

    To: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    From: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    IsRead: {
        default:false,
        type: Boolean,
    },
    Message: {
        type: String,
    },
    Title: {
        type: String,
    },
},
    {
        timestamps: true,
    });

const Notification = mongoose.model("Notification", NotificationSchema);
module.exports = Notification;
