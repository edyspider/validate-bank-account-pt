// src/index.d.cts

declare function validateNIB(value: unknown): boolean;
declare function randomNIB(bankCode?: string): string;
declare function validateIBAN(value: unknown): boolean;
declare function randomIBAN(bankCode?: string): string;

export { validateNIB, randomNIB, validateIBAN, randomIBAN };