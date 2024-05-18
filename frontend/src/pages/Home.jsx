import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = (e) => {
        e.preventDefault();
        navigate('/');
    };

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex flex-1 items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto w-full max-w-md space-y-8 bg-gray-50 p-8 rounded-lg shadow-2xl">
                        <div className="space-y-2 text-center">
                            <h2 className="text-3xl font-extrabold text-gray-900">Upload a PDF</h2>
                            <p className="text-gray-600">Select a PDF file to upload.</p>
                        </div>
                        <form className="mt-8 space-y-6" onSubmit={handleUpload}>
                            <div className="space-y-1">
                                <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                                    PDF File
                                </label>
                                <input
                                    accept=".pdf"
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    id="file"
                                    required
                                    type="file"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Upload
                            </button>
                        </form>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Home;
