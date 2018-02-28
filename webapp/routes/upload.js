var express = require('express');
var router = express.Router();
var multer = require('multer')
var fs = require('fs')
var fakeDb = require('../lib/fake')
function randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

router.post('/upload', function (req, res, next) {
    var upload = multer().single('file')
    upload(req, res, function (err) {
        var oname = req.file.originalname
        var extName = oname.substring(oname.lastIndexOf('.')).toLowerCase();
        // 随机图片
        // var fileName = randomString(32) + extName
        var fileName = 'd1'
        if (err) {
            // 发生错误
            return res.send({ ret_code: -1 });
        } else {
            fs.writeFileSync(`./upload/${fileName}`, req.file.buffer)
            fakeDb.struct.config.img = req.protocol + '://' + req.get('host') + '/' + fileName;
            fakeDb.save();
            res.send({ ret_code: 0, fileName: fileName });
        }
    })
});

router.get('/d1', (req, res) => {
    res.sendFile(process.cwd() + '/upload/d1')
})

module.exports = router;
