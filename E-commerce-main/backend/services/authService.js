const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  userModel  = require('../models/userModel');
const { sendResetCode } = require('./../services/emailService');

const requestPasswordReset = async (email) => {
    console.log(`Requesting password reset for email: ${email}`);
    const user = await userModel.findOne({ email: new RegExp('^' + email + '$', 'i') });
    if (!user) throw new Error('User not found');

    const resetCode = crypto.randomBytes(3).toString('hex');
    const hashedCode = await bcrypt.hash(resetCode, 10);

    user.resetPasswordCode = hashedCode;
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 15 minutes
    await user.save();

    await sendResetCode(user.email, resetCode);
};

const verifyResetCode = async (email, code) => {
    const user = await userModel.findOne({ email: new RegExp('^' + email + '$', 'i') });
    console.log(email,code);

    if (!user || !user.resetPasswordCode || user.resetPasswordExpires < Date.now()) {
        throw new Error('Invalid or expired reset code');
    }

    const isMatch = await bcrypt.compare(code, user.resetPasswordCode);
    if (!isMatch) throw new Error('Incorrect reset code');

    return jwt.sign({ id: user.id }, process.env.TOKEN_SECRET_KEY, { expiresIn: '15m' });
};

const resetPassword = async (resetToken, newPassword) => {
    const decoded = jwt.verify(resetToken, process.env.TOKEN_SECRET_KEY);
    const user = await userModel.findById(decoded.id);

    if (!user) throw new Error('Invalid token');

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordCode = null;
    user.resetPasswordExpires = null;
    await user.save();
};

module.exports = {
    requestPasswordReset,
    verifyResetCode,
    resetPassword
};
