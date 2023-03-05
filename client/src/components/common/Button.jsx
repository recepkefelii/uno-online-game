import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ text, type, onClick, classname, style }) => {

  return (
    <motion.button
      type={type ? type : null}
      className={`bg-white h-9 text-blue1 rounded-xl w-56 ${classname}`}
      style={style}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {text}
    </motion.button>
  );
};

export default Button;
