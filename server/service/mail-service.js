const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    })
  }

  async sendActivationEmail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to,
      subject: 'Account activation' + process.env.API_URL,
      html: `
        <div>
          <h1>Follow the link to activate your account:</h1>
          <a href="${link}">${link}</a>
        </div>
      `
    })
  }
}

module.exports = new MailService();