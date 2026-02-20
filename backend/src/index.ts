import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    connectionString:
        process.env.DATABASE_URL ||
        'postgres://test:test@db:5432/testdb',
});

async function startServer() {
    try {
        await pool.query('SELECT 1');
        console.log('✅ Banco conectado');

        app.listen(port, () => {
            console.log(`🚀 Backend rodando na porta ${port}`);
        });

    } catch (err) {
        console.error('❌ Falha ao conectar no banco', err);
        process.exit(1);
    }
}

if (process.env.NODE_ENV === 'test') {
    console.log("🧪 Rota de teste habilitada!");

    app.post('/api/testing/reset', async (req, res) => {
        try {
            await pool.query('TRUNCATE TABLE users RESTART IDENTITY CASCADE');
            await pool.query(
                'INSERT INTO users (name, email) VALUES ($1, $2)',
                ['Tester', 'test@example.com']
            );
            res.status(200).send({ message: 'Database reset successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Failed to reset database' });
        }
    });
}

app.get('/api/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Erro ao buscar usuários' });
    }
});

app.post('/reset', async (req, res) => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE
      );
    `);

    await pool.query('TRUNCATE TABLE users RESTART IDENTITY CASCADE');

    await pool.query(`
      INSERT INTO users (name, email)
      VALUES ('Tester', 'tester@email.com')
    `);

    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to reset database' });
  }
});

app.post('/api/users', async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email required' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
            [name, email]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
});

startServer();