const mongoose = require("mongoose");
const NotificationSchema = new mongoose.Schema({

    message: {
        type: String,
    },
    User: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    For: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    Role: {
        type: String,
        default: 'user',
    },
},
    {
        timestamps: true,
    });
//added new
const Notification = mongoose.model("Notification", NotificationSchema);
module.exports = Notification;
