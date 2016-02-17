'use strict';
var debug = require('debug')('ssc:SimpleCSV');

class SimpleCSV {
  constructor (options) {
    this.options = options || {};

    this.options.encoding = this.options.encoding || 'utf8';
    this.options.sep = this.options.sep || ',';
    this.options.surrounder = this.options.surrounder || '"';
    this.options.EOL = this.options.EOL || require('os').EOL;
    this.options.interval = this.options.interval || 50;
    this.options.encoding = (this.options.encoding === 'utf-8') ? 'utf8' : this.options.encoding;
  }

  get Data () {
    return this.data;
  }

  get Buf () {
    return this.buf;
  }

  serialize (row) {
    return row
      .map(elem => {
        if (typeof elem === 'string') {
          // \r\n -> \r
          // \n\r -> \r
          // \n -> \r
          // Microsoft Excel permit carriage return for linefeed. So change linefeed character
          // to carriage return

          let needQuote = elem.indexOf('\n') + elem.indexOf('\r') + elem.indexOf(',');

          if (needQuote > -3) {
            // if element need quote, double quote in element change to twice double quote
            // ex> c"c -> c""c
            elem = elem.replace(/\r\n|\n\r|\n/g, '\r');
            elem = elem.replace(/"/g, '""');
            elem = this.options.surrounder + elem + this.options.surrounder;
          }

          return elem;
        } else {
          return elem;
        }
      })
      .join(this.options.sep)
      + this.options.sep
      + this.options.EOL;
  }

  * append (data) {
    let that = this;

    if (!that.data) {
      that.data = [];
    }

    return new Promise((resolve, reject) => {
      debug('Append data -> ', data);

      if (!!that.data) {
        that.data = data;
      } else {
        if (!!data.length) {
          that.data.concat(data);
        } else {
          that.data.push(data);
          data = [data];
        }
      }

      debug('Start interval, ...');

      let i = 0, il = data.length;
      let interval = setInterval(() => {
        try {
          if (i >= il) {
            debug('Meet data.length final element, stop it');
            clearInterval(interval);

            setTimeout(() => {
              resolve();
            }, that.options.interval);
          } else {
            let serialized = that.serialize(data[i]);

            let buf = new Buffer(serialized, 0, that.options.encoding);

            if (!!that.buf) {
              that.buf = Buffer.concat([that.buf, buf], that.buf.length + buf.length);
            } else {
              that.buf = buf;
            }

            i = i + 1;
          }
        } catch (err) {
          debug('Meet error, stop it');
          clearInterval(interval);
          reject(err);
        }
      }, that.options.interval);
    });
  }

  * write (filename, buf) {
    let fs = require('fs');
    buf = buf || this.buf;

    debug('filename -> ', filename);

    return new Promise((resolve, reject) => {
      fs.writeFile(filename, buf, err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = SimpleCSV;