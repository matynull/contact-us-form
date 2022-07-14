const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();
const app = express();


const PORT = process.env.PORT || 5000;

// Middleware

app.use(express.static(__dirname + '/public'));
app.use(express.json());


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/contactform.html');
})

app.post('/', (req, res) => {

    /*     const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '@gmail.com',
                pass: 'pedo1234@'
            }
        }) */

    const transporter = nodemailer.createTransport({
        host: process.env.SMTPSV,
        port: process.env.SMTPPORT,
        //secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EPASS
        }
    })

    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: `Message from ${req.body.email}: ${req.body.subject}`,
        text: `Nombre: ${req.body.firstName} ${req.body.lastName}\nEmail: ${req.body.email}\nMensaje:${req.body.message}`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Error');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('sucess');
        }
    });
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});