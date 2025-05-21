import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentPaymentAPI';
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";

const CourseDetails = () => {

    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [courseData, setCourseData] = useState(null);
    const { loading } = useSelector((state) => state.profile);

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

    if (loading || !courseData) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    if (!courseData.success) {
        return (
            <div>
                <Error />
            </div>
        )
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
    }
    return (
        <div className='relative w-full bg-richblack-800'>
            {/* Hero Section */}
            <div className='mx-auto box-content px-4 lg:w-[1260px] 2xl:relative'>
                <div className='mx-auto grid min-h-[450px] max-w-(--max-content-tab) justify-items-center py-8 lg:mx-0 lg:justify-items-center lg:py-0 xl:max-w-[810px]'>
                    <div className='relative block max-h-[30rem] lg:hidden'>
                        <div className='absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]'></div>
                        <img
                            src={thumbnail}
                            alt='Course thumbnail'
                            className='aspect-auto w-full'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseDetails