import React from 'react'
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table'
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"

const CoursesTable = ({ courses, setCourses }) => {
    return (
        <div>
            <Table className='rounded-xl border border-richblack-800'>
                <Thead>
                    <Tr className='flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2'>
                        <Th className='flex-1 text-left text-sm font-medium uppercase text-richblack-100'>
                            Courses
                        </Th>
                        <Th className='text-left text-sm font-medium uppercase text-richblack-100'>
                            Duration
                        </Th>
                        <Th className='text-left text-sm font-medium uppercase text-richblack-100'>
                            Price
                        </Th>
                        <Th className='text-left text-sm font-medium uppercase text-richblack-100'>
                            Actions
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {courses?.length === 0 ? (
                        <Tr>
                            <Td className='py-10 text-center text-2xl font-medium text-richblack-100'>
                                No courses found
                            </Td>
                        </Tr>
                    ) : (
                        courses?.map((course) => (
                            <Tr
                                key={course._id}
                                className='flex gap-x-10 border-b border-richblack-800 px-6 py-8'
                            >
                                <Td className='flex flex-1 gap-x-4'>
                                    <img
                                        src={course?.thumbnail}
                                        alt={course?.courseName}
                                        className='h-[148px] w-[220px] rounded-lg object-cover'
                                    />
                                    <div className='flex flex-col justify-between'>
                                        <p className='text-lg font-medium text-richblack-5'>
                                            {course.courseName}
                                        </p>
                                        <p className='text-xs text-richblack-300'>
                                            {course.courseDescription}
                                        </p>
                                        <p className='text-[12px] text-white'>
                                            Created: {formatDate(course.createdAt)}
                                        </p>
                                    </div>
                                </Td>
                            </Tr>
                        ))
                    )}
                </Tbody>
            </Table>
        </div>
    )
}

export default CoursesTable