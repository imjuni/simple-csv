Simple-CSV
====

Simple csv generator for Node.js. Simple CSV is super simple and easy.

# Function
* `append` - set data on buffer and array
* `write` - write file on disk
* `Data` - get data array 
* `Buf` - get Buffer

# Options
* `encoding` - Encoding for Buffer class. If you don't set this value that is setted 'utf8'
* `sep` - Column separation character. If you want tsv file, set '\t'. If you don't set this value
that is setted 'utf8'
* `surrounder` - Surrounder for specific case, has linefeed or comma etc
* `EOL` - Row separation character. If you don't set this value that is setted require('os').EOL
* `interval` - If you set huge size data using append method, append method use setInterval
instead of for, while loop. Because If you using on Express or http server, not blocking response.
interval set setInterval interval
* excel - If you use csv file in excel, enable this flag true. That is prevent long number,
for example 1006201603211027052281012300 is automatic covert scientific notation. If
this flag enable set true, converted ="1006201603211027052281012300" so that is prevent
conversion to scientific notation. But default value is false.

# Example
If you more example, see below examples directory.
```
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

let csv = new SimpleCSV();

co(function* a () {
  yield csv.append(data);
  yield csv.write('test.csv');
}).then(function () {
  debug('Complete, ... generated test.csv')
}).catch(function (err) {
  debug('Error caused, ...');
  debug(err.message);
  debug(err.stack);
});
```

