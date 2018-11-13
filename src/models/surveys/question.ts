import * as mongoose from 'mongoose';
let Schema = mongoose.Schema;

let questionSchema = new Schema ({
    statement: {
        type: String,
        required: 'Kindly enter the statement of the question'
    },
    options: [{
        type: Schema.Types.ObjectId,
        ref: 'Option'
    }]
});

module.exports = mongoose.model('Question', questionSchema);