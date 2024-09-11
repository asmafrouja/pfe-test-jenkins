const authService = require('../../services/authService');
const userModel = require("./../../models/userModel");
const requestPasswordReset = async (req, res) => {

    const { email } = req.body;

    if (!email || typeof email !== 'string' || email.trim() === '') {
        return res.status(400).send('Email is required and must be a non-empty string');
    }
    try {


        await authService.requestPasswordReset(req.body.email);
        const responseObject={
            message:"Reset code sent to your email",
            success:true
        };
        res.json(responseObject);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const verifyResetCode = async (req, res) => {
    const { email, code } = req.body;
    if (!email || typeof email !== 'string' || email.trim() === '') {
        return res.status(400).send('Email is required and must be a non-empty string');
    }

    if (!code || typeof code !== 'string' || code.trim() === '') {
        return res.status(400).send('Reset code is required and must be a non-empty string');
    }

    try {
        const resetToken = await authService.verifyResetCode(req.body.email, req.body.code);
        const responseObject={
            resetToken:resetToken,
            success:true
        };
        res.json(responseObject);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const resetPassword = async (req, res) => {
    const { resetToken, newPassword } = req.body;

    if (!resetToken || typeof resetToken !== 'string' || resetToken.trim() === '') {
        return res.status(400).send('Reset token is required and must be a non-empty string');
    }

    if (!newPassword || typeof newPassword !== 'string' || newPassword.trim() === '') {
        return res.status(400).send('New password is required and must be a non-empty string');
    }
    try {
        await authService.resetPassword(req.body.resetToken, req.body.newPassword);
        const responseObject={
            message:'Password has been reset successfully',
            success:true
        };
        res.json(responseObject);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = {
    requestPasswordReset,
    verifyResetCode,
    resetPassword
};
