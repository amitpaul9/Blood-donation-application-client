import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import { Droplet, Heart, Users } from 'lucide-react';
import { MdDashboard } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { BloodAppContext } from '../../../Context/BloodAppContext';

const DashboardLayout = () => {
    const { role } = useContext(BloodAppContext)

    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar></Navbar>
            <div className="flex py-5 bg-gray-50">
                {/* Sidebar */}
                <aside className="lg:w-64 w-10 bg-white border-r border-gray-200 flex flex-col">





                    {/* Navigation */}
                    <nav className="flex-1 p-4">
                        <ul className="space-y-2">
                            <li><NavLink to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-200"><MdDashboard className='h-5 w-5'></MdDashboard><span className='hidden lg:block md:block'>Dashboard</span></NavLink></li>
                            <li><NavLink to="donation-request" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-200"><Droplet className='h-5 w-5'></Droplet><span className='hidden lg:block md:block'>Create Donation Request</span></NavLink></li>
                            <li><NavLink to="my-requests" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-200"><Heart className='h-5 w-5'></Heart><span className='hidden lg:block md:block'>My Donation Request</span></NavLink></li>
                            <li><NavLink to="profile" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-200"><CgProfile className='h-5 w-5'></CgProfile><span className='hidden lg:block md:block'>Profile</span></NavLink></li>
                            {
                                role === "admin" && <li><NavLink to="my-requests" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-200"><Users className='h-5 w-5'></Users><span className='hidden lg:block md:block'>All Users</span></NavLink></li>
                            }
                        </ul>
                    </nav>

                    {/* aside Footer */}
                    <div className="p-4 border-t border-gray-200 hidden lg:block md:block">
                        <div className="bg-red-50 rounded-lg p-4 text-center">
                            <p className="text-sm text-red-800 font-medium">Save Lives Today</p>
                            <p className="text-xs text-red-600 mt-1">Every donation counts</p>
                        </div>
                    </div>
                </aside>

                <main className='flex-1'>
                    <Outlet></Outlet>
                </main>
            </div>

            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;