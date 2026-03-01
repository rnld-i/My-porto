export function About() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900 px-6 transition-colors duration-300">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">About Me</h2>
          <div className="w-20 h-1.5 bg-blue-600 dark:bg-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl overflow-hidden shadow-xl dark:shadow-blue-900/10">
            <img 
              src="https://picsum.photos/seed/workspace/800/600" 
              alt="Workspace" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
              Perjalanan Saya sebagai Developer
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
              Halo! Saya adalah siswa kelas 11 di SMK jurusan Rekayasa Perangkat Lunak. Sejak pertama kali mengenal koding, saya langsung tertarik dengan bagaimana sebuah website dibangun dari nol hingga bisa diakses oleh banyak orang.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
              Fokus utama saya saat ini adalah menjadi seorang <strong>Fullstack Developer</strong>. Saya senang merancang antarmuka pengguna yang menarik di Frontend, sekaligus membangun logika dan mengelola database di Backend.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100 dark:border-slate-800">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-xl mb-1">1+</h4>
                <p className="text-slate-500 dark:text-slate-500 text-sm">Tahun Pengalaman</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-xl mb-1">10+</h4>
                <p className="text-slate-500 dark:text-slate-500 text-sm">Project Selesai</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
