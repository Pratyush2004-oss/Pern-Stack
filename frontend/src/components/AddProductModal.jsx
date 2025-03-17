import { Image, IndianRupee, Package2Icon, Pen, PlusCircleIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useProductStore } from '../store/useProductStore';

const AddProductModal = () => {
  const [openDialog, setopenDialog] = useState(false);
  const { addProduct, formData, setFormData, loading } = useProductStore();

  return (
    <div>
      <button className='btn btn-primary rounded-full' onClick={() => { setopenDialog(true) }} ><PlusCircleIcon className='size-5' />Add Product</button>
      <dialog open={openDialog} className="modal">
        <div className="modal-box">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => {
            setopenDialog(false)
          }}>✕</button>
          <h3 className="font-bold text-lg">Add New Product</h3>
          <form onSubmit={addProduct} className='py-5 gap-5 flex flex-col'>
            <div className='flex flex-col gap-2'>
              <span className="label-text text-xs font-bold">Product Name</span>
              <label className="input w-full rounded-full">
                <Package2Icon className='size-4' />
                <input
                  type="text"
                  className="grow w-full"
                  placeholder="Enter Product Name"
                  required
                  value={formData.name}
                  onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                />
              </label>
            </div>
            <div className='flex flex-col gap-2'>
              <span className="label-text text-xs font-bold">Description</span>
              <label className="input w-full rounded-full ">
                <Pen className='size-4' />
                <input
                  type="text"
                  className="grow w-full"
                  placeholder="Enter Description"
                  required
                  value={formData.description}
                  onChange={(event) => setFormData({ ...formData, description: event.target.value })}
                />
              </label>
            </div>
            <div className='flex flex-col gap-2'>
              <span className="label-text text-xs font-bold">Image</span>
              <label className="input w-full rounded-full">
                <Image className='size-4' />
                <input
                  type="text"
                  className="grow w-full"
                  placeholder="Enter Image URL"
                  required
                  value={formData.image}
                  onChange={(event) => setFormData({ ...formData, image: event.target.value })}
                />
              </label>
            </div>
            <div className='flex flex-col gap-2'>
              <span className="label-text text-xs font-bold">Price</span>
              <label className="input w-full rounded-full">
                <IndianRupee className='size-4' />
                <input
                  type="number"
                  min={"0"}
                  step={"0.01"}
                  className="grow w-full"
                  placeholder="0.00"
                  required
                  value={formData.price}
                  onChange={(event) => setFormData({ ...formData, price: event.target.value })}
                />
              </label>
            </div>
            <div className='justify-end flex'>
              <button className="btn btn-success btn-sm" disabled={loading || !formData.name || !formData.description || !formData.image || !formData.price} type='submit' >
                {loading ? (<span className='loading loading-ball'></span>) : (<span>Add Product</span>)}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  )
}

export default AddProductModal