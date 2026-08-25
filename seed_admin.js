const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function seedAdmin() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'restaurant',
  });

  const email = 'admin@svcaterers.com';
  const rawPassword = 'password123';
  const name = 'Super Admin';
  const role = 'super_admin';

  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(rawPassword, saltRounds);

    const [rows] = await connection.execute('SELECT * FROM mod_admin WHERE email = ?', [email]);
    
    if (rows.length > 0) {
      console.log('Admin already exists.');
    } else {
      await connection.execute(
        'INSERT INTO mod_admin (name, email, password_hash, role, is_active) VALUES (?, ?, ?, ?, ?)',
        [name, email, passwordHash, role, true]
      );
      console.log(`Admin seeded successfully!\nEmail: ${email}\nPassword: ${rawPassword}`);
    }
  } catch (error) {
    console.error('Error seeding admin:', error);
  } finally {
    await connection.end();
  }
}

seedAdmin();
