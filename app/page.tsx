'use client';

import NeuralNetworkBg from './NeuralNetworkBg';

export default function Home() {
  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  const skillCategories = [
    {
      category: "Frontend",
      skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "HTML/CSS", "Responsive Design"],
    },
    {
      category: "Backend",
      skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs", "Authentication"],
    },
    {
      category: "Tools",
      skills: ["Git", "GitHub", "VS Code", "Figma", "Docker", "CI/CD"],
    },
  ];

  const experiences = [
    {
      title: "Senior Developer",
      company: "Tech Company",
      period: "2023 - Present",
      description: "Building scalable web applications and leading development initiatives.",
    },
    {
      title: "Full Stack Developer",
      company: "Digital Agency",
      period: "2021 - 2023",
      description: "Developed responsive websites and web applications for various clients.",
    },
  ];

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with real-time inventory management",
      tech: ["React", "Node.js", "PostgreSQL"],
      link: "#",
    },
    {
      title: "Task Management App",
      description: "Collaborative task management tool with real-time updates",
      tech: ["Next.js", "TypeScript", "MongoDB"],
      link: "#",
    },
    {
      title: "Analytics Dashboard",
      description: "Data visualization dashboard for business analytics and reporting",
      tech: ["React", "D3.js", "Node.js"],
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-950 to-black text-slate-100 relative">
      <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 1, pointerEvents: 'none' }}></div>
      <NeuralNetworkBg />
      
      {/* Content wrapper with proper z-index */}
      <div className="relative z-10">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-center">
            <ul className="flex justify-center gap-8 flex-wrap items-center">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-28 pb-20 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="w-full">
              {/* Available Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-emerald-500/10 border border-emerald-500/30 rounded-full backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs font-medium text-emerald-300">Available for work!</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-6 leading-tight">
                Hi I'm a Full-Stack Developer building web solutions and solving real-world problems.
              </h1>

              {/* Subtitle */}
              <p className="text-lg text-slate-400 mb-10 leading-relaxed">
                A passionate web developer based in your location. I specialize in building modern web applications with React, Next.js, and TypeScript. Dedicated to writing clean code and creating excellent user experiences.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-12">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 rounded-full font-semibold transition-all duration-200 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-400/70 hover:scale-105"
                >
                  Get in touch
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-slate-600 text-slate-300 rounded-full font-semibold hover:border-cyan-400 hover:text-cyan-300 transition-all duration-200"
                >
                  Download Resume
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                <a
                  href="#"
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 hover:bg-cyan-500/20 border border-slate-700 hover:border-cyan-500 transition-all duration-200"
                  title="LinkedIn"
                >
                  <svg className="w-5 h-5 text-slate-300 hover:text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.469v6.766z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 hover:bg-emerald-500/20 border border-slate-700 hover:border-emerald-500 transition-all duration-200"
                  title="GitHub"
                >
                  <svg className="w-5 h-5 text-slate-300 hover:text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="mailto:hello@example.com"
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 hover:bg-purple-500/20 border border-slate-700 hover:border-purple-500 transition-all duration-200"
                  title="Email"
                >
                  <svg className="w-5 h-5 text-slate-300 hover:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right - Profile Image */}
            <div className="flex justify-center lg:justify-center w-full">
              <div className="relative w-72 h-72 lg:w-80 lg:h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-emerald-500/20 to-purple-500/20 rounded-2xl shadow-2xl shadow-cyan-500/10 border border-cyan-500/30"></div>
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl">
                  <span className="text-7xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">TJ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 border-t border-slate-800 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-100 mb-12">About Me</h2>
          <div className="space-y-6 text-slate-400 text-lg leading-relaxed\">
            <p>
              I'm a passionate full-stack developer with expertise in modern web technologies. With over 5 years of experience building digital solutions, I'm dedicated to creating intuitive, performant applications that solve real-world problems.
            </p>
            <p>
              My journey in web development has taken me through startups and established tech companies, where I've contributed to projects ranging from small business websites to large-scale applications. I'm proficient in React, TypeScript, Next.js, Node.js, and cloud technologies.
            </p>
            <p>
              I'm always eager to learn new technologies and best practices. I'm open to full-time opportunities and exciting projects where I can contribute my skills and grow as a developer. Let's connect and create something amazing together!
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-slate-100 mb-4">Skills</h2>
            <p className="text-lg text-slate-400\">
              Technologies and tools I work with to build innovative solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skillCategories.map((group) => (
              <div key={group.category} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800 transition-all duration-300 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-slate-100 mb-6">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block px-3 py-1.5 text-sm font-medium text-slate-300 bg-slate-700/50 rounded-full hover:bg-cyan-500/30 hover:text-cyan-300 border border-slate-600 transition-all duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6 border-t border-slate-800 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-100 mb-12">Experience</h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 mt-1.5 shadow-lg shadow-cyan-500/50"></div>
                  {index < experiences.length - 1 && (
                    <div className="w-0.5 h-20 bg-gradient-to-b from-slate-600 to-transparent mt-4"></div>
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="text-xl font-semibold text-slate-100 mb-1">{exp.title}</h3>
                  <p className="text-sm font-medium text-cyan-400 mb-2">{exp.company}</p>
                  <p className="text-sm text-slate-500 mb-3">{exp.period}</p>
                  <p className="text-slate-400">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 border-t border-slate-800 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-100 mb-12">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <a
                key={index}
                href={project.link}
                className="group block p-6 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 backdrop-blur-sm"
              >
                <h3 className="text-xl font-semibold text-slate-100 mb-3 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span key={tech} className="text-xs font-medium text-slate-300 bg-slate-700/50 border border-slate-600 px-2.5 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                <span className="text-sm font-semibold text-cyan-400 flex items-center gap-1.5 group-hover:gap-3 transition-all">
                  View Project
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 border-t border-slate-800 bg-black/20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-100 mb-6">Get in Touch</h2>
          <p className="text-lg text-slate-400 mb-10 leading-relaxed\">
            Have a project in mind or just want to chat? I'd love to hear from you. Send me an email or connect with me on social media.
          </p>

          <a
            href="mailto:hello@example.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 rounded-full font-semibold transition-all duration-200 shadow-lg shadow-emerald-500/50 hover:shadow-emerald-400/70 hover:scale-105"
          >
            Send me an email
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-800 bg-black/40 text-center text-slate-500 text-sm">
        <p>© 2026 Talha Jubaer Prantor. Built with Next.js and Tailwind CSS.</p>
      </footer>
      </div>
    </div>
  );
}
