import React, { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI"
import { useSelector } from 'react-redux';

const ViewCourse = () => {

    const { courseId } = useParams();
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        const setCourseSpecificDetails = async () => {
            const courseData = await getFullDetailsOfCourse(courseId, token);
        }
        setCourseSpecificDetails();
    }, [])

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