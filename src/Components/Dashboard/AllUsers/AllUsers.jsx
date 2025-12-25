import React, { useEffect, useState } from 'react';
import { User, Shield, UserCog, Lock, Unlock } from 'lucide-react';
import axios from 'axios';

const AllUsersPage = () => {
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;
    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {

        axios.get('http://localhost:5000/users')
            .then(data => {
                console.log(data.data);
                setAllUsers(data.data)
            })
            .catch(error => console.log("got an error fetching requests", error))


    }, [])


    // Filter users based on status
    const filteredUsers = statusFilter === 'all'
        ? allUsers
        : allUsers.filter(user => user.userStatus === statusFilter);

    // Pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const getRoleBadgeColor = (role) => {
        switch (role) {
            case 'admin': return 'bg-purple-100 text-purple-800';
            case 'volunteer': return 'bg-blue-100 text-blue-800';
            case 'donor': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusBadgeColor = (status) => {
        return status === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800';
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">All Users</h1>
                    <p className="text-gray-600">Manage all users and their roles</p>
                </div>

                {/* Filter Section */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <label className="text-sm font-medium text-gray-700">Filter by Status:</label>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setStatusFilter('all')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${statusFilter === 'all'
                                    ? 'bg-red-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setStatusFilter('active')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${statusFilter === 'active'
                                    ? 'bg-red-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Active
                            </button>
                            <button
                                onClick={() => setStatusFilter('blocked')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${statusFilter === 'blocked'
                                    ? 'bg-red-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Blocked
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table Section - Desktop View */}
                <div className="hidden lg:block bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        User
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Role
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <img
                                                    src={user.fileUrl}
                                                    alt={user.name}
                                                    className="w-10 h-10 rounded-full"
                                                />
                                                <span className="ml-3 text-sm font-medium text-gray-900">
                                                    {user.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-gray-600">{user.email}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeColor(user.role)}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(user.status)}`}>
                                                {user.userStatus}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex gap-2">
                                                {user.userStatus === 'active' ? (
                                                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Block User">
                                                        <Lock size={18} />
                                                    </button>
                                                ) : (
                                                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Unblock User">
                                                        <Unlock size={18} />
                                                    </button>
                                                )}

                                                {user.role !== 'volunteer' && user.role !== 'admin' && (
                                                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Make Volunteer">
                                                        <UserCog size={18} />
                                                    </button>
                                                )}

                                                {user.role !== 'admin' && (
                                                    <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" title="Make Admin">
                                                        <Shield size={18} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Card View - Mobile and Tablet */}
                <div className="lg:hidden space-y-4">
                    {currentUsers.map((user) => (
                        <div key={user.id} className="bg-white rounded-lg shadow-md p-4">
                            <div className="flex items-start gap-4 mb-4">
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-16 h-16 rounded-full"
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 mb-1">{user.name}</h3>
                                    <p className="text-sm text-gray-600 mb-2">{user.email}</p>
                                    <div className="flex gap-2 flex-wrap">
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(user.role)}`}>
                                            {user.role}
                                        </span>
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(user.status)}`}>
                                            {user.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <p className="text-xs font-medium text-gray-500 mb-3">ACTIONS</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {user.status === 'active' ? (
                                        <button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                                            <Lock size={16} />
                                            Block
                                        </button>
                                    ) : (
                                        <button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                                            <Unlock size={16} />
                                            Unblock
                                        </button>
                                    )}

                                    {user.role !== 'volunteer' && user.role !== 'admin' && (
                                        <button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                            <UserCog size={16} />
                                            Volunteer
                                        </button>
                                    )}

                                    {user.role !== 'admin' && (
                                        <button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors col-span-2">
                                            <Shield size={16} />
                                            Make Admin
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-lg shadow-md p-4">
                        <p className="text-sm text-gray-600">
                            Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
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
            </div>
        </div>
    );
}

export default AllUsersPage;