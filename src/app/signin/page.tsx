'use client';
import React from 'react';
import signIn from '@/firebase/auth/signIn';
import { useRouter } from 'next/navigation';

function Page() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const router = useRouter();

  const handleForm = async (event: any) => {
    event.preventDefault();

    const { result, error } = await signIn(email, password);

    if (error) {
      return console.log(error);
    }

    // else successful
    console.log(result);
    return router.push('/admin');
  };
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md bg-white rounded-lg shadow-md p-8'>
        <h1 className='text-2xl font-bold text-gray-800 mb-6 text-center'>Sign in</h1>
        <form onSubmit={handleForm} className='space-y-6'>
          {/* Email Field */}
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='example@mail.com'
              onChange={(e) => setEmail(e.target.value)}
              required
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2'
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='password'
              onChange={(e) => setPassword(e.target.value)}
              required
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2'
            />
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;
