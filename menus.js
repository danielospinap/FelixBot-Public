Menu = require("./models/model.js");

function startMenu(menuName, channel, member) {
    Menu.findByName(menuName, function(err, menu) {
        if (menu.data.length == 0) {
            console.log("Menu not found.");
            return;
        }
        console.log(menu.data[0].questions[0].q.statement);
        //showMenu(menu, channel, member);
    });
}

function showMenu(menu, channel, member) {
    msg = parseMember(menu.q[0].statement, member);
}

function parseMember(text, member) {
    var parts = text.split("@member");
    var parsedText = parts[0];
    for (var i = 0; i < parts.length; i++) {
        parsedText = parsedText + member + parts[i];
    }

    return parsedText
}

module.exports = startMenu;
