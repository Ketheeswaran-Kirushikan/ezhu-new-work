const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerificationEmail = async (email, firstName, password) => {
  const msg = {
    to: email,
    from: "kirushikanketheeswaran@gmail.com",
    subject: "Welcome to Ezhu",
    text: `Hello ${firstName},\n\nYour payment has been successfully completed.\n\nClick on the following link to proceed with your account setup: http://localhost:3000/login\n\nYour email: ${email}\nPassword: ${password}\n\nThank you!`,
    html: `<h3>Hello ${firstName},</h3><p>Your payment has been successfully completed.</p><p><a href="http://localhost:3000/login">Click here</a> to proceed with your account setup.</p><br><p>Your email: ${email}<br>Password: ${password}<br><p>Thank you!</p>`,
  };

  await sgMail.send(msg);
};

module.exports = {
  sendVerificationEmail,
};
