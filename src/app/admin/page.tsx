'use client'
import { useForm } from "react-hook-form"

function AdminPage() {
    //react hook form setup
    const { register, handleSubmit, formState: { errors } } = useForm()

    return (
        <div className="flex min-h-screen flex-col items-center justify-between">
            <div className="container pt-20 font-fauna">
                {/* form for adding a new item to collection */}
                <h1 className="text-2xl text-center font-cinzel">Add new item</h1>
                <form className="flex flex-col">
                    <input 
                        {...register('name', { required: true })}
                        type="text" 
                        placeholder="Item name"
                        className="p-2 border border-sky-300 rounded-lg my-3"
                    />
                    <input 
                        {...register('price', { required: true })}
                        type="number" 
                        placeholder="Item price"
                        className="p-2 border border-sky-300 rounded-lg my-3"
                    />
                    <textarea
                        {...register('description', { required: true })}
                        placeholder="Item description"
                        rows={6}
                        className="p-2 border border-sky-300 rounded-lg my-3"
                    />
                    <label htmlFor="image">Item Image:</label>
                    <input 
                        {...register('image', { required: true })}
                        type="file" 
                        name="image"
                        className="p-2 border border-sky-300 rounded-lg my-3"
                    />
                    <input 
                        type="text" 
                        placeholder="Add category"
                        className="p-2 border border-sky-300 rounded-lg my-3"
                    />
                </form>
            </div>
        </div>
    )
}

export default AdminPage