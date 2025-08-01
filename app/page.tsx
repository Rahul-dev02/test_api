"use client"

const Home=()=>{
 
   const handleSave=()=>{
       const  delteData=async()=>{
        const res=await fetch("https://68889463adf0e59551ba83ac.mockapi.io/users/26",{
          method:'DELETE',
        
        } )
           if(res.ok){
             console.log("Data has been Upadte ")
             
           }

        }
        delteData()
   }
  
  
   

  return(
    <>
    <h1 className="m-5 bg-green-500 w-max">Home </h1>
<p>Some text goes here .</p>
<p>Wellcome to my webPage</p>

       <input type="button" value="savedata"  onClick={handleSave} />
    </>
  )
}
export default Home;