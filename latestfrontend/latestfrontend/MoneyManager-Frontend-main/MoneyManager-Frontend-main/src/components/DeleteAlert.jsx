import { LoaderCircle } from 'lucide-react';
import React from 'react'
import { useState } from 'react';

const DeleteAlert = ({content, onDelete}) => {

    const [loading, setLoading] = useState(false);
    const handleDelete = async() => {
        setLoading(true);
        try{
            await onDelete();
        }catch(error){
            console.error("Failed to delete:", error);
        }finally{
            setLoading(false);
        }
    }
  return (
    <div>
        <p className='text-sm'>{content}</p>
        <div className='flex justify-center mt-6 gap-4'>
            <button
                onClick={handleDelete}
                disabled={loading}
                type="button"
                className='bg-red-600 text-white font-medium px-5 py-2.5 rounded-lg shadow-md hover:bg-red-700 hover:shadow-lg transition duration-300 ease-in-out'
            >
                {loading ? (
                    <>
                        <LoaderCircle className='h-5 w-5 animate-spin inline-block mr-2' />
                        Deleting...
                    </>
                ) : (
                    <>
                        Yes, Delete
                    </>
                )}
            </button>
        </div>
    </div>
  )
}

export default DeleteAlert;