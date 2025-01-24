'use client';
import addData from '@/firebase/firestore/addData';
import getData from '@/firebase/firestore/getData';
import React from 'react';

interface Data {
  name: string;
  house: string;
}

export default function Home() {
  const [formData, setFormData] = React.useState({ name: '', house: '' }); // State cho form
  const [data, setData] = React.useState<Data[]>([]); // State để lưu dữ liệu
  const [shouldFetchData, setShouldFetchData] = React.useState(true); // State để kiểm tra khi nào cần fetch dữ liệu

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    const { result, error } = await addData('users', formData); // Thêm dữ liệu

    if (error) {
      console.log(error);
    } else {
      alert('Data saved successfully');
      setFormData({ name: '', house: '' });
      setShouldFetchData(true);
    }
  };

  const handleFetchData = async () => {
    const { result, error } = await getData('users');
    if (error) {
      console.log(error);
    } else if (result) {
      setData(result as Data[]);
    }
  };

  React.useEffect(() => {
    if (shouldFetchData) {
      handleFetchData();
      setShouldFetchData(false);
    }
  }, [shouldFetchData]);

  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-10'>
      <h1 className='text-2xl font-bold mb-6'>Home Page</h1>

      <form onSubmit={handleFormSubmit} className='mb-6'>
        <div className='mb-4'>
          <label htmlFor='name' className='block font-medium mb-2'>
            Name
          </label>
          <input type='text' id='name' value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className='border rounded px-4 py-2 w-full' required />
        </div>
        <div className='mb-4'>
          <label htmlFor='house' className='block font-medium mb-2'>
            House
          </label>
          <input type='text' id='house' value={formData.house} onChange={(e) => setFormData({ ...formData, house: e.target.value })} className='border rounded px-4 py-2 w-full' required />
        </div>
        <button type='submit' className='bg-blue-500 text-white px-6 py-2 rounded'>
          Save
        </button>
      </form>

      <div className='flex flex-wrap gap-4'>
        {data.map((item: Data, index) => (
          <div key={index} className='bg-gray-100 p-4 rounded shadow-md w-80'>
            <p>
              <strong>Name:</strong> {item.name}
            </p>
            <p>
              <strong>House:</strong> {item.house}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
