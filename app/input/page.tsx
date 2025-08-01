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
            <h2>Input</h2>
            <div>
                Name : <input type="text" name="name" value={data.name} onChange={handleChange} /><br />
                Age : <input type="number" name="age" value={data.age} onChange={handleChange} /><br />
                Email : <input type="email" name="email" value={data.email} onChange={handleChange} /><br />
                 <input type="button" value="Save Data" onClick={handleSave}/>
            </div>
        </>
    );
}
export default Input;