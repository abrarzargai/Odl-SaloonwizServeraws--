const mongoose = require("mongoose");
const PackageSchema = new mongoose.Schema({

    Title: {
        type: String,
    },
    Description: {
        type: String,
    },
    Amount: {
        type: Number,
    },
    Type: {
        type: String,
    },
    Duration: {
        type: String,
    },
},
    {
        timestamps: true,
    });

const Package = mongoose.model("Package", PackageSchema);
module.exports = Package;
