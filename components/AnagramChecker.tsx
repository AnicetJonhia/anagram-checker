'use client';

import { useEffect, useState, useRef } from 'react';
import {
  loadWordList,
  isValidWord,
  findAnagrams,
  getAnagramCount,
} from '@/lib/anagramUtils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Trash2,
  Search,
  Copy,
  Check,
} from 'lucide-react';

export default function AnagramChecker() {
  const [word, setWord] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [anagrams, setAnagrams] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadWordList().then(() => setIsLoaded(true));
  }, []);

  const handleInputChange = (value: string) => {
    const sanitized = value.replace(/[^a-zA-Z]/g, '');
    setWord(sanitized);

    // Clear existing debounce timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (sanitized.trim()) {
      // Debounce: wait 1 second after user stops typing
      debounceTimer.current = setTimeout(() => {
        const valid = isValidWord(sanitized);
        setIsValid(valid);
        const foundAnagrams = findAnagrams(sanitized);
        setAnagrams(foundAnagrams);

        // Save to history if valid and not duplicate
        if (valid) {
          saveToHistory(sanitized);
        }
      }, 1000);
    } else {
      setIsValid(false);
      setAnagrams([]);
    }
  };

  const saveToHistory = (searchWord: string) => {
    try {
      const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
      // Avoid duplicates
      if (!history.includes(searchWord.toUpperCase())) {
        history.unshift(searchWord.toUpperCase());
        // Keep last 50 searches
        if (history.length > 50) {
          history.pop();
        }
        localStorage.setItem('searchHistory', JSON.stringify(history));
      }
    } catch (error) {
      console.error('Error saving to history:', error);
    }
  };

  const handleReset = () => {
    setWord('');
    setIsValid(false);
    setAnagrams([]);
    setCopiedIndex(null);
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex flex-col">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Anagram Finder
          </h1>
          <p className="text-primary-foreground/90">
            Enter a word and discover all its anagrams instantly
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
        <div className="max-w-2xl mx-auto">
          {/* Input Section */}
          <div className="bg-card rounded-lg shadow-lg p-6 sm:p-8 mb-6">
            <label className="block text-sm font-semibold mb-2 text-foreground">
              Your Word
            </label>
            <div className="flex gap-2 mb-6">
              <Input
                type="text"
                placeholder="Enter a word..."
                value={word}
                onChange={(e) => handleInputChange(e.target.value)}
                disabled={!isLoaded}
                className="text-base"
              />
              <Button
                onClick={handleReset}
                variant="destructive"
                
                disabled={!word}
                className="cursor-pointer "
              >
                <Trash2 className="h-4 w-4" />
                Reset
              </Button>
            </div>

            {/* Info Display */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-secondary/50 rounded-lg p-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  Valid Word
                </p>
                <p className="text-xl sm:text-2xl font-bold text-foreground">
                  {word ? (isValid ? '✓ Yes' : '✗ No') : '—'}
                </p>
              </div>
              <div className="bg-accent/10 rounded-lg p-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  Anagrams Found
                </p>
                <p className="text-xl sm:text-2xl font-bold text-accent">
                  {word ? getAnagramCount(word) : '—'}
                </p>
              </div>
            </div>
          </div>

          {/* Anagrams List */}
          <div className="bg-card rounded-lg shadow-lg p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-foreground flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              Anagrams
            </h2>

            {!isLoaded ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Loading word list...
                </p>
              </div>
            ) : anagrams.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                {anagrams.map((anagram, index) => (
                  <button
                    key={index}
                    onClick={() => handleCopy(anagram, index)}
                    className="group relative bg-gradient-to-br from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20 border border-primary/20 rounded-lg p-3 text-center transition-all duration-200 hover:shadow-md cursor-pointer"
                  >
                    <span className="font-semibold text-primary">
                      {anagram}
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {copiedIndex === index ? (
                        <div className="flex flex-col items-center gap-1">
                          <Check className="h-4 w-4 text-green-400" />
                          <span className="text-xs text-white font-medium">
                            Copied
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-1">
                          <Copy className="h-4 w-4 text-white" />
                          <span className="text-xs text-white font-medium">
                            Click to copy
                          </span>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ) : word ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground font-medium">
                  No anagrams found for <span className="text-foreground font-bold">{word.toUpperCase()}</span>
                </p>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Enter a word to find anagrams
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

            
    </div>
  );

}
