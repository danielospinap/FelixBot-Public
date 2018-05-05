const Discord = require('discord.js');
const client = new Discord.Client();

var mongoose = require('mongoose');
var Menu = require('./models/menu')


const menusCtrller = require('./controllers/menu.js');
//TODO:Comentar cuando se suba
require('dotenv').config();

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL);

client.on('guildMemberAdd', member =>{
    menusCtrller('guildMemberAdd', member);
});

// client.on('message', msg => {
//     if(msg.isMemberMentioned(msg.guild.members.find('id', '412684316959834114'))) {
//         msg.reply("", {file: "https://i.ytimg.com/vi/ueIV4yxWTSQ/maxresdefault.jpg"});
//     }/*
//     if (msg.member.id === '212023192926027776' && msg.channel.id === '436212991055364096') {
//         menusCtrller('test', msg.member);
//     }*/
// });


//TODO Poner para que un admin pueda iniciarlo con un mensaje y con el miembro
/*
client.on('message', msg => {
    if (msg.member.id === '212023192926027776' && msg.channel.id === '436212991055364096') {
        canal = msg.guild.channels.find('name', 'bienvenidos-bebes-de-luz');
        console.log(' canal ' + canal.id);
        msg.reply('holi' + canal);
        //menusCtrller('guildMemberAdd', msg.member);

    }
});
*/
client.login(process.env.BOT_TOKEN);
