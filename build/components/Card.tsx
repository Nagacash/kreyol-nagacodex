import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

type CardProps = HTMLMotionProps<'div'>;

const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <motion.div
      className={`bg-card text-card-foreground rounded-xl border border-border shadow-sm p-6 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;