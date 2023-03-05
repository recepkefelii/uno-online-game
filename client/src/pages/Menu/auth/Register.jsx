import React from 'react';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import { useValidation } from '../../../hooks/formik/formik';
import Spinner from '../../../components/common/Spinner';

const Register = () => {

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(4, 'Username length must be at least 4 characters')
      .max(12, 'username can be maximum 12 characters')
      .required('Username is required'),
    password: Yup.string()
      .min(6, 'Password length must be at least 6 characters')
      .max(20, 'password can be maximum 20 characters')
      .required('Password is required'),
    terms: Yup.boolean().oneOf([true], 'Accept terms and conditions is required'),
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useValidation(
    {
      username: '',
      password: '',
      terms: false
    },
    validationSchema,
    onSubmit,
  );

  return (
    <div className="bg-blue1 h-screen flex items-center justify-center">
      <div>
        <div className='flex justify-center text-4xl text-white mb-5'>Register</div>
        <form onSubmit={handleSubmit} className="bg-blue3 rounded-lg p-6 border-r-8 border-b-8 border-blue4">
          <div className='flex flex-col items-center m-6'>
            <div>
              <div className='w-full pb-10'>
                <span className='text-white'>username</span>
                <Input
                  name="username"
                  placeholder="Enter your username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.username}
                />
              </div>
              <div className='w-full pb-5'>
                <span className='text-white'>password</span>
                <Input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={values.password}
                  onChange={handleChange}
                  error={errors.password}
                />
              </div>
              <div className="flex items-start pb-10">
                <div className="flex items-center h-5">
                  <input id="terms" name="terms" aria-describedby="terms" type="checkbox"
                    className="w-4 h-4 border border-white rounded bg-white focus:ring-3 focus:ring-primary-300
                 dark:bg-white dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    checked={values.terms} onChange={handleChange} required="" />
                </div>
                <div className="ml-3 text-sm">
                  <label className="font-light text-white dark:text-white">I accept the <NavLink className="font-medium text-blue4 hover:underline dark:text-blue2">Terms and Conditions</NavLink></label>
                  {errors.terms && <div className="text-red-500">{errors.terms}</div>}
                  <Spinner />
                </div>
              </div>
            </div>
            <div className='flex justify-center items-center'>
              <Button type="submit" text={"Register"} />
            </div>
            <div className='mt-5'>
              <NavLink to="/login" className={"hover:text-blue4 hover:underline text-white"}>Already have an account?</NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>

  );
};

export default Register;