import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { BloodAppContext } from '../../Context/BloodAppContext';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useLoaderData } from 'react-router';



const UpdateRequest = () => {

    const { user } = useContext(BloodAppContext)
    const [upozilas, setUpozilas] = useState([]);
    const [districts, setDistricts] = useState([]);

    const data = useLoaderData();
    const [requests, setRequests] = useState(data)






    useEffect(() => {
        axios.get('/Upozila.json')
            .then(res => {
                setUpozilas(res.data.upozilas)
                console.log(res.data.upozilas)
            })
            .catch(error => console.log(error))


        axios.get('/District.json')
            .then(res => {
                setDistricts(res.data.districts)
            })
            .catch(error => console.log(error))

    }, [])
    const handleEditedRequest = (e, _id) => {
        e.preventDefault();
        const updatedRequest = {
            requesterEmail: e.target.requesterEmail.value,
            receiverName: e.target.receiverName.value,
            hospitalName: e.target.hospitalName.value,
            district: e.target.district.value,
            upozila: e.target.upozila.value,
            address: e.target.address.value,
            requesterName: e.target.requesterName.value,
            bloodGroup: e.target.bloodGroup.value,
            date: e.target.date.value,
            time: e.target.time.value,
            massege: e.target.massege.value,
            status: "pending",
        }

        fetch(`http://localhost:5000/requests/${_id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedRequest)
        })
            .then(res => res.json())
            .then(data => {
                toast.success("successfully updated data")
                console.log(data)
            })
            .catch(err => console.log(err));
    }

    return (
        <>
            <div className=" min-h-screen text-black  ml-10">
                <title>Edit - Blood Donation App</title>
                <div className="flex justify-center flex-col items-center ">
                    <div className="text-center mt-8">
                        <h1 className="text-3xl w-sm md:w-3xl lg:w-4xl bg-white p-3 rounded-2xl font-bold mb-2">Edit your donation request</h1>
                    </div>
                    <div className="card  md:w-3xl w-sm lg:w-4xl shrink-0 shadow-sm ">
                        <div className="card-body">
                            <form onSubmit={(e) => handleEditedRequest(e, data._id)}>
                                <fieldset className="fieldset">
                                    {/* NAme  */}
                                    <label className="label">Requerter Name</label>
                                    <input
                                        readOnly
                                        type="text"
                                        className="input bg-white w-full"
                                        defaultValue={user?.displayName}
                                        name="requesterName"
                                    />

                                    {/* email  */}
                                    <label className="label">Requester Email</label>
                                    <input
                                        readOnly
                                        type="email"
                                        className="input bg-white w-full"
                                        defaultValue={user?.email}
                                        name="requesterEmail"
                                    />

                                    <label className="label">Receiver Name</label>
                                    <input
                                        defaultValue={data.receiverName}
                                        type="text"
                                        className="input bg-white w-full"
                                        placeholder='Receiver Name'
                                        name="receiverName"
                                    />

                                    {/* district */}
                                    <label className='label'>Recipient district</label>
                                    <select name="district" className='select w-full' defaultValue={data.district}>
                                        <option value="" disabled className='w-full'>Select your District</option>
                                        {districts?.map(d => <option value={d?.name} key={d?.id}>{d?.name}</option>)}
                                    </select>

                                    {/* upozila */}
                                    <label className='label'>Recipient upozila</label>
                                    <select name="upozila" className='select w-full' defaultValue={data.upozila}>
                                        <option value="" disabled className='w-full'>Select your Upozila</option>
                                        {upozilas?.map(u => <option value={u?.name} key={u?.id}>{u?.name}</option>)}
                                    </select>

                                    <label className="label">Hospital Name</label>
                                    <input
                                        defaultValue={data.hospitalName}
                                        type="text"
                                        className="input bg-white w-full"
                                        placeholder='ex: Dhaka Medical College Hospital'
                                        name="hospitalName"
                                    />

                                    <label className="label">Full Address</label>
                                    <input
                                        defaultValue={data.address}
                                        type="text"
                                        className="input bg-white w-full"
                                        placeholder='ex: Zahir Raihan Rd, Dhaka'
                                        name="address"
                                    />

                                    {/* blood group */}
                                    <label className='label'>Blood Group</label>
                                    <select name="bloodGroup" className='select w-full' defaultValue={data.bloodGroup}>
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


                                    <label className='label'>Donation Date</label>
                                    <input type="date" defaultValue={data.date} className='input bg-white w-full' name="date" id="" />

                                    <label className='label'>Donation Time</label>
                                    <input type="time" defaultValue={data.time} className='input bg-white w-full' name="time" id="" />

                                    <label className='label'>Request massege</label>
                                    <textarea name="massege" defaultValue={data.massege} id="" className='input bg-white w-full h-20'></textarea>






                                    <button className='mt-3 btn bg-red-600 text-white w-full shadow-sm'>Update</button>



                                </fieldset>

                            </form>

                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default UpdateRequest;