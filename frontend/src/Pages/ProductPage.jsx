import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useProductStore } from '../store/useProductStore';
import { ArrowLeftIcon, Trash, Trash2, Upload } from 'lucide-react';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openDialog, setopenDialog] = useState(false);
  const { selectedProduct, getSingleProduct, error, loading, formData, setFormData, deleteProduct, updateProduct } = useProductStore();
  useEffect(() => {
    getSingleProduct(id);
  }, [getSingleProduct, id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    updateProduct(id);
  }

  const handleDelete = async () => {
    await deleteProduct(id);
    navigate('/');
  }
  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-[90vh]'>
        <div className='loading loading-ball loading-xl' />
        <div className='loading loading-ball loading-xl' />
        <div className='loading loading-ball loading-xl' />
      </div>
    )
  }

  if (error) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='alert alert-error'>{error}</div>
      </div>
    )
  }

  return selectedProduct && (
    <div className='max-w-4xl mx-auto container px-4 py-8'>
      <button onClick={() => navigate('/')} className='btn btn-ghost mb-8 items-center shadow-sm'>
        <ArrowLeftIcon className='size-5 mr-2' />
        Back To Products
      </button>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* PRODUCT IMAGE */}
        <div className='rounded-lg overflow-hidden shadow-lg bg-base-100'>
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className='size-full object-cover'
          />
        </div>

        {/* PRODUCT Form */}
        <div className='card bg-base-100 shadow-lg'>
          <div className='card-body '>
            <h2 className='card-title text-2xl mb-6'>Edit Product</h2>
            <form onSubmit={handleUpdate} className='space-y-6'>
              {/* Product Name */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text text-base font-medium'>Product Name</span>
                </label>
                <input
                  type='text'
                  placeholder='Enter Product Name'
                  className='input input-bordered w-full'
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              {/* Product Description */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text text-base font-medium'>Description</span>
                </label>
                <input
                  type='text'
                  placeholder='Enter Product Description'
                  className='input input-bordered w-full'
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              {/* Product Image URL */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text text-base font-medium'>Image URL</span>
                </label>
                <input
                  type='text'
                  placeholder='Enter Product URL'
                  className='input input-bordered w-full'
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>
              {/* Product Price */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text text-base font-medium'>Price</span>
                </label>
                <input
                  type='text'
                  placeholder='Enter Product Price'
                  className='input input-bordered w-full'
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
              <div className='flex justify-between mt-8'>
                <button type='button' className='btn btn-error rounded-full' onClick={() => { setopenDialog(true) }}>
                  <Trash2 className='size-5' />
                  Delete Product
                </button>
                <dialog open={openDialog} className="modal">
                  <div className="modal-box">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => {
                      setopenDialog(false)
                    }}>✕</button>
                    <h3 className="font-bold text-lg">Want to delete the product?</h3>
                    <p className="py-4 text-sm">Are you sure you want to delete this product? <br />  This cannot be reversed after deletion</p>
                    <div className='justify-end flex'><button className="btn btn-error btn-sm" onClick={handleDelete} >Delete</button></div>
                  </div>

                </dialog>

                <button type='submit' className='btn btn-success rounded-full' disabled={loading || !formData.name || !formData.description || !formData.image || !formData.price}>
                  {loading ? <span className='loading loading-spinner loading-sm'></span> :
                    <span className='flex gap-1 items-center'> <Upload className='size-5' />Update Product </span>
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage