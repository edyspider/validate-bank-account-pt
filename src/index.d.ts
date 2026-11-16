// src/index.d.ts

declare function validateNIB(value: unknown): boolean;
declare function randomNIB(bankCode?: string): string;
declare function validateIBAN(value: unknown): boolean;
declare function randomIBAN(bankCode?: string): string;
declare function getBIC(value: unknown): string | null;
declare function getBankName(value: unknown): string | null;

export { validateNIB, randomNIB, validateIBAN, randomIBAN, getBIC, getBankName };