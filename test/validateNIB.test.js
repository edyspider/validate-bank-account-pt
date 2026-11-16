import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { validateNIB, randomNIB } from '@edyspider/validate-bank-account-pt';

describe('validateNIB', () => {
    test('accepts valid NIB numbers', () => {
        assert.equal(validateNIB('000201231234567890154'), true); // Example from the IBAN registry
        assert.equal(validateNIB('000700001234567890160'), true);
        assert.equal(validateNIB('003601234567890123418'), true);
        assert.equal(validateNIB('001000000000000000009'), true); // Check digits with a leading zero
    });

    test('rejects invalid NIB numbers', () => {
        assert.equal(validateNIB('00020123123456789015'), false); // Too short
        assert.equal(validateNIB('0000201231234567890154'), false); // Too long
        assert.equal(validateNIB('000201231234567890155'), false); // Wrong check digits
        assert.equal(validateNIB('000201231234567809154'), false); // Swapped digits
        assert.equal(validateNIB('00100000000000000009'), false); // Missing the leading zero of the check digits
    });

    test('rejects invalid input types', () => {
        assert.equal(validateNIB('0002 0123 1234 5678 9015 4'), false); // Spaces
        assert.equal(validateNIB('00020123123456789015A'), false); // Letter
        assert.equal(validateNIB(' 000201231234567890154'), false); // Leading space
        assert.equal(validateNIB('000201231234567890154\n'), false); // Trailing new line
        assert.equal(validateNIB(12345), false); // Number instead of string
        assert.equal(validateNIB(null), false);
        assert.equal(validateNIB(undefined), false);
        assert.equal(validateNIB(''), false);
    });
});

describe('randomNIB', () => {
    test('generates valid NIB numbers', () => {
        for (let i = 0; i < 1000; i++) {
            const nib = randomNIB();
            assert.match(nib, /^\d{21}$/);
            assert.equal(validateNIB(nib), true, nib);
        }
    });

    test('uses the given bank code', () => {
        for (const bankCode of ['0007', '0036', '0035']) {
            const nib = randomNIB(bankCode);
            assert.equal(nib.slice(0, 4), bankCode);
            assert.equal(validateNIB(nib), true, nib);
        }
    });

    test('rejects an invalid bank code', () => {
        assert.throws(() => randomNIB(7), TypeError); // Number loses the leading zeros
        assert.throws(() => randomNIB('7'), TypeError); // Too short
        assert.throws(() => randomNIB('00007'), TypeError); // Too long
        assert.throws(() => randomNIB('00A7'), TypeError); // Letter
        assert.throws(() => randomNIB(null), TypeError);
    });
});