import { useContext, useState } from 'react';
import { Edit2, Save, User, Mail, Droplet, MapPin, X } from 'lucide-react';
import { BloodAppContext } from '../../../Context/BloodAppContext';

export default function UserProfile() {
    const { user } = useContext(BloodAppContext);
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe&size=200&background=dc2626&color=fff',
        district: 'Dhaka',
        upazila: 'Dhanmondi',
        bloodGroup: 'A+',
        phone: '+880 1234-567890',
        address: 'House 123, Road 45, Dhanmondi'
    });

    const [editedData, setEditedData] = useState({ ...user });

    const districts = [
        'Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Barisal', 'Sylhet',
        'Rangpur', 'Mymensingh', 'Comilla', 'Gazipur', 'Narayanganj'
    ];

    const upazilas = {
        'Dhaka': ['Dhanmondi', 'Gulshan', 'Mirpur', 'Mohammadpur', 'Uttara', 'Tejgaon'],
        'Chittagong': ['Agrabad', 'Panchlaish', 'Khulshi', 'Halishahar', 'Kotwali'],
        'Rajshahi': ['Boalia', 'Rajpara', 'Shah Makhdum', 'Motihar'],
    };

    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    const handleEdit = () => {
        setIsEditing(true);
        setEditedData({ ...user });
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedData({ ...user });
    };

    const handleSave = () => {
        // Here you would typically send the data to your backend
        console.log('Saving profile data:', editedData);
        setProfileData({ ...editedData });
        setIsEditing(false);
        // Show success message or toast
        alert('Profile updated successfully!');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'district' && { upazila: '' })
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 py-8 sm:py-12 md:py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        My Profile
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600">
                        Manage your personal information and preferences
                    </p>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                    {/* Header with Avatar and Edit Button */}
                    <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 sm:px-8 py-6 sm:py-8 relative">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                            {/* Avatar */}
                            <div className="relative">
                                <img
                                    src={user?.photoURL}
                                    alt="Profile Avatar"
                                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg"
                                />
                                <div className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                                    <Droplet className="w-5 h-5 text-red-600" fill="currentColor" />
                                </div>
                            </div>

                            {/* Name and Email */}
                            <div className="flex-1 text-center sm:text-left">
                                <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
                                    {user?.displayName}
                                </h2>
                                <p className="text-red-100 text-sm sm:text-base flex items-center justify-center sm:justify-start gap-2">
                                    <Mail className="w-4 h-4" />
                                    {user?.email}
                                </p>
                                <div className="mt-3 inline-flex items-center px-3 py-1 bg-white bg-opacity-20 rounded-full">
                                    <Droplet className="w-4 h-4 text-white mr-2" fill="currentColor" />
                                    <span className="text-white font-semibold">{user?.bloodGroup}</span>
                                </div>
                            </div>

                            {/* Edit/Save/Cancel Buttons */}
                            <div className="absolute top-6 right-6 sm:relative sm:top-0 sm:right-0">
                                {!isEditing ? (
                                    <button
                                        onClick={handleEdit}
                                        className="flex items-center gap-2 px-4 py-2 bg-white text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200 font-medium shadow-md text-sm sm:text-base"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                        <span className="hidden sm:inline">Edit Profile</span>
                                    </button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleSave}
                                            className="flex items-center gap-2 px-4 py-2 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-colors duration-200 font-medium shadow-md text-sm sm:text-base"
                                        >
                                            <Save className="w-4 h-4" />
                                            <span className="hidden sm:inline">Save</span>
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="flex items-center gap-2 px-4 py-2 bg-white text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium shadow-md text-sm sm:text-base"
                                        >
                                            <X className="w-4 h-4" />
                                            <span className="hidden sm:inline">Cancel</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="p-6 sm:p-8 md:p-10">
                        <div className="space-y-6">
                            {/* Personal Information */}
                            <div>
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-red-600 rounded-full"></span>
                                    Personal Information
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={isEditing ? editedData.name : profileData.name}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className={`w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base transition-colors ${isEditing
                                                ? 'bg-white focus:ring-2 focus:ring-red-500 focus:border-transparent'
                                                : 'bg-gray-50 text-gray-600 cursor-not-allowed'
                                                }`}
                                        />
                                    </div>

                                    {/* Email (Always Disabled) */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={profileData.email}
                                            disabled
                                            className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed text-sm sm:text-base"
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={isEditing ? editedData.phone : profileData.phone}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className={`w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base transition-colors ${isEditing
                                                ? 'bg-white focus:ring-2 focus:ring-red-500 focus:border-transparent'
                                                : 'bg-gray-50 text-gray-600 cursor-not-allowed'
                                                }`}
                                        />
                                    </div>

                                    {/* Blood Group */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Blood Group <span className="text-red-600">*</span>
                                        </label>
                                        <select
                                            name="bloodGroup"
                                            value={isEditing ? editedData.bloodGroup : profileData.bloodGroup}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className={`w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base transition-colors ${isEditing
                                                ? 'bg-white focus:ring-2 focus:ring-red-500 focus:border-transparent'
                                                : 'bg-gray-50 text-gray-600 cursor-not-allowed'
                                                }`}
                                        >
                                            {bloodGroups.map(group => (
                                                <option key={group} value={group}>{group}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Location Information */}
                            <div>
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-red-600 rounded-full"></span>
                                    Location Information
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    {/* District */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            District <span className="text-red-600">*</span>
                                        </label>
                                        <select
                                            name="district"
                                            value={isEditing ? editedData.district : profileData.district}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className={`w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base transition-colors ${isEditing
                                                ? 'bg-white focus:ring-2 focus:ring-red-500 focus:border-transparent'
                                                : 'bg-gray-50 text-gray-600 cursor-not-allowed'
                                                }`}
                                        >
                                            {districts.map(district => (
                                                <option key={district} value={district}>{district}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Upazila */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Upazila <span className="text-red-600">*</span>
                                        </label>
                                        <select
                                            name="upazila"
                                            value={isEditing ? editedData.upazila : profileData.upazila}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className={`w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base transition-colors ${isEditing
                                                ? 'bg-white focus:ring-2 focus:ring-red-500 focus:border-transparent'
                                                : 'bg-gray-50 text-gray-600 cursor-not-allowed'
                                                }`}
                                        >
                                            {isEditing && editedData.district && upazilas[editedData.district]?.map(upazila => (
                                                <option key={upazila} value={upazila}>{upazila}</option>
                                            ))}
                                            {!isEditing && <option value={profileData.upazila}>{profileData.upazila}</option>}
                                        </select>
                                    </div>

                                    {/* Full Address */}
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Address <span className="text-red-600">*</span>
                                        </label>
                                        <textarea
                                            name="address"
                                            value={isEditing ? editedData.address : profileData.address}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            rows="3"
                                            className={`w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg resize-none text-sm sm:text-base transition-colors ${isEditing
                                                ? 'bg-white focus:ring-2 focus:ring-red-500 focus:border-transparent'
                                                : 'bg-gray-50 text-gray-600 cursor-not-allowed'
                                                }`}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}