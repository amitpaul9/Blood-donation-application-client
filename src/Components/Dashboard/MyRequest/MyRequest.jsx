import React, { useContext, useEffect, useState } from 'react';
import { BloodAppContext } from '../../../Context/BloodAppContext';
import { Eye, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';

const MyRequest = () => {
    const { user } = useContext(BloodAppContext);
    const [myRequests, setMyRequest] = useState([]);


    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/requests?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setMyRequest(data)
                })
                .catch(error => console.log("got an error fetching requests", error))
        }

    }, [user?.email])


    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'inprogress': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'done': return 'bg-green-100 text-green-800 border-green-200';
            case 'canceled': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };


    return (
        <div className="bg-white rounded-lg ml-3 mr-3 sm:rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full min-w-max">
                    <thead className="bg-red-50 border-b border-gray-200">
                        <tr>
                            <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 text-left text-[10px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Recipient
                            </th>
                            <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 text-left text-[10px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Location
                            </th>
                            <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 text-left text-[10px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Date & Time
                            </th>
                            <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 text-left text-[10px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Blood
                            </th>
                            <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 text-left text-[10px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 text-left text-[10px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Donor Info
                            </th>
                            <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 text-left text-[10px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {myRequests.map((request) => (
                            <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 whitespace-nowrap">
                                    <div className="text-[11px] sm:text-sm font-medium text-gray-900">{request.receiverName}</div>
                                </td>
                                <td className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 whitespace-nowrap">
                                    <div className="text-[11px] sm:text-sm text-gray-700">{request.address}</div>
                                </td>
                                <td className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 whitespace-nowrap">
                                    <div className="text-[11px] sm:text-sm text-gray-700">{request.time}</div>
                                    <div className="text-[9px] sm:text-xs text-gray-500">{request.date}</div>
                                </td>
                                <td className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 whitespace-nowrap">
                                    <span className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-sm font-semibold bg-red-100 text-red-800">
                                        {request.bloodGroup}
                                    </span>
                                </td>
                                <td className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold border ${getStatusColor(request.status)}`}>
                                        {request.status}
                                    </span>
                                </td>
                                <td className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4">
                                    <div className="text-[11px] sm:text-sm">
                                        <div className="font-medium text-gray-900">{request.requesterName}</div>
                                        <div className="text-[9px] sm:text-xs text-gray-500">{request.requesterEmail}</div>
                                    </div>

                                </td>
                                <td className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-1 sm:gap-2">
                                        {request.status === 'inprogress' && (
                                            <>
                                                <button
                                                    className="p-1 sm:p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                    title="Mark as Done"
                                                >
                                                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                                                </button>
                                                <button
                                                    className="p-1 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Cancel"
                                                >
                                                    <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                                                </button>
                                            </>
                                        )}
                                        <button
                                            className="p-1 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="View Details"
                                        >
                                            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </button>
                                        <button
                                            className="p-1 sm:p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </button>
                                        <button

                                            className="p-1 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>


    );
};

export default MyRequest;