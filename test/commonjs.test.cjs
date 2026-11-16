const { test } = require('node:test');
const assert = require('node:assert/strict');
const {
    validateNIB,
    randomNIB,
    validateIBAN,
    randomIBAN,
    getBIC,
    getBankName,
} = require('@edyspider/validate-bank-account-pt');

test('works with require()', () => {
    assert.equal(typeof validateNIB, 'function');
    assert.equal(typeof randomNIB, 'function');
    assert.equal(typeof validateIBAN, 'function');
    assert.equal(typeof randomIBAN, 'function');
    assert.equal(validateNIB('000201231234567890154'), true);
    assert.equal(validateIBAN('PT50000201231234567890154'), true);
    assert.equal(validateNIB(randomNIB()), true);
    assert.equal(validateIBAN(randomIBAN('0007')), true);
    assert.equal(typeof getBIC, 'function');
    assert.equal(typeof getBankName, 'function');
    assert.equal(getBIC('PT50000700001234567890160'), 'BESCPTPL');
});