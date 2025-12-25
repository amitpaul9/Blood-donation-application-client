import React, { useContext, useEffect, useState } from 'react';
import { BloodAppContext } from '../../../Context/BloodAppContext';
import { Calendar, Clock, MapPin, Droplet, Edit, Trash2, Eye, User, Mail } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";




const DashboardHome = () => {

    const { user, role } = useContext(BloodAppContext)

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const [donationRequest, setDonationRequest] = useState([]);
    const [totalUser, setTotalUser] = useState([]);
    const [totalReq, setTotalReq] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/requests/recent?requesterEmail=${user?.email}`)
            .then(response => {
                console.log('the data is', response.data)
                setDonationRequest(response.data)
            })
            .catch(error => {
                console.log("got error of", error);
            });


        axios.get('http://localhost:5000/users')
            .then(res => {
                setTotalUser(res.data)
                console.log('userdata is', res)
            })
            .catch(err => console('got error getting total user', err))

        axios.get('http://localhost:5000/all-requests')
            .then(res => {
                setTotalReq(res.data)
                console.log('request is', res)
            })
            .catch(err => console('got error all req', err))
    }, [user?.email])

    console.log("recent donation requests", donationRequest)

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'inprogress': return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'done': return 'bg-green-100 text-green-800 border-green-300';
            case 'canceled': return 'bg-gray-100 text-gray-800 border-gray-300';
            default: return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };




    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        setDonationRequest(donationRequest?.filter(d => d.id !== deleteId));
        setShowDeleteModal(false);
        setDeleteId(null);
    };

    const handleEdit = (id) => {
        console.log('Edit donation request:', id);
        // Redirect to edit page
    };



    return (
        <div>
            {/* Main Content Area */}
            <main className="flex-1 p-8 overflow-auto">
                <div className="max-w-4xl">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h1>
                    <p className="text-gray-600">Hey {user?.displayName}, Welcome to blood donation application dashboard</p>



                    {/* admin content */}
                    {(role === "admin") && (<div className='w-full h-64 mt-10'><ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={[
                                { name: "Total Users", value: totalUser.length },
                                { name: "Total Donation Requests", value: totalReq.length },
                            ]}
                        >
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer></div>)}






                    {donationRequest.length === 0 ? (<div></div>) :
                        (<div>{(role === "donor") && (
                            <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
                                <div className="max-w-7xl mx-auto">
                                    <div className="mb-8">
                                        <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-2">Blood Donation Requests</h1>
                                        <p className="text-gray-600">Manage and track blood donation requests</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                        {donationRequest?.map(donation => (
                                            <div key={donation?.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                                                <div className="bg-red-600 text-white p-4">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="text-xl font-bold mb-1">{donation?.receiverName}</h3>
                                                            <div className="flex items-center text-sm opacity-90">
                                                                <MapPin className="w-4 h-4 mr-1" />
                                                                <span>{donation?.district}, {donation?.upazila}</span>
                                                            </div>
                                                        </div>
                                                        <div className="text-center">
                                                            <div className="bg-white text-red-600 rounded-full w-16 h-16 flex items-center justify-center font-bold text-xl shadow-md">
                                                                {donation?.bloodGroup}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="p-4">
                                                    <div className="space-y-3 mb-4">
                                                        <div className="flex items-center text-gray-700">
                                                            <Calendar className="w-5 h-5 mr-3 text-red-600" />
                                                            <span className="text-sm">{donation?.date}</span>
                                                        </div>
                                                        <div className="flex items-center text-gray-700">
                                                            <Clock className="w-5 h-5 mr-3 text-red-600" />
                                                            <span className="text-sm">{donation?.time}</span>
                                                        </div>
                                                    </div>

                                                    <div className="mb-4">
                                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(donation?.status)}`}>
                                                            {donation?.status?.toUpperCase()}
                                                        </span>
                                                    </div>





                                                    <div className="flex gap-2">
                                                        <Link to={`/donation-details/${donation._id}`}

                                                            className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                            View
                                                        </Link>
                                                        <button
                                                            onClick={() => handleEdit(donation?.id)}
                                                            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteClick(donation?.id)}
                                                            className="flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>

                                        ))}
                                    </div>
                                </div>

                                {showDeleteModal && (
                                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                                        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                                            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Deletion</h3>
                                            <p className="text-gray-600 mb-6">Are you sure you want to delete this donation request? This action cannot be undone.</p>
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => setShowDeleteModal(false)}
                                                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md font-medium transition-colors duration-200"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={confirmDelete}
                                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                )}
                                <div className=' flex justify-center w-full mt-8'> <Link to='my-requests' className='btn bg-red-600  text-white'>See All</Link></div>
                            </div>

                        )}</div>)}


                </div>
            </main>
        </div>
    );
};

export default DashboardHome;