import React, { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef();
    const passRef = useRef();
    const [form, setForm] = useState({ site: '', username: '', password: '' });
    const [passwordArray, setPasswordArray] = useState([]);

    useEffect(() => {
        const passwords = localStorage.getItem('passwords');
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, []);

    const savePass = () => {
        if (form.site.length>3 && form.username.length>3 && form.password.length>3 ) {
            
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]));
            console.log(...passwordArray, form);
            setForm({ site: '', username: '', password: '' })
            toast('Password saved!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
    else{
        toast('Error: Password not saved', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
        
    };
    const deletePass = (id) => {
        console.log("Deleting password with id", id)
        let confirmDel = confirm("Are you sure you want to delete this password? ")
        if (confirmDel) {
            setPasswordArray(passwordArray.filter(item => item.id !== id));
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)));
            // console.log(...passwordArray, form);
            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };
    const editPass = (id) => {
        console.log("Editing password with id", id)
        setForm(passwordArray.filter(item => item.id === id)[0]);
        //Method:1
        // deletePass(id)
        //Method:2
        setPasswordArray(passwordArray.filter(item => item.id !== id));
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const showPass = () => {
        // alert('show password');
        passRef.current.type = "text";
        console.log(ref.current.src);
        if (ref.current.src.includes("icons/eye.png")) {

            ref.current.src = "icons/hidden.png"
        }
        else {
            ref.current.src = "icons/eye.png";
            passRef.current.type = "password";
        }

    }
    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute top-0 z-[-2] h-screen w-100% bg-green-100 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
            <div className="md:mycontainer p-4 pt-7 md:p-0 min-h-[90vh]">
                <h1 className='text-4xl font-bold text-center'>
                    <span className="text-green-500">&lt;</span>
                    <span>Pass</span>
                    <span className="text-green-500">OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>

                <div className="text-black flex flex-col p-4 gap-8 items-center">
                    <input value={form.site} onChange={handleChange} className='rounded-full border border-green-400 w-full py-1 p-4' placeholder='Enter website URL' type="text" name='site' id='site' />
                    <div className="flex flex-col md:flex-row w-full gap-8">
                        <input value={form.username} onChange={handleChange} className='rounded-full border border-green-400 w-full py-1 p-4' placeholder='Enter username' type="text" name='username' id='username' />
                        <div className="relative">
                            <input ref={passRef} value={form.password} onChange={handleChange} className='rounded-full border border-green-400 w-full py-1 p-4' placeholder='Enter Password' type="password" name='password' id='password' />
                            <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPass}>
                                <img ref={ref} className='p-1' width={25} src="public/icons/eye.png" alt="toggle visibility" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePass} className='flex justify-center items-center bg-green-500 rounded-full px-8 py-2 w-fit gap-2 border-2 border-green-900 hover:bg-green-400'>
                        <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"></lord-icon>
                        Save Password
                    </button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords saved</div>}
                    {passwordArray.length !== 0 && (
                        <table className="table-auto w-full rounded-md overflow-hidden mb-14">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-200'>
                                {passwordArray.map((item, index) => (
                                    <tr key={index}>
                                        <td className='text-center py-3 border border-white '>
                                            <div className="flex justify-center items-center">
                                                <a href={item.site} target='_blank' rel="noopener noreferrer">{item.site}</a>
                                                <div className="lordiconcopy cursor-pointer size-7" onClick={() => { copyText(item.site) }} >
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "padding": "4px", "paddingLeft": "4px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover">
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center  py-3 border border-white '>
                                            <div className="flex justify-center items-center">
                                                <span>
                                                    {item.username}
                                                </span>
                                                <div className=" lordiconcopy cursor-pointer size-7" onClick={() => { copyText(item.username) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "4px", "paddingLeft": "4px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover">
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center py-3 border border-white '>
                                            <div className="flex justify-center items-center">
                                                <span>
                                                    {item.password}
                                                </span>
                                                <div className="lordiconcopy cursor-pointer size-7" onClick={() => { copyText(item.password) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "4px", "paddingLeft": "4px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover">
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center py-3 border border-white '>
                                            <span className='cursor-pointer mx-1' onClick={() => { editPass(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "4px", "paddingLeft": "4px" }}>

                                                </lord-icon>
                                            </span>
                                            <span className='cursor-pointer mx-1' onClick={() => { deletePass(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "4px", "paddingLeft": "4px" }}>

                                                </lord-icon>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};

export default Manager;
