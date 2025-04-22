import React,{useState , useEffect} from 'react'
import axios from 'axios';
import ProductCard from './ProductCard';
import { BACKEND_URL } from '../utils/Constants';

const TopProducts = () => {
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
        <div className="w-[80vw] mx-auto px-4 pb-6">
            <h2 className="text-3xl md:text-3xl font-bold mb-6 text-center text-[#00B86C]">
        Top Products
      </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.slice(0,4).map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default TopProducts
