import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { getBIC, getBankName, randomNIB, randomIBAN } from '@edyspider/validate-bank-account-pt';
import { BANKS } from '../src/banks.js';

describe('BANKS', () => {
    test('every bank has a 4-digit code, a name and an 8-character Portuguese BIC', () => {
        for (const [bankCode, bank] of Object.entries(BANKS)) {
            assert.match(bankCode, /^\d{4}$/);
            assert.equal(typeof bank.name, 'string');
            assert.ok(bank.name.length > 0, bankCode);
            assert.match(bank.bic, /^[A-Z]{4}PT[A-Z0-9]{2}$/, bankCode);
        }
    });
});

describe('getBIC', () => {
    test('returns the BIC of a NIB', () => {
        assert.equal(getBIC('000700001234567890160'), 'BESCPTPL');
        assert.equal(getBIC('003601234567890123418'), 'MPIOPTPL');
    });

    test('returns the BIC of an IBAN', () => {
        assert.equal(getBIC('PT50000700001234567890160'), 'BESCPTPL');
        assert.equal(getBIC('PT50003601234567890123418'), 'MPIOPTPL');
    });

    test('works with generated numbers', () => {
        assert.equal(getBIC(randomNIB('0035')), 'CGDIPTPL');
        assert.equal(getBIC(randomIBAN('0033')), 'BCOMPTPL');
        for (let i = 0; i < 100; i++) {
            assert.notEqual(getBIC(randomIBAN()), null); // Without a bank code, a known bank is used
        }
    });

    test('returns null for unknown banks and invalid values', () => {
        assert.equal(getBIC(randomNIB('9999')), null); // Valid NIB, unknown bank
        assert.equal(getBIC('000700001234567890161'), null); // Wrong check digits
        assert.equal(getBIC('PT51000700001234567890160'), null); // Wrong IBAN check digits
        assert.equal(getBIC('0007'), null); // Bank code only
        assert.equal(getBIC(12345), null);
        assert.equal(getBIC(null), null);
        assert.equal(getBIC(undefined), null);
    });
});

describe('getBankName', () => {
    test('returns the bank name of a NIB or an IBAN', () => {
        assert.equal(getBankName('000700001234567890160'), 'Novo Banco, S.A.');
        assert.equal(getBankName('PT50003601234567890123418'), 'Caixa Económica Montepio Geral');
    });

    test('returns null for unknown banks and invalid values', () => {
        assert.equal(getBankName(randomIBAN('9999')), null);
        assert.equal(getBankName('invalid'), null);
    });
});