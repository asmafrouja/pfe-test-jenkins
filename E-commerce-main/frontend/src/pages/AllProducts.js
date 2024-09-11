import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

const AllProducts = () => {
    const [openUploadProduct, setOpenUploadProduct] = useState(false);
    const [allProduct, setAllProduct] = useState([]);

    const fetchAllProduct = async () => {
        const response = await fetch(SummaryApi.allProduct.url);
        const dataResponse = await response.json();

        console.log("product data", dataResponse);

        setAllProduct(dataResponse?.data || []);
    }

    useEffect(() => {
        fetchAllProduct();
    }, []);

    const handleDeleteProduct = async (productId) => {
        try {
            await fetch(`${SummaryApi.deleteProduct.url}/${productId}`, {
                method: 'DELETE',
            });
            // Refresh the product list
            fetchAllProduct();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }

    return (
        <div>
            <div className='bg-white py-2 px-4 flex justify-between items-center'>
                <h2 className='font-bold text-lg'>All Products</h2>
                <button
                    className='border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all py-1 px-3 rounded-full'
                    onClick={() => setOpenUploadProduct(true)}
                >
                    Upload Product
                </button>
            </div>

            {/** all product */}
            <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
                {
                    allProduct.map((product, index) => (
                        <AdminProductCard
                            data={product}
                            key={index + "allProduct"}
                            fetchdata={fetchAllProduct}
                            onDelete={handleDeleteProduct}
                        />
                    ))
                }
            </div>

            {/** upload product component */}
            {
                openUploadProduct && (
                    <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
                )
            }
        </div>
    )
}

export default AllProducts;
