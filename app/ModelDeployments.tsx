'use client';

import { useState } from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  latency: number;
  accuracy: number;
  version: string;
  status: 'ONLINE' | 'ACTIVE' | 'STANDBY';
  mockInput: string;
  mockOutput: any;
}

interface Experience {
  epoch: string;
  period: string;
  role: string;
  company: string;
  lossRange: string;
  logs: string[];
}

export default function ModelDeployments() {
  const [activeSandbox, setActiveSandbox] = useState<string | null>(null);
  const [runningInference, setRunningInference] = useState<string | null>(null);
  const [sandboxOutputs, setSandboxOutputs] = useState<Record<string, any>>({});

  const projects: Project[] = [
    {
      id: 'ecommerce',
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce system with modular payment checkpoints and synchronized cart metrics.',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Express'],
      latency: 14,
      accuracy: 99.8,
      version: 'v1.4.2',
      status: 'ONLINE',
      mockInput: JSON.stringify({ item_id: 'prod_902', quantity: 1, action: 'checkout' }, null, 2),
      mockOutput: {
        status: 'SUCCESS',
        transaction_id: 'TXN_482910389',
        latency: '14ms',
        response: {
          invoice_created: true,
          authorized_net: true,
          cart_total: 1299.99,
          stock_allocated: true,
        },
      },
    },
    {
      id: 'taskmgr',
      title: 'Task Management App',
      description: 'Collaborative task planner board featuring live WebSocket syncing and thread categorization.',
      tech: ['Next.js', 'TypeScript', 'MongoDB', 'REST APIs'],
      latency: 18,
      accuracy: 99.2,
      version: 'v2.1.0',
      status: 'ACTIVE',
      mockInput: JSON.stringify({ task_title: 'Deploy microservice', priority: 'HIGH', assignee_id: 'dev_8' }, null, 2),
      mockOutput: {
        status: 'DISPATCHED',
        task_id: 'TASK_9108',
        latency: '18ms',
        response: {
          broadcast_delivered: true,
          db_mutation: 'RESOLVED',
          slack_alert_sent: true,
          estimated_dev_hours: 4.5,
        },
      },
    },
    {
      id: 'analytics',
      title: 'Analytics Dashboard',
      description: 'Data charting dashboard parsing business operations analytics metrics with custom SVG timelines.',
      tech: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
      latency: 22,
      accuracy: 98.9,
      version: 'v0.9.4',
      status: 'STANDBY',
      mockInput: JSON.stringify({ chart_type: 'conversion_funnel', time_span: '30d', segment: 'mobile' }, null, 2),
      mockOutput: {
        status: 'COMPILED',
        compilation_time: '22ms',
        response: {
          datapoints_aggregated: 148209,
          growth_index: '+14.6%',
          error_margin: '0.012%',
          nodes_searched: 42,
        },
      },
    },
  ];

  const experiences: Experience[] = [
    {
      epoch: 'Epoch 02',
      period: '2023 - Present',
      role: 'Senior Developer',
      company: 'Tech Company',
      lossRange: 'Loss: 0.043 -> 0.008',
      logs: [
        'INIT: Loading React 19, Next.js 16 and Tailwind v4 configurations.',
        'RUN: Led full-stack development, reducing core interface bundle weights by 35%.',
        'RUN: Structured microservices on Node.js handling 15,000 requests/sec with minimal system overhead.',
        'OPTIMIZE: Integrated robust automated testing, increasing validation accuracy to 99.8%.',
      ],
    },
    {
      epoch: 'Epoch 01',
      period: '2021 - 2023',
      role: 'Full Stack Developer',
      company: 'Digital Agency',
      lossRange: 'Loss: 0.120 -> 0.043',
      logs: [
        'INIT: Initializing express backend routers and MongoDB database adapters.',
        'RUN: Developed and deployed 15+ customer-facing websites with optimized SEO setups.',
        'RUN: Formulated RESTful API endpoints for external payment systems and authentication routes.',
        'EVAL: Validation loss reduced to target threshold. Parameter optimizations completed.',
      ],
    },
  ];

  const runSandboxInference = (projId: string, output: any) => {
    setRunningInference(projId);
    setTimeout(() => {
      setSandboxOutputs((prev) => ({ ...prev, [projId]: output }));
      setRunningInference(null);
    }, 1000);
  };

  return (
    <div className="space-y-24">
      {/* PROJECTS SECTION */}
      <section id="projects" className="scroll-mt-24">
        <div className="mb-12">
          <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest font-mono block mb-1">
            Subnetwork Deployments
          </span>
          <h2 className="text-4xl font-bold text-slate-100">Featured Projects</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
          {projects.map((project) => {
            const isSandboxOpen = activeSandbox === project.id;
            const output = sandboxOutputs[project.id];

            return (
              <div
                key={project.id}
                className="bg-slate-950/50 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between shadow-xl hover:border-cyan-500/30 transition-all duration-300 relative group overflow-hidden"
              >
                {/* Visual grid backdrop */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0)_97%,rgba(34,211,238,0.02)_97%)] bg-[size:100%_4px] pointer-events-none"></div>

                <div>
                  {/* Card Header */}
                  <div className="flex justify-between items-start border-b border-slate-800/80 pb-3 mb-4">
                    <div>
                      <span className="text-[9px] text-slate-500">{project.version}</span>
                      <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                        project.status === 'ONLINE'
                          ? 'border-emerald-500/30 text-emerald-400 bg-emerald-950/20'
                          : project.status === 'ACTIVE'
                          ? 'border-cyan-500/30 text-cyan-400 bg-cyan-950/20'
                          : 'border-purple-500/30 text-purple-400 bg-purple-950/20'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  {/* Body description */}
                  <p className="text-xs text-slate-400 leading-relaxed font-sans font-light mb-6">
                    {project.description}
                  </p>

                  {/* Latency & Accuracy Telemetry */}
                  <div className="grid grid-cols-2 gap-4 text-[10px] text-slate-400 bg-slate-900/60 p-3 rounded-lg border border-slate-800/60 mb-6">
                    <div>
                      <span className="text-slate-500 block text-[9px]">LATENCY (INFERENCE)</span>
                      <span className="text-slate-200 font-semibold">{project.latency} ms</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[9px]">ACCURACY RATE</span>
                      <span className="text-slate-200 font-semibold">{project.accuracy}%</span>
                    </div>
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] text-slate-400 bg-slate-800/60 border border-slate-700/50 px-2 py-0.5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Sandbox simulator panel */}
                {isSandboxOpen && (
                  <div className="border-t border-slate-800/80 pt-4 mt-2 space-y-4">
                    <div>
                      <span className="text-[9px] text-slate-500 block mb-1">INPUT PAYLOAD</span>
                      <pre className="bg-slate-900 p-2.5 rounded text-[9.5px] text-cyan-400 overflow-x-auto leading-tight border border-slate-850">
                        {project.mockInput}
                      </pre>
                    </div>

                    <button
                      onClick={() => runSandboxInference(project.id, project.mockOutput)}
                      disabled={runningInference === project.id}
                      className="w-full py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-[10px] rounded-md transition-colors disabled:opacity-50"
                    >
                      {runningInference === project.id ? 'Running Inference...' : 'Execute Inference'}
                    </button>

                    {output && (
                      <div>
                        <span className="text-[9px] text-slate-500 block mb-1">INFERENCE RESULT</span>
                        <pre className="bg-slate-900 p-2.5 rounded text-[9.5px] text-emerald-400 overflow-x-auto leading-tight border border-slate-850 max-h-[140px] overflow-y-auto">
                          {JSON.stringify(output, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 mt-4 border-t border-slate-800/60 pt-4 text-xs font-semibold">
                  <button
                    onClick={() => setActiveSandbox(isSandboxOpen ? null : project.id)}
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer font-mono"
                  >
                    {isSandboxOpen ? 'Close Console' : 'Open Console'}
                  </button>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-slate-200 ml-auto flex items-center gap-1 font-mono"
                  >
                    View Source
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* EXPERIENCE TIMELINE SECTION */}
      <section id="experience" className="scroll-mt-24">
        <div className="mb-12">
          <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest font-mono block mb-1">
            Optimization Epochs
          </span>
          <h2 className="text-4xl font-bold text-slate-100">Experience History</h2>
        </div>

        <div className="space-y-8 font-mono">
          {experiences.map((exp, index) => (
            <div key={index} className="flex gap-4 md:gap-8 items-stretch group">
              {/* Vertical Epoch Nodes */}
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-850 flex items-center justify-center text-purple-400 font-bold text-[10px] shadow-lg shadow-purple-500/5 group-hover:border-purple-400/50 transition-colors">
                  E{index === 0 ? '02' : '01'}
                </div>
                {index < experiences.length - 1 && (
                  <div className="w-0.5 flex-1 bg-gradient-to-b from-purple-500/20 via-slate-800 to-transparent my-2"></div>
                )}
              </div>

              {/* Epoch Details Card */}
              <div className="flex-1 bg-slate-950/40 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-6 shadow-xl hover:border-purple-500/20 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0)_97%,rgba(168,85,247,0.02)_97%)] bg-[size:100%_4px] pointer-events-none"></div>

                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800/80 pb-3 mb-4 gap-2">
                  <div>
                    <span className="text-[10px] text-purple-400 font-bold">{exp.epoch} • {exp.period}</span>
                    <h3 className="text-lg font-bold text-slate-100">{exp.role}</h3>
                    <p className="text-xs text-slate-500 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 px-3 py-1 bg-slate-900 rounded-md border border-slate-850 align-self-start md:align-self-auto font-light">
                    {exp.lossRange}
                  </span>
                </div>

                {/* Compilation Logs */}
                <div className="space-y-2 bg-slate-900/60 p-4 rounded-lg border border-slate-800/60 text-[11px] leading-relaxed">
                  {exp.logs.map((log, idx) => (
                    <div key={idx} className="flex gap-2 items-start font-mono">
                      <span className="text-slate-600 select-none">
                        [{`0${idx + 1}`}]
                      </span>
                      <span className="text-slate-300 font-light">
                        {log.startsWith('INIT:') && <span className="text-purple-400 font-semibold">INIT: </span>}
                        {log.startsWith('RUN:') && <span className="text-cyan-400 font-semibold">RUN: </span>}
                        {log.startsWith('OPTIMIZE:') && <span className="text-emerald-400 font-semibold">OPTIMIZE: </span>}
                        {log.startsWith('EVAL:') && <span className="text-amber-400 font-semibold">EVAL: </span>}
                        {log.replace(/^(INIT|RUN|OPTIMIZE|EVAL): /, '')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
