import * as Discord from 'discord.js';
import * as mongoose from "mongoose";
import { config as dotenvConfig } from "dotenv";
import { actionModel } from "./models/surveys/action";

import { createAction } from "./controllers/surveys/createSurvey";
import { createSurvey } from "./view/createSurvey";

// Enviroment vars to dev
dotenvConfig();

// Connection to DB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });



// register the models
actionModel;




// Starting bot
const client = new Discord.Client();
client.on('ready', () => {
    console.log("client.on: ready", "Felix listo");
});

client.on('message', (message) => {
    if (message.author.id !== process.env.BOT_ID) {
        createSurvey(message.member, <Discord.TextChannel> message.channel);
    }
});

client.login(process.env.BOT_TOKEN);