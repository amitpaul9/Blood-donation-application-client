import React from 'react';
import { Droplet, Heart } from 'lucide-react';
import { MdDashboard } from 'react-icons/md';
import { Link } from 'react-router';

const DashboardAside = () => {
    const navItems = [
        { name: 'Dashboard', icon: MdDashboard, path: '/dashboard' },
        { name: 'Create Donation Request', icon: Droplet, path: 'donation-request' },
        { name: 'My Donation Request', icon: Heart, path: 'my-requests' }
    ];
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">


                {/* Navigation */}
                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    to={item.path}
                                    className=" flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-200"
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* aside Footer */}
                <div className="p-4 border-t border-gray-200">
                    <div className="bg-red-50 rounded-lg p-4 text-center">
                        <p className="text-sm text-red-800 font-medium">Save Lives Today</p>
                        <p className="text-xs text-red-600 mt-1">Every donation counts</p>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default DashboardAside;