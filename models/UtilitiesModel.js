const mongoose = require("mongoose");
const UtilitiesSchema = new mongoose.Schema({

    Title: {
        type: String,
    },
    image: {
        type: String,
    },
    Supplier: [{
        type: String,
    }],
},
    {
        timestamps: true,
    });

const Utilities = mongoose.model("Utilities", UtilitiesSchema);
module.exports = Utilities;
