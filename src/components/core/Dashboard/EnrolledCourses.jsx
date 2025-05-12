import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ProgressBar from "@ramonak/react-progress-bar";

import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";

const EnrolledCourses = () => {

    const [enrolledCourses, setEnrolledCourses] = useState(null);
    const { token } = useSelector((state) => state.auth);

    const getEnrolledCourses = async () => {
        try {
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);
        } catch (error) {
            console.log("Unable to fetch Enrolled Courses");
        }
    }

    useEffect(() => {
        getEnrolledCourses();
    }, []);

    return (
        <div>
            <div className='text-3xl text-richblack-50'>Enrolled Courses</div>
            {!enrolledCourses ? (
                <div className='grid place-items-center min-h-[calc(100vh-3.5rem)]'>
                    <div className='spinner'></div>
                </div>
            ) : !enrolledCourses.length ? (
                <p className='grid h-[10vh] w-full place-content-center text-richblack-5'>
                    You have not enrolled in any course yet.
                </p>
            ) : (
                <div className='my-8 text-richblack-5'>
                    <div className='flex rounded-t-lg bg-richblack-500'>
                        <p className='w-[45%] px-5 py-3'>Courses Name</p>
                        <p className='w-1/4 px-2 py-3'>Duration</p>
                        <p className='flex-1 px-2 py-3'>Progress</p>
                    </div>

                    {enrolledCourses.map((course, index) => (
                        <div key={index}>
                            <div>
                                <img src={course.thumbnail} />
                                <div>
                                    <p>{course.courseName}</p>
                                    <p>{course.courseDescription}</p>
                                </div>
                            </div>

                            <div>
                                {course?.totalDuration}
                            </div>

                            <div>
                                <p>Progress: {course.progressPercentage || 0}%</p>
                                <ProgressBar
                                    completed={course.progressPercentage || 0}
                                    height="8px"
                                    isLabelVisible={false}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default EnrolledCourses