import { IndianRupee, Trash2 } from 'lucide-react'
import { EditIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/useProductStore'

const ProductCard = ({ product }) => {
    const { deleteProduct } = useProductStore();
    const [id, setid] = useState(null);
    const [openDialog, setopenDialog] = useState(false);
    const handleDelete = (selected) => {
        deleteProduct(selected);
    }
    return (
        <div className='card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 pb-5'>
            <figure className='relative pt-[56.25%]'>
                <img
                    src={product.image}
                    alt={product.name}
                    className='absolute top-0 left-0 w-full h-full object-cover'
                />
            </figure>
            <div className='card-body'>
                <h1 className='card-title text-lg font-semibold'>{product.name}</h1>
                <p className='line-clamp-2 text-sm'>{product.description}</p>
                <p className='flex items-center text-2xl font-bold text-primary'><IndianRupee className='size-5 mt-1' fontWeight={'bold'} />{product.price}</p>
            </div>

            <div className='card-actions justify-end mt-4 mr-4'>
                <Link to={'/products/' + product.id} className='btn btn-info btn-sm btn-outline'>
                    <EditIcon className='size-5' />
                </Link>
                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                <button className='btn-error btn btn-sm btn-outline' onClick={() => {
                    setopenDialog(true);
                    setid(product.id);
                }}><Trash2 className='size-4' /></button>
                <dialog open={openDialog} className="modal">
                    <div className="modal-box">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => {
                            setopenDialog(false)
                            setid(null)
                        }}>✕</button>
                        <h3 className="font-bold text-lg">Want to delete the product?</h3>
                        <p className="py-4 text-sm">Are you sure you want to delete this product? <br />  This cannot be reversed after deletion</p>
                        <div className='justify-end flex'><button className="btn btn-error btn-sm" onClick={() => handleDelete(id)} >Delete</button></div>
                    </div>

                </dialog>
            </div>
        </div>
    )
}

export default ProductCard