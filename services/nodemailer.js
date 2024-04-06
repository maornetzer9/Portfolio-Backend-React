require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASSWORD
    },
});


module.exports = async function sendEmail(req, res)
{
    try
    {
        const { from, message, email } = req.body;
        const response = {message: 'Thank you! I will get back to you soon.', code: 200};
        const subject = 'New Email From Portfolio Web Site !';
        const date = new Date().toLocaleDateString('en-US', {timeZone: 'Asia/Jerusalem'} );

        const htmlContent = 
            `
                <p><strong>Name:</strong> ${from}</p>
                <p><strong>From:</strong> ${email}</p>
                <p><strong>Message:</strong> ${message}</p>
                <p><strong>Date:</strong> ${date}</p>
            `;

        if(!from || !message || !email ) return res.status(400).json({ message: 'Missing required fields', code: 400 });

        await transporter.sendMail({
            subject,
            html: htmlContent,
            to: process.env.APP_EMAIL,
            from: `"Portfolio Contact" <${process.env.APP_EMAIL}>`,

        });

        return res.status(200).json({ ...response });
    }
    catch(err)
    {
        console.error(err);
        return res.status(500).json({message: 'Internal server error.', code: 500});
    }
}

