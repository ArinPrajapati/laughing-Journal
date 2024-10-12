"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: "oleta73@ethereal.email",
        pass: "3uHFFHYMSaKqqz9Har",
    },
});
// check mail on https://ethereal.email/messages
const sendEmail = async (email) => {
    const info = await transporter.sendMail({
        from: email.from,
        cc: email.cc || " ",
        to: email.to,
        subject: email.subject,
        text: email.text,
        html: email.html,
    });
    console.log({
        message: "Message sent",
        id: info.messageId,
        email: info.envelope.to,
    });
};
exports.default = sendEmail;
