import { Code2, Database, Layout, Terminal } from 'lucide-react';

const skillCategories = [
  {
    title: 'Frontend',
    icon: <Layout className="text-blue-500" size={32} />,
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    icon: <Terminal className="text-green-500" size={32} />,
    skills: ['Node.js', 'Express', 'PHP', 'REST API'],
  },
  {
    title: 'Database',
    icon: <Database className="text-purple-500" size={32} />,
    skills: ['MySQL', 'MongoDB', 'SQLite'],
  },
  {
    title: 'Tools',
    icon: <Code2 className="text-orange-500" size={32} />,
    skills: ['Git', 'GitHub', 'VS Code', 'Postman'],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-20 bg-slate-50 dark:bg-slate-950 px-6 transition-colors duration-300">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">My Skills</h2>
          <div className="w-20 h-1.5 bg-blue-600 dark:bg-blue-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Teknologi dan alat yang saya pelajari dan gunakan untuk membangun aplikasi web.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category) => (
            <div 
              key={category.title}
              className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md dark:hover:shadow-blue-900/10 transition-all"
            >
              <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center mb-6">
                {category.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">{category.title}</h3>
              <ul className="space-y-3">
                {category.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 dark:bg-blue-500"></div>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
