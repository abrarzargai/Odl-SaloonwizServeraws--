
const mongoose = require("mongoose");
const UserPackageSchema = new mongoose.Schema({

    Package: {
        type: mongoose.Types.ObjectId,
        ref: 'Package',
    },
    User: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    StartingDate: {
        type: Date,
    },
    EndingDate: {
        type: Date,
    },
    Status: {
        type: String,
       // enum:['pending','approved']
    },
},
    {
        timestamps: true,
    });

const UserPackage = mongoose.model("UserPackage", UserPackageSchema);
module.exports = UserPackage;
