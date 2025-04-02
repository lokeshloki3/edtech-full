const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
    try {
        // fetch data
        const { sectionName, courseId } = req.body;
        // data validation
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // create section
        const newSection = await Section.create({ sectionName });
        // update course with section ObjectId
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: newSection._id,
                },
            },
            { new: true },
        )
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();
        // use populate above to replace id with data of sections/sub-sections both in the updatedCourseDetails
        // return response
        return res.status(200).json({
            success: true,
            message: "Section created successfully",
            updatedCourseDetails,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to create Section, Please try again",
            error: error.message,
        });
    }
}

exports.updateSection = async (req, res) => {
    try {
        // data input
        const { sectionName, sectionId } = req.body;
        // data validation
        if (!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        // update data - no need to update course as course only have section id
        const section = await Section.findByIdAndUpdate(sectionId, { sectionName }, { new: true });
        // return response
        return res.status(200).json({
            success: true,
            message: "Section updated successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to update Section, Please try again",
            error: error.message,
        });
    }
}

exports.deleteSection = async (req, res) => {
    try {
        // get ID - assuming we are sending ID in params
        const { sectionId, courseId} = req.params;
        // use findIdAndDelete
        await Section.findByIdAndDelete(sectionId);
        // Also do - delete the entry from course schema
        // should all associated SubSection also needs to be deleted ?
        await Course.findByIdAndUpdate(
            { _id: courseId },
            {
                $pull: {
                    courseContent: sectionId, // courseContent is Section Id in Course schema
                },
            }
        )
        // return response
        return res.status(200).json({
            success: true,
            message: "Section deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to delete Section, Please try again",
            error: error.message,
        });
    }
}