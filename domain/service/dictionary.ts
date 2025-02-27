import fs from 'fs';
import path from 'path';

function removeAccents(word: string): string {
    return word
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

export function loadDictionary(): Set<string> {
    const wordsPath = path.resolve(__dirname, '../data/word-list.txt');
    const words = fs.readFileSync(wordsPath, 'utf-8').split('\n');
    return new Set(words.map((word) => removeAccents(word.trim().toUpperCase())));
}