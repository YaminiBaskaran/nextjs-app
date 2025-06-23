import Link from "next/link"
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { supabase } from '../../lib/supabaseClient';

export default function Read() {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState<any>(null);
    useEffect(() => {
        if (!id) return;
        const fetchProduct = async () => {
            const { data, error } = await supabase.from('products').select('*').eq('id', id).single();

            if (error) {
                console.error('Error fetching product:', error);
            }
            else {
                setProduct(data);
            }
        };
        fetchProduct();
    }, [id]);
    if (!product) return <p>Loading...</p>;
    return (
        <div className="flex h-screen bg-blue-500 justify-center items-center">
            <div className="w-1/2 bg-white rounded-lg p-6 shadow-lg">
                <Link href="/" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-500 transition">Back</Link>
                <div className="px-2 py-2">
                    <h1>Product Detail</h1>
                    <h3>ID : {product.id}</h3>
                    <h3>Name : {product.name}</h3>
                    <h3>Price : {product.price}</h3>
                    <h3>Unit : {product.unit}</h3>
                </div>

                <Link href={`/update/${product.id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-500 transition">Edit</Link>
            </div>
        </div>
    )
}