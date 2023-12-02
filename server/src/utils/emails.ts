import nodemailer from 'nodemailer';
import { nodemailerConfig } from '../configs';

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
async function sendVerificationEmail({
  name,
  email,
  verificationToken
}: SendVerificationEmail) {
  const verificationLink = `${process.env.ORIGIN}/email-verification?emailVerificationToken=${verificationToken}&email=${email}`;

  return sendEmail({
    to: email,
    subject: 'E-Mail Bestätigung',
    html: `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h4>Hallo, ${name}</h4>
      <p>
        Bitte bestätigen Sie Ihre E-Mail, indem Sie auf den folgenden Link klicken:
        <a href="${verificationLink}" style="color: #319795; font-weight: bold;">E-Mail verifizieren</a>
      </p>
      <p>
        Bei Fragen oder Problemen kontaktieren Sie bitte unseren Support unter:
        <a href="mailto:iu.quiz.app@gmail.com" style="color: #319795; text-decoration: none;">iu.quiz.app@gmail.com</a>
      </p>
      <p>
        Mit freundlichen Grüßen,<br/>
        Ihr IU Quiz Team
      </p>
    </div>
  `
  });
}

export { sendVerificationEmail };
