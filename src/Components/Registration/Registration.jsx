import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { updateProfile } from 'firebase/auth';
import { FaEye, FaRegEyeSlash } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { BloodAppContext } from '../../Context/BloodAppContext';
import { auth } from '../../Firebase/firebase.config';
import axios from 'axios';

const Registration = () => {

    const natigate = useNavigate();

    const { signupUser, setUser } = useContext(BloodAppContext);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [showpass, setShowpass] = useState(false);

    const [upozilas, setUpozilas] = useState([]);
    const [districts, setDistricts] = useState([]);




    useEffect(() => {
        axios.get('./Upozila.json')
            .then(res => {
                setUpozilas(res.data.upozilas)
                console.log(res.data.upozilas)
            })
            .catch(error => console.log(error))


        axios.get('./District.json')
            .then(res => {
                setDistricts(res.data.districts)
            })
            .catch(error => console.log(error))

    }, [])



    const handleRegister = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        const photo = e.target.photo;
        const name = e.target.name.value;
        const term = e.target.terms.checked;
        const bloodGroup = e.target.bloodGroup.value;
        const district = e.target.district.value;
        const upozila = e.target.upozila.value;
        const role = "donor";

        const file = photo.files[0];

        const fileRes = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IBBAPI}`, { image: file },
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

        const fileUrl = fileRes.data.data.url;


        // password expresstion
        const lowercase = /^(?=.*[a-z]).+$/;
        const uppercase = /^(?=.*[A-Z]).+$/;
        const passLong = /^.{6,}$/;



        if (!passLong.test(password)) {
            setError("Password must have six charecters")
            return;
        }
        else if (!lowercase.test(password)) {
            setError("Password must contain a lowercase letter");
            return;
        }
        else if (!uppercase.test(password)) {
            setError("Password must contain a uppercase letter");
            return;
        }


        // reset error status 
        setError();
        setSuccess();

        if (!term) {
            setError("Please accept our Term & Condition to Resgister");
            return;
        }

        const profile = {
            displayName: name,
            photoURL: fileUrl,

        }

        signupUser(email, password)
            .then(result => {
                setSuccess(true);
                console.log("afer creating a user", result.user);
                toast.success('Registration successfull')

                updateProfile(auth.currentUser, profile)
                    .then(() => {
                        setUser(prev => ({ ...prev, ...profile }))
                    })
                    .catch(error => console.log(error))


                // save user to the database 

                const newUser = {
                    name, email, fileUrl, bloodGroup, upozila, district, role

                }
                console.log(newUser)

                axios.post('http://localhost:5000/users', newUser)
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.log("got error of", error);
                    });





                e.target.reset();
                natigate("/");

            })
            .catch(error => {
                setError("Already have an aacount");
                console.log(error)
            })




    }



    // password show/hide 
    const handleTogglePass = (e) => {
        e.preventDefault();
        setShowpass(!showpass);
    }




    return (
        <div className=" min-h-screen text-black ">
            <title>Regitration - Blood Donation App</title>
            <div className="flex justify-center flex-col items-center">
                <div className="text-center mt-8">
                    <h1 className="text-3xl w-sm md:w-3xl lg:w-4xl bg-white p-3 rounded-2xl font-bold mb-2">Resgitration</h1>
                </div>
                <div className="card bg-white md:w-3xl w-sm lg:w-4xl shrink-0 shadow-sm">
                    <div className="card-body">
                        <form onSubmit={handleRegister}>
                            <fieldset className="fieldset">
                                {/* NAme  */}
                                <label className="label">Name</label>
                                <input
                                    required
                                    type="text"
                                    className="input bg-white w-full"
                                    placeholder='Your Name'
                                    name="name"
                                />
                                {/* photo url  */}
                                <label className="label">Your Photo</label>
                                <input
                                    required
                                    type="file"
                                    className="input bg-white w-full"
                                    name="photo"
                                />


                                {/* blood group */}
                                <label className='label'>Blood Group</label>
                                <select name="bloodGroup" className='select w-full'>
                                    <option disabled className='w-full'>
                                        Select your blood group
                                    </option>
                                    <option value="A+">A+</option>rea
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>


                                {/* district */}
                                <label className='label'>District</label>
                                <select name="district" className='select w-full'>
                                    <option value="" disabled className='w-full'>Select your District</option>
                                    {districts.map(d => <option value={d.name} key={d.id}>{d.name}</option>)}
                                </select>

                                {/* upozila */}
                                <label className='label'>Upozila</label>
                                <select name="upozila" className='select w-full'>
                                    <option value="" disabled className='w-full'>Select your Upozila</option>
                                    {upozilas.map(u => <option value={u.name} key={u.id}>{u.name}</option>)}
                                </select>




                                {/* email  */}
                                <label className="label">Email</label>
                                <input
                                    required
                                    type="email"
                                    className="input bg-white w-full"
                                    placeholder='Your Email'
                                    name="email"
                                />
                                {/* password  */}
                                <label className="label">Password</label>
                                <div className="relative">
                                    <input
                                        required
                                        type={showpass ? "text" : "password"}
                                        className="input bg-white w-full"
                                        placeholder='Password'
                                        name="password"
                                    />
                                    <div
                                        onClick={handleTogglePass}
                                        className="absolute top-3.5 right-1"
                                    >
                                        {showpass ? <FaRegEyeSlash className='w-[70px]' /> : <FaEye className='w-[70px]' />}
                                    </div>
                                </div>

                                <div>
                                    <label className="label ">
                                        <input
                                            type="checkbox"
                                            name="terms"
                                            className="checkbox-xs text-black  border-black"
                                        />
                                        Accept term and condition
                                    </label>
                                </div>
                                {success && (
                                    <p className="text-green-500">Account Create successfully</p>
                                )}
                                {error && <p className="text-red-500">{error}</p>}
                                <button className="btn  mt-4 bg-red-600 text-white">Register</button>
                            </fieldset>

                        </form>
                        <p>
                            Already have an Account?
                            <Link to="/login" className="text-[#344e41] ml-2 underline">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;