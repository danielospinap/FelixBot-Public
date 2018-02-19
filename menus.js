Menu = require("./models/model.js");

function startMenu(menuName, channel, member) {
    Menu.findByName(menuName, function(err, menu) {
        if (menu.data.length == 0) {
            console.log(Menu not found.);
            return;
        }
    });
}

module.exports = startMenu;
