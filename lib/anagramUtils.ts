let wordList: Set<string> = new Set();

const sortLetters = (word: string): string => {
  return word.toLowerCase().split('').sort().join('');
};

const normalizeInput = (input: string): string => {
  return input.trim().toUpperCase();
};

const isValidInput = (input: string): boolean => {
  if (!input) return false;
  const trimmed = input.trim();
  if (trimmed.includes(' ')) return false;
  if (!/^[a-zA-Z]+$/.test(trimmed)) return false;
  return true;
};

export const loadWordList = async (): Promise<void> => {
  if (wordList.size > 0) return;

  const response = await fetch('/wordlist.txt');
  const text = await response.text();
  const words = text
    .split('\n')
    .map((word) => word.trim().toUpperCase())
    .filter((word) => word.length > 0);

  wordList = new Set(words);
};

export const isValidWord = (word: string): boolean => {
  const normalized = normalizeInput(word);
  return wordList.has(normalized);
};

export const findAnagrams = (word: string): string[] => {
  const normalized = normalizeInput(word);
  if (!isValidInput(word)) return [];

  const sorted = sortLetters(normalized);
  const anagrams: string[] = [];

  wordList.forEach((w) => {
    if (w !== normalized && sortLetters(w) === sorted) {
      anagrams.push(w);
    }
  });

  return anagrams.sort();
};

export const getAnagramCount = (word: string): number => {
  return findAnagrams(word).length;
};
