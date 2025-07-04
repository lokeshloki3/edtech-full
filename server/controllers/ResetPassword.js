const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
// const dotenv = require("dotenv");
// dotenv.config();

require("dotenv").config();

// resetPasswordToken function - sends email
exports.resetPasswordToken = async (req, res) => {
    try {
        // get email from req body
        const email = req.body.email;
        // check user for this email
        const user = await User.findOne({ email: email });
        // email validation
        if (!user) {
            return res.status(400).json({
                success: false,
                message: `Your email: ${email} is not registered with us`,
            });
        }
        // generate token
        const token = crypto.randomBytes(20).toString("hex");
        // update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate(
            { email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000, // 5 min
            },
            {
                new: true, // give latest one
            }
        );
        console.log("Details", updatedDetails);
        // create url
        // const url = `http://localhost:5173/update-password/${token}`
        const url = `${process.env.FRONTEND_URL_UPDATE_PASSWORD}/update-password/${token}`;
        // send mail containing the url
        await mailSender(
            email,
            "Password Reset Link for your StudySphere account",
            `Password Reset Link: ${url}`
        );
        // return response
        return res.status(200).json({
            success: true,
            message: "Email sent successfully, please check email and change pwd",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while sending reset pwd mail",
        });
    }
}


// resetPassword

exports.resetPassword = async (req, res) => {
    try {
        // data fetch - token from params sent in req by frontend
        const { password, confirmPassword, token } = req.body;
        // validation
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password not matching",
            });
        }
        // get user details from db using token
        const userDetails = await User.findOne({ token: token });
        // if no entry - invalid token
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "Token is invalid",
            });
        }
        // token time check
        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "Token is expired, please regenerate your token",
            });
        }
        // hash pwd
        const hashedPassword = await bcrypt.hash(password, 10);

        // password update
        await User.findOneAndUpdate(
            { token: token },
            { password: hashedPassword },
            { new: true },
        );
        // return response
        return res.status(200).json({
            success: true,
            message: "Password reset successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while sending reset pwd mail",
        });
    }
}