import React, { useState, useMemo } from 'react';
import Card from '../components/Card';
import { DICTIONARY_DATA } from '../constants';
import { DictionaryEntry } from '../types';
import { speak } from '../utils';
import SpeakerIcon from '../components/icons/SpeakerIcon';
import SearchIcon from '../components/icons/SearchIcon';

const Vocabulary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    if (!searchTerm) {
      return DICTIONARY_DATA;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    return DICTIONARY_DATA.filter(entry =>
      entry.creole.toLowerCase().includes(lowercasedFilter) ||
      entry.english.toLowerCase().includes(lowercasedFilter) ||
      entry.french.toLowerCase().includes(lowercasedFilter)
    );
  }, [searchTerm]);

  const groupedData = useMemo(() => {
    return filteredData.reduce((acc, entry) => {
      const firstLetter = entry.creole[0].toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(entry);
      return acc;
    }, {} as Record<string, DictionaryEntry[]>);
  }, [filteredData]);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

  const handleIndexClick = (letter: string, event: React.MouseEvent) => {
    event.preventDefault();
    const element = document.getElementById(`letter-${letter}`);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <h1 className="text-3xl font-bold tracking-tight text-primary font-serif">Vocabulary Dictionary</h1>
      <p className="text-lg text-muted-foreground">
        Explore a comprehensive list of Guyanese Creole words. Use the search or index to navigate.
      </p>

      <div className="sticky top-0 z-10 py-2 bg-gradient-to-br from-blue-100/80 via-indigo-100/80 to-purple-100/80 backdrop-blur-sm -mx-8 px-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Creole, English, or French..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-input rounded-full bg-background/80 focus:ring-2 focus:ring-ring focus:outline-none"
            aria-label="Search Vocabulary"
          />
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      <div className="flex flex-wrap gap-x-2 gap-y-1 justify-center px-4">
        {alphabet.map(letter => (
          <a
            key={letter}
            href={`#letter-${letter}`}
            onClick={(e) => handleIndexClick(letter, e)}
            className="w-7 h-7 flex items-center justify-center rounded-md text-sm font-semibold text-primary/70 hover:bg-primary hover:text-primary-foreground transition-colors"
            aria-label={`Go to letter ${letter}`}
          >
            {letter}
          </a>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-8 -mr-4">
        {Object.keys(groupedData).sort().map(letter => (
          <div key={letter} id={`letter-${letter}`} className="pt-4">
            <h2 className="text-3xl font-bold font-serif text-primary/50 mb-4 sticky top-0 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 py-2">
                {letter}
            </h2>
            <div className="space-y-4">
              {groupedData[letter].map(entry => (
                <Card key={entry.creole} className="p-4">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-primary flex items-center flex-wrap gap-x-2">
                        {entry.creole}
                        <span className="text-sm font-normal text-muted-foreground italic">{entry.type}</span>
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-semibold">EN:</span> {entry.english} | <span className="font-semibold">FR:</span> {entry.french}
                      </p>
                    </div>
                     <button
                        onClick={(e) => speak(entry.creole, e)}
                        className="text-muted-foreground/50 hover:text-primary transition-colors p-1 flex-shrink-0"
                        aria-label={`Listen to "${entry.creole}"`}
                    >
                        <SpeakerIcon className="w-5 h-5" />
                    </button>
                  </div>
                  {entry.example && (
                    <div className="mt-3 bg-secondary/50 p-3 rounded-md text-sm group">
                        <div className="flex justify-between items-center gap-2">
                           <div>
                                <p className="font-mono">{entry.example.creole}</p>
                                <p className="text-xs text-muted-foreground">{entry.example.english}</p>
                           </div>
                           <button
                                onClick={(e) => speak(entry.example!.creole, e)}
                                className="text-muted-foreground/50 hover:text-primary transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 p-1 flex-shrink-0"
                                aria-label={`Listen to example: "${entry.example.creole}"`}
                            >
                                <SpeakerIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        ))}
        {filteredData.length === 0 && searchTerm && (
            <div className="text-center py-10 text-muted-foreground">
                <p>No results found for "{searchTerm}".</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Vocabulary;