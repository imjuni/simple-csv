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
    
