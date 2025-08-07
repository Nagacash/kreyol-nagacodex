import React from 'react';
import Card from '../components/Card';
import { GREETINGS_PHRASES } from '../constants';
import { motion } from 'framer-motion';
import { Phrase } from '../types';
import { speak } from '../utils';
import SpeakerIcon from '../components/icons/SpeakerIcon';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const PhraseCard: React.FC<{ phrase: Phrase }> = ({ phrase }) => (
  <motion.div variants={itemVariants}>
    <Card className="hover:shadow-lg transition-shadow group">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-lg font-semibold text-primary">{phrase.creole}</p>
          <p className="text-sm text-muted-foreground">French: {phrase.french}</p>
          <p className="text-sm text-muted-foreground">English: {phrase.english}</p>
        </div>
        <button
          onClick={(e) => speak(phrase.creole, e)}
          className="text-muted-foreground/50 hover:text-primary transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 p-1"
          aria-label={`Listen to "${phrase.creole}"`}
        >
          <SpeakerIcon className="w-5 h-5" />
        </button>
      </div>
    </Card>
  </motion.div>
);

const Basics: React.FC = () => {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <motion.h1 variants={itemVariants} className="text-3xl font-bold tracking-tight text-primary font-serif">
        The Basics: Greetings & Essential Phrases
      </motion.h1>
      <motion.p variants={itemVariants} className="text-lg text-muted-foreground">
        Start your journey with the most common phrases. These will help you make a great first impression. Click the speaker icon to hear the pronunciation.
      </motion.p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {GREETINGS_PHRASES.map((phrase, index) => (
          <PhraseCard key={index} phrase={phrase} />
        ))}
      </div>
    </motion.div>
  );
};

export default Basics;