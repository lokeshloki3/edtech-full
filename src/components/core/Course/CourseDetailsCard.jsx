import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
                </div>
            </div>
        </div>
    )
}

export default CourseDetailsCard