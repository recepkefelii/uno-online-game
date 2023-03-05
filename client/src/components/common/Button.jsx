import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ text, type, width, onClick }) => {
  const buttonWidth = width ? width : 'w-56';
  const style = width ? { width: width } : {};

  return (
    <motion.button
      type={type ? type : null}
      className={`bg-white text-blue1 h-9 rounded-xl ${buttonWidth}`}
      style={style}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick} // onClick prop added
    >
      {text}
    </motion.button>
  );
};

export default Button;
