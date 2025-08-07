
import React from 'react';
import Card from '../components/Card';
import { motion } from 'framer-motion';
import ImageCarousel from '../components/ImageCarousel';

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

const images = [
    'images/gu1.jpg',
    'images/gu2.jpg',
    'images/gu3.jpg',
    'images/gu4.jpg',
    'images/gu5.jpg'
];


const Introduction: React.FC = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.h1 variants={itemVariants} className="text-4xl font-bold tracking-tight text-foreground font-serif">
        Welcome to Kréyòl Gwiyanè
      </motion.h1>
      
      <motion.p variants={itemVariants} className="text-xl text-muted-foreground">
        Your journey to mastering French Guyanese Creole starts here. This guide is designed to take you from the very basics to holding confident, natural conversations.
      </motion.p>

      <motion.div variants={itemVariants}>
        <ImageCarousel images={images} />
      </motion.div>

      <Card variants={itemVariants}>
        <h2 className="text-3xl font-semibold mb-3 font-serif">What is French Guyanese Creole?</h2>
        <p className="text-muted-foreground text-lg">
          French Guyanese Creole, known as Kréyòl Gwiyanè, is a French-based creole language spoken in French Guiana, an overseas region of France located in South America. It's a vibrant language born from a unique history, blending elements of French, African languages, Amerindian languages, and more. Learning it opens a door to a rich culture and a warm community.
        </p>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card variants={itemVariants}>
          <h2 className="text-3xl font-semibold mb-3 font-serif">Why Learn It?</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground text-lg">
            <li>Connect with the people and culture of French Guiana.</li>
            <li>Expand your linguistic horizons with a unique Creole language.</li>
            <li>Enjoy local music, stories, and traditions more deeply.</li>
            <li>A rewarding challenge for any language enthusiast.</li>
          </ul>
        </Card>
        <Card variants={itemVariants}>
          <h2 className="text-3xl font-semibold mb-3 font-serif">How This Course Works</h2>
          <p className="text-muted-foreground text-lg">
            We'll guide you through structured lessons covering pronunciation, vocabulary, and grammar. Each section builds on the last. Finally, you can practice your skills in real-time with our AI-powered conversation partner, designed to help you use what you've learned.
          </p>
          <p className="text-foreground mt-2 font-semibold text-lg">
            Let's get started! Annou alé!
          </p>
        </Card>
      </div>
    </motion.div>
  );
};

export default Introduction;
