'use client';
import React,{ useState } from "react";
import { json } from "stream/consumers";
const Input=()=>{
    const[data,setData]=useState({name:"",age:0,email:""});
    
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{        
        setData({...data,[e.target.name]:e.target.value});
    }
   
    const handleSave=()=>{
        const saveData=async()=>{
             const res=await fetch("https://68889463adf0e59551ba83ac.mockapi.io/mydata",{
                method:'POST',
              headers: {"content-type":"application/json"},
                body:JSON.stringify({name:data.name,age:data.age,email:data.email})
             });
                if(res.ok){
                       console.log("data has been save ", data)
                   setData({name:"", age:0 ,email:""})
                }
            }
        saveData();
    
    }
    
   
    
    return(
        <>
        
            <h2 className="m-5 bg-green-500 w-max"> Input</h2>
            <div className="flex justify-center items-center ">
            <div className="border border-gray-600 rounded-b-sm w-max  bg-gray-100 p-5  shadow-md ">
                Name : <input type="text" name="name" value={data.name} 
                onChange={handleChange} className="border p-1 w-full" /><br />
                Age : <input type="number" name="age" value={data.age} 
                onChange={handleChange} className="border p-1 w-full" /><br />
                Email : <input type="email" name="email" value={data.email} 
                onChange={handleChange} className="border p-1 w-full" /><br />

                 <input type="button" value="Save Data" 
                 className="text-blue-700 mt-1.5 rounded-b-md right-5" onClick={handleSave}/>
            </div>
            </div>
            
        </>
    );
}
export default Input;