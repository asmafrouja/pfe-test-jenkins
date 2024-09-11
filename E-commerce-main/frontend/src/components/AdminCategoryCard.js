import React from 'react';
import { MdModeEditOutline, MdDelete } from "react-icons/md";

const AdminCategoryCard = ({ data, fetchdata, onDelete, onEdit }) => {
  return (
    <div className='bg-white p-4 rounded shadow-md'>
      <h4 className='font-semibold'>{data.name}</h4>
      <div className='flex justify-between items-center mt-2'>
        <div className='flex gap-2'>
          <button
            onClick={() => onEdit(data)}
            className='text-blue-600 hover:text-blue-800'
          >
            <MdModeEditOutline className='w-5 h-5' />
          </button>
          <button
            onClick={() => onDelete(data.id)}
            className='text-red-600 hover:text-red-800'
          >
            <MdDelete className='w-5 h-5' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCategoryCard;
