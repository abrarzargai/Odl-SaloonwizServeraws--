const mongoose = require("mongoose");
const UserUtilitiesSchema = new mongoose.Schema({

    Utilities: {
        Title: { type: String },
        Supplier: { type: String },
    },
    User: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    LastBill: {
        type: String,
    },
    ContractExpiryDate: {
        type: Date,
    },
    IsPaid: {
        type: Boolean,
    },
    Request: {
        type: Boolean,
    },
    LOAForm: {
        type: String,
    },
    DealList: [{
        Title: { type: String  },
        Description: { type: String  },
    }],
    Deal: {
        Title: { type: String  },
        Description: { type: String  },
    },
},
    {
        timestamps: true,
    });

const UserUtilities = mongoose.model("UserUtilities", UserUtilitiesSchema);
module.exports = UserUtilities;
