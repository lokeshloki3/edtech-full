import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BsFillCaretRightFill } from "react-icons/bs";
import { FaShareSquare } from "react-icons/fa";
import toast from 'react-hot-toast';
import copy from 'copy-to-clipboard';

const CourseDetailsCard = ({
    course,
    // setConfirmationModal, 
    handleBuyCourse,
    handleAddToCart
}) => {

    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();

    const {
        thumbnail: ThumbnailImage,
        price: CurrentPrice,
        _id: courseId,
    } = course;

    const handleShare = () => {
        copy(window.location.href);
        toast.success("Link copied to clipboard");
    }

    return (
        <div>
            <div className="flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5">
                {/* Course Image */}
                <img
                    src={ThumbnailImage}
                    alt={course?.courseName}
                    className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
                />

                <div className='px-4'>
                    <div className="space-x-3 pb-4 text-3xl font-semibold">
                        Rs. {CurrentPrice}
                    </div>
                    <div className="flex flex-col gap-4">
                        <button
                            className="yellowButton"
                            onClick={
                                user && course?.studentsEnrolled.includes(user?._id)
                                    ? () => navigate("/dashboard/enrolled-courses")
                                    : handleBuyCourse
                            }
                        >
                            {user && course?.studentsEnrolled.includes(user?._id)
                                ? "Go To Course"
                                : "Buy Now"}
                        </button>
                        {(!user || !course?.studentsEnrolled.includes(user?._id)) && (
                            <button onClick={handleAddToCart} className="blackButton">
                                Add to Cart
                            </button>
                        )}
                    </div>
                    <p className='pb-3 pt-6 text-center text-sm text-richblack-25'>
                        30-Day Money-Back Guarantee
                    </p>

                    <p className='my-2 text-xl font-semibold'>
                        This Course Includes :
                    </p>
                    <div className='flex flex-col gap-3 text-sm text-caribbeangreen-100'>
                        {course?.instructions?.map((item, index) => (
                            <p className='flex gap-2' key={index}>
                                <BsFillCaretRightFill />
                                <span>{item}</span>
                            </p>
                        ))}
                    </div>
                </div>
                <div className='text-center'>
                    <button
                        className='mc-auto flex items-center gap-2 py-6 text-yellow-100 cursor-pointer'
                        onClick={handleShare}
                    >
                        <FaShareSquare size={15} />
                        Share
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CourseDetailsCard