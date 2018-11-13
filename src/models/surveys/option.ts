import * as mongoose from 'mongoose';
let Schema = mongoose.Schema;

let optionSchema = new Schema ({
    text: {
        type: String,
        required: 'Kindly enter the text of the option'
    },
    emoji: {
        type: String
    },
    actions: [{
        type: Schema.Types.ObjectId,
        ref: 'Action'
    }]
});

module.exports = mongoose.model('Option', optionSchema);