import { Router } from 'express';
import { db } from './db';

export const apiRoutes = Router();

// --- API UNTUK PROJECTS ---

// Mengambil semua data project (GET /api/projects)
apiRoutes.get('/projects', (req, res) => {
  try {
    const projects = db.prepare('SELECT * FROM projects').all();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data project' });
  }
});

// Menambahkan project baru (POST /api/projects) - Untuk Admin
apiRoutes.post('/projects', (req, res) => {
  const { title, description, image, technologies, github_link, demo_link } = req.body;
  
  // Validasi data tidak boleh kosong
  if (!title || !description || !image || !technologies) {
    return res.status(400).json({ error: 'Data tidak lengkap' });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO projects (title, description, image, technologies, github_link, demo_link)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(title, description, image, technologies, github_link || '', demo_link || '');
    res.status(201).json({ id: info.lastInsertRowid, message: 'Project berhasil ditambahkan' });
  } catch (error) {
    res.status(500).json({ error: 'Gagal menambahkan project' });
  }
});

// Menghapus project berdasarkan ID (DELETE /api/projects/:id) - Untuk Admin
apiRoutes.delete('/projects/:id', (req, res) => {
  const { id } = req.params;
  try {
    const stmt = db.prepare('DELETE FROM projects WHERE id = ?');
    const info = stmt.run(id);
    if (info.changes > 0) {
      res.json({ message: 'Project berhasil dihapus' });
    } else {
      res.status(404).json({ error: 'Project tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Gagal menghapus project' });
  }
});

// --- API UNTUK CONTACT ---

// Mengirim pesan baru (POST /api/contact)
apiRoutes.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Validasi input
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Semua field harus diisi' });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO messages (name, email, message)
      VALUES (?, ?, ?)
    `);
    stmt.run(name, email, message);
    res.status(201).json({ message: 'Pesan berhasil dikirim!' });
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengirim pesan' });
  }
});

// Mengambil semua pesan (GET /api/messages) - Untuk Admin
apiRoutes.get('/messages', (req, res) => {
  try {
    const messages = db.prepare('SELECT * FROM messages ORDER BY created_at DESC').all();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil pesan' });
  }
});
