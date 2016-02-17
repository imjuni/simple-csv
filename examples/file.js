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

let csv = new SimpleCSV(data);

co(function* a () {
  csv.init();
  yield csv.append(data);
  yield csv.write('test.csv');
}).then(function () {
  debug('Complete, ... generated test.csv')
}).catch(function (err) {
  debug('Error caused, ...');
  debug(err.message);
  debug(err.stack);
});