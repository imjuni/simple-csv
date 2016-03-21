'use strict';

var co = require('co');
var debug = require('debug')('ssc:example');
var SimpleCSV = require('../lib/csv.js');

var data = [
  [1, 2, 3, 4],
  ['a', 'b', 'c', 'd'],
  ['a', ',b,', 'c', 'd'],
  ['a', 'b,""', 'c""', 'd'],
  ['e', 'f', 'g', 'h\nh\nh'],
  ['한', '글', '입', '력'],
  ['한', '글', '입', '력']
];

for (var i = 0, len = 130; i < len; i++) {
  data.push(data[i % 7]);
}

var csv = new SimpleCSV();
var csv2 = new SimpleCSV({ encoding: 'cp949' });

co(function* () {
  debug('Data length -> ', data.length);
  yield csv.append(data);
  yield csv.write('test.csv');

  yield csv2.append(data);
  yield csv2.write('test2.csv');
}).then(function () {
  debug('Complete, ... generated test.csv');
}).catch(function (err) {
  debug('Error caused, ...');
  debug(err.message);
  debug(err.stack);
});