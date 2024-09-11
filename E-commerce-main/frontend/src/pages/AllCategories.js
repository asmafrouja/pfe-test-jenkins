import React, { useEffect, useState } from 'react';
import SummaryApi from '../common'; // Assurez-vous que le chemin est correct
import AdminCategoryCard from '../components/AdminCategoryCard'; // Créez ce composant pour gérer l'affichage des catégories

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(SummaryApi.allCategories.url);
      const dataResponse = await response.json();
      setCategories(dataResponse?.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddCategory = async () => {
    if (newCategory.trim() === '') return;

    try {
      await fetch(SummaryApi.addCategory.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategory }),
      });
      setNewCategory('');
      fetchCategories();
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleEditCategory = async () => {
    if (!currentCategory || !currentCategory.name.trim()) return;

    try {
      await fetch(`${SummaryApi.updateCategory.url}/${currentCategory.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: currentCategory.name }),
      });
      setCurrentCategory(null);
      setIsEditing(false);
      fetchCategories();
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await fetch(`${SummaryApi.deleteCategory.url}/${categoryId}`, {
          method: 'DELETE',
        });
        fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Categories</h2>
        <div>
          <input
            type='text'
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder='New Category'
            className='border p-2 rounded mr-2'
          />
          <button
            onClick={handleAddCategory}
            className='border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all py-1 px-3 rounded-full'
          >
            Add Category
          </button>
        </div>
      </div>

      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
        {
          categories.map((category, index) => (
            <AdminCategoryCard
              key={index}
              data={category}
              fetchdata={fetchCategories}
              onDelete={handleDeleteCategory}
              onEdit={(cat) => {
                setCurrentCategory(cat);
                setIsEditing(true);
              }}
            />
          ))
        }
      </div>

      {isEditing && currentCategory && (
        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center'>
          <div className='bg-white p-4 rounded shadow-md'>
            <h3 className='text-lg font-semibold'>Edit Category</h3>
            <input
              type='text'
              value={currentCategory.name}
              onChange={(e) => setCurrentCategory({ ...currentCategory, name: e.target.value })}
              className='border p-2 rounded mr-2'
            />
            <button
              onClick={handleEditCategory}
              className='border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all py-1 px-3 rounded-full'
            >
              Update Category
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setCurrentCategory(null);
              }}
              className='ml-2 border-2 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white transition-all py-1 px-3 rounded-full'
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCategories;
