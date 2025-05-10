const cron = require("node-cron");
const User = require("../models/User");
const Profile = require("../models/Profile");
const CourseProgress = require("../models/CourseProgress");
const UserDeletionLog = require("../models/UserDeletionLog");

// Schedule: every day at 1:00 AM
exports.scheduleUserDeletionJob = () => {
    cron.schedule("0 1 * * *", async () => {
        const now = new Date();
        try {
            const usersToDelete = await User.find({
                isDeleted: true,
                deletionScheduledAt: { $lte: now }, // deletionScheduledAt timestamp is less than or equal to the current time.
            });

            for (const user of usersToDelete) {
                await Profile.findByIdAndDelete(user.additionalDetails);
                await CourseProgress.deleteMany({ userId: user._id });

                // Log deletion
                await UserDeletionLog.create({
                    userId: user._id,
                    email: user.email,
                    reason: "Auto-deleted after 3 days of inactivity post deletion request",
                });

                await User.findByIdAndDelete(user._id);
                console.log(`Deleted and logged user: ${user.email}`);
            }

            console.log("Daily cleanup completed.");
        } catch (error) {
            console.error("Error running deletion job:", error);
        }
    })
}