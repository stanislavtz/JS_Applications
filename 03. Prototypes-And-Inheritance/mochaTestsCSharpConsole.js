let Console = require('./cSharpConsole');
let assert = require('chai').assert;

describe('My tests', function () {
    let c;
    let actualRes;
    let expectedRes;

    beforeEach(function() {
        c = new Console();
        actualRes = '';
        expectedRes = '';
    });

    describe('test', () => {
        it('returns string', () => {
            actualRes = Console.writeLine('asd');
            expectedRes = 'asd';

            assert.equal(actualRes, expectedRes);
        });

        it('returns object', () => {
            let obj = {asd: 5};
            actualRes = Console.writeLine(obj);
            expectedRes = JSON.stringify(obj);

            assert.equal(actualRes, expectedRes);
        });

        it('if type of message is not string and arguments are more then 1', () => {
            actualRes = () => Console.writeLine( true , '5');
            expectedRes = 'No string format given!';

            assert.throw(actualRes, expectedRes);
        });

        it('if incorrect amount of paramers is given', () => {
            actualRes = () => Console.writeLine('a{0} b{1}', 'a');
            expectedRes = `Incorrect amount of parameters given!`;

            assert.throw(actualRes, expectedRes);
        });

        it('if incorrect placeholders are given', () => {
            actualRes = () => Console.writeLine('a{0} b{2}', 'a', 'b');
            expectedRes = `Incorrect placeholders given!`;

            assert.throw(actualRes, expectedRes);
        });

        it('if correct placeholders are given', () => {
            actualRes = Console.writeLine('a{0} b{1}', 'a', 'b');
            expectedRes = `aa bb`;

            assert.equal(actualRes, expectedRes);
        });

        it('placholder returns correct check', () => {
            actualRes = Console.placeholder;
            expectedRes = /{\d+}/g;

            assert.deepEqual(actualRes, expectedRes);
        });
    });
});        