import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { BACKEND_URL } from "../utils/Constants";

const Products = () => {
    const [products, setProducts] = useState([]);

    const findAllProducts = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/product/all`);
            if (response.status === 200) {
                setProducts(response.data);
            }
            console.log(response)
            console.log(response.data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        findAllProducts();
    }, []);

    return (
        <div className="pt-[13vh] pb-8 w-[80vw] mx-auto px-4 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Our Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Products;
