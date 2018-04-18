const Discord = require('discord.js');
const client = new Discord.Client();
//var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
// var MenuModel = require('./models/menu.js');
// var Menu = MenuModel.Menu;
// var Question = MenuModel.Question;
// var Option = MenuModel.Option;
var Menu = require('./models/menu')


const menusCtrller = require('./controllers/menu.js');
//TODO:Comentar cuando se suba
require('dotenv').config();

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL);
//mongoose.connect('mongodb://localhost/prueba5')


/*
const url = process.env.DB_URL;
var stringsInicio = [];
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("felixdbguo");
    dbo.collection("inicio").find({}).toArray(function(err, result) {
        if (err) throw err;
        stringsInicio = result;
        db.close();
    });
});

*/
client.on('guildMemberAdd', member =>{
    //menusCtrller("inicio", member.guild.channels.find('name', 'bienvenidos-bebes-de-luz'), member);
    menusCtrller();
});

client.on('message', msg => {
    menusCtrller();
});
/*
client.on('message', msg => {
    //TODO Quitar if al parsar a producción:
    //var channel = msg.guild.channels.find('name', 'bienvenidos-bebes-de-luz');
    var channel = msg.guild.channels.find('name', 'jamon-test');
    if (msg.content === 'a') {
        console.log("entra");

        menus("inicio", channel, msg.member);
    }
});

/*
client.on('message', msg => {
    const member = msg.member;
    if (member.id === "411362716998172683"){
        var yesEmoji = msg.guild.emojis.find('name', 'yes');
        var noEmoji = msg.guild.emojis.find('name', 'no');
        msg.react(yesEmoji);
        msg.react(noEmoji);
        //messagefunc(msg);
    } else {
        console.log("id" + member.id);
        iniciacion(member, stringsInicio);
/*
        var saludoPartes = saludo.split("@member");
        var salida = saludoPartes[0] + member + saludoPartes[1];
        msg.channel.send(salida);
        console.log(respuestaTrapitos);
        var roles = member.guild.roles;
        if (respuestaTrapitos === "yes") {
            member.addRole(roles.find('name', 'Trap Lover'));
            console.log("holi");
        } else if (respuestaTrapitos === "no") {
            member.addRole(roles.find('name', 'Trap Hater'));
        }
/*
    }


});
/**/

client.login(process.env.BOT_TOKEN);
