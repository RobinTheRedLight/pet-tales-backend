import nodemailer from 'nodemailer';
import config from '../config';

interface EmailOptions {
  email: string;
  subject: string;
  message: string;
}

export const sendEmail = async (options: EmailOptions) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: config.email_host,
    port: config.email_port,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.email_user,
      pass: config.email_pass,
    },
  });

  const mailOptions = {
    from: `"Pet Care Tips & Stories" <${config.email_user}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};
