import React from 'react';
import { useFormik } from 'formik';

const Input = ({ placeholder, name, type, onChange, value,error }) => {
	return (
		<>
		<input
		  name={name}
		  type={type}
		  placeholder={placeholder}
		  onChange={onChange}
		  value={value}
		  className={`placeholder-white pl-4 text-white cursor-text placeholder- bg-blue4 h-9 w-full border-none outline-none rounded-md shadow-md shadow-blue1 ${
			error ? 'border-red-500' : ''
		  }`}
		/>
		{error && <div className="text-red-500">{error}</div>}
	  </>
)};

export default Input