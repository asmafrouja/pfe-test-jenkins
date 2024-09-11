import React, { useState } from 'react'
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayTNDCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({
    data,
    fetchdata,
    onDelete
}) => {
    const [editProduct, setEditProduct] = useState(false);

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            onDelete(data.id);
        }
    }

    return (
        <div className='bg-white p-4 rounded shadow-md'>
            <div className='w-40'>
                <div className='w-32 h-32 flex justify-center items-center'>
                    <img src={data?.productImage[0]} alt={data.productName} className='mx-auto object-fill h-full' />
                </div>
                <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>

                <div className='flex justify-between items-center mt-2'>
                    <p className='font-semibold'>
                        {displayTNDCurrency(data.sellingPrice)}
                    </p>

                    <div className='flex gap-2'>
                        <div
                            className='w-fit p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer'
                            onClick={() => setEditProduct(true)}
                        >
                            <MdModeEditOutline className='w-4 h-4' /> {/* Taille réduite */}
                        </div>
                        <div
                            className='w-fit p-2 bg-red-100 hover:bg-red-600 rounded-full hover:text-white cursor-pointer'
                            onClick={handleDelete}
                        >
                            <MdDelete className='w-4 h-4' /> {/* Taille réduite */}
                        </div>
                    </div>
                </div>
            </div>

            {editProduct && (
                <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchdata={fetchdata} />
            )}
        </div>
    )
}

export default AdminProductCard;
