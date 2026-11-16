// src/banks.js
// Portuguese bank codes (the first 4 digits of a NIB) with the institution name and SWIFT/BIC.
// Only institutions whose BIC was confirmed in two sources are listed.
// Last checked: 2026-11-16.

export const BANKS = Object.freeze({
    '0007': { name: 'Novo Banco, S.A.', bic: 'BESCPTPL' },
    '0008': { name: 'Banco BAI Europa, S.A.', bic: 'BAIPPTPL' },
    '0010': { name: 'Banco BPI, S.A.', bic: 'BBPIPTPL' },
    '0014': { name: 'Banco Invest, S.A.', bic: 'IVVSPTPL' },
    '0018': { name: 'Banco Santander Totta, S.A.', bic: 'TOTAPTPL' },
    '0019': { name: 'Banco Bilbao Vizcaya Argentaria, S.A. (BBVA)', bic: 'BBVAPTPL' },
    '0022': { name: 'Banco do Brasil AG', bic: 'BRASPTPL' },
    '0023': { name: 'Banco ActivoBank, S.A.', bic: 'ACTVPTPL' },
    '0025': { name: 'Caixa - Banco de Investimento, S.A.', bic: 'CXBIPTPL' },
    '0033': { name: 'Banco Comercial Português, S.A. (Millennium BCP)', bic: 'BCOMPTPL' },
    '0035': { name: 'Caixa Geral de Depósitos, S.A.', bic: 'CGDIPTPL' },
    '0036': { name: 'Caixa Económica Montepio Geral', bic: 'MPIOPTPL' },
    '0045': { name: 'Caixa Central de Crédito Agrícola Mútuo, CRL', bic: 'CCCMPTPL' },
    '0047': { name: 'Haitong Bank, S.A.', bic: 'ESSIPTPL' },
    '0048': { name: 'Banco Finantia, S.A.', bic: 'BFIAPTPL' },
    '0061': { name: 'Banco de Investimento Global, S.A. (BiG)', bic: 'BDIGPTPL' },
    '0063': { name: 'Bison Bank, S.A.', bic: 'BNFIPTPL' },
    '0064': { name: 'Banco Português de Gestão, S.A.', bic: 'BPGPPTPL' },
    '0065': { name: 'Best - Banco Electrónico de Serviço Total, S.A.', bic: 'BESZPTPL' },
    '0160': { name: 'Novo Banco dos Açores, S.A.', bic: 'BESAPTPA' },
    '0189': { name: 'Banco Atlântico Europa, S.A.', bic: 'BAPAPTPL' },
    '0193': { name: 'Banco CTT, S.A.', bic: 'CTTVPTPL' },
    '0235': { name: 'Banco L.J. Carregosa, S.A.', bic: 'BLJCPTPT' },
    '0698': { name: 'Unicre - Instituição Financeira de Crédito, S.A.', bic: 'UIFCPTP1' },
});