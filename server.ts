import express from "express";
import { createServer as createViteServer } from "vite";
import { apiRoutes } from "./server/routes";
import { initDb } from "./server/db";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Inisialisasi Database (Membuat tabel jika belum ada)
  initDb();

  // Middleware untuk membaca data JSON dari request body
  app.use(express.json());

  // Mendaftarkan semua route API (contoh: /api/projects)
  app.use("/api", apiRoutes);

  // Konfigurasi Vite untuk mode development (Frontend)
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa", // Single Page Application
    });
    app.use(vite.middlewares);
  } else {
    // Menyajikan file statis di mode production
    app.use(express.static("dist"));

    // Catch-all route for SPA (Single Page Application)
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }

  // Menjalankan server pada port 3000
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

startServer();
