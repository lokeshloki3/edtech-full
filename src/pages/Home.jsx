import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from "../components/core/HomePage/Button";

const Home = () => {
    return (
        <div>
            {/* Section 1 */}
            {/* group property of parent */}
            <div className='group mt-12 p-1 relative mx-auto w-11/12 max-w-(--max-content) flex flex-col justify-between items-center text-white'>
                <Link to={"/signup"}>
                    <div className='mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
                         transition-all duration-200 hover:scale-95 w-fit'>
                        <div className='flex items-center gap-2 rounded-full px-10 py-[5px]
                        transition-all duration-200 group-hover:bg-richblack-900'>
                            <p>Become an Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>
                <div className='text-center text-4xl font-semibold mt-7'>
                    Empower Your Future with
                    <HighlightText text={"Coding Skills"} />
                </div>
                <div className='mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </div>
                <div className='flex gap-7 mt-8'>
                    <CTAButton active={true} linkto={"/signup"}>
                        Learn More
                    </CTAButton>
                    <CTAButton active={false} linkto={"/signup"}>
                        Book a Demo
                    </CTAButton>
                </div>
            </div>
            {/* Section 2 */}
            {/* Section 3 */}
            {/* Footer */}
        </div>
    )
}

export default Home