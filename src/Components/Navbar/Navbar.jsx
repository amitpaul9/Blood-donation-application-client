import { Droplet, LogIn } from 'lucide-react';

const Navbar = () => {
    const navLinks = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Donation Request', path: '/donation-request' }
    ];

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <a href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                            <Droplet className="w-6 h-6 text-white" fill="white" />
                        </div>
                        <span className="text-xl font-semibold text-gray-800">Blood Donation Application</span>
                    </a>


                    <div className="flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.path}
                                className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200"
                            >
                                {link.name}
                            </a>
                        ))}


                        <a
                            href="/login"
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                        >
                            <LogIn className="w-4 h-4" />
                            <span className="font-medium">Login</span>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;