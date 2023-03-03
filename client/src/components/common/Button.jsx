import React from 'react'
import { motion } from 'framer-motion';
const Button = ({ text, type }) => {
    return (
        <>
            <motion.button
                type={type}
                className='bg-white text-blue1 h-9 w-56 rounded-xl'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}>{text}

            </motion.button>
        </>
    )
}

export default Button
