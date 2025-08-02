'use client';

import { use } from 'react';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Svg from '@/public/loading_logo.svg'




export type Student = {
  name: string;
  age: number;
  email: string;
};

const Edit = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params); // ✅ This unwraps the promise

  const [data, setData] = useState<Student>({ name: '', age: 0, email: '' });
  const [loading, setLoading] = useState(true);
   const router=useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://68889463adf0e59551ba83ac.mockapi.io/mydata/${id}`);
      if (res.ok) {
        const student = await res.json();
        setData(student);
      } else {
        console.error('Failed to fetch data');
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const res = await fetch(`https://68889463adf0e59551ba83ac.mockapi.io/mydata/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      console.log('Data updated');
    } else {
      console.error('Failed to update');
    }
  };

  return (
    <>
      <h2 className="m-5 bg-green-500 w-max">Edit Student</h2>
      <div className="flex justify-center items-center">
      {loading ? (
        
       <img src="/loading_logo.svg" alt="Loading..." width="100" height="100" />
      ) : data.name ? (
        <div className="m-4 p-4 border w-max rounded bg-gray-100 relative pb-11">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              className="border p-1 w-full"
            />
          </label>
          <br />
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={data.age}
              onChange={handleChange}
              className="border p-1 w-full"
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="border p-1 w-full"
            />
          </label>
          <br />
          <button className='mt-4 bg-blue-500 text-white px-3 py-1 cursor-pointer rounded-b-md absolute left-4 bottom-1'
           onClick={()=>router.push("/")}>Cancel</button>
          <input
            type="button"
            value="Update data"
            onClick={handleUpdate}
            className="mt-4 bg-blue-500 text-white px-3 py-1 cursor-pointer rounded-b-md absolute right-4 bottom-1"
          />
        </div>
      ) : (
        <p>No data found for ID = {id}</p>
      )}
      </div>
    </>
  );
};

export default Edit;
