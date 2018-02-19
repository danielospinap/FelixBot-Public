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
    msg = parseStatement(menu.data[0].questions[0].q.statement, member);
    channel.send(msg);
}

function parseStatement(text, member) {
    var parts = text.split("@member");
    var parsedText = parts[0];
    for (var i = 1; i < parts.length; i++) {
        parsedText = parsedText + member + parts[i];
    }

<<<<<<< HEAD
    parsedText = parsedText.split(/:\w+:/);
    console.log(parsedText);
=======
    parts = parsedText.split(/:\w+:/);
    console.log(parts);
>>>>>>> 62b8951133734651d791e2397cb912369cef9e50


    return parsedText
}

module.exports = startMenu;
