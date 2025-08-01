// 'use client';

// import React,{ useState,useEffect } from "react";
// const Edit=({params}:{params:Promise<{id:number}>})=>{

//     const{id}=React.use(params);
    
//     const[data,setData]=useState({name:"",age:0,email:""});
   

//     const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{        
//             setData({...data,[e.target.name]:e.target.value});
//     }
        
//     const handleUpdate=()=>{
//                  const updateUser=async()=>{
//             const res=await fetch(`https://68889463adf0e59551ba83ac.mockapi.io/mydata/${id}`,{
//                 method:'PUT',
//                 headers:{'content-type':'application/json'},
//                 body:JSON.stringify({name:"",age:0,email:""})
//             });
//             if(res.ok)
//             {                               
//                console.log("Data has been updated");    
//             }            
//         }
//         updateUser();
//     }

//     useEffect(()=>{
       
//     },[]);

//     return(
//         <>
//             <h2>Edit</h2>

//             {
//                 .Students.length>0? 
//                 <div>
//                     Name : <input type="text" name="name" value={data.name} onChange={handleChange} /><br />
//                     Age : <input type="number" name="age" value={data.age} onChange={handleChange} /><br />
//                     Email : <input type="email" name="email" value={data.email} onChange={handleChange} /><br />
//                     <input type="button" value="Update data" onClick={handleUpdate} />
//                 </div>
//                 :
//                 <>  
//                     <p>
//                         There is no data for id = {id}
//                     </p>
//                 </>
//             }
            
//         </>
//     );
// }
// export default Edit;

'use client';

import React, { useState, useEffect } from 'react';

export type Student = {
  name: string;
  age: number;
  email: string;
};

const Edit = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const [data, setData] = useState<Student>({
    name: '',
    age: 0,
    email: '',
  });

  const [loading, setLoading] = useState(true);

  // Fetch student data by ID
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://68889463adf0e59551ba83ac.mockapi.io/mydata/${id}`);
      if (res.ok) {
        const student = await res.json();
        setData(student);
      } else {
        console.error("Failed to fetch data");
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
      console.log('Data has been updated');
      // Optionally redirect or show success message
    } else {
      console.error('Failed to update data');
    }
  };

  return (
    <>
      <h2 className="text-2xl m-4">Edit Student</h2>

      {loading ? (
        <p>Loading...</p>
      ) : data.name ? (
        <div className="m-4 p-4 border w-max rounded bg-gray-100">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              className="ml-2 border p-1"
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
              className="ml-2 border p-1"
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
              className="ml-2 border p-1"
            />
          </label>
          <br />
          <input
            type="button"
            value="Update data"
            onClick={handleUpdate}
            className="mt-3 bg-blue-500 text-white px-3 py-1 cursor-pointer"
          />
        </div>
      ) : (
        <p>No data found for ID = {id}</p>
      )}
    </>
  );
};

export default Edit;
