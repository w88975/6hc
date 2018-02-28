var express = require('express');
var router = express.Router();
// var sqlite = require('../lib/sqlite')
var fakeDb = require('../lib/fake')

// var sqlAllAsync = function (str) {
// 	return new Promise(function (resolve, reject) {
// 		sqlite.all(str, (err, rows) => {
// 			if (err) {
// 				return reject(err)
// 			} else {
// 				return resolve(rows)
// 			}
// 		})
// 	})
// }

router.get('/', function (req, res, next) {
	if (req.session.logined) {
		var config = fakeDb.struct.config
		res.render('index', { url: config.url, js: config.js });
	} else {
		console.log('未登录')
		res.redirect('/login');
	}
});

router.get('/js', function (req, res, next) {
	res.setHeader('Content-type','application/x-javascript')
	var str = fakeDb.struct.config.js
	str = str.replace(/\$url\$/g,fakeDb.struct.config.url)
	str = str.replace(/\$img\$/g,fakeDb.struct.config.img)
	res.send(str);
});

router.get('/login', (req, res, next) => {
	res.render('login', { msg: '' });
})

router.post('/params', (req, res, next) => {
	const { url, jscode } = req.body
	fakeDb.struct.config.url = url
	fakeDb.struct.config.js = jscode
	fakeDb.save()
	res.redirect('/')
})

router.post('/login', async (req, res, next) => {
	const { user, pwd } = req.body;
	// let results = await sqlAllAsync(`select count(*) from USERS where user='${user}' and pwd='${pwd}'`)
	// var count = results[0]['count(*)'];
	if (user === fakeDb.struct.user && pwd === fakeDb.struct.pwd) {
		req.session.logined = true;
		return res.redirect('/');
	} else {
		req.session.logined = false;
		return res.render('login', { msg: '登录失败,请检查账户密码是否正确!' });
	}
	// if (count > 0) {

	// } else {

	// }
})

module.exports = router;
