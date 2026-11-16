# Change Log

All notable changes to the **@edyspider/validate-bank-account-pt** npm package
will be documented in this file.

## [1.0.0]

### Changes

- First release
- `validateNIB()` and `validateIBAN()` validate Portuguese bank account numbers (NIB) and IBANs
- `randomNIB()` and `randomIBAN()` generate valid numbers, optionally for a given bank code (e.g. `'0007'`)
- `getBIC()` and `getBankName()` return the SWIFT/BIC and the name of the bank of a NIB or IBAN
- List of 39 Portuguese banks with their SWIFT/BIC, from the Banco de Portugal SICOI list
- Native ES module with a CommonJS entry point, so both `import` and `require()` work
- TypeScript types for both `import` and `require()`
- No runtime dependencies; requires Node.js 22.12 or later
