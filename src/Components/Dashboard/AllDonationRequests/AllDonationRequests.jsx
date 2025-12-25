import React, { useContext, useEffect, useState } from 'react';
import { BloodAppContext } from '../../../Context/BloodAppContext';
import { Eye, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AllDonationRequests = () => {
    const { user } = useContext(BloodAppContext);
    const [myRequests, setMyRequest] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const requestsPerPage = 5;


    useEffect(() => {
        if (user?.email) {
            axios.get(`http://localhost:5000/requests?requesterEmail=${user.email}`)
                .then(data => {
                    console.log(data.data);
                    setMyRequest(data.data)
                })
                .catch(error => console.log("got an error fetching requests", error))
        }

    }, [user?.email])


    const handleImportDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/requests/${_id}`, {
                    method: 'DELETE',

                })

                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your import has been deleted.",
                                icon: "success"
                            });

                            const remaininRequests = myRequests.filter(request => request._id != _id);
                            setMyRequest(remaininRequests);
                        }

                    })
                    .catch(error => console.log('got an error deleting data', error))
            }
        });
    }

    // Pagination
    const indexOfLastRequest = currentPage * requestsPerPage;
    const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
    const currentRequests = myRequests.slice(indexOfFirstRequest, indexOfLastRequest);
    const totalPages = Math.ceil(myRequests.length / requestsPerPage);


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

                    {
                        myRequests === 0 ? (
                            <p className='text-red-600 text-center text-2xl'>No requests found</p>
                        ) : (
                            <tbody className="divide-y divide-gray-200">
                                {currentRequests?.map((request) => (
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
                                                    onClick={() => handleImportDelete(request._id)}

                                                    className="p-1 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {/* Pagination */}
                                {myRequests.length > 0 && (
                                    <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4  p-4 ml-3 mr-3">
                                        <p className="text-sm text-gray-600">
                                            Showing {indexOfFirstRequest + 1} to {Math.min(indexOfLastRequest, myRequests.length)} of {myRequests.length} requests
                                        </p>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                disabled={currentPage === 1}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === 1
                                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                    : 'bg-red-600 text-white hover:bg-red-700'
                                                    }`}
                                            >
                                                Previous
                                            </button>

                                            <div className="flex gap-1">
                                                {[...Array(totalPages)].map((_, index) => (
                                                    <button
                                                        key={index + 1}
                                                        onClick={() => setCurrentPage(index + 1)}
                                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === index + 1
                                                            ? 'bg-red-600 text-white'
                                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                            }`}
                                                    >
                                                        {index + 1}
                                                    </button>
                                                ))}
                                            </div>

                                            <button
                                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                                disabled={currentPage === totalPages}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === totalPages
                                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                    : 'bg-red-600 text-white hover:bg-red-700'
                                                    }`}
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </tbody>
                        )
                    }

                </table>
            </div>
        </div >


    );
};

export default AllDonationRequests;