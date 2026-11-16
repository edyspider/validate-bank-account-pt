import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { validateIBAN, randomIBAN, validateNIB } from '@edyspider/validate-bank-account-pt';

/**
 * Checks an IBAN with the full ISO 13616 mod-97 rule, independently of the package:
 * move the first 4 characters to the end, replace letters with numbers (A = 10 ... Z = 35)
 * and the remainder of the division by 97 must be 1.
 * @param {string} iban
 * @returns {boolean}
 */
function isValidISO13616(iban) {
    const rearranged = iban.slice(4) + iban.slice(0, 4);
    const digits = [...rearranged].map((char) => parseInt(char, 36)).join('');
    return BigInt(digits) % 97n === 1n;
}

describe('validateIBAN', () => {
    test('accepts valid Portuguese IBANs', () => {
        assert.equal(validateIBAN('PT50000201231234567890154'), true); // Example from the IBAN registry
        assert.equal(validateIBAN('PT50000700001234567890160'), true);
        assert.equal(validateIBAN('PT50003601234567890123418'), true);
    });

    test('rejects invalid Portuguese IBANs', () => {
        assert.equal(validateIBAN('PT5000020123123456789015'), false); // Too short
        assert.equal(validateIBAN('PT500000201231234567890154'), false); // Too long
        assert.equal(validateIBAN('PT50000201231234567890155'), false); // Wrong NIB check digits
        assert.equal(validateIBAN('PT51000201231234567890154'), false); // Wrong IBAN check digits
        assert.equal(validateIBAN('ES50000201231234567890154'), false); // Other country
        assert.equal(validateIBAN('000201231234567890154'), false); // NIB without 'PT50'
    });

    test('rejects invalid input types', () => {
        assert.equal(validateIBAN('PT50 0002 0123 1234 5678 9015 4'), false); // Spaces
        assert.equal(validateIBAN('pt50000201231234567890154'), false); // Lowercase
        assert.equal(validateIBAN(' PT50000201231234567890154'), false); // Leading space
        assert.equal(validateIBAN(12345), false); // Number instead of string
        assert.equal(validateIBAN(null), false);
        assert.equal(validateIBAN(undefined), false);
        assert.equal(validateIBAN(''), false);
    });

    test('agrees with the full ISO 13616 mod-97 check', () => {
        assert.equal(isValidISO13616('PT50000201231234567890154'), true);
        for (let i = 0; i < 1000; i++) {
            const iban = randomIBAN();
            assert.equal(isValidISO13616(iban), true, iban);
        }
    });
});

describe('randomIBAN', () => {
    test('generates valid IBANs', () => {
        for (let i = 0; i < 1000; i++) {
            const iban = randomIBAN();
            assert.match(iban, /^PT50\d{21}$/);
            assert.equal(validateIBAN(iban), true, iban);
            assert.equal(validateNIB(iban.slice(4)), true, iban);
        }
    });

    test('uses the given bank code', () => {
        for (const bankCode of ['0007', '0036', '0035']) {
            const iban = randomIBAN(bankCode);
            assert.equal(iban.slice(0, 8), `PT50${bankCode}`);
            assert.equal(validateIBAN(iban), true, iban);
        }
    });

    test('rejects an invalid bank code', () => {
        assert.throws(() => randomIBAN(7), TypeError);
        assert.throws(() => randomIBAN('007'), TypeError);
    });
});