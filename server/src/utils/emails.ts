import nodemailer from 'nodemailer';
import { nodemailerConfig } from '../configs';
import fs from 'fs';
import ejs from 'ejs';
import path from 'path';

interface SendEmail {
  to: string;
  subject: string;
  html: string;
}

interface SendVerificationEmail {
  email: string;
  name: string;
  verificationToken: string;
}

async function sendEmail({ to, subject, html }: SendEmail) {
  const transporter = nodemailer.createTransport(nodemailerConfig);

  return transporter.sendMail({
    from: process.env.IU_QUIZ_EMAIL,
    to,
    subject,
    html
  });
}

/**
 *
 * send verification email
 */

async function sendVerificationEmail({ name, email, verificationToken }: SendVerificationEmail) {
  const verifyEmail = `${process.env.ORIGIN}/iu-verify-email?token=${verificationToken}&email=${email}`;

  const templatePath = path.join(__dirname, '../templates/verification-email.ejs');

  const templateString = fs.readFileSync(templatePath, {
    encoding: 'utf8'
  });

  const compiledTemplate = ejs.compile(templateString);

  const htmlContent = compiledTemplate({ name, verifyEmail });

  return sendEmail({
    to: email,
    subject: 'E-Mail Bestätigung',
    html: htmlContent
  });
}

export { sendVerificationEmail };
