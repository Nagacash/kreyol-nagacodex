import React from 'react';
import Card from '../components/Card';
import { DIALOGUE_DATA } from '../constants';
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

const Conversations: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold tracking-tight text-foreground font-serif">Example Conversations</h1>
      <p className="text-xl text-muted-foreground">
        See how the language is used in everyday situations. Pay attention to the flow and rhythm.
      </p>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {DIALOGUE_DATA.map((dialogue) => (
          <motion.div key={dialogue.title} variants={itemVariants}>
            <Card>
              <h2 className="text-3xl font-semibold mb-1 text-foreground font-serif">{dialogue.title}</h2>
              <p className="text-base text-muted-foreground mb-4 italic">{dialogue.scenario}</p>
              <div className="space-y-4">
                {dialogue.lines.map((line, index) => (
                  <div
                    key={index}
                    className={`flex ${line.character === 'Customer' || line.character === 'Yann' || line.character === 'Tourist' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-lg group ${
                        line.character === 'Customer' || line.character === 'Yann' || line.character === 'Tourist'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      <p className="font-bold text-base mb-1">
                        {line.character}
                      </p>
                      <div className="flex justify-between items-center gap-2">
                        <p className="text-lg">{line.line.creole}</p>
                        <button
                            onClick={(e) => speak(line.line.creole, e)}
                            className={`transition-colors opacity-60 group-hover:opacity-100 focus:opacity-100 ${
                                line.character === 'Customer' || line.character === 'Yann' || line.character === 'Tourist' ? 'text-primary-foreground/70 hover:text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                            }`}
                            aria-label={`Listen to "${line.line.creole}"`}
                        >
                            <SpeakerIcon className="w-4 h-4 flex-shrink-0" />
                        </button>
                      </div>
                      <p className={`text-sm mt-1 ${line.character === 'Customer' || line.character === 'Yann' || line.character === 'Tourist' ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                         {line.line.english}
                      </p>
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

export default Conversations;