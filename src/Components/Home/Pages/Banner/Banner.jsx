import React from 'react';

import { UserPlus, Search } from 'lucide-react';
import { Link } from 'react-router';

const Banner = () => {
    return (
        <section className="bg-gradient-to-br from-red-50 via-white to-red-50 py-12 sm:py-16 md:py-20 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    {/* Heading */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6">
                        Save Lives Through
                        <span className="block text-red-600 mt-2">Blood Donation</span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto px-4">
                        Your donation can make a difference. Join our community of life-savers today.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                        <Link
                            to="/registration"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            <UserPlus className="w-5 h-5 sm:w-6 sm:h-6" />
                            <span>Join as a Donor</span>
                        </Link>

                        <Link
                            to="/search-donor"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-red-600 border-2 border-red-600 rounded-lg hover:bg-red-50 transition-all duration-200 font-semibold text-base sm:text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            <Search className="w-5 h-5 sm:w-6 sm:h-6" />
                            <span>Search Donors</span>
                        </Link>
                    </div>

                    {/* Stats or Additional Info */}
                    <div className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-3xl mx-auto">
                        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md">
                            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-600 mb-2">1000+</div>
                            <div className="text-sm sm:text-base text-gray-600">Active Donors</div>
                        </div>
                        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md">
                            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-600 mb-2">500+</div>
                            <div className="text-sm sm:text-base text-gray-600">Lives Saved</div>
                        </div>
                        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md">
                            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-600 mb-2">24/7</div>
                            <div className="text-sm sm:text-base text-gray-600">Support Available</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Banner;