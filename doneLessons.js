
var request = require('request');

var _db = require('./db.json');
var _baseUrl = 'http://geekbrains.ru';
var _cookie = require('./config.json').cookie;

startHack();

function startHack()
{
  var argv = process.argv.slice(2);
  switch (argv[0])
  {
    case ('-q'):
      var num = parseInt(argv[1]);
      doneSomeLessons(num, num);
    break;
    case ('-s'): 
      var min = parseInt(argv[1]);
      var max = parseInt(argv[2]);
      doneSomeLessons(min, max);
    break;
    case ('-f'): 
      doneFreeCourses(_db.free);
    break;
    default: console.log(_db.help)
  }
}

function doneFreeCourses(arr)
{
  for(var i in arr) 
  {
    doneSomeLessons(arr[i].min, arr[i].max);
  }
}

function doneSomeLessons(min, max)
{
  if(min>max) {
    console.log('Неправильные параметры начального и конечного урока');
    return;
  }
  for(var i=min; i<=max; i++)
  {
    doneLesson(i);
  }
}

function doneLesson(number)
{
  var pageUrl = _baseUrl+'/records/'+number+'/done'
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