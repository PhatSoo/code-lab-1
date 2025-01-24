'use client';
import React from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import signOut from '@/firebase/auth/signOut';

function Page() {
  const { user } = useAuthContext();
  const [isLoading, setLoading] = React.useState(true);
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(); // Đăng xuất người dùng từ Firebase
    alert('Logged out successfully');
    router.push('/');
  };

  React.useEffect(() => {
    if (user == null) router.push('/');
    else setLoading(false);
  }, [user]);

  return (
    !isLoading && (
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <h1 className='align-middle flex mt-10 bg-red-200 justify-center mb-4'>Only logged in users can view this page</h1>

        <button onClick={handleLogout} className='bg-red-500 text-white px-6 py-2 rounded'>
          Logout
        </button>
      </div>
    )
  );
}

export default Page;
