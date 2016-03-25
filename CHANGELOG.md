# 0.1.0
* Initial version

# 0.2.0
* Performance tuning
    * Add inner loop in setInterval
    * Buffer.concat is slow operation, so reduce concat time
* Remove Node.js class
    * Support more than various node.js interpreter
* Million rows test
    * 9.516s see examples/files (very simple table, so test 1,300,000)

# 0.2.1
* Change README.md
    * remove limit of node.js interpreter version
* Change http example
    * Non-blocking http server with simple-csv example

# 0.2.2
* Change csv.js
    * remove arrow function
       
# 0.2.3
* Support another encoding option in iconv-lite (cp949, latin1, etc ...)
    * see support encodings at https://github.com/ashtuchkin/iconv-lite/wiki/Supported-Encodings
* Change examples in file.js (for support encodings)
* Fix bug in row concat, Add comma with second line
* Example

```
# before
1, 2, 3, 4,
, 1, 2, 3, 4,

# after
1, 2, 3, 4,
1, 2, 3, 4,
```

# 0.2.4
* Fix-bug in Microsoft Excel,
    * Pass long string made by only number that is auto convert scientific notation by excel
    * ex> 100620160321102705228100 -> 1.00620160321102E+23
    * set excel option true, simple-csv add equal mark on string element. It will prevent auto converting
    * see examples/files.js
* Example    

```
var csv2 = new SimpleCSV({ encoding: 'cp949', excel: true });

co(function* () {
  yield csv2.append(data);
  yield csv2.write('test2.csv');
}).then(function () {
  debug('Complete, ... generated test.csv');
}).catch(function (err) {
  debug('Error caused, ...');
  debug(err.message);
  debug(err.stack);
});
```

# 0.2.5
* Fix-bug in Microsoft Excel mode
    * Already contains comma element case invalid converted. fix it.
    
    
# 0.2.6
* Fix-bug in Microsoft Excel mode
    * Will be enable excel mode, that is not support have comma. fix-it
* Example

```
# before
aa,bb,cc, 1, 2, 3, 4,
> ="aa,bb,cc", 1, 2, 3, 4,     # invalid csv format

# after
aa,bb,cc, 1, 2, 3, 4,
"aa,bb,cc", 1, 2, 3, 4,        # valid csv format
```