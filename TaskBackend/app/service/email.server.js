
const nodemailer = require('nodemailer');


// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'jdaly2991@gmail.com',
    pass: 'ygessylfgpfrmhwk',
  },
});

// Function to send the verification email
const sendVerificationEmail = (email, verificationToken) => {
  const verificationLink = `http://127.0.0.1:5173/verifyemail/${verificationToken}`; // Replace with the actual URL of your API endpoint

  const mailOptions = {
    from: 'jdaly2991@gmail.com', // Replace with your email address
    to: email,
    subject: 'Email Verification',
    html: `<p>Thank you for registering. Please click the following link to verify your email:</p><a href="${verificationLink}">${verificationLink}</a>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

// // Usage example
// const userEmail = 'jdaly2991@gmail.com';
// const verificationToken = 'generated_verifaction_token';

// sendVerificationEmail(userEmail, verificationToken);

module.exports = {
  sendVerificationEmail
};
