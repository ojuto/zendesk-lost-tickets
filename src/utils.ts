export const brandGroupMap = new Map<string, string>([
    ['Nexaro', '[NEX]'],
    ['VI Distributors', '[VI]'],
    ['VI Repair', '[VI]'],
    ['Vorwerk Benelux', '[BNL]'],
    ['Vorwerk Česká Republika', '[CZ]'],
    ['Vorwerk Deutschland', '[DE]'],
    ['Vorwerk España', '[ES]'],
    ['Vorwerk France', '[FR]'],
    ['Vorwerk International', '[VI]'],
    ['Vorwerk Italia', '[IT]'],
    ['Vorwerk Malaysia', '[MSB]'],
    ['Vorwerk Österreich', '[AT]'],
    ['Vorwerk Polska', '[PL]'],
    ['Vorwerk Portugal', '[PT]'],
    ['Vorwerk Schweiz', '[CH]'],
    ['Vorwerk Singapore', '[MSB]'],
    ['Vorwerk Türkiye', '[TR]'],
    ['Vorwerk UK & Ireland', '[UK]'],
]);

export const requireEnv = (name: string): string => {
    const environmentVariable = process.env[name];
    if (!environmentVariable) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return environmentVariable;
};
