const mongoose = require("mongoose");

const userDeletionLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    email: { type: String },
    deletedAt: { type: Date, default: Date.now },
    reason: { type: String, default: "Scheduled deletion after inactivity" },
});

module.exports = mongoose.model("UserDeletionLog", userDeletionLogSchema);
