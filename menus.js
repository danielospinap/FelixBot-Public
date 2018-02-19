Menu = require("./models/model.js");

function startMenu(menuName, channel, member) {
    Menu.findByName(menuName, function(err, menu) {
        if (menu.data.length == 0) {
            console.log("Menu not found.");
            return;
        }
        //console.log(menu.data[0].questions[0].q.statement);
        showMenu(menu, channel, member);
    });
}

function showMenu(menu, channel, member) {
    statement = parseStatement(menu.data[0].questions[0].q.statement, member);
    channel.send(statement);
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

module.exports = startMenu;
