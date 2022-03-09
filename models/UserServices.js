const mongoose = require("mongoose");
const UserServicesSchema = new mongoose.Schema({


    User: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    Package: {
        type: String,
    },
    Status: {
        type: String,
    }
},
    {
        timestamps: true,
    });

const UserServices = mongoose.model("UserServices", UserServicesSchema);
module.exports = UserServices;
