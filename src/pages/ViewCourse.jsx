import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI"

useEffect(() => {
    const setCourseSpecificDetails = async () => {
        const courseData = await getFullDetailsOfCourse(courseId, token);
    }
}, [])

const ViewCourse = () => {
    return (
        <>
            <div>
                <VideoDetailsSlider />
                <div>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default ViewCourse