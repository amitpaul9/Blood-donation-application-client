import { Droplet, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    const quickLinks = [
        { name: 'Home', path: '/' },
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Donation Request', path: '/donation-request' },
        { name: 'About Us', path: '/' }
    ];

    const resources = [
        { name: 'Eligibility Criteria', path: '/' },
        { name: 'Donation Process', path: '/' },
        { name: 'Blood Types', path: '/' },
        { name: 'FAQs', path: '/' }
    ];

    const legal = [
        { name: 'Privacy Policy', path: '/' },
        { name: 'Terms of Service', path: '/' },
        { name: 'Contact Us', path: '/' }
    ];

    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {/* Brand Section */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-3 sm:mb-4">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-red-600 rounded-lg flex items-center justify-center">
                                <Droplet className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="white" />
                            </div>
                            <span className="text-lg sm:text-xl font-semibold text-gray-800">Blood Donation Application</span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                            Connecting donors with those in need. Every donation saves lives.
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600 flex-shrink-0" />
                                <span>+880 1234-567890</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600 flex-shrink-0" />
                                <span>info@bloodlink.org</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600 flex-shrink-0" />
                                <span>Dhaka, Bangladesh</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h3>
                        <ul className="space-y-1.5 sm:space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.path}
                                        className="text-xs sm:text-sm text-gray-600 hover:text-red-600 transition-colors duration-200 block"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">Resources</h3>
                        <ul className="space-y-1.5 sm:space-y-2">
                            {resources.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.path}
                                        className="text-xs sm:text-sm text-gray-600 hover:text-red-600 transition-colors duration-200 block"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">Legal</h3>
                        <ul className="space-y-1.5 sm:space-y-2">
                            {legal.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.path}
                                        className="text-xs sm:text-sm text-gray-600 hover:text-red-600 transition-colors duration-200 block"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
                    <p className="text-xs sm:text-sm text-gray-600 px-4">
                        © {new Date().getFullYear()} BloodLink. All rights reserved. | Saving lives, one donation at a time.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;