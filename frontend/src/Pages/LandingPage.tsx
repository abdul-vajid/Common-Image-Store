import React from 'react'
import grid from "../assets/images/grid.jpg"


export const LandingPage: React.FC = () => {
    return (
        <div className='absolute h-full w-full flex bg-green-400 flex-row gap-5'>
            <div className='h-full w-2/5 bg-green-400 text-center'>
                <img src={grid} alt="Grid View" />
            </div>
            <div className='h-full w-3/5 bg-blue-500 text-center'>
                <h1>Hello Welcome</h1>
            </div>
        </div>
    );
}