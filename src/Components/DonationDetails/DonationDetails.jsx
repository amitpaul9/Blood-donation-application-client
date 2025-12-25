import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router';
import { X } from 'lucide-react';
import { BloodAppContext } from '../../Context/BloodAppContext';

export default function DonationDetailsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const data = useLoaderData();
    console.log(data)
    const [request, setRequest] = useState(data);
    const { user } = useContext(BloodAppContext)

    const handleDonateClick = () => {
        setIsModalOpen(true);
    };

    const handleConfirm = () => {
        alert('Donation confirmed successfully!');
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Donation Request Details</h1>

                    <div className="space-y-4">
                        <div className="border-b pb-3">
                            <label className="text-sm font-medium text-gray-500">Recipient Name</label>
                            <p className="text-lg text-gray-800">{request.requesterName}</p>
                        </div>

                        <div className="border-b pb-3">
                            <label className="text-sm font-medium text-gray-500">Recipient Location</label>
                            <p className="text-lg text-gray-800">{request.address}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-b pb-3">
                            <div>
                                <label className="text-sm font-medium text-gray-500">Upazila</label>
                                <p className="text-lg text-gray-800">{request.upozila}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">District</label>
                                <p className="text-lg text-gray-800">{request.district}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-b pb-3">
                            <div>
                                <label className="text-sm font-medium text-gray-500">Donation Date</label>
                                <p className="text-lg text-gray-800">{request.date}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Donation Time</label>
                                <p className="text-lg text-gray-800">{request.time}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-b pb-3">
                            <div>
                                <label className="text-sm font-medium text-gray-500">Blood Group</label>
                                <p className="text-lg font-semibold text-red-600">{request.bloodGroup}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Donation Status</label>
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-amber-200`}>
                                    {request.status}
                                </span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 border-b pb-3">
                            <div>
                                <label className="text-sm font-medium text-gray-500">Hospital Name</label>
                                <p className="text-lg font-semibold text-red-600">{request.hospitalName}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Donor Massege</label>
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium`}>
                                    {request.massege}
                                </span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleDonateClick}
                        className="w-full mt-6 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                    >
                        Donate Now
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        <div className="flex items-center justify-between p-6 border-b">
                            <h2 className="text-xl font-bold text-gray-800">Confirm Donation</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Donor Name
                                    </label>
                                    <input
                                        type="text"
                                        value={user.displayName}
                                        readOnly
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Donor Email
                                    </label>
                                    <input
                                        type="email"
                                        value={user.email}
                                        readOnly
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleConfirm}
                                className="w-full mt-6 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                            >
                                Confirm Donation
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}