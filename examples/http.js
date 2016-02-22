'use strict';

var co = require('co');
var http = require('http');
var url = require('url');
var debug = require('debug')('ssc:example');
var SimpleCSV = require('../lib/csv.js');

let data = [
  [1, 2, 3, 4],
  ['a', 'b', 'c', 'd'],
  ['a', ',b,', 'c', 'd'],
  ['a', 'b,""', 'c""', 'd'],
  ['e', 'f', 'g', 'h\nh\nh'],
  ['한', '글', '입', '력'],
  ['한', '글', '입', '력']
];

for (let i = 0, len = 1300000; i < len; i++) {
  data.push(data[i % 7]);
}

let server = http.createServer((req, res) => {
  var urlObj = url.parse(req.url, true, false);

  if (urlObj.pathname === '/excel') {

    co(function* () {
      let csv = new SimpleCSV(data);

      yield csv.append(data);
      yield csv.write('test.csv');

      return csv;
    }).then(function (csv) {
      debug('Complete, ... generated test.csv');

      res.setHeader('Content-disposition', 'attachment; filename=test.csv');
      res.setHeader('content-transfer-encoding', 'binary');
      res.setHeader('Content-Type', 'application/octet-stream');
      res.statusCode = 200;
      res.end(csv.Buf);
    }).catch(function (err) {
      debug('Error caused, ...');
      debug(err.message);
      debug(err.stack);
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Hello');
    res.end();
  }
});

server.listen(9393);

