import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";

export default function Create() {
  const router = useRouter();
  const [values, setValues] = useState({
    name: '',
    price: '',
    unit: ''
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const {data:{user},error:userError}=await supabase.auth.getUser();
    if (userError || !user) {
    console.error('User not authenticated:', userError);
    return;
  }
    const { data, error } = await supabase.from('products').insert({
      name: values.name,
      price: parseFloat(values.price),
      unit: values.unit,
      user_id:user.id,
    });

    if (error) {
      console.error('Error inserting product:', error);
    } else {
      console.log('Product created successfully:', data);
      router.push('/userhome');
    }
  };

  return (
    <div className="flex h-screen bg-blue-500 justify-center items-center">
      <div className="w-1/2 bg-white rounded-lg p-6 shadow-lg">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl mb-4 font-semibold">Add Product</h2>

          <div className="mb-4">
            <label>Name: </label>
            <input
              type="text"
              placeholder="Enter Name"
              value={values.name}
              onChange={e => setValues({ ...values, name: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label>Price: </label>
            <input
              type="text"
              placeholder="Enter Price"
              value={values.price}
              onChange={e => setValues({ ...values, price: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label>Unit: </label>
            <input
              type="text"
              placeholder="Enter Unit"
              value={values.unit}
              onChange={e => setValues({ ...values, unit: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
