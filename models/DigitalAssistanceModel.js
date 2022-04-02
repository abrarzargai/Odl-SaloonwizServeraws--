const mongoose = require("mongoose");
const DigitalAssistanceSchema = new mongoose.Schema({

    UserName: {
        type: String,
    },
    isRead: {
        type: Boolean,
    },

},
    {
        timestamps: true,
    });

const DigitalAssistance = mongoose.model("DigitalAssistance", DigitalAssistanceSchema);
module.exports = DigitalAssistance;
