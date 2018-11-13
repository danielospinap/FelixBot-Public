import * as mongoose from 'mongoose';
let Schema = mongoose.Schema;

let actionSchema = new Schema ({
    name: {
        type: String,
        required: 'Kindly enter the name of the action'
    },
    params: [String]
});

let actionModel = mongoose.model('Action', actionSchema);

export {actionModel}