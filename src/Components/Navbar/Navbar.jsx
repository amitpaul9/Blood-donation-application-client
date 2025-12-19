import { Droplet, LogIn, Menu, X } from 'lucide-react';
import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { BloodAppContext } from '../../Context/BloodAppContext';
import { CgProfile } from 'react-icons/cg';
import { CiLogout } from 'react-icons/ci';
import { MdSpaceDashboard } from 'react-icons/md';



const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, signOutUser } = useContext(BloodAppContext);

    console.log(user)

    const handleSignOut = () => {
        signOutUser()
            .then(() => console.log("Sign out Successfull"))
            .catch(error => console.log(error.message))
    }



    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <a href="/" className="flex items-center gap-2 flex-shrink-0">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-red-600 rounded-lg flex items-center justify-center">
                            <Droplet className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="white" />
                        </div>
                        <span className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 hidden sm:block">
                            Blood Donation Application
                        </span>
                        <span className="text-base font-semibold text-gray-800 sm:hidden">
                            BloodLink
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6 lg:gap-8">
                        <NavLink to='donation-req'>Donation Request</NavLink>

                        {/* <Link
                            to="/login"
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                        >
                            <LogIn className="w-4 h-4" />
                            <span className="font-medium text-sm lg:text-base">Login</span>
                        </Link> */}


                        {user ? <div >
                            {/* dropdown  */}
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} className=" mr-5 border-2 border-red-600 rounded-full"><img className='h-12 w-12 rounded-full' src={user?.photoURL} alt="" /></div>
                                <ul tabIndex="-1" className="dropdown-content menu bg-red-600 text-white font-bold roundedP-box z-1 w-52 p-2 shadow-sm">
                                    <li><Link to="/dashboard"><MdSpaceDashboard />Dashboard</Link></li>
                                    <li><Link to="/"><CgProfile /> {user?.displayName}</Link></li>
                                    <li><Link onClick={handleSignOut}><CiLogout /> Logout</Link></li>
                                </ul>
                            </div></div>
                            : <div className="navbar-end ">
                                <Link className="btn lg:btn-lg btn-xs  hover:transform-3d bg-red-600 text-white   mr-2" to="/login">Login</Link>
                                <Link className='btn border-2 lg:btn-lg btn-xs  hover:transform-3d border-red-600  bg-white' to="/register">Register</Link>
                            </div>}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-gray-700 hover:text-red-600 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 py-4">
                        <div className="flex flex-col space-y-3">
                            <NavLink to='donation-req'>Donation Request</NavLink>

                            {user ? <div >
                                {/* dropdown  */}
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} className=" mr-5 border-2 border-red-600 rounded-full"><img className='h-12 w-12 rounded-full' src={user?.photoURL} alt="" /></div>
                                    <ul tabIndex="-1" className="dropdown-content menu bg-red-600 text-white font-bold roundedP-box z-1 w-52 p-2 shadow-sm">
                                        <li><Link to="/dashboard"><MdSpaceDashboard />Dashboard</Link></li>
                                        <li><Link to="/"><CgProfile /> {user?.displayName}</Link></li>
                                        <li><Link onClick={handleSignOut}><CiLogout /> Logout</Link></li>
                                    </ul>
                                </div></div>
                                : <div className="navbar-end ">
                                    <Link className="btn lg:btn-lg btn-xs  hover:transform-3d bg-red-600 text-white   mr-2" to="/login">Login</Link>
                                    <Link className='btn border-2 lg:btn-lg btn-xs  hover:transform-3d border-indigo-900  bg-white' to="/register">Register</Link>
                                </div>}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;