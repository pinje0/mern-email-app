import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html?: string
): Promise<boolean> => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || '"MERN Email App" <noreply@example.com>',
      to,
      subject,
      text,
      html: html || text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

export const generateEmailTemplate = (description: string): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Hi Salam kenal</h2>
      <p style="font-size: 16px; line-height: 1.6; color: #555;">
        ${description}
      </p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="font-size: 12px; color: #999;">
        This email was sent via MERN Email App
      </p>
    </div>
  `;
};

export default { sendEmail, generateEmailTemplate };
