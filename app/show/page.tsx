"use client"
import { useState,useEffect } from "react";
import Link from "next/link";
export type Student = {
  name: string
  age: number
  email: string
  id: string
}

const Show=()=>{
            const [students,setStudent]=useState<Student[]>([]);
    useEffect(()=>{

              const getStudent=async()=>{       
                const res=await fetch("https://68889463adf0e59551ba83ac.mockapi.io/mydata")
                if(res.ok){
                 const data:Student[]=await res.json()
                    console.log(data)
                    setStudent(data)
                }
           }
           getStudent()
    },[]);

    const handleDelete=async(id:string)=>{
         const res=await fetch(`https://68889463adf0e59551ba83ac.mockapi.io/mydata/${id}`,{
            method:"DELETE"
         });
         if(res.ok){
            console.log("data has been deleted with id", id)
            setStudent((preStudents)=>preStudents.filter((s)=>s.id !==id))

         }else {
      console.error("Failed to delete student");
    }
    }
     
    return(
        <>
        <h3 className="m-5 bg-green-500 w-max" > Show DATA</h3>
        <p className="m-5">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>

        {
            students.map(student=>{return(

                    <div key={student.id} className="box relative">
                      <h3 className=""> Name:{student.name}</h3>
                        <p>
                           Age:  {student.age}<br />
                          Email: {student.email}
                      </p>
                        
                        <input type="button" value="X"
                        className="text-red-700 absolute top-0 right-2" 
                          onClick={()=> handleDelete(student.id)}/>  &nbsp;&nbsp;&nbsp;&nbsp;
                        
                            <Link href={"/edit/"+student.id} className="text-blue-500 absolute right-3">edit</Link>
                    </div>
                   )
            })
        }


        </>
    )
}
export default  Show;