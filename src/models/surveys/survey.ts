import * as mongoose from 'mongoose';
let Schema = mongoose.Schema;

let surveySchema = new Schema ({
    name: {
        type: String,
        required: 'Kindly enter the name of the survey'
    },
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }]
});

module.exports = mongoose.model('Survey', surveySchema);