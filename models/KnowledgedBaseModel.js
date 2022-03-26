const mongoose = require("mongoose");
const KnowledgedBaseSchema = new mongoose.Schema({

    Title: {
        type: String,
    },
    Description: {
        type: String,
    },
    URL: {
        type: String,
    },
    Type: {
        type: String,
      // enum: ['faqs', 'articles','tutorials],
    },
},
    {
        timestamps: true,
    });

const KnowledgedBase = mongoose.model("KnowledgedBase", KnowledgedBaseSchema);
module.exports = KnowledgedBase;
