import React from 'react'
import Input from '../../../components/common/Input';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '../../../components/common/Button';
import { useValidation } from '../../../hooks/formik/formik';

const Login = () => {
    const validationSchema = Yup.object({
      username: Yup.string()
        .min(4, 'Username length must be at least 4 characters')
        .max(12, 'username can be maximum 12 characters')
        .required('Username is required'),
      password: Yup.string()
        .min(6, 'Password length must be at least 6 characters')
        .max(20, 'password can be maximum 20 characters')
        .required('Password is required'),
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
      },
      validationSchema,
      onSubmit,
    );
  
    return (
      <div className="bg-blue1 h-screen flex items-center justify-center">
        <div>
          <div className='flex justify-center text-4xl text-white mb-5'>Login</div>
  
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
                <div className='w-full pb-10'>
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
              </div>
              <div className='flex justify-center items-center'>
                <Button text={"Login"} type="submit">Submit</Button>
              </div>
              <div className='mt-5'>
                <NavLink to="/register" className={"hover:text-blue4 hover:underline text-white"}>Don’t have an account yet?</NavLink>
              </div>
            </div>
          </form>
  
        </div>
      </div>
    )
  }
  
export default Login;