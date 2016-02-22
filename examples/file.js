'use strict';

var co = require('co');
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

let csv = new SimpleCSV();

co(function* () {
  debug('Data length -> ', data.length);
  yield csv.append(data);
  yield csv.write('test.csv');
}).then(function () {
  debug('Complete, ... generated test.csv');
}).catch(function (err) {
  debug('Error caused, ...');
  debug(err.message);
  debug(err.stack);
});