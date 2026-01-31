import { Trash, Upload,User } from 'lucide-react';
import React from 'react'
import { useRef, useState } from 'react';
const ProfilePhotoSelector = ({image, setImage}) => {

    const inpurtRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleInputChange = (e) => {
        const file = e.target.files[0];
        if(file){
            setImage(file);
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    }

    const handleRemoveImage = (e) => {
        e.preventDefault();
        setImage(null);
        setPreviewUrl(null);
    }

    const onChooseFile = (e) => {
        e.preventDefault();
        inpurtRef.current?.click();
    }

   return (
   <div className='flex justify-center mb-6'>
        <input type="file"
        accept='image/*'
        ref={inpurtRef}
        onChange={handleInputChange}
        className='hidden'
        />

        {!image ? (
            <div className='w-20 h-20 flex items-center justify-center bg-indigo-50 rounded-full relative'>
                <User className='text-indigo-500' size={35}/>

                <button 
                onClick={onChooseFile} 
                className='h-8 w-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1'>
                    <Upload size={15} className='text-indigo-600' />
                </button>
            </div>
        ):(
            <div className='relative'>
                <img src={previewUrl} alt="profile photo" className='w-20 h-20 rounded-full object-cover'/>
                
                <button 
                onClick={handleRemoveImage}
                className='h-8 w-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1'>
                    <Trash size={15} />
                </button>
            </div>
        )}
   </div>
  )
}

export default ProfilePhotoSelector;

// now we can make the API call to upload the image to clodinary
// and save the URL in the database when the user signs up or updates their profile.
// we can use the uploadProfileImage function from src/util/uploadProfileImage.js to handle the upload process. 