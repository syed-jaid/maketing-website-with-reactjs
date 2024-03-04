import React from 'react';
import { useNavigate } from 'react-router-dom';

const Button = () => {

    const navigate = useNavigate();

    const handleButtonClick = () => {
        // Replace '/your-target-route' with the path you want to navigate to
        navigate('/checkout');
    };
    return (
        <div className='max-w-[650px] mx-auto my-5  '>
            <button
                className='bg-[#e73904] hover:bg-[#cc3300] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e73904] py-2 rounded-[29px] text-center transition duration-150 ease-in-out w-full'
                onClick={handleButtonClick}
            >
                <div className='5'>
                    <h1 className='text-lg sm:text-xl md:text-2xl font-bold text-white '>GET All Prompts + $1600 in Bonuses Today!</h1>
                    <h1 className='text-xs sm:text-sm md:text-base text-white'>No questions asked money back guarantee</h1>
                </div>
            </button>
        </div>)
};

export default Button;