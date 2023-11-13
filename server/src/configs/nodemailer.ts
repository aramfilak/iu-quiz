const nodemailerConfig = {
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.IU_QUIZ_EMAIL,
    pass: process.env.IU_QUIZ_EMAIL_PASS
  },
  tls: {
    // Do not fail on invalid certs
    rejectUnauthorized: false
  }
};

export { nodemailerConfig };
