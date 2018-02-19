Menu = require("./models/model.js");

function startMenu(menuName, channel, member) {
    Menu.findByName(menuName, function(err, menu) {
        console.log(menu.data);
    });
}

module.exports = startMenu;
