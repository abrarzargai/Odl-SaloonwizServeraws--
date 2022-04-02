const mongoose = require("mongoose");
const ReminderSchema = new mongoose.Schema({

    Title: {
        type: String,
    },
    Description: {
        type: String,
    },
    Date: {
        type: Date,
    },
},
    {
        timestamps: true,
    });

const Reminder = mongoose.model("Reminder", ReminderSchema);
module.exports = Reminder;
