// src/index.d.ts

declare function validateNIB(value: unknown): boolean;
declare function randomNIB(bankCode?: string): string;

export { validateNIB, randomNIB };