import { Pool } from 'pg';
import nodemailer from 'nodemailer';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Nodemailer transporter (Gmail SMTP)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Auto-create the contacts table if it doesn't exist
async function ensureTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS contacts (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);
}

// Send confirmation email to the person who submitted the form
async function sendConfirmationEmail(name, email) {
  const mailOptions = {
    from: `"Tayyab Khan" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: 'Thank you for contacting Tayyab Khan',
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f0f1a; border-radius: 12px; overflow: hidden; border: 1px solid #1a1a2e;">
        <div style="background: linear-gradient(135deg, #00d4ff 0%, #0f0f1a 100%); padding: 30px 24px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Tayyab Khan</h1>
          <p style="color: rgba(255,255,255,0.7); margin: 6px 0 0; font-size: 14px;">Full Stack Developer</p>
        </div>
        <div style="padding: 32px 24px; color: #e0e0e0; line-height: 1.7;">
          <p style="margin: 0 0 16px;">Hi <strong style="color: #00d4ff;">${name}</strong>,</p>
          <p style="margin: 0 0 16px;">Thank you for reaching out! I have received your message and will respond within <strong>24 hours</strong>.</p>
          <p style="margin: 0 0 16px;">In the meantime, feel free to check out my work:</p>
          <div style="text-align: center; margin: 24px 0;">
            <a href="https://github.com/tayyab890-ops" style="display: inline-block; background: #00d4ff; color: #0f0f1a; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px;">View My Projects</a>
          </div>
          <p style="margin: 0; color: rgba(224,224,224,0.6); font-size: 13px;">Best regards,<br/><strong style="color: #00d4ff;">Tayyab Khan</strong></p>
        </div>
        <div style="background: #1a1a2e; padding: 16px 24px; text-align: center; font-size: 12px; color: rgba(224,224,224,0.4);">
          &copy; ${new Date().getFullYear()} Tayyab Khan &bull; Full Stack Developer
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

// Send notification email to Tayyab about the new message
async function sendNotificationEmail(name, email, message) {
  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.SMTP_EMAIL}>`,
    to: process.env.SMTP_EMAIL,
    subject: `New Contact: ${name}`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f0f1a; border-radius: 12px; overflow: hidden; border: 1px solid #1a1a2e;">
        <div style="background: #00d4ff; padding: 20px 24px;">
          <h2 style="color: #0f0f1a; margin: 0;">New Contact Form Submission</h2>
        </div>
        <div style="padding: 24px; color: #e0e0e0; line-height: 1.7;">
          <p><strong style="color: #00d4ff;">Name:</strong> ${name}</p>
          <p><strong style="color: #00d4ff;">Email:</strong> <a href="mailto:${email}" style="color: #00d4ff;">${email}</a></p>
          <p><strong style="color: #00d4ff;">Message:</strong></p>
          <div style="background: #1a1a2e; padding: 16px; border-radius: 8px; border-left: 3px solid #00d4ff;">${message}</div>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // 1. Save to database
    await ensureTable();
    await pool.query(
      'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3)',
      [name, email, message]
    );

    // 2. Send confirmation email to the visitor
    try {
      await sendConfirmationEmail(name, email);
    } catch (emailErr) {
      console.error('Confirmation email failed:', emailErr);
      // Don't fail the whole request if email fails
    }

    // 3. Notify Tayyab about the new message
    try {
      await sendNotificationEmail(name, email, message);
    } catch (notifyErr) {
      console.error('Notification email failed:', notifyErr);
    }

    return res.status(200).json({ success: true, message: 'Message sent successfully! Check your email for confirmation.' });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Failed to save message. Please try again later.' });
  }
}
