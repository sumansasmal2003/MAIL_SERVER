const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Configure your email service
const transporter = nodemailer.createTransport({
  service: 'gmail.com',
  auth: {
    user: 'sijgeriaucssangha@gmail.com',
    pass: 'cukc drra ypkd viay',
  },
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/subscribe', (req, res) => {
  const email = req.body.email;

  const mailOptions = {
    from: 'sijgeriaucssangha@gmail.com',
    to: email,
    subject: 'Subscription Confirmation',
    text: 'You have successfully subscribed to our page. You will receive email notifications for updates.',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email.');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Subscription successful. You will receive email notifications.');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
