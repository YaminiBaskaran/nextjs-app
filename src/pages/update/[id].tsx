import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from '../../lib/supabaseClient';

export default function Update() {
    const router = useRouter();
    const { id } = router.query;
    const [values, setValues] = useState({
        name: '',
        price: 0,
        unit: ''
    });

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return; // Avoid running before ID is defined
            const { data, error } = await supabase.from('products').select('*').eq('id', id).single();

            if (error) 
            {
                console.error('Error fetching product:', error);
            }
            else
            {
                setValues(data);
            }
        };
        fetchProduct();
    }, [id]);
    

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const { error } = await supabase.from('products').update({
                name: values.name,
                price: values.price,
                unit: values.unit
            })
            .eq('id', id);

        if (error) {
            console.error('Error updating product:', error);
        } else {
            router.push('/');
        }
    };

    return (
        <div className="flex h-screen bg-blue-500 justify-center items-center">
            <div className="w-1/2 bg-white rounded-lg p-6 shadow-lg">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-xl mb-4 font-semibold">Edit Product</h2>

                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" className="w-full border px-3 py-2 rounded" value={values.name} onChange={e => setValues({ ...values, name: e.target.value })}/>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="price">Price:</label>
                        <input type="text" id="price" name="price" className="w-full border px-3 py-2 rounded" value={values.price} onChange={e => setValues({ ...values, price: parseFloat(e.target.value) || 0 })}/>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="unit">Unit:</label>
                        <input type="text" id="unit" name="unit" className="w-full border px-3 py-2 rounded" value={values.unit} onChange={e => setValues({ ...values, unit: e.target.value })}/>
                    </div>

                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">Update</button>
                </form>
            </div>
        </div>
    );
}
