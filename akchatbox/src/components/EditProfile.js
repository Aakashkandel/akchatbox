import React from 'react';
import { Link } from 'react-router-dom';
import axios from '../components/api/imageUploadAxios';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditProfile() {
    const authUser = useSelector((state) => state.user.authUser);
    const name = authUser.name;
    const email = authUser.email;

    const submitHandler = async (e) => {
        e.preventDefault();
        const updatedName = e.target.name.value;
        const imageFile = document.getElementById('photo').files[0];

       

        try {
            const response = await axios.post('/uploadphoto', {
                name: updatedName,
                photo: imageFile,
            }, );
            toast.success('Profile updated successfully!'); 
            
        } catch (err) {
            const error = err.response.data.error;
           
            toast.error(error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
            <form onSubmit={submitHandler} encType="multipart/form-data">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            defaultValue={name}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                            placeholder="Your Name"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            readOnly
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                            placeholder="Your Email"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Upload Photo</label>
                        <input
                            type="file"
                            id="photo"
                            name="photo"
                            accept="image/*"
                            className="mt-1 block w-full text-gray-700 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
            <Link to="/profile" className="text-blue-600 hover:underline mb-4 inline-block">
                &larr; Back
            </Link>
            <ToastContainer />
        </div>
    );
}
