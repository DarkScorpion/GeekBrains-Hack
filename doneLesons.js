
var request = require('request');

var _freeCoursesArr = require('./free.json');
var _cookie = require('./config.json').cookie;

var _baseUrl = 'http://geekbrains.ru';

startHack();

function startHack()
{
  var argv = process.argv.slice(2);
  switch (argv[0])
  {
    case ('-s'): 
      var min = parseInt(argv[1]);
      var max = parseInt(argv[2]);
      doneSomeLesons(min, max);
    break;
    case ('-f'): 
      var freeCoursesArr = require('./free.json');
      doneFreeCourses(freeCoursesArr);
    break;
    default: console.log('Используйте ключи:\n\t -s n1 n2 для завершения определённых уроков\n\t -f для завершения хранящихся в базе бесплатных курсов\n');
  }
}

function doneFreeCourses(arr)
{
  for(var i in arr) 
  {
    doneSomeLesons(arr[i].min, arr[i].max);
  }
}

function doneSomeLesons(min, max)
{
  if(min>max) {
    console.log('Неправильные параметры начального и конечного урока');
    return;
  }
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