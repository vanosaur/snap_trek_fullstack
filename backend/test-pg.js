
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Client } = pg;
const client = new Client({
  connectionString: process.env.DATABASE_URL
});

async function main() {
  console.log('Attempting raw PG connection...');
  try {
    await client.connect();
    console.log('✅ Raw PG connection successful!');
    const res = await client.query('SELECT NOW()');
    console.log('Database time:', res.rows[0]);
    await client.end();
  } catch (err) {
    console.error('❌ Raw PG connection failed:', err);
  }
}
main();

