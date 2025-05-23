import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconBtn from "../../common/IconBtn";
import { useSelector } from 'react-redux';

const VideoDetailsSidebar = ({ setReviewModal }) => {

  const navigate = useNavigate();
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();

  useEffect(() => {
    const setActiveFlags = () => {
      if (!courseSectionData.length) {
        return;
      }

      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      )
      const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
        (data) => data._id === subSectionId
      )
      const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;
      // set current section
      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      // set current sub-section
      setVideoBarActive(activeSubSectionId);
    }
    setActiveFlags();
  }, [courseSectionData, courseEntireData, location.pathname])

  return (
    <>
      <div className='text-white'>
        {/* For buttons and headings */}
        <div>
          {/* For buttons */}
          <div>
            <div
              onClick={() => {
                navigate("/dashboard/enrolled-courses")
              }}
            >
              Back
            </div>

            <div>
              <IconBtn
                text="Add Review"
                onclick={() => setReviewModal(true)}
              />
            </div>
          </div>

          {/* For heading and title */}
          <div>
            <p>{courseEntireData?.courseName}</p>
            <p>{completedLectures?.length} / {totalNoOfLectures}</p>
          </div>
        </div>

        {/* For sections and subsections */}
        <div>
          {
            courseSectionData.map((section, index) => (
              <div
                onClick={() => setActiveStatus(section?._id)}
                key={index}
              >
                {/* Sections */}
                <div>
                  <div>
                    {section?.sectionName}
                  </div>
                </div>

                {/* Subsections */}
                <div>
                  {
                    activeStatus === section?._id && (
                      <div>
                        {
                          section.subSection.map((topic, index) => (
                            <div
                              className={`flex gap-5 p-5 ${videoBarActive === topic._id
                                ? "bg-yellow-200 text-richblack-900"
                                : "bg-richblack-900 text-white"}`}
                              key={index}
                              onClick={() => {
                                navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`)
                                setVideoBarActive(topic?._id);
                              }}
                            >
                              <input
                                type='checkbox'
                                checked={completedLectures.includes(topic?._id)}
                                onChange={() => { }}
                              />
                              <span>
                                {topic.title}
                              </span>
                            </div>
                          ))
                        }
                      </div>
                    )
                  }
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default VideoDetailsSidebar