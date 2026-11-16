// src/index.js

const BANK_CODE_PATTERN = /^\d{4}$/;
const NIB_PATTERN = /^\d{21}$/;
const IBAN_PREFIX = 'PT50';
const IBAN_PATTERN = /^PT50\d{21}$/;

/**
 * Computes the remainder of a string of digits divided by 97, one digit at a time,
 * so numbers bigger than Number.MAX_SAFE_INTEGER still work.
 * @param {string} digits
 * @returns {number}
 */
function mod97(digits) {
    let remainder = 0;
    for (const digit of digits) {
        remainder = (remainder * 10 + Number(digit)) % 97;
    }
    return remainder;
}

/**
 * Computes the two check digits (20th and 21st) from the first 19 digits of a NIB.
 * @param {string} base The first 19 digits.
 * @returns {string} Always two characters, e.g. '07'.
 */
function computeCheckDigits(base) {
    const checkDigits = 98 - mod97(base + '00');
    return String(checkDigits).padStart(2, '0');
}

/**
 * Returns a string with `count` random digits.
 * @param {number} count
 * @returns {string}
 */
function randomDigits(count) {
    return Array.from({ length: count }, () => Math.floor(Math.random() * 10)).join('');
}

/**
 * Throws a TypeError when `bankCode` is not a string with 4 digits.
 * @param {unknown} bankCode
 */
function assertBankCode(bankCode) {
    if (typeof bankCode !== 'string' || !BANK_CODE_PATTERN.test(bankCode)) {
        throw new TypeError(`bankCode must be a string with 4 digits, e.g. '0007' (received ${String(bankCode)})`);
    }
}

/**
 * Validates a Portuguese bank account number (NIB).
 * @param {unknown} value
 * @returns {boolean}
 */
export function validateNIB(value) {
    if (typeof value !== 'string' || !NIB_PATTERN.test(value)) {
        return false;
    }

    return computeCheckDigits(value.slice(0, 19)) === value.slice(19);
}

/**
 * Generates a random valid Portuguese bank account number (NIB).
 * @param {string} [bankCode] Optional 4-digit bank code, e.g. '0007'.
 * @returns {string}
 */
export function randomNIB(bankCode = randomDigits(4)) {
    assertBankCode(bankCode);
    const base = bankCode + randomDigits(15);
    return base + computeCheckDigits(base);
}

/**
 * Validates a Portuguese IBAN ('PT50' followed by a valid NIB).
 * @param {unknown} value
 * @returns {boolean}
 */
export function validateIBAN(value) {
    if (typeof value !== 'string' || !IBAN_PATTERN.test(value)) {
        return false;
    }

    return validateNIB(value.slice(IBAN_PREFIX.length));
}

/**
 * Generates a random valid Portuguese IBAN.
 * @param {string} [bankCode] Optional 4-digit bank code, e.g. '0007'.
 * @returns {string}
 */
export function randomIBAN(bankCode) {
    return IBAN_PREFIX + randomNIB(bankCode);
}