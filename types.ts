
export enum Section {
  INTRODUCTION = 'Introduction',
  HISTORY = 'History',
  BASICS = 'Basics',
  VOCABULARY = 'Vocabulary',
  GRAMMAR = 'Grammar',
  CONVERSATIONS = 'Conversations',
  PRACTICE = 'Practice',
}

export interface Phrase {
  creole: string;
  french: string;
  english: string;
  pronunciation?: string;
}

export interface DictionaryEntry {
  creole: string;
  french: string;
  english: string;
  type: string; // e.g., 'n.', 'v.', 'adj.'
  example?: Phrase;
}

export interface GrammarRule {
  title: string;
  explanation: string;
  examples: Phrase[];
}

export interface Dialogue {
  title: string;
  scenario: string;
  lines: {
    character: string;
    line: Phrase;
  }[];
}

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

export interface HistorySection {
  title: string;
  content: string[];
}
