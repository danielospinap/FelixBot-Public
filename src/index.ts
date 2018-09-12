import * as Discord from 'discord.js';
import * as mongoose from "mongoose";
import { config as dotenvConfig } from "dotenv";

// Enviroment vars to dev
dotenvConfig();

// Connection to DB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })


// Starting bot
const client = new Discord.Client();
client.on('ready', () => {
    console.log("client.on: ready", "Felix listo");
});

client.login(process.env.BOT_TOKEN)