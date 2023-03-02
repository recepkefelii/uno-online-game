import React from 'react'
import { motion } from 'framer-motion';
const Button = ({ text }) => {
    return (
        <>
            <motion.button
                className='bg-white text-blue1 ml-10 h-9 w-52 rounded-xl'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}>{text}
            </motion.button>
        </>
    )
}

export default Button
