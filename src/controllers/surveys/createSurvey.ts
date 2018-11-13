import * as mongoose from 'mongoose';
import * as Discord from 'discord.js';

let Action = mongoose.model('Action');

function createSurvey () {
    
}

function createAction (name:String) {
    let newAction = new Action ({ name: name });
    newAction.save( (err) => {
        if (err) {
            console.error(`createAction error: ${err}`);
        } else {
            console.log(`createAction saved ${newAction}`);
        }
    });
}

export {createAction}


