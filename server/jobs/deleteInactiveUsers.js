const cron = require("node-cron");
const User = require("../models/User");
const Profile = require("../models/Profile");
const CourseProgress = require("../models/CourseProgress");

// Schedule: every day at 1:00 AM
exports.scheduleUserDeletionJob = () => {
    cron.schedule("0 1 * * *", async () => {
        const now = new Date();
        // console.log("Current date for deletion check:", now);
        try {
             // deletionScheduledAt timestamp is less than or equal to the current time.
            const usersToDelete = await User.find({
                isDeleted: true,
                deletionScheduledAt: { $lte: now },
            });

            for (const user of usersToDelete) {
                await Profile.findByIdAndDelete(user.additionalDetails);
                await CourseProgress.deleteMany({ userId: user._id });
                await User.findByIdAndDelete(user._id);
                console.log(`Deleted user: ${user.email}`);
            }

            console.log("Daily cleanup completed.");
        } catch (error) {
            console.error("Error running deletion job:", error);
        }
    })
}