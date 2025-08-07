
import React from 'react';
import Card from '../components/Card';
import { HISTORY_DATA } from '../constants';
import { motion } from 'framer-motion';

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

const History: React.FC = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.h1 variants={itemVariants} className="text-4xl font-bold tracking-tight text-foreground font-serif">
        The History of Kréyòl Gwiyanè
      </motion.h1>
      <motion.p variants={itemVariants} className="text-xl text-muted-foreground">
        Discover the rich origins and evolution of this unique language.
      </motion.p>
      
      {HISTORY_DATA.map((section) => (
        <motion.div key={section.title} variants={itemVariants}>
            <Card>
              <h2 className="text-3xl font-semibold mb-3 font-serif">{section.title}</h2>
              <div className="space-y-4 text-muted-foreground text-lg">
                {section.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
              </div>
            </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default History;
