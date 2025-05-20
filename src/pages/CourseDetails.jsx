import React from 'react'

const CourseDetails = () => {

    const handleBuyCourse = () => {
        // if user logged then only he can buy courses
        // if (token) {
        //     // handleBuyCourse()
        // }
    }
    return (
        <div className='flex items-center'>
            <button className='bg-yellow-50 p-6 mt-10 cursor-pointer'
                onClick={handleBuyCourse}
            >
                Buy Now
            </button>
        </div>
    )
}

export default CourseDetails