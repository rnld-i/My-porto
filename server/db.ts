import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = path.resolve(__dirname, '../database.sqlite');

export const db = new Database(dbPath);

export function initDb() {
  // Create tables if they don't exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      image TEXT NOT NULL,
      technologies TEXT NOT NULL,
      github_link TEXT,
      demo_link TEXT
    );

    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Insert sample data if projects table is empty
  const count = db.prepare('SELECT COUNT(*) as count FROM projects').get() as { count: number };
  if (count.count === 0) {
    const insertProject = db.prepare(`
      INSERT INTO projects (title, description, image, technologies, github_link, demo_link)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    insertProject.run(
      'E-Commerce Sederhana',
      'Aplikasi toko online sederhana dengan fitur keranjang belanja dan checkout.',
      'https://picsum.photos/seed/ecommerce/600/400',
      'HTML, CSS, JS, PHP, MySQL',
      'https://github.com',
      'https://demo.com'
    );

    insertProject.run(
      'Aplikasi To-Do List',
      'Aplikasi pencatat tugas harian dengan fitur tambah, hapus, dan tandai selesai.',
      'https://picsum.photos/seed/todo/600/400',
      'React, Node.js, Express, MongoDB',
      'https://github.com',
      'https://demo.com'
    );

    insertProject.run(
      'Sistem Informasi Siswa',
      'Sistem untuk mengelola data siswa, nilai, dan absensi.',
      'https://picsum.photos/seed/sis/600/400',
      'Vue.js, Laravel, MySQL',
      'https://github.com',
      ''
    );
  }
}
