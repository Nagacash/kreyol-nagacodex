import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

type CardProps = HTMLMotionProps<'div'>;

const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <motion.div
      className={`bg-card text-card-foreground p-6 rounded-lg border border-border shadow-lg shadow-black/20 transition-all hover:border-zinc-700/80 hover:shadow-xl hover:shadow-black/30 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
