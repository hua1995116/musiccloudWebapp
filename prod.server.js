var express = require('express');
var config = require('./config/index');
var api = require('musicapi');
var port = process.env.PORT || config.dev.port;

var app = express();

var router = express.Router();

router.get('/',function(req,res,next){
	req.url = './index.html';
	next();
});

app.use(router);

app.get('/key/:key', function (req, res) {
  var seller = {
    name: req.params.key
  };
  var Res = res;
  api.search(req.params.key, function (err, res, body) {
    if (err) console.error(err);
    if (res.statusCode === 200) {
      Res.json({
        error: 0,
        data: body,
        code: 200
      });
    }
  });
});
app.get('/detail/:key', function (req, res) {
  var seller = {
    name: req.params.key
  };
  var Res = res;
  api.id(req.params.key, 'song', function (err, res, body) {
    if (err) console.error(err);
    if (res.statusCode === 200) {
      Res.json({
        error: 0,
        data: body,
        code: 200
      });
    }
  });
});

app.use(express.static('./dist'));

module.exports = app.listen(port, function (err) {
	if (err) {
		console.log(err)
		return
	}
	console.log('Listening at http://localhost:' + port + '\n')
});