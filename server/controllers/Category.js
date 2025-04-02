const Category = require("../models/Category");

// create Category handler function

exports.createCategory = async (req, res) => {
    try {
        // fetch data
        const { name, description } = req.body;
        // validation
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        // create entry in db
        const categoriesDetails = await Category.create({
            name: name,
            description: description,
        });
        console.log(categoriesDetails);

        // return response
        return res.status(200).json({
            success: true,
            message: "Category created successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// getAllCategories handler function

exports.showAllCategories = async (req, res) => {
    try {
        const allCategories = await Category.find({}, { name: true, description: true });
        res.status(200).json({
            success: true,
            message: "All categories returned successfully",
            allCategories,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// categoryPageDetails

exports.categoryPageDetails = async (req, res) => {
    try {
        // get categoryId
        const { categoryId } = req.body;

        // Get courses for the specified categoryId
        const selectedCategory = await Category.findById(categoryId)
            .populate("courses") // Category schema has course array reference so need to populate it
            .exec();
        console.log(selectedCategory);
        // Validation - when the category is not found
        if (!selectedCategory) {
            console.log("Category not found.");
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }
        // Handle the case when there are no courses
        if (selectedCategory.courses.length === 0) {
            console.log("No courses found for the selected category.");
            return res.status(404).json({
                success: false,
                message: "No courses found for the selected category.",
            });
        }

        const selectedCourses = selectedCategory.courses;

        // Get courses for other different categories
        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId }, //$ne -> not equal
        }).populate("courses").exec();
        let differentCourses = [];
        for (const category of categoriesExceptSelected) {
            differentCourses.push(...category.courses);
        }

        // Get top-selling courses across all categories
        const allCategories = await Category.find().populate("courses");
        const allCourses = allCategories.flatMap((category) => category.courses);
        const mostSellingCourses = allCourses
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 10);

        // return response
        return res.status(200).json({
            success: true,
            selectedCourses: selectedCourses,
            differentCourses: differentCourses,
            mostSellingCourses: mostSellingCourses,
        });
        // return res.status(200).json({
        //     success: true,
        //     data: {
        //         selectedCourses: selectedCourses,
        //         differentCourses: differentCourses,
        //         mostSellingCourses: mostSellingCourses,
        //     }
        // });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};