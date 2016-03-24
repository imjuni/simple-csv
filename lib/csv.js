'use strict';

var fs = require('fs');
var debug = require('debug')('ssc:SimpleCSV');
var iconv = require('iconv-lite');

function SimpleCSV (_options) {
  var that = this;
  var options = _options || {};
  var buf, data = [];

  options.encoding = options.encoding || 'utf8';
  options.sep = options.sep || ',';
  options.surrounder = options.surrounder || '"';
  options.EOL = options.EOL || require('os').EOL;
  options.interval = options.interval || 100;
  options.encoding = (options.encoding === 'utf-8') ? 'utf8' : options.encoding;
  options.excel = options.excel || false;

  options.intervalLoopSize = options.intervalLoopSize || 1024 * 30;

  that.Data = function () {
    return data;
  };

  that.Buf = function () {
    return buf;
  };

  that.serialize = function (row) {
    var i, len, elem;
    var conv = [];

    for (i = 0, len = row.length; i < len; i++) {
      elem = row[i];
      if (options.excel) {
        if (typeof elem == 'string') {
          if (elem.indexOf('\n') + elem.indexOf('\r') + elem.indexOf(',') > -3) {
            elem = elem.replace(/\r\n|\n\r|\n/g, '\r').replace(/"/g, '""');
            elem = '=' + options.surrounder + elem + options.surrounder;
          } else {
            elem = '=' + options.surrounder + elem + options.surrounder;
          }

          conv.push(elem);
        } else {
          conv.push(elem);
        }
      } else {
        if (typeof elem == 'string') {
          if (elem.indexOf('\n') + elem.indexOf('\r') + elem.indexOf(',') > -3) {
            elem = elem.replace(/\r\n|\n\r|\n/g, '\r').replace(/"/g, '""');
            elem = options.surrounder + elem + options.surrounder;
          }

          conv.push(elem);
        } else {
          conv.push(elem);
        }
      }

    }

    return conv.join(options.sep) + options.sep + options.EOL;
  };

  that._append = function (_data, callback) {
    debug('_append start, ...');

    if (!!_data.length) {
      data.concat(_data);
    } else {
      data.push(_data);
      _data = [_data];
    }

    debug('go into setInterval start, -> ', _data.length);
    var i = 0, il = _data.length;
    var interval = setInterval(function () {
      try {
        if (i >= il) {
          clearInterval(interval);

          setTimeout(function () {
            callback();
          }, options.interval);
        } else {
          var j, jl;
          var concat = [];

          debug('Start inner loop in setInterval -> ', i, ' -> ', options.interval);
          for (j = 0, jl = options.intervalLoopSize; j < jl && i < il; j++) {
            concat.push(that.serialize(_data[i]));
            i = i + 1;
          }

          var _buf;

          if (options.encoding !== 'utf8') {
            _buf = iconv.encode(concat.join(''), options.encoding);
          } else {
            _buf = new Buffer(concat.join(''), 0, options.encoding);
          }

          if (!!buf) {
            buf = Buffer.concat([buf, _buf], buf.length + _buf.length);
          } else {
            buf = _buf;
          }
        }
      } catch (err) {
        clearInterval(interval);
        callback(err);
      }
    }, options.interval);
  };

  that.append = function (_data) {
    return new Promise(function (resolve, reject) {
      that._append(_data, function (err) {
        if (err) reject(err);
        else resolve();
      });
    });
  };

  that._write = function (filename, _buf, callback) {
    _buf = _buf || buf;

    debug('filename -> ', filename);

    fs.writeFile(filename, _buf, function (err) {
      callback(err);
    });
  };

  that.write = function (filename, buf) {
    return new Promise(function (resolve, reject) {
      that._write(filename, buf, function (err) {
        if (err) reject(err);
        else resolve();
      });
    });
  };
}

module.exports = SimpleCSV;