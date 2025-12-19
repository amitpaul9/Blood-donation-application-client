import React, { useContext } from 'react';
import { BloodAppContext } from '../../../Context/BloodAppContext';

const DashboardHome = () => {

    const {user} = useContext(BloodAppContext)
    return (
        <div>
             {/* Main Content Area */}
            <main className="flex-1 p-8 overflow-auto">
                <div className="max-w-4xl">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h1>
                    <p className="text-gray-600">Hey {user?.displayName}, Welcome to blood donation application dashboard</p>
                </div>
            </main>
        </div>
    );
};

export default DashboardHome;