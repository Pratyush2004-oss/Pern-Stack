import { create } from 'zustand';
import axios from 'axios'
import toast from 'react-hot-toast';

const BASE_URL = import.meta.env.VITE_BASE_API_URL;
export const useProductStore = create((set, get) => ({
    products: [],
    selectedProduct: null,
    loading: true,
    error: null,

    // form state
    formData: {
        name: "",
        image: "",
        description: "",
        price: 0
    },

    // ssetting the value of formData
    setFormData: (formData) => {
        set({ formData });
    },

    // resetting the input form 
    resetForm: () => set({ formData: { name: "", image: "", description: "", price: 0 } }),

    // adding Product to our inventory
    addProduct: async (e) => {
        e.preventDefault();
        set({ loading: true });
        try {
            const { formData } = get();
            const response = await axios.post(`${BASE_URL}/products`, formData);
            if (response.data.success === false) {
                toast.error(response.data.message)
                return
            }
            await get().fetchProducts();
            get().resetForm();
            toast.success("Product added successfully")
        } catch (error) {
            console.log(error)
            if (error.status === 429) {
                toast.error("Too Many Requests")
                set({ error: "Too Many Requests", products: [] })
            }
            else {
                toast.error("Something went wrong")
                set({ error: "Something went wrong", products: [] })
            }
        } finally {
            set({ loading: false });
        }
    },

    // fetching all the products
    fetchProducts: async () => {
        set({ loading: true })
        try {
            const response = await axios.get(`${BASE_URL}/products`);
            set({ products: response.data.data, error: null });
        } catch (error) {
            if (error.status === 429) {
                set({ error: "Too Many Requests", products: [] })
            }
            else {
                set({ error: "Something went wrong", products: [] })
            }
        }
        finally {
            set({ loading: false })
        }
    },

    // deleting a product
    deleteProduct: async (id) => {
        set({ loading: true })
        try {
            await axios.delete(`${BASE_URL}/products/${id}`);
            set({ products: get().products.filter((product) => product.id !== id), error: null });
            toast.success("Product deleted successfully")
        } catch (error) {
            if (error.status === 429) {
                toast.error("Too Many Requests")
                set({ error: "Too Many Requests", products: [] })
            }
            else {
                toast.error("Something went wrong")
                set({ error: "Something went wrong", products: [] })
            }
        }
        finally {
            set({ loading: false })
        }
    },

    // getting a single product
    getSingleProduct: async (id) => {
        set({ loading: true })
        try {
            const response = await axios.get(`${BASE_URL}/products/${id}`);
            set({ selectedProduct: response.data.data, error: null, formData: response.data.data });
        } catch (error) {
            if (error.status === 429) {
                toast.error("Too Many Requests")
                set({ error: "Too Many Requests", selectedProduct: null })
            }
            else {
                toast.error("Something went wrong")
                set({ error: "Something went wrong", selectedProduct: null })
            }
        }
        finally {
            set({ loading: false })
        }
    },

    // updating a product
    updateProduct: async (id) => {
        set({ loading: true })
        try {
            const { formData } = get();
            const response = await axios.put(`${BASE_URL}/products/${id}`, formData);
            if (response.data.success === false) {
                toast.error(response.data.message)
                return
            }
            set({ selectedProduct: response.data.data, error: null });
            toast.success("Product updated successfully")
        } catch (error) {
            if (error.status === 429) {
                toast.error("Too Many Requests")
                set({ error: "Too Many Requests", products: [] })
            }
            else {
                toast.error("Something went wrong")
                set({ error: "Something went wrong", products: [] })
            }
        }
        finally {
            set({ loading: false })
        }
    }

}))