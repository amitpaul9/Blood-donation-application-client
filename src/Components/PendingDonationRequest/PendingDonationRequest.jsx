import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapPin, Calendar, Clock, Eye, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router';

const PendingDonationRequest = () => {
    const [donationRequest, setDonationRequest] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/requests')
            .then(response => {
                console.log('the data is', response.data);
                setDonationRequest(response.data);
            })
            .catch(error => {
                console.log("got error of", error);
            });
    }, []);





    const pendingDonations = donationRequest.filter(donation => donation.status === "pending");

    return (
        <div>
            <div><h1 className='text-center text-2xl mt-3 underline text-red-600 font-bold'>Blood Donation Requests</h1></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 m-2 lg:m-5">
                {pendingDonations.length > 0 ? (
                    pendingDonations.map(donation => (
                        <div key={donation?._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                            <div className="bg-red-600 text-white p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold mb-1">{donation?.receiverName}</h3>
                                        <div className="flex items-center text-sm opacity-90">
                                            <MapPin className="w-4 h-4 mr-1" />
                                            <span>{donation?.district}, {donation?.upozila}</span>
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
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border bg-amber-200`}>
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
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12">
                        <p className="text-gray-500 text-lg">No pending donation requests found.</p>
                    </div>
                )}
            </div>
        </div>
    );

};

export default PendingDonationRequest;