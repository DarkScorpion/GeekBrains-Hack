
var request = require('request');

var _min = process.argv[2];
var _max = process.argv[3] || _min;

var _cookie = require('./config.json').cookie;

var _baseUrl = 'http://geekbrains.ru';

doneAllLesons(_min, _max);

function doneAllLesons(min, max)
{
  for(var i=min; i<=max; i++)
  {
    doneLeson(_baseUrl+'/records/'+i+'/done');
  }
}

function doneLeson(pageUrl)
{
  request({
  uri: pageUrl,
  headers: {
    cookie: _cookie
  },
  method: 'GET',
  encoding: 'utf-8'
  }, function (err, res, body) {
    if (!err && res.statusCode == 200) {
      console.log(pageUrl+' OK');
    } else {
      console.log(pageUrl+' FALSE');
    }
  });
}