import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Summary = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="tracking-wide md:mx-32 px-4 py-12 md:px-6 lg:py-16 mt-20">
                <div className="space-y-12">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                            The Importance of Sustainable Farming Practices
                        </h1>
                        <div className="mt-6 flex flex-wrap justify-center gap-2">
                            <span className="inline-flex items-center justify-center px-3 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md">
                                Sustainability
                            </span>
                            <span className="inline-flex items-center justify-center px-3 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md">
                                Agriculture
                            </span>
                            <span className="inline-flex items-center justify-center px-3 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md">
                                Environmental Impact
                            </span>
                            <span className="inline-flex items-center justify-center px-3 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md">
                                Food Security
                            </span>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tighter ">Summary</h2>
                        <p className="text-xl text-gray-600 pt-4">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi laudantium omnis at. Voluptatibus possimus fugiat omnis, nam reprehenderit facilis ad labore ducimus doloremque aliquam ea architecto sed excepturi voluptatem laborum ratione. Omnis, sit!
                        </p>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tighter ">Ask a Question</h2>
                        <div className="mt-4 grid w-full max-w-md gap-4">
                            <input
                                placeholder="Type your question here..."
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                            />
                            <button className="w-full inline-flex justify-center px-4 py-2 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Submit
                            </button>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tighter ">Responses</h2>
                        <div className="mt-4 space-y-4">
                            <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
                                <p className="text-lg text-gray-600">
                                    Sustainable farming practices aim to minimize the environmental impact of agriculture by using
                                    techniques that conserve natural resources, reduce greenhouse gas emissions, and promote biodiversity.
                                    This includes practices such as crop rotation, cover cropping, reduced tillage, and integrated pest
                                    management.
                                </p>
                            </div>
                            <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
                                <p className="text-lg text-gray-600">
                                    Sustainable farming practices can help address global food security by improving soil health, increasing
                                    crop yields, and reducing the need for synthetic fertilizers and pesticides. This helps ensure a
                                    reliable and nutritious food supply for the growing global population.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    )
}

export default Summary
