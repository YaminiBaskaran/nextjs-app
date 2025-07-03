import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";

export default function Signup(){
    const [values,setValues]=useState({
        name:"",
        email:"",
        password:""
    });
    const router = useRouter();
    const handleSubmit = async (e: any) => {
  e.preventDefault();

  // Step 1: Sign up user to auth.users
  const { data: signUpData, error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
  });

  if (error || !signUpData.user) {
    console.error("Error in signup:", error);
    return;
  }

  // Step 2: Insert into public.users using same ID
  const userId = signUpData.user.id;

  const { error: insertError } = await supabase.from('users').insert({
    id: userId, // Important!
    name: values.name,
    email: values.email,
    role: "user"
  });

  if (insertError) {
    console.error("Error inserting to public.users:", insertError);
    return;
  }

  router.push('/');
};


    
    return (
        <div className="flex h-screen bg-blue-500 justify-center items-center">
            <div className="w-1/2 bg-white rounded-lg p-6 shadow-lg">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                       <label htmlFor="">Name : </label>
                        <input type="text" placeholder="Enter Name" value={values.name} onChange={(e)=>setValues({...values,name:e.target.value})} required /> 
                    </div>
                    <div className="mb-4">
                       <label htmlFor="">Email: </label>
                        <input type="email" placeholder="Enter Email" value={values.email} onChange={(e)=>setValues({...values,email:e.target.value})} required/> 
                    </div>
                    <div className="mb-4">
                       <label htmlFor="">Password : </label>
                        <input type="password" placeholder="********" value={values.password} onChange={(e)=>setValues({...values,password:e.target.value})} required/> 
                    </div>
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">Register</button>
                </form>
                <Link href="/login">Already have an account?Login here</Link>
            </div>
        </div>
    )
}