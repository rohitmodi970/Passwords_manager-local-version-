import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white sticky z-10 top-0'>
            <div className="mycontainer flex justify-between items-center py-5 px-4 h-14 ">

                <div className="logo font-bold text-2xl">
                    <span className="text-green-500">&lt;</span>
                    <span>

                    Pass
                    </span>
                    <span className="text-green-500">OP/&gt;</span>

                </div>
                {/* <ul>
                    <li className='flex gap-5 '>
                        <a className='hover:font-bold' href="#">Home</a>
                        <a className='hover:font-bold' href="#">About</a>
                        <a className='hover:font-bold' href="#">Contact</a>
                    </li>
                </ul> */}
                <button className="flex  text-white bg-green-700 justify-between  items-center rounded-xl my-5 px-2 ring-white ring-1">
                    <img className=' invert-[85%] p-1 w-10 ' src="/icons/github.png" alt="github" />
                    <span className="font-bold px-2">GitHub</span>
                    
                </button>
            </div>
        </nav>
    )
}

export default Navbar
