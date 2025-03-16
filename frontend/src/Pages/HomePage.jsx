import React, { useEffect } from 'react'
import { useProductStore } from '../store/useProductStore'
import { PackageIcon, PlusCircleIcon, RefreshCcw } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const { loading, error, products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  if (loading) return (
    <div className='flex justify-center items-center h-64'>
      <div className='loading loading-bars loading-xl' />
    </div>
  );

  if (!loading && !products.length) return (
    <div className='flex flex-col justify-center items-center h-96 space-y-4'>
      <div className='bg-base-100 rounded-full p-6'>
        <PackageIcon className='size-12' />
      </div>
      <div className='text-center space-y-2'>
        <h3 className='text-2xl font-semibold'>No products found</h3>
        <p className='text-gray-500 max-w-sm'>Get Started by adding your first product to the inventory</p>
      </div>
    </div>
  )
  return products && (
    <main className='mx-auto px-10 py-8 max-w-6xl'>
      <div className='flex justify-between items-center mb-8'>
        <button className='btn btn-primary rounded-full' ><PlusCircleIcon className='size-5' />Add Product</button>
        <button className='btn btn-ghost' onClick={() => fetchProducts()}><RefreshCcw className='size-6' /></button>
      </div>
      {error && <div className='alert alert-error mb-8'>{error}</div>}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </main>
  )
}

export default HomePage