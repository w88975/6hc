var fs = require('fs')
var config = JSON.parse(fs.readFileSync('./fake.json'))
var fakeDb = {
    struct: config,
    save: function () {
        fs.writeFileSync('./fake.json', JSON.stringify(this.struct))
    }
}
module.exports = fakeDb