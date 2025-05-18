import React, { useEffect, useState } from 'react'
import RenderSteps from "../AddCourse/RenderSteps"
import { useDispatch, useSelector } from 'react-redux';
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI';
import { useParams } from 'react-router-dom';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';

const EditCourse = () => {
    const { course } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const { courseId } = useParams();
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("courseId from URL:", courseId);
        const populateCourseDetails = async () => {
            setLoading(true);
            const result = await getFullDetailsOfCourse(courseId, token);
            if (result?.courseDetails) {
                dispatch(setEditCourse(true));
                dispatch(setCourse(result?.courseDetails));
            }
            setLoading(false);
        }
        populateCourseDetails();
    }, [])

    if (loading) {
        return (
            <div className="grid flex-1 place-items-center">
                <div className="spinner"></div>
            </div>
        )
    }

    return (
        <div>
            <h1>
                Edit Course
            </h1>
            <div>
                {course ? (
                    <RenderSteps />
                ) : (
                    <p>
                        Course not found
                    </p>
                )}
            </div>
        </div>
    )
}

export default EditCourse