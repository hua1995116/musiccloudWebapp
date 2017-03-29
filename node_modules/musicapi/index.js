var request = require('request');
var qs = require('querystring');
//我的一个辅助函数库（未完成）
var v = require('vutils');
//Default config
var origin = 'http://music.163.com';
var defaultConfig = {
	headers: {
		'Origin': origin,
		'Referer': origin,
		'Content-Type': 'application/x-www-form-urlencoded'
	}
};
//获取URL
var _get163Url = {
	search: function () {
		return origin + '/api/search/suggest/web';
	},
	artist: function (key) {
		return origin + '/api/artist/' + key;
	},
	album: function (key) {
		return origin + '/api/album/' + key;
	},
	song: function () {
		return origin + '/api/song/detail';
	},
	mv: function () {
		return origin + '/api/mv/detail';
	},
	lyc: function () {
		return origin + '/api/song/lyric';
	}
};
//参数配置
var setConfig = function (c) {
	c = v.extend(v.clone(defaultConfig), c);
	var method  = c.method,
		resType = c.resType,
		body    = c.body;
	c.uri = _get163Url[resType](c.key);
	c.body = body ? qs.encode(body) : '';
	if (method === 'GET') {
		if (resType === 'song') c.body = c.body.replace('=', '=%5B') + '%5D';
		c.uri += '?' + c.body;
		delete c.body;
	}
	if (c.key) delete c.key;
	delete c.resType;
	console.log(c);
	return c;
};
//request music.163.com API
var api = function (c, callback) {
	request(setConfig(c), callback);
};

//module exports extend
v.extend(exports, {
	search: function (key, callback,args) {
		if (!key || !v.isFunction(callback)) return false;
		args = args ?
			v.extend(args, {s: key}) :
			{s: key, limit: 3};
		return api({
			resType: 'search',
			method: 'POST',
			body: args
		}, callback);
	},
	id: function (key, resType, callback, args) {
		if (!key || !v.isFunction(callback)) return false;
		if (resType === 'song' || resType === 'mv' || resType === 'lyc') {
			var idObj = resType === 'song' ? {ids: key } : {id: key};
			args = args ? v.extend(args, idObj) : idObj;
		}
		return api({
			resType: resType,
			key: key,
			method: 'GET',
			body: args || undefined
		}, callback);
	}
});