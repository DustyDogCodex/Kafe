'use client'
import axios from "axios"
import { useForm } from "react-hook-form"
import FormErrorMessage from "../components/FormErrorMessage"
import ServerErrorMessage from "../components/ServerErrorMessage"

function AdminPage() {
    //react hook form setup
    const { register, handleSubmit, formState: { errors } } = useForm()

    async function submitItemInfo(data: object) {
        axios.post('http://localhost:3000/api/items',
            data
        )
        .then(res => console.log(res))
        .catch(err => <ServerErrorMessage message={err.message} />)
    }

    return (
        <div className="flex min-h-screen h-full flex-col items-center justify-between">
            <div className="container pt-20 font-fauna">
                <h1 className="text-2xl text-center font-cinzel">Add new item</h1>
                {/* form for adding a new item to collection */}
                <form className="flex flex-col" onSubmit={handleSubmit(submitItemInfo)}>
                    <input 
                        {...register('name', { required: true })}
                        type="text" 
                        placeholder="Item name"
                        className="p-2 border border-sky-300 rounded-lg my-3"
                    />
                    {errors.name && (
                        errors.name.type === 'required' && <FormErrorMessage message="Item name is required" />
                    )}

                    <input 
                        {...register('price', { required: true })}
                        type="number" 
                        placeholder="Item price"
                        className="p-2 border border-sky-300 rounded-lg my-3"
                    />
                    {errors.price && (
                        errors.price.type === 'required' && <FormErrorMessage message="Item price is required" />
                    )}

                    <textarea
                        {...register('description', { required: true })}
                        placeholder="Item description"
                        rows={6}
                        className="p-2 border border-sky-300 rounded-lg my-3"
                    />
                    {errors.description && (
                        errors.description.type === 'required' && <FormErrorMessage message="Item description is required" />
                    )}

                    <label htmlFor="image">Item Image:</label>
                    <input 
                        {...register('image', { required: true })}
                        type="file" 
                        name="image"
                        className="p-2 border border-sky-300 rounded-lg my-3"
                    />
                    {errors.image && (
                        errors.image.type === 'required' && <FormErrorMessage message="Item image is required" />
                    )}

                    <input 
                        type="text" 
                        placeholder="Add category"
                        className="p-2 border border-sky-300 rounded-lg my-3"
                    />
                    <button className="bg-orange-500 text-white px-5 py-2 rounded-xl w-fit">
                        Create new item
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AdminPage