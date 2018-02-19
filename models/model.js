var MongoClient = require('mongodb').MongoClient;

var Menu = function (data) {
    this.data = data;
}

Menu.prototype.data = {};

Menu.prototype.findByName = function (name, callback) {
    MongoClient.connect(process.env.DB_URL, function(err, db) {
        if (err) throw err;
        var dbo = db.db("felixdbguo");
        var query = {menuName: name};
        dbo.collection("menus").find(query).toArray(function(err, result) {
            if (err) return callback(err);
            callback(null, new Menu(result));
            db.close();
        });
};

module.exports = Menu;
