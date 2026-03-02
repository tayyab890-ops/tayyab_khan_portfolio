import { Pool } from 'pg';

const pool = new Pool({
  connectionString:
    'postgres://f1a3c04af0a7cea6b6bf486d9671622f1a899b254f00054c83535c36e216c57e:sk_aXHBW8DnwC7WxnJkZz7Ok@db.prisma.io:5432/postgres?sslmode=require',
  ssl: {
    rejectUnauthorized: false,
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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    await ensureTable();
    await pool.query(
      'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3)',
      [name, email, message]
    );
    return res.status(200).json({ success: true, message: 'Message saved successfully' });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Failed to save message. Please try again later.' });
  }
}
