'use client';

import React, { useState, useEffect, useRef } from 'react';

interface LogLine {
  text: string;
  type: 'system' | 'input' | 'output' | 'error' | 'success';
  timestamp: string;
}

export default function NeuralConsole() {
  const [lines, setLines] = useState<LogLine[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const getTimestamp = () => {
    const now = new Date();
    return now.toTimeString().split(' ')[0];
  };

  // Add line to terminal with timestamp
  const addLine = (text: string, type: LogLine['type'] = 'system') => {
    setLines((prev) => [...prev, { text, type, timestamp: getTimestamp() }]);
  };

  // Boot sequence effect
  useEffect(() => {
    const bootSequence = [
      { text: 'SYSTEM: Initializing Neural Core Connection...', type: 'system' as const },
      { text: 'SYSTEM: Syncing synaptic node configurations... Done (100%)', type: 'success' as const },
      { text: 'SYSTEM: Loading model weights (TJP-FullStack-175B)... Success', type: 'success' as const },
      { text: 'SYSTEM: Primary objectives: Design, Development, Scale.', type: 'system' as const },
      { text: 'SYSTEM: Talha Jubaer Prantor Portfolio Kernel online. Type "help" or select a query below.', type: 'output' as const },
    ];

    bootSequence.forEach((line, index) => {
      setTimeout(() => {
        setLines((prev) => [...prev, { ...line, timestamp: getTimestamp() }]);
      }, index * 400);
    });

    // Background operations logging simulator
    const logSimulator = setInterval(() => {
      const logs = [
        'LOG: Validation Loss optimized to 0.0213',
        'LOG: Active synaptic paths updated',
        'LOG: Telemetry connection verified: Latency 14ms',
        'LOG: Memory compression sweep completed',
      ];
      const randomLog = logs[Math.floor(Math.random() * logs.length)];
      setLines((prev) => [...prev, { text: randomLog, type: 'system', timestamp: getTimestamp() }]);
    }, 18000);

    return () => clearInterval(logSimulator);
  }, []);

  // Auto-scroll on logs addition (only scroll the container itself, not the window)
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  // Execute terminal commands
  const executeCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    addLine(`$ ${cmd}`, 'input');

    if (cleanCmd === '') return;

    setIsTyping(true);

    setTimeout(() => {
      switch (cleanCmd) {
        case 'help':
          addLine('Available commands:', 'system');
          addLine('  about    - Model characteristics & developer summary', 'output');
          addLine('  skills   - Activated tech stack hubs', 'output');
          addLine('  projects - Active web application endpoints', 'output');
          addLine('  contact  - Secure mail routing channel', 'output');
          addLine('  clear    - Flush terminal console buffer', 'output');
          break;
        case 'about':
        case '/about':
          addLine('NAME: Talha Jubaer Prantor', 'success');
          addLine('ROLE: Full-Stack Developer specializing in React, Next.js, TS, and Node.', 'output');
          addLine('BIOGRAPHY: Over 5 years of experience building high-performance applications. Engineered to optimize render cycles, streamline API integration, and design responsive user spaces.', 'output');
          break;
        case 'skills':
        case '/skills':
          addLine('Activated Synaptic Clusters (Skills):', 'system');
          addLine('  - Frontend Layer: React, TypeScript, Tailwind CSS, Next.js, HTML/CSS', 'output');
          addLine('  - Backend Layer: Node.js, Express, PostgreSQL, MongoDB, REST APIs', 'output');
          addLine('  - Operations/Tools: Git, GitHub, Docker, CI/CD, Figma', 'output');
          break;
        case 'projects':
        case '/projects':
          addLine('Active Model Outputs (Projects):', 'system');
          addLine('  1. E-Commerce Platform - React, Node, PostgreSQL (Status: ONLINE)', 'output');
          addLine('  2. Task Management App - Next.js, TS, MongoDB (Status: ONLINE)', 'output');
          addLine('  3. Analytics Dashboard - React, D3.js, Node.js (Status: STANDBY)', 'output');
          addLine('Type the project name or scroll to the Projects module for active sandboxes.', 'output');
          break;
        case 'contact':
        case '/contact':
          addLine('Secure communication pipeline initialized.', 'success');
          addLine('Email Address: hello@example.com', 'output');
          addLine('Status: Channel listening. Send email to initiate handshake.', 'output');
          break;
        case 'clear':
        case '/clear':
          setLines([]);
          break;
        default:
          addLine(`Command not recognized: "${cmd}". Type "help" for available commands.`, 'error');
          break;
      }
      setIsTyping(false);
    }, 45000 / 1000); // 450ms simulated network delay
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue) return;
    executeCommand(inputValue);
    setInputValue('');
  };

  const handleChipClick = (cmd: string) => {
    if (isTyping) return;
    executeCommand(cmd);
  };

  return (
    <div className="w-full bg-slate-950/75 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 font-mono text-xs flex flex-col h-[350px] shadow-2xl relative">
      {/* Top Header Controls */}
      <div className="flex items-center justify-between border-b border-slate-800/60 pb-3 mb-4">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
          <span className="text-[10px] text-slate-500 ml-2">PROMPT_CONSOLE v2.0.4</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span className="text-[9px] text-cyan-400/80 uppercase tracking-widest font-bold">Model Ready</span>
        </div>
      </div>

      {/* Terminal Log Area */}
      <div ref={containerRef} className="flex-1 overflow-y-auto space-y-2 mb-4 scrollbar-thin scrollbar-thumb-slate-800 pr-1">
        {lines.map((line, idx) => (
          <div key={idx} className="flex gap-2 items-start leading-relaxed">
            <span className="text-slate-600 select-none">[{line.timestamp}]</span>
            <span
              className={
                line.type === 'input'
                  ? 'text-cyan-400 font-semibold'
                  : line.type === 'error'
                  ? 'text-rose-400 font-semibold'
                  : line.type === 'success'
                  ? 'text-emerald-400 font-semibold'
                  : line.type === 'system'
                  ? 'text-slate-500 font-light italic'
                  : 'text-slate-300'
              }
            >
              {line.text}
            </span>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-2 items-center text-slate-500 italic">
            <span>[{getTimestamp()}]</span>
            <span>Inference processing...</span>
            <span className="w-1.5 h-3 bg-cyan-400 animate-pulse"></span>
          </div>
        )}
      </div>

      {/* Quick Access Chips */}
      <div className="flex flex-wrap gap-2 mb-3">
        {['help', 'about', 'skills', 'projects', 'contact', 'clear'].map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleChipClick(cmd)}
            disabled={isTyping}
            className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-slate-400 rounded-md hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-slate-900/60 disabled:opacity-50 transition-all font-mono text-[10px]"
          >
            /{cmd}
          </button>
        ))}
      </div>

      {/* Form Input Line */}
      <form onSubmit={handleSubmit} className="flex gap-2 items-center border-t border-slate-800/60 pt-3">
        <span className="text-cyan-400 font-bold select-none">{" >_ "}</span>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder='Type a command (e.g. "help", "skills")...'
          className="flex-1 bg-transparent border-none outline-none text-slate-200 placeholder-slate-600 font-mono text-xs focus:ring-0"
          disabled={isTyping}
        />
      </form>
    </div>
  );
}
