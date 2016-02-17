'use strict';

describe('csv', () => {
  let SimpleCSV = require('../lib/csv');
  let should = require('chai').should();
  let EOL = require('os').EOL;

  it('row-serialize-normal-case', () => {
    let csv = new SimpleCSV();
    let serialized = csv.serialize([1, 2, 3, 4]);
    serialized.should.be.equal('1,2,3,4,' + EOL);
  });

  it('row-serialize-has-comma', () => {
    let csv = new SimpleCSV();
    let serialized = csv.serialize([1, 2, 'te,st', 4]);
    serialized.should.be.equal('1,2,"te,st",4,' + EOL);
  });

  it('row-serialize-has-linefeed', () => {
    let csv = new SimpleCSV();
    let serialized;

    serialized = csv.serialize([1, 2, 'te\nst', 4]);
    serialized.should.be.equal('1,2,"te\rst",4,' + EOL);

    serialized = csv.serialize([1, 2, 'te\r\nst', 4]);
    serialized.should.be.equal('1,2,"te\rst",4,' + EOL);

    serialized = csv.serialize([1, 2, 'te\n\rst', 4]);
    serialized.should.be.equal('1,2,"te\rst",4,' + EOL);
  });

  it('row-serialize-tsv', () => {
    let csv = new SimpleCSV({ sep: '\t' });
    let serialized = csv.serialize([1, 2, 'te,st', 4]);
    serialized.should.be.equal('1\t2\t"te,st"\t4\t' + EOL);
  });

  it('row-serialize-has-comma-with-quote', () => {
    let csv = new SimpleCSV();
    let serialized;

    serialized = csv.serialize([1, 2, 'te",st', 4]);
    serialized.should.be.equal('1,2,"te"",st",4,' + EOL);

    serialized = csv.serialize([1, 2, 'te"st', 4]);
    serialized.should.be.equal('1,2,te"st,4,' + EOL);
  });

  it('row-serialize-single-quote-surrounder', () => {
    let csv = new SimpleCSV({ surrounder: '\'' });

    let serialized = csv.serialize([1, 2, 'te",st', 4]);
    serialized.should.be.equal('1,2,\'te"",st\',4,' + EOL);
  });
});
