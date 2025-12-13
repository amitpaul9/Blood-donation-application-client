import { Home, Droplet, Heart } from 'lucide-react';
import React from 'react';

const Dashboard = () => {
    const navItems = [
        { name: 'Home', icon: Home, path: '/' },
        { name: 'Donation Request', icon: Droplet, path: '/donation-request' },
        { name: 'My Donation Request', icon: Heart, path: '/my-requests' }
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
                                <a
                                    href={item.path}
                                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-200"
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span className="font-medium">{item.name}</span>
                                </a>
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

            {/* Main Content Area */}
            <main className="flex-1 p-8 overflow-auto">
                <div className="max-w-4xl">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h1>
                    <p className="text-gray-600">Welcome to your blood donation dashboard</p>
                </div>
            </main>
        </div>
    );
}

export default Dashboard