var postcss = require('postcss');
var expect  = require('chai').expect;
var fs  = require('fs');

var plugin = require('../');

var test = function (input, output, opts, done) {
    postcss([ plugin(opts) ]).process(input).then(function (result) {
        expect(result.css).to.eql(output);
        expect(result.warnings()).to.be.empty;
        done();
    }).catch(function (error) {
        done(error);
    });
};

describe('postcss-pseudo-content-insert', function () {

    it('adds empty content prop', function (done) {

        var input = fs.readFileSync('./test/test.css', 'utf-8');
        var expected = fs.readFileSync('./test/expected.css', 'utf-8');

        var output = postcss(plugin()).process(input);

        test(output.css, expected, { }, done);

    });
});
