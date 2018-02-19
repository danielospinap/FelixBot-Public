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

    for (var i = 1; i < array.length; i++) {
        var i = text.search(/:\w+:/);
        var f = text.substring(i+1).search(":");

        parsedText = parsedText + emojis.find('name', text.substring(i+1, f+i+1))
    }

    console.log(parsedText);
    return parsedText;
}

module.exports = startMenu;
