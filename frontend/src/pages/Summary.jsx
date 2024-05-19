import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Summary = () => {
    const qnanswer = {
        "result": {
            "answer": [
                "yes"
            ],
            "explanation": [
                "Solar flares are magnetic eruptions from the Suns corona which can cause severe disruptions to satellite communication and electrical grids."
            ]
        }
    }
    const location = useLocation();
    const summaryData = location.state?.response || [];
    const pdffile = location.state?.selectedFile;
    const tagsData = location.state?.tagData;
    const titleData = location.state?.title[0];
    // console.log("Tag data=",JSON.parse(tagData))
    const [question, setQuestion] = useState('');
    const [qnans, setQnans] = useState([]);

    const capitalizeTitle = (title) => {
        if (typeof title !== 'string') {
            return ''; // Or handle the case where title is not a string as needed
        }
        return title
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };
    
    const title = capitalizeTitle(titleData)

    const askAIHandler = async () => {
        if (question.trim()) {
            const formDataSummary = new FormData();
            formDataSummary.append('file', pdffile);
            formDataSummary.append('function_name', 'get_answer');
            formDataSummary.append('question', question);
            formDataSummary.append('page_no', 0);

            const response = await axios.post('http://127.0.0.1:8000/process_pdf/', formDataSummary, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // console.log(response);
            const qnan = [question, response.data.result.explanation]
            setQnans([...qnans, qnan]);
            setQuestion('');
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="tracking-wide md:mx-32 px-4 py-12 md:px-6 lg:py-16 mt-20">
                <div className="space-y-12">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                            {title}
                        </h1>
                        <div className="mt-6 flex flex-wrap justify-center gap-2">
                            {tagsData.map((tag, index) => (
                                <span key={index} className="inline-flex items-center justify-center px-3 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md mr-2">
                                    {tag.replace(/"/g, '')}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tighter ">Summary</h2>
                        <ul className="text-xl text-gray-600 pt-4">
                            {summaryData.map((item, index) => (
                                <li key={index} className="mb-2">{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tighter ">Ask a Question Regarding PDF</h2>
                        <div className="mt-4 grid w-full max-w-md gap-4">
                            <input
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                placeholder="Type your question here..."
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                            />
                            <button
                                onClick={askAIHandler}
                                className="w-full inline-flex justify-center px-4 py-2 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tighter ">Answer To Questions Asked (AI)</h2>
                        <div className="mt-4 space-y-4">
                            {qnans.map((q, index) => (
                                <div key={index} className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
                                    <h3 className='text-2xl font-[500] tracking-tighter'>{q[0]}</h3>
                                    <p className="text-lg text-gray-600">
                                        {q[1]}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Summary;
