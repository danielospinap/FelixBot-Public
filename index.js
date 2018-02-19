const Discord = require('discord.js');
const client = new Discord.Client();
const iniciacion = require('./iniciacion.js');
const menus = require('./menus.js');
var MongoClient = require('mongodb').MongoClient;
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


client.on('guildMemberAdd', member =>{
    iniciacion(member, stringsInicio);
});
*/
client.on('message', msg => {
    menus("inicio", msg.channel, msg.member);
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
