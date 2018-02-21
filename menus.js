Menu = require("./models/model.js");

function startMenu(menuName, channel, member) {
    Menu.findByName(menuName, function(err, menu) {
        if (menu.data.length == 0) {
            console.log("Menu not found.");
            return;
        }
        //console.log(menu.data[0].questions[0].q.statement);
        showQuestion(menu.data[0].questions, channel, member);
    });
}

function showQuestion(questons, channel, member, i) {
    statement = parseStatement(questions[0].q.statement, member);
    channel.send(statement).then(msg => {
        addReactions(member, msg, questions[0].q.reactions);
    });
}

//TODO: volver recursivo
function showMenu(menu, channel, member) {
    console.log(menu);
    questions = menu.data[0].questions;
    //for (var i = 0; i < questions.length; i++) {
        statement = parseStatement(questions[0].q.statement, member);
        channel.send(statement).then(msg => {
            //addReactions(member, msg, questions[i].q.reactions, 0);
        });
    //}

}

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

function addReactions(member, msg, reactions, i) {
    if (i < reactions.length) {
        var emojiName = reactions[i].opt.emoji;
        msg.react(member.guild.emojis.find('name', emojiName)).then(reaction =>{
            addReactions(member, msg, reactions, i+1);
        });
    } else {
        //identifyReaction(member, msg);
    }
}

//TODO: generalizar para cualquier reaccion
function identifyReaction(member, msg){
    console.log("Waiting for reactions");
    const filter =(reaction) => reaction.emoji.name === "yes" || reaction.emoji.name === "no";
    const collector = msg.createReactionCollector(filter, { time: 30000 });

    collector.on('collect', reaction => {
        reaction.fetchUsers().then(users => {
            var user = users.find('id', member.id);
            if(user != null){
                console.log(user.username + ' reacted with emoji ' + reaction.emoji.name);
                collector.stop();

                msg.delete();
                asignaRol(member, reaction.emoji.name);
            }
        });
    });
}



module.exports = startMenu;
