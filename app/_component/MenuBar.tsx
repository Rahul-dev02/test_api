"use client"
import { usePathname } from "next/navigation";
import Link from "next/link";

const MenuBar=()=>{
       const pathName=usePathname();
       console.log(pathName);
    return(
        <>
         <Link href="/" className={pathName==="/"?"active":" "}>Home</Link>
         <Link href="/input" className={pathName==="/input"?"active":" "}>Input</Link>

        <Link href="/show"  className={pathName==="/show"?"active":" "}>Show</Link>
        </>
    )
}
export default MenuBar;