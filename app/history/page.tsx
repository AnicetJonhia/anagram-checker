'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Search } from 'lucide-react';
import Link from 'next/link';



export default function HistoryPage() {
  const [history, setHistory] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
      setHistory(savedHistory);
    } catch (error) {
      console.error('Error loading history:', error);
    }
    setIsLoaded(true);
  }, []);

  const handleClearAll = () => {

    localStorage.removeItem('searchHistory');
    setHistory([]);
   
  };

  const handleRemove = (index: number) => {
    const newHistory = history.filter((_, i) => i !== index);
    setHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  


  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Subheader */}
      <div className="border-b border-border bg-card">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Search History
          </h2>
        </div>
      </div>

      {/* Main Content  */}
      
      <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8">
        <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col">
          
          {!isLoaded ? (
            <div className="flex-1 flex items-center justify-center bg-card border border-border rounded-lg p-8">
              <p className="text-muted-foreground">Loading history...</p>
            </div>
          ) : history.length === 0 ? (
          
            <div className="flex-1 flex flex-col items-center justify-center bg-card border border-border rounded-lg p-8 sm:p-12 text-center">
              <div className="bg-muted/30 w-20 h-20 rounded-full flex items-center justify-center ">
                <Search className="w-10 h-10 text-muted-foreground opacity-40" />
              </div>
              <p className="text-2xl text-foreground font-bold mb-2">
                No search history yet
              </p>
              <p className="text-muted-foreground mb-8 max-w-sm">
                Your valid word searches will be stored here. Start typing in the checker to build your list!
              </p>
              <Link href="/">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 h-12 text-lg shadow-lg cursor-pointer">
                  Start Searching
                </Button>
              </Link>
            </div>

          ) : (
            
            <div className="flex-1 flex flex-col">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    Recently Searched
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {history.length} {history.length === 1 ? 'word' : 'words'}
                  </p>
                </div>
                <Button
                  onClick={handleClearAll}
                  variant="destructive"
                  className="cursor-pointer"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {history.map((word, index) => (
                  <div
                    key={index}
                    className="group relative bg-card border border-border rounded-lg p-4 transition-all hover:border-primary hover:shadow-md"
                  >
                    <p className="w-full text-center font-semibold text-primary text-sm mb-3">
                      {word}
                    </p>
                    <button
                      onClick={() => handleRemove(index)}
                      className="w-full text-xs text-muted-foreground hover:text-destructive transition-colors cursor-pointer py-2 flex items-center justify-center gap-1 border-t border-border"
                    >
                      <Trash2 className="w-3 h-3" />
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
