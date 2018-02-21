Menu = require("./models/model.js");

var questions;
var qi;

function startMenu(menuName, channel, member) {
    Menu.findByName(menuName, function(err, menu) {
        if (menu.data.length == 0) {
            console.log("Menu not found.");
            return;
        }
        //console.log(menu.data[0].questions[0].q.statement);
        questions = menu.data[0].questions;
        qi = 0;
        showQuestion(channel, member);
    });
}

function showQuestion(channel, member) {
    if (qi < questions.length) {
        statement = parseStatement(questions[qi].q.statement, member);
        statement = statement + member.guild.roles.find('name', 'edita roles');
        console.log(statement);
        channel.send(statement).then(msg => {
            addReactions(member, msg, questions[qi].q.reactions, 0);
        });
    }
}
/*
//TODO: volver recursivo
function showMenu(menu, channel, member) {
    console.log(menu);
    questions = menu.data[0].questions;
    //for (var i = 0; i < questions.length; i++) {
        statement = parseStatement(questions[0].q.statement, member);
        channel.send(statement).then(msg => {
            addReactions(member, msg, questions[i].q.reactions, 0);
        });
    //}

}*/

function parseStatement(text, member) {
    statement = parseMember(text, member);
    statement = parseEmoji(statement, member);
    return statement;
}

function parseMember(text, member) {
    var parts = text.split("@member");
    var parsedText = parts[0];
    for (var i = 1; i < parts.length; i++) {
        parsedText = parsedText + member + parts[i];
    }

    console.log(parsedText);
    return parsedText;
}

function parseEmoji(text, member) {
    var emojis = member.guild.emojis;
    var parts = text.split(/:\w+:/);
    var parsedText = parts[0];
    console.log(parts);

    for (var i = 1; i < parts.length && i > 0; i++) {
        console.log(text);
        var s = text.search(/:\w+:/);
        var f = text.substring(s+1).search(":");
        var textEmoji = text.substring(s+1, f+s+1);

        var emoji = emojis.find('name', text.substring(s+1, f+s+1));
        if (emoji == null) {
            console.log("Emoji not found.");
            emoji = ":" + textEmoji + ":";
        }

        parsedText = parsedText + emoji + parts[i];

        text = text.substring(f+s+1);
    }

    console.log(parsedText);
    return parsedText;
}

function addReactions(member, msg, reactions, ri) {
    if (ri < reactions.length) {
        console.log("agrega reaccion");
        var emojiName = reactions[ri].opt.emoji;
        console.log(member.guild.emojis.find('name', emojiName));
        msg.react(member.guild.emojis.find('name', emojiName)).then(reaction =>{
            addReactions(member, msg, reactions, ri+1);
        });
    } else {
        identifyReaction(member, msg, emojiName => {
            runAction(member, msg, reactions, emojiName);
            qi++;
            showQuestion(msg.channel, member);
        });
    }
}

//TODO: generalizar para cualquier reaccion
function identifyReaction(member, msg, callback){
    console.log("Waiting for reactions");
    const filter =(reaction) => reaction.emoji.name === "yes" || reaction.emoji.name === "no";
    const collector = msg.createReactionCollector(filter, { time: 30000 });

    collector.on('collect', reaction => {
        reaction.fetchUsers().then(users => {
            var user = users.find('id', member.id);
            if(user != null){
                console.log(user.username + ' reacted with emoji ' + reaction.emoji.name);
                collector.stop();

                callback(reaction.emoji.name);
            }
        });
    });

    collector.on('end', r => {
        msg.delete();
    })
}

function runAction(member, msg, reactions, emojiName) {
    var action;
    var i = 0;
    while (reactions[i].opt.emoji != emojiName) {
        i++;
    }
    action = reactions[i].opt.action;

    if (action.type === "addRole") {
        addRole(member, action.params);
    } else if (action.type === "addAndRemoveRole") {
        addAndRemoveRole(member, action.params)
    }
}

function addRole(member, names) {
    for (var i = 0; i < names.length; i++) {
        member.addRole(member.guild.roles.find('name', names[i]));
    }
}

function addAndRemoveRole(member, names) {
    member.addRole(member.guild.roles.find('name', names[0]));
    member.removeRole(member.guild.roles.find('name', names[1]));
}


module.exports = startMenu;
