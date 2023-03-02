import React from 'react';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';

const Register = () => {
  return (
    <div className="bg-blue1 h-screen flex items-center justify-center">
      <div>
        <div className='flex justify-center text-4xl text-white mb-5'>Register</div>
        <form className="bg-blue3 rounded-lg p-6 border-r-8 border-b-8 border-blue4">
          <div className='flex flex-col items-center m-6'>
            <div className='w-full pb-10'>
              <Input placeholder="Please enter your username" />
            </div>
            <div className='w-full pb-5'>
              <Input placeholder="Please enter your password" />
            </div>
            <Button text={"Register"} />
          </div>
        </form>
      </div>
    </div>

  );
};

export default Register;