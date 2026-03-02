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
    subject: 'Thank You for Contacting Me',
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f0f1a; border-radius: 12px; overflow: hidden; border: 1px solid #1a1a2e;">
        <div style="background: linear-gradient(135deg, #00d4ff 0%, #0f0f1a 100%); padding: 40px 24px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 26px; letter-spacing: 1px;">Tayyab Khan</h1>
          <p style="color: rgba(255,255,255,0.7); margin: 8px 0 0; font-size: 14px;">Full Stack Developer &bull; Next.js &amp; PostgreSQL</p>
        </div>
        <div style="padding: 36px 28px; color: #e0e0e0; line-height: 1.8;">
          <p style="margin: 0 0 18px; font-size: 16px;">Dear <strong style="color: #00d4ff;">${name}</strong>,</p>
          <p style="margin: 0 0 18px; font-size: 15px;">Thank you for reaching out. I truly appreciate you taking the time to contact me and I would be happy to assist you in any way I can.</p>
          <p style="margin: 0 0 18px; font-size: 15px;">I have received your message and will carefully review it. You can expect a personalized response from me within <strong style="color: #00d4ff;">24 hours</strong>. I take every inquiry seriously and look forward to understanding how I can help you achieve your goals.</p>
          <p style="margin: 0 0 18px; font-size: 15px;">Whether you're looking for a <strong>Full Stack Web Application</strong>, a <strong>modern responsive portfolio</strong>, a <strong>backend API with Spring Boot</strong>, or a <strong>WordPress business website</strong> — I'm here to bring your vision to life with clean code and pixel-perfect design.</p>
          <p style="margin: 0 0 18px; font-size: 15px;">Please don't hesitate to let me know how I can help you further. In the meantime, feel free to explore my recent work:</p>
          <div style="text-align: center; margin: 28px 0;">
            <a href="https://github.com/tayyab890-ops" style="display: inline-block; background: #00d4ff; color: #0f0f1a; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px; margin: 0 6px;">View My GitHub</a>
            <a href="https://www.linkedin.com/in/tayyab-khan-47619527a" style="display: inline-block; background: transparent; color: #00d4ff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px; border: 1px solid #00d4ff; margin: 6px 6px 0;">Connect on LinkedIn</a>
          </div>
          <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 28px 0;" />
          <p style="margin: 0 0 6px; font-size: 14px; color: rgba(224,224,224,0.7);">Best regards,</p>
          <p style="margin: 0 0 4px; font-size: 16px; font-weight: 700; color: #00d4ff;">Tayyab Khan</p>
          <p style="margin: 0 0 4px; font-size: 13px; color: rgba(224,224,224,0.5);">Full Stack Developer</p>
          <p style="margin: 0 0 4px; font-size: 13px; color: rgba(224,224,224,0.5);">📞 +923448701627</p>
          <p style="margin: 0; font-size: 13px; color: rgba(224,224,224,0.5);">✉️ tayyabkhan122115@gmail.com</p>
        </div>
        <div style="background: #1a1a2e; padding: 18px 24px; text-align: center; font-size: 12px; color: rgba(224,224,224,0.35);">
          &copy; ${new Date().getFullYear()} Tayyab Khan &bull; Full Stack Developer (Next.js &amp; PostgreSQL)<br/>
          <span style="font-size: 11px;">This is an automated confirmation. You're receiving this because you submitted a message through my portfolio.</span>
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
