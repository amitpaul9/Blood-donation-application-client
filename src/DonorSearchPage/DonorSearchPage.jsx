import React, { useEffect, useState } from 'react';
import { Search, Droplet, MapPin, Phone, Mail } from 'lucide-react';
import axios from 'axios';

const DonorSearchPage = () => {
    const [searchForm, setSearchForm] = useState({
        bloodGroup: '',
        district: '',
        upazila: ''
    });

    const [allDonors, setAllDonors] = useState([]);
    const [filteredDonors, setFilteredDonors] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    const [upozilas, setUpozilas] = useState([]);
    const [districts, setDistricts] = useState([]);

    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    useEffect(() => {
        axios.get('http://localhost:5000/requests')
            .then(res => {
                setAllDonors(res.data);
            })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        axios.get('./Upozila.json')
            .then(res => {
                setUpozilas(res.data.upozilas);
            })
            .catch(error => console.log(error));

        axios.get('./District.json')
            .then(res => {
                setDistricts(res.data.districts);
            })
            .catch(error => console.log(error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchForm({
            ...searchForm,
            [name]: value
        });
    };

    const handleSearch = () => {
        const filtered = allDonors.filter(donor =>
            donor.bloodGroup === searchForm.bloodGroup &&
            donor.district === searchForm.district &&
            donor.upozila === searchForm.upazila
        );

        setFilteredDonors(filtered);
        setHasSearched(true);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-red-600 text-white py-6 md:py-8 lg:py-10 px-4">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2">Find Blood Donors</h1>
                    <p className="text-sm md:text-base text-red-100">Search for available donors in your area</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-3 md:px-4 lg:px-6 -mt-6 md:-mt-8">
                <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6 mb-4 md:mb-6">
                        <div>
                            <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                                Blood Group <span className="text-red-600">*</span>
                            </label>
                            <div className="relative">
                                <Droplet className="absolute left-2.5 md:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-red-600" />
                                <select
                                    name="bloodGroup"
                                    value={searchForm.bloodGroup}
                                    onChange={handleInputChange}
                                    className="w-full pl-9 md:pl-10 pr-3 md:pr-4 py-2.5 md:py-3 text-sm md:text-base border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none transition-colors"
                                >
                                    <option value="">Select Blood Group</option>
                                    {bloodGroups.map(group => (
                                        <option key={group} value={group}>{group}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                                District <span className="text-red-600">*</span>
                            </label>
                            <div className="relative">
                                <MapPin className="absolute left-2.5 md:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-red-600" />
                                <select
                                    name="district"
                                    value={searchForm.district}
                                    onChange={handleInputChange}
                                    className="w-full pl-9 md:pl-10 pr-3 md:pr-4 py-2.5 md:py-3 text-sm md:text-base border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none transition-colors"
                                >
                                    <option value="">Select District</option>
                                    {districts.map(district => (
                                        <option key={district.id} value={district.name}>{district.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                                Upazila <span className="text-red-600">*</span>
                            </label>
                            <div className="relative">
                                <MapPin className="absolute left-2.5 md:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-red-600" />
                                <select
                                    name="upazila"
                                    value={searchForm.upazila}
                                    onChange={handleInputChange}
                                    className="w-full pl-9 md:pl-10 pr-3 md:pr-4 py-2.5 md:py-3 text-sm md:text-base border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none transition-colors"
                                >
                                    <option value="">Select Upazila</option>
                                    {upozilas.map(upazila => (
                                        <option key={upazila.id} value={upazila.name}>{upazila.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleSearch}
                        className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 md:py-3 px-6 md:px-8 text-sm md:text-base rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                        <Search className="w-4 h-4 md:w-5 md:h-5" />
                        Search Donors
                    </button>
                </div>
            </div>

            {hasSearched && (
                <div className="max-w-7xl mx-auto px-3 md:px-4 lg:px-6 py-6 md:py-8">
                    {filteredDonors.length > 0 ? (
                        <>
                            <div className="mb-4 md:mb-6">
                                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
                                    Found {filteredDonors.length} Donor{filteredDonors.length !== 1 && 's'}
                                </h2>
                                <p className="text-sm md:text-base text-gray-600 mt-1">
                                    {searchForm.bloodGroup} in {searchForm.district}, {searchForm.upazila}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
                                {filteredDonors.map(donor => (
                                    <div key={donor._id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                                        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-3 md:p-4">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1 min-w-0 mr-2">
                                                    <h3 className="text-base md:text-lg lg:text-xl font-bold mb-0.5 md:mb-1 truncate">{donor.name}</h3>
                                                    <div className="flex items-center text-xs md:text-sm opacity-90">
                                                        <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-1 flex-shrink-0" />
                                                        <span className="truncate">{donor.district}, {donor.upozila}</span>
                                                    </div>
                                                </div>
                                                <div className="bg-white text-red-600 rounded-full w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center font-bold text-base md:text-lg lg:text-xl shadow-lg flex-shrink-0">
                                                    {donor.bloodGroup}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-3 md:p-4 space-y-2 md:space-y-3">
                                            <div className="flex items-center text-gray-700">
                                                <Phone className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 text-red-600 flex-shrink-0" />
                                                <span className="text-xs md:text-sm truncate">{donor.requesterName || 'N/A'}</span>
                                            </div>
                                            <div className="flex items-center text-gray-700">
                                                <Mail className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 text-red-600 flex-shrink-0" />
                                                <span className="text-xs md:text-sm truncate">{donor.requesterEmail}</span>
                                            </div>

                                            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 md:py-2.5 px-4 text-xs md:text-sm rounded-lg transition-colors duration-200 mt-2">
                                                Contact Donor
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="bg-white rounded-lg shadow-md p-8 md:p-10 lg:p-12 text-center">
                            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                                <Search className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-red-600" />
                            </div>
                            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">No Donors Found</h3>
                            <p className="text-sm md:text-base text-gray-600">
                                Try different search criteria
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DonorSearchPage;