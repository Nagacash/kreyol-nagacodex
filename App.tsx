
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Introduction from './sections/Introduction';
import History from './sections/History';
import Basics from './sections/Basics';
import Vocabulary from './sections/Vocabulary';
import Grammar from './sections/Grammar';
import Conversations from './sections/Conversations';
import Practice from './sections/Practice';
import { Section } from './types';
import { motion, AnimatePresence } from 'framer-motion';

const sectionComponents: Record<Section, React.ComponentType> = {
  [Section.INTRODUCTION]: Introduction,
  [Section.HISTORY]: History,
  [Section.BASICS]: Basics,
  [Section.VOCABULARY]: Vocabulary,
  [Section.GRAMMAR]: Grammar,
  [Section.CONVERSATIONS]: Conversations,
  [Section.PRACTICE]: Practice,
};

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.INTRODUCTION);

  const CurrentSection = sectionComponents[activeSection];

  return (
    <div className="flex h-screen w-full bg-background">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <CurrentSection />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
