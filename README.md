# Validate-Bank-Account-PT

[![npm version](https://img.shields.io/npm/v/@edyspider/validate-bank-account-pt)](https://www.npmjs.com/package/@edyspider/validate-bank-account-pt)
[![CI](https://github.com/edyspider/validate-bank-account-pt/actions/workflows/ci.yml/badge.svg)](https://github.com/edyspider/validate-bank-account-pt/actions/workflows/ci.yml)

A small, dependency-free package to validate and generate Portuguese bank account numbers (NIB and IBAN) and to find the SWIFT/BIC of their bank.

Works with ES modules, CommonJS and TypeScript (types included).

---

## Requirements

- Node.js 22.12 or later (also works with Bun, Deno and browsers through a bundler or CDN)

## Installation

```sh
npm i @edyspider/validate-bank-account-pt
```

## Usage

### ES modules

```js
import {
    validateNIB,
    validateIBAN,
    randomNIB,
    randomIBAN,
    getBIC,
    getBankName,
} from '@edyspider/validate-bank-account-pt';

console.log(validateNIB('000700001234567890160')); // true
console.log(validateIBAN('PT50000700001234567890160')); // true
console.log(validateIBAN('PT50000700001234567890161')); // false

console.log(randomNIB()); // e.g. '003688724462997775848'
console.log(randomIBAN('0007')); // e.g. 'PT50000768820928676335775' (Novo Banco)

console.log(getBIC('PT50000700001234567890160')); // 'BESCPTPL'
console.log(getBankName('000700001234567890160')); // 'Novo Banco, S.A.'
```

### CommonJS

```js
const { validateIBAN, getBIC } = require('@edyspider/validate-bank-account-pt');

console.log(validateIBAN('PT50000700001234567890160')); // true
console.log(getBIC('PT50000700001234567890160')); // 'BESCPTPL'
```

### TypeScript

```ts
import { validateIBAN, randomIBAN, getBIC } from '@edyspider/validate-bank-account-pt';

const input: unknown = 'PT50000700001234567890160';
const isValid: boolean = validateIBAN(input);
const iban: string = randomIBAN('0036');
const bic: string | null = getBIC(iban);
```

### Deno

```js
import { validateIBAN } from 'npm:@edyspider/validate-bank-account-pt';
```

### Browser (CDN, no bundler)

```js
import { validateIBAN } from 'https://cdn.jsdelivr.net/npm/@edyspider/validate-bank-account-pt@1/+esm';
```

### Numbers with spaces

Validation is strict: only digits and `PT` in capital letters, with no spaces. Clean the value first when it comes from user input:

```js
const input = 'pt50 0007 0000 1234 5678 9016 0';
validateIBAN(input.replace(/\s/g, '').toUpperCase()); // true
```

## API

### `validateNIB(value: unknown): boolean`

Returns `true` when `value` is a string with 21 digits (bank 4 + branch 4 + account 11 + 2 check digits) whose check digits are correct: `98 − ((first 19 digits × 100) mod 97)`.

Any other value (numbers, `null`, `undefined`, objects, strings with spaces) returns `false`.

### `validateIBAN(value: unknown): boolean`

Returns `true` when `value` is a Portuguese IBAN: `PT50` followed by a valid NIB. Portuguese IBANs always have the check digits `50`, because the NIB already has its own mod-97 check. IBANs from other countries return `false`.

### `randomNIB(bankCode?: string): string`

Returns a random valid NIB. When `bankCode` is given, the NIB starts with it; otherwise a bank from the list below is used. `bankCode` must be a string with 4 digits (`'0007'`, not `7`), or a `TypeError` is thrown.

### `randomIBAN(bankCode?: string): string`

Same as `randomNIB()`, with the `PT50` prefix.

### `getBIC(value: unknown): string | null`

Returns the SWIFT/BIC (8 characters) of the bank of a valid NIB or Portuguese IBAN. Returns `null` when the value is not valid or the bank is not in the list below.

### `getBankName(value: unknown): string | null`

Returns the name of the bank of a valid NIB or Portuguese IBAN, or `null`, like `getBIC()`.

## Banks

The bank is identified by the first 4 digits of the NIB (digits 5 to 8 of the IBAN). Validation does not use this list, so a NIB from a bank that is not listed is still valid.

| Code | Bank | SWIFT/BIC |
| ---- | ---- | --------- |
| 0007 | Novo Banco, S.A. | BESCPTPL |
| 0008 | Banco BAI Europa, S.A. | BAIPPTPL |
| 0010 | Banco BPI, S.A. | BBPIPTPL |
| 0014 | Banco Invest, S.A. | IVVSPTPL |
| 0018 | Banco Santander Totta, S.A. | TOTAPTPL |
| 0019 | Banco Bilbao Vizcaya Argentaria, S.A. (BBVA) | BBVAPTPL |
| 0022 | Banco do Brasil AG | BRASPTPL |
| 0023 | Banco ActivoBank, S.A. | ACTVPTPL |
| 0025 | Caixa - Banco de Investimento, S.A. | CXBIPTPL |
| 0033 | Banco Comercial Português, S.A. (Millennium BCP) | BCOMPTPL |
| 0035 | Caixa Geral de Depósitos, S.A. | CGDIPTPL |
| 0036 | Caixa Económica Montepio Geral | MPIOPTPL |
| 0045 | Caixa Central de Crédito Agrícola Mútuo, CRL | CCCMPTPL |
| 0047 | Haitong Bank, S.A. | ESSIPTPL |
| 0048 | Banco Finantia, S.A. | BFIAPTPL |
| 0061 | Banco de Investimento Global, S.A. (BiG) | BDIGPTPL |
| 0063 | Bison Bank, S.A. | BNFIPTPL |
| 0064 | Banco Português de Gestão, S.A. | BPGPPTPL |
| 0065 | Best - Banco Electrónico de Serviço Total, S.A. | BESZPTPL |
| 0160 | Novo Banco dos Açores, S.A. | BESAPTPA |
| 0189 | Banco Atlântico Europa, S.A. | BAPAPTPL |
| 0193 | Banco CTT, S.A. | CTTVPTPL |
| 0235 | Banco L.J. Carregosa, S.A. | BLJCPTPT |
| 0698 | Unicre - Instituição Financeira de Crédito, S.A. | UIFCPTP1 |

Last checked: November 2026. Banks merge and change names: if a code or BIC is wrong or missing, please [open an issue](https://github.com/edyspider/validate-bank-account-pt/issues).

## Known Issues

- [**Issues**](https://github.com/edyspider/validate-bank-account-pt/issues)

## Authors

- [**EdySpider**](https://github.com/edyspider/)

## License

- **[MIT license](https://github.com/edyspider/validate-bank-account-pt/blob/main/LICENSE)**
- Copyright 2024 &copy; [EdySpider](https://github.com/edyspider/)
