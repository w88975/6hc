var file = 'db.db';
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);
module.exports = db;