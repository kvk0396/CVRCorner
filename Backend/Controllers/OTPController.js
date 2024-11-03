const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const OTPModel = require('../models/otpModel'); 
const userModel = require('../models/userModel');

const sendOtp = async (req, res) => {
    const { email } = req.body;
    const emailPattern = /^[0-9]{2}[Bb][8][1][Aa][0-9A-Za-z]{4}@cvr.ac.in$/;

    if (!emailPattern.test(email)) {
        return res.status(400).json({ message: 'Invalid CVR email address' });
    }

    const acc = userModel.findOne({email}) ;

    if (!acc) {
        return res.status(404).json({ message: 'User with this email is already registered' });
    }

    const otp = Math.floor(1000 + Math.random() * 9000); 

    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: 'Your CVR Corner OTP',
            text: `Your OTP is ${otp}. It is valid for 5 minutes.`
        });

        await OTPModel.create({ email, otp, expiresAt: Date.now() + 5 * 60 * 1000 });
        res.json({ message: 'OTP sent' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ message: 'Error sending OTP' });
    }
};

const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    //console.log(otp)
    try {
        const otpRecord = await OTPModel.findOne({ email, otp });
        if (!otpRecord) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        if (Date.now() > otpRecord.expiresAt) {
            await OTPModel.deleteOne({ email }); 
            return res.status(400).json({ message: 'OTP has expired' });
        }

        await OTPModel.deleteOne({ email }); 
        res.json({ message: 'OTP verified' });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ message: 'Error verifying OTP' });
    }
};

module.exports = { sendOtp, verifyOtp };
