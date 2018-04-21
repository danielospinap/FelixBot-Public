var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var menuSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the name of the menu'
    },
    trigger: {
        type: String,
        required: 'Kindly enter the trigger of the menu'
    },
    channel: {
        type: String,
        required: 'Kindly enter the channel of the menu'
    },
    questions: [{type: Schema.Types.ObjectId, ref: 'Question'}]
});

var questionSchema = new Schema({
    statement: {
        type: String,
        required: 'Kindly enter the statement of the question'
    },
    options: [{type: Schema.Types.ObjectId, ref: 'Option'}]
});

var optionSchema = new Schema({
    emoji: {
        type: String,
        required: 'Kindly enter the emoji of the option'
    },
    action: {
        type: String,
        required: 'Kindly enter the action of the option'
    },
    params: [String],
    image: String
});

var Question = mongoose.model('Question', questionSchema);
var Option = mongoose.model('Option', optionSchema);

module.exports = mongoose.model('Menu', menuSchema);
