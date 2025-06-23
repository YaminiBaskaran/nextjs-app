'use client';
import Link from "next/link";
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from "next/router";

export default function Home() {
  const [data,setData] =useState<any[]>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setData(data);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id:number)=>{
      const {data,error}=await supabase.from('products').delete().eq('id',id);
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout failed:", error.message);
    } else {
      router.push("/"); // or wherever you want to redirect
    }
  }; 

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-2">Welcome to XYZ</h1>
      <p className="mb-6">Add, Modify, Delete Products</p>

      <div className="flex h-screen bg-blue-500 justify-center items-center">
        <div className="w-1/2 bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Product List</h2>
          <div>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition" onClick={handleLogout}>Logout</button>
          </div>
          <div className="flex justify-end">
            <Link href="/create">
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                Create+
              </button>
            </Link>
          </div>
          <table className="min-w-full table-auto border border-spacing-2 border-collapse">
         <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Unit</th>
            <th>Action</th>
          </tr>
         </thead>
         <tbody>
          {data.map((product,index) =>{
                            return <tr key={index}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.unit}</td>
         
                                <td>
                                    <Link href={`/read/${product.id}`} className="bg-blue-400 text-white px-4 py-2  rounded hover:bg-blue-500 transition">Read</Link>
                                    <Link href={`/update/${product.id}`} className="bg-blue-500 text-white px-4 py-2 mx-2  rounded hover:bg-blue-600 transition">Update</Link>
                                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition" onClick={() => handleDelete(product.id)}>Delete</button>
                                </td>
          </tr>
        })}
        </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}