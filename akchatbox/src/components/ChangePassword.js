import React from 'react';
import { Link } from 'react-router-dom';
import axios from '../components/api/Axiosapi';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

export default function ChangePassword() {
    const submitHandler = async (e) => {
        e.preventDefault();
        const currentPassword = e.target.currentPassword.value;
        const newPassword = e.target.newPassword.value;
        const confirmPassword = e.target.confirmPassword.value;

        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match'); 
            return;
        }

        try {
            const response = await axios.post('/changepassword', {
                oldpassword: currentPassword,
                newpassword: newPassword,
                confirmpassword: confirmPassword,
            });
            console.log('Password changed successfully', response);
            toast.success('Password changed successfully!'); 
        } catch (err) {
            console.error('Error changing password', err);
            toast.error('Error changing password. Please try again.'); 
        }
    };

    return (
        <div className="bg-gray-100">
            <ToastContainer /> 

            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">Change Password</h2>
                <form onSubmit={submitHandler}>
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">Current Password</label>
                            <input type="password" id="current-password" name="currentPassword" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200" placeholder="Your Current Password" />
                        </div>
                        <div>
                            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">New Password</label>
                            <input type="password" id="new-password" name="newPassword" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200" placeholder="Your New Password" />
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                            <input type="password" id="confirm-password" name="confirmPassword" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200" placeholder="Confirm Your New Password" />
                        </div>
                    </div>

                    <div className="mt-6">
                        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">Change Password</button>
                    </div>
                </form>
                <Link to="/profile" className="text-blue-600 hover:underline mb-4 inline-block">
                    &larr; Back
                </Link>
            </div>
        </div>
    );
}
