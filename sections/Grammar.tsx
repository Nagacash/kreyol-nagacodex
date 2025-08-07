import React from 'react';
import Card from '../components/Card';
import { GRAMMAR_DATA } from '../constants';
import { motion } from 'framer-motion';
import { speak } from '../utils';
import SpeakerIcon from '../components/icons/SpeakerIcon';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const Grammar: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold tracking-tight text-foreground font-serif">Grammar Essentials</h1>
      <p className="text-xl text-muted-foreground">
        Understand the structure of Guyanese Creole. The rules are often simpler and more consistent than French.
      </p>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {GRAMMAR_DATA.map((rule) => (
          <motion.div key={rule.title} variants={itemVariants}>
            <Card>
              <h2 className="text-3xl font-semibold mb-2 text-foreground font-serif">{rule.title}</h2>
              <p className="text-muted-foreground mb-4 text-lg">{rule.explanation}</p>
              <div className="space-y-3">
                {rule.examples.map((example, index) => (
                  <div key={index} className="bg-secondary/50 p-3 rounded-md group">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-mono text-lg text-foreground/90">{example.creole}</p>
                            <p className="text-base text-muted-foreground">
                              <span className="font-semibold text-foreground/80">EN:</span> {example.english} | <span className="font-semibold text-foreground/80">FR:</span> {example.french}
                            </p>
                        </div>
                         <button
                            onClick={(e) => speak(example.creole, e)}
                            className="text-muted-foreground/50 hover:text-primary transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 p-1 group-hover:scale-110"
                            aria-label={`Listen to "${example.creole}"`}
                        >
                            <SpeakerIcon className="w-5 h-5" />
                        </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Grammar;