const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Use CORS middleware
app.use(cors());

// Configure your email service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sijgeriaucssangha@gmail.com',
    pass: 'cukc drra ypkd viay',
  },
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Handle form submission
app.post('/send-email', (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: 'sijgeriaucssangha@gmail.com',
    to: 'club-email@example.com', // Replace with your club's email address
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email.');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Message sent successfully!');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
