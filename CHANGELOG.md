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
ex>
```
# before
1, 2, 3, 4,
, 1, 2, 3, 4,

# after
1, 2, 3, 4,
1, 2, 3, 4,

```