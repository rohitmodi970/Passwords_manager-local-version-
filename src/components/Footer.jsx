import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-col justify-center items-center gap-2  bottom-0 w-full'>
        <div className="logo font-bold text-2xl">
                    <span className="text-green-500">&lt;</span>
                    <span> Pass</span>
                    <span className="text-green-500">OP/&gt;</span>

                </div>
                <div className="flex justify-center items-center">
      Created with <img className='w-10 mx-2' src="\public\icons\heart.png" alt="" />
      by RKM</div>
    </div>
  )
}

export default Footer
