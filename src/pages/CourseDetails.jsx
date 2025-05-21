import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentPaymentAPI';
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import Error from "./Error";
import GetAvgRating from '../utils/avgRating';
import RatingStars from "../components/common/RatingStars";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { formatDate } from "../services/formatDate";
import { ACCOUNT_TYPE } from "../utils/constants";
import toast from 'react-hot-toast';
import { addToCart } from '../slices/cartSlice';
import ConfirmationModal from "../components/common/ConfirmationModal";
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';

const CourseDetails = () => {

    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [courseData, setCourseData] = useState(null);
    const { loading } = useSelector((state) => state.profile);
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    const [confirmationModal, setConfirmationModal] = useState(null);

    useEffect(() => {
        const getCourseFullDetails = async () => {
            try {
                const result = await fetchCourseDetails(courseId);
                console.log("Printing CourseData-> ", result);
                setCourseData(result);
            }
            catch (error) {
                console.log("Could not fetch coursse details");
            }
        }
        getCourseFullDetails();

    }, [courseId]);

    useEffect(() => {
        const count = GetAvgRating(courseData?.data?.courseDetails.ratingAndReviews);
        setAvgReviewCount(count);
    }, [courseData]);

    if (loading || !courseData) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner"></div>
            </div>
        )
    }
    
    if (!courseData.success) {
        return <Error />
    }

    const {
        _id: course_id,
        courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentsEnrolled,
        createdAt,
    } = courseData.data?.courseDetails;

    const handleBuyCourse = () => {
        // if user logged then only he can buy courses
        if (token) {
            buyCourse(token, [courseId], user, navigate, dispatch);
            return;
        }
        setConfirmationModal({
            text1: "You are not logged in!",
            text2: "Please login to Purchase Course.",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        })
    }

    const handleAddToCart = () => {
        if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an Instructor. You can't buy a course.");
            return;
        }
        if (token) {
            dispatch(addToCart(courseData?.data?.courseDetails));
            return;
        }
        setConfirmationModal({
            text1: "You are not logged in!",
            text2: "Please login to add To Cart",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        })
    }

    return (
        <div className='relative w-full bg-richblack-800'>
            {/* Hero Section */}
            <div className='mx-auto box-content px-4 lg:w-[1260px] 2xl:relative'>
                <div className='mx-auto grid min-h-[450px] max-w-(--max-content-tab) justify-items-center py-8 lg:mx-0 lg:justify-items-center lg:py-0 xl:max-w-[810px]'>
                    {/* This div for mobile only */}
                    <div className='relative block max-h-[30rem] lg:hidden'>
                        <div className='absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]'></div>
                        <img
                            src={thumbnail}
                            alt='Course thumbnail'
                            className='aspect-auto w-full'
                        />
                    </div>
                    <div
                        className='z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5'
                    >
                        <p className='text-4xl font-bold sm:text-[42px]'>
                            {courseName}
                        </p>
                        <p className='text-richblack-200'>{courseDescription}</p>
                        <div className='text-md flex flex-wrap items-center gap-2'>
                            <span className='text-yellow-25'>{avgReviewCount}</span>
                            <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                            <span>{`(${ratingAndReviews.length} reviews)`}</span>
                            <span>{`${studentsEnrolled.length} students enrolled`}</span>
                        </div>
                        <p>
                            Created By {`${instructor.firstName} ${instructor.lastName}`}
                        </p>
                        <div className='flex flex-wrap gap-5 text-lg'>
                            <p className="flex items-center gap-2">
                                {" "}
                                <BiInfoCircle /> Created at {formatDate(createdAt)}
                            </p>
                            <p className="flex items-center gap-2">
                                {" "}
                                <HiOutlineGlobeAlt /> English
                            </p>
                        </div>
                    </div>

                    {/* This div for mobile only */}
                    <div className='flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden'>
                        <p className='space-x-3 pb-4 text-3xl font-semibold text-richblack-5'>
                            Rs. {price}
                        </p>
                        <button
                            className="yellowButton"
                            onClick={
                                user && courseData?.data?.courseDetails.studentsEnrolled.includes(user?._id)
                                    ? () => navigate("/dashboard/enrolled-courses")
                                    : handleBuyCourse
                            }
                        >
                            {user && courseData?.data?.courseDetails.studentsEnrolled.includes(user?._id)
                                ? "Go To Course"
                                : "Buy Now"}
                        </button>
                        {(!user || courseData?.data?.courseDetails.studentsEnrolled.includes(user?._id)) && (
                            <button
                                className='cursor-pointer rounded-md bg-richblack-800 px-[20px] py-[8px] font-semibold text-richblack-5'
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </button>
                        )}
                    </div>
                </div>

                {/* Course Card */}
                <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
                    <CourseDetailsCard
                        course={courseData?.data?.courseDetails}
                        // setConfirmationModal={setConfirmationModal}
                        handleBuyCourse={handleBuyCourse}
                        handleAddToCart={handleAddToCart}
                    />
                </div>
            </div>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    )
}

export default CourseDetails