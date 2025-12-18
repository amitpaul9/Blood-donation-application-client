import React, { useContext, useRef, useState } from 'react';
import { FaEye, FaRegEyeSlash } from 'react-icons/fa6';
import { Link, useLocation, useNavigate } from 'react-router';
import { sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import { BloodAppContext } from '../../Context/BloodAppContext';
import { auth } from '../../Firebase/firebase.config';



const Login = () => {
    const [showpass, setShowpass] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const { signInUser } = useContext(BloodAppContext);
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location)

    const emailref = useRef();

    // password toggling 
    const handleTogglePass = (event) => {
        event.preventDefault();
        setShowpass(!showpass);
    };

    // login 
    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signInUser(email, password)
            .then(result => {
                console.log(result.user)
                setSuccess(true);
                e.target.reset();
                navigate(location.state || '/');
                toast.success("Login Successfull")
            })
            .catch(error => {
                setError("Wrong email or password");
                console.log(error.message);
            })
    }

    const handleForgetPassword = () => {
        const email = emailref.current.value;
        sendPasswordResetEmail(auth, email)
            .then(res => {
                toast.success("Password reset email send successfully");
                console.log(res);
            })
            .catch(error => console.log(error.message))
    }





    return (
        <div className=''>
            <title>Login - Blood Donation App</title>
            <div className=" min-h-screen text-black ">

                <div className="flex justify-center flex-col items-center">
                    <div className="text-center mt-8">
                        <h1 className="text-3xl lg:w-4xl bg-white p-3 rounded-2xl font-bold mb-2 w-sm md:w-3xl">Login</h1>
                    </div>
                    <div className='flex lg:flex-row md:flex-row flex-col md:px-5 md:py-7 lg:px-7 lg:py-9 rounded-xl w-sm md:w-3xl lg:w-4xl justify-center gap-3 bg-white shadow-sm'>
                        <div className=" w-full max-w-sm shrink-0 ">
                            <div className="card-body">
                                <form onSubmit={handleLogin}>
                                    <fieldset className="fieldset">
                                        {/* email  */}
                                        <label className="label">Email</label>
                                        <input
                                            type="email"
                                            className="input bg-white"
                                            ref={emailref}
                                            name="email"

                                        />
                                        {/* password  */}
                                        <label className="label">Password</label>
                                        <div className="relative">
                                            <input
                                                type={showpass ? "text" : "password"}
                                                className="input bg-white"

                                                name="password"
                                            />
                                            <div
                                                onClick={handleTogglePass}
                                                className="absolute top-3.5 right-1"
                                            >
                                                {showpass ? <FaRegEyeSlash className='w-[70px]' /> : <FaEye className='w-[70px]' />}
                                            </div>
                                        </div>

                                        <div onClick={handleForgetPassword}>
                                            <Link className='underline' to="https://mail.google.com/mail/u/0/#inbox" target="_blank">Forget Password?</Link>
                                        </div>
                                        {success && (
                                            <p className="text-green-500">Account Create successfully</p>
                                        )}
                                        {error && <p className="text-red-500">{error}</p>}
                                        <button className="btn mt-4 bg-red-600 text-white  ">Login</button>
                                    </fieldset>

                                </form>

                                <p>
                                    Not yet Registered?
                                    <Link to="/register" className="text-[#344e41] ml-2 underline">
                                        Register
                                    </Link>
                                </p>
                            </div>

                        </div>
                        <img className='max-w-sm rounded-2xl hidden md:block lg:block' src="/public/assets/loginpic.png" alt="" />
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Login;