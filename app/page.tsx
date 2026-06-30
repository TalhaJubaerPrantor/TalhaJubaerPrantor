'use client';

import { useState } from 'react';
import NeuralNetworkBg from './NeuralNetworkBg';
import DashboardTelemetry from './DashboardTelemetry';
import NeuralConsole from './NeuralConsole';
import NeuralSkills from './NeuralSkills';
import ModelDeployments from './ModelDeployments';

export default function Home() {
  const [formData, setFormData] = useState({ email: '', subject: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    
    setIsSending(true);
    
    // Construct mailto link to pre-populate client mail client
    const emailTo = "hello@example.com";
    const subject = encodeURIComponent(formData.subject || "Portfolio Contact Handshake");
    const body = encodeURIComponent(`From: ${formData.email}\n\nMessage:\n${formData.message}`);
    const mailtoUrl = `mailto:${emailTo}?subject=${subject}&body=${body}`;

    // Simulate signal transmission
    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);
      setFormData({ email: '', subject: '', message: '' });
      
      // Redirect to trigger local email client
      window.location.href = mailtoUrl;

      setTimeout(() => setSentSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative selection:bg-cyan-500/30 selection:text-cyan-300">
      {/* Dynamic background canvas overlay */}
      <NeuralNetworkBg />
      
      {/* Content wrapper with proper z-index */}
      <div className="relative z-10">
        
        {/* Fixed Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-950/70 backdrop-blur-md border-b border-slate-900">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <a href="#home" className="text-sm font-mono font-bold tracking-widest text-cyan-400">
                TJP_CORE_KERN
              </a>
              <ul className="flex gap-6 md:gap-8 flex-wrap items-center">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-xs font-mono font-semibold tracking-wider text-slate-400 hover:text-cyan-400 transition-colors duration-200"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content Layout */}
        <main className="max-w-6xl mx-auto px-6 pt-24 pb-20 space-y-24">
          
          {/* HERO SECTION */}
          <section id="home" className="pt-8 pb-10">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
              
              {/* Left Content Column */}
              <div className="lg:col-span-3 space-y-6">
                {/* Available status Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/25 rounded-md backdrop-blur-sm font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                    HANDSHAKE_READY: Available for Work
                  </span>
                </div>

                {/* Main Name Heading */}
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                  Hi, I'm Talha Jubaer Prantor. A Full-Stack Developer specializing in full-stack development and machine learning.
                </h1>

                {/* Bio Description */}
                <p className="text-base text-slate-400 leading-relaxed font-light">
                  Optimized for designing responsive frontend frameworks and coding scalable server-side systems. Dedicated to writing clean compile-ready modules and training on cutting-edge engineering standards.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 font-mono">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-450 text-slate-950 font-bold rounded-lg transition-all text-xs hover:shadow-lg hover:shadow-cyan-500/15"
                  >
                    Initiate Handshake
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-800 text-slate-350 hover:text-cyan-400 hover:border-cyan-500/40 rounded-lg transition-all text-xs bg-slate-900/40 hover:bg-slate-900/80"
                  >
                    Download Resume
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </a>
                </div>

                {/* Social Channels */}
                <div className="flex gap-3 pt-2">
                  {[
                    { title: 'LinkedIn', icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.469v6.766z' },
                    { title: 'GitHub', icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' }
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-400 transition-all duration-200"
                      title={social.title}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d={social.icon} />
                      </svg>
                    </a>
                  ))}
                  <a
                    href="mailto:hello@example.com"
                    className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-slate-900 border border-slate-800 hover:border-purple-500/40 text-slate-400 hover:text-purple-450 transition-all duration-200"
                    title="Email"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Right Shell Terminal Column */}
              <div className="lg:col-span-2">
                <NeuralConsole />
              </div>
            </div>
          </section>

          {/* TELEMETRY HUD BAR */}
          <div className="pt-2">
            <DashboardTelemetry />
          </div>

          {/* ABOUT ME SECTION */}
          <section id="about" className="scroll-mt-24">
            <div className="mb-12">
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest font-mono block mb-1">
                About_Model_Card
              </span>
              <h2 className="text-4xl font-bold text-slate-100">About Me</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch font-mono">
              {/* Description Paragraphs */}
              <div className="md:col-span-2 space-y-6 text-slate-450 text-sm leading-relaxed font-sans font-light bg-slate-950/40 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-slate-800/80">
                <p>
                  I'm a full-stack engineer focused on constructing intuitive and scalable digital solutions. With over 5 years of training across startups and established software teams, my approach combines architectural precision with elegant user layouts.
                </p>
                <p>
                  My current focus lies in designing low-latency, modular systems using Next.js server actions, TypeScript abstractions, Node.js routers, and containerized deployment pipelines.
                </p>
                <p>
                  I enjoy solving optimization problems, creating custom visualizations, and contributing clean, reusable codebases to scalable software architectures. Let's design something robust together.
                </p>
              </div>

              {/* Specs Model Card Table */}
              <div className="bg-slate-950/60 backdrop-blur-md p-6 rounded-2xl border border-slate-800/80 shadow-lg flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0)_97%,rgba(34,211,238,0.02)_97%)] bg-[size:100%_4px] pointer-events-none"></div>

                <div>
                  <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-4 border-b border-slate-800/80 pb-2">
                    Model System Info
                  </h3>
                  <div className="space-y-3 text-[11px]">
                    <div className="flex justify-between border-b border-slate-900 pb-1.5">
                      <span className="text-slate-500">DEVELOPER</span>
                      <span className="text-slate-200">Talha J. Prantor</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-900 pb-1.5">
                      <span className="text-slate-500">STABILITY</span>
                      <span className="text-emerald-400">99.98% uptime</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-900 pb-1.5">
                      <span className="text-slate-500">SPECIALIZATION</span>
                      <span className="text-slate-200 text-right">Web Architectures</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-900 pb-1.5">
                      <span className="text-slate-500">REGISTRY</span>
                      <span className="text-slate-200">DHAKA, BD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">LICENSING</span>
                      <span className="text-slate-200">Open-Source</span>
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 border-t border-slate-800/80 pt-4 mt-6 leading-relaxed">
                  // Training constraints optimized. Hyperparameters synchronized.
                </div>
              </div>
            </div>
          </section>

          {/* SKILLS SECTION */}
          <section id="skills" className="scroll-mt-24">
            <div className="mb-12">
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest font-mono block mb-1">
                Synaptic_Weights
              </span>
              <h2 className="text-4xl font-bold text-slate-100">Activated Clusters</h2>
            </div>
            
            <NeuralSkills />
          </section>

          {/* EXPERIENCE & PROJECTS */}
          <ModelDeployments />

          {/* CONTACT MODULE */}
          <section id="contact" className="scroll-mt-24">
            <div className="mb-12 text-center">
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest font-mono block mb-1">
                Secure_Handshake
              </span>
              <h2 className="text-4xl font-bold text-slate-100">Initiate Communication</h2>
              <p className="text-sm text-slate-400 mt-2 max-w-[576px] mx-auto font-light leading-relaxed">
                Connect with the model core directly. Fill out the signal prompts below to transmit an automated notification packet.
              </p>
            </div>

            <div className="max-w-[576px] mx-auto bg-slate-950/60 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-slate-800/80 shadow-2xl font-mono relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0)_97%,rgba(34,211,238,0.02)_97%)] bg-[size:100%_4px] pointer-events-none"></div>

              <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
                {/* Email Prompt */}
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 uppercase font-bold block">
                    {" > sender_identity (Email)*"}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter email address..."
                    className="w-full bg-slate-900 border border-slate-850 rounded-md px-3.5 py-2.5 text-slate-200 outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>

                {/* Subject Prompt */}
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 uppercase font-bold block">
                    {" > connection_subject (Subject)"}
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                    placeholder="Enter handshake topic..."
                    className="w-full bg-slate-900 border border-slate-850 rounded-md px-3.5 py-2.5 text-slate-200 outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>

                {/* Message Prompt */}
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 uppercase font-bold block">
                    {" > prompt_payload (Message)*"}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    placeholder="Provide detailed project constraints or request query parameters..."
                    className="w-full bg-slate-900 border border-slate-850 rounded-md px-3.5 py-2.5 text-slate-200 outline-none focus:border-cyan-500/50 transition-colors resize-none leading-relaxed"
                  />
                </div>

                {/* Status messages */}
                {sentSuccess && (
                  <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 text-emerald-400 rounded-md text-[11px] font-semibold text-center animate-pulse">
                    [SUCCESS] Handshake packet transmitted. Secure path established.
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-450 text-slate-950 font-bold text-xs rounded-md transition-all disabled:opacity-50 cursor-pointer hover:shadow-lg hover:shadow-cyan-500/10"
                >
                  {isSending ? 'Transmitting Signal packet...' : 'Transmit Connection Signal'}
                </button>
              </form>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="py-8 px-6 border-t border-slate-900 bg-slate-950 text-center font-mono text-[10px] text-slate-500">
          <p>© 2026 Talha Jubaer Prantor. Built with Next.js 16 and Tailwind CSS v4. Kernel v1.0.4.</p>
        </footer>
      </div>
    </div>
  );
}
