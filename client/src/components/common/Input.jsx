import React from 'react'

const Input = ({placeholder}) => {
    return (
        <>
            <input
                placeholder={`${placeholder}`} type="text" className='placeholder-white pl-4 text-white cursor-text 
            placeholder- bg-blue4 h-9 w-full
            border-none outline-none rounded-md  shadow-md shadow-blue1' />
        </>
    )
}

export default Input