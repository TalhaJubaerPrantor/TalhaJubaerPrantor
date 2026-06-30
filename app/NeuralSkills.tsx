'use client';

import { useState } from 'react';

interface SkillNode {
  id: string;
  name: string;
  layer: 'input' | 'hidden' | 'output';
  x: number;
  y: number;
  activation: number; // proficiency
  func: string; // activation function
  weight: string; // experience level
  description: string;
}

interface Connection {
  from: string;
  to: string;
}

export default function NeuralSkills() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const nodes: SkillNode[] = [
    // Input Layer (Frontend)
    { id: 'react', name: 'React', layer: 'input', x: 120, y: 50, activation: 95, func: 'ReLU', weight: '+4.5 yr', description: 'Constructs dynamic, state-driven UI structures with reactive virtual DOM trees.' },
    { id: 'nextjs', name: 'Next.js', layer: 'input', x: 120, y: 130, activation: 92, func: 'Swish', weight: '+3.8 yr', description: 'Handles server-side rendering, routing optimization, and static generation nodes.' },
    { id: 'typescript', name: 'TypeScript', layer: 'input', x: 120, y: 210, activation: 90, func: 'GELU', weight: '+4.0 yr', description: 'Enforces compile-time static typing schemas across full-stack applications.' },
    { id: 'tailwind', name: 'Tailwind CSS', layer: 'input', x: 120, y: 290, activation: 95, func: 'LeakyReLU', weight: '+4.2 yr', description: 'Applies responsive styling pipelines using an optimized atomic class compiler.' },
    { id: 'htmlcss', name: 'HTML5 / CSS3', layer: 'input', x: 120, y: 370, activation: 98, func: 'Identity', weight: '+5.0 yr', description: 'Builds semantic document standards and layouts for maximum accessibility.' },

    // Hidden Layer (Backend)
    { id: 'nodejs', name: 'Node.js', layer: 'hidden', x: 400, y: 50, activation: 88, func: 'Sigmoid', weight: '+4.3 yr', description: 'Runs scalable asynchronous server loops and coordinates system streams.' },
    { id: 'express', name: 'Express', layer: 'hidden', x: 400, y: 130, activation: 90, func: 'Tanh', weight: '+4.1 yr', description: 'Structures client routing paths and modular middleware endpoint layers.' },
    { id: 'postgres', name: 'PostgreSQL', layer: 'hidden', x: 400, y: 210, activation: 85, func: 'ELU', weight: '+3.5 yr', description: 'Manages relational databases, complex query execution and indexing schemes.' },
    { id: 'mongodb', name: 'MongoDB', layer: 'hidden', x: 400, y: 290, activation: 82, func: 'SELU', weight: '+3.2 yr', description: 'Stores non-structured document schemas for rapid object serializations.' },
    { id: 'restapi', name: 'REST APIs', layer: 'hidden', x: 400, y: 370, activation: 90, func: 'Softplus', weight: '+4.4 yr', description: 'Configures secure stateless HTTP request-response data distribution payloads.' },

    // Output Layer (Operations / Tools)
    { id: 'git', name: 'Git / GitHub', layer: 'output', x: 680, y: 80, activation: 92, func: 'Softmax', weight: '+4.8 yr', description: 'Manages multi-branch development tracks and git repository version control.' },
    { id: 'docker', name: 'Docker', layer: 'output', x: 680, y: 180, activation: 80, func: 'HardSigmoid', weight: '+2.5 yr', description: 'Containers application spaces into portable, isolated execution systems.' },
    { id: 'cicd', name: 'CI / CD', layer: 'output', x: 680, y: 280, activation: 78, func: 'Step', weight: '+2.2 yr', description: 'Automates testing sweeps and continuous integration integration builds.' },
    { id: 'figma', name: 'Figma', layer: 'output', x: 680, y: 370, activation: 85, func: 'Linear', weight: '+3.6 yr', description: 'Translates high-fidelity designs and user workflows into styling parameters.' },
  ];

  const connections: Connection[] = [
    // Frontend -> Backend
    { from: 'react', to: 'nodejs' },
    { from: 'react', to: 'express' },
    { from: 'react', to: 'mongodb' },
    { from: 'nextjs', to: 'nodejs' },
    { from: 'nextjs', to: 'postgres' },
    { from: 'nextjs', to: 'restapi' },
    { from: 'typescript', to: 'nodejs' },
    { from: 'typescript', to: 'express' },
    { from: 'typescript', to: 'postgres' },
    { from: 'typescript', to: 'mongodb' },
    { from: 'typescript', to: 'restapi' },
    { from: 'tailwind', to: 'express' },
    { from: 'tailwind', to: 'restapi' },
    { from: 'htmlcss', to: 'nodejs' },

    // Backend -> Operations
    { from: 'nodejs', to: 'git' },
    { from: 'nodejs', to: 'docker' },
    { from: 'nodejs', to: 'cicd' },
    { from: 'express', to: 'git' },
    { from: 'express', to: 'figma' },
    { from: 'postgres', to: 'docker' },
    { from: 'postgres', to: 'cicd' },
    { from: 'mongodb', to: 'docker' },
    { from: 'restapi', to: 'git' },
    { from: 'restapi', to: 'cicd' },
  ];

  // Check connection highlighting logic
  const isConnectionActive = (conn: Connection) => {
    if (!hoveredNode) return false;
    // Node is hovered and is the source
    if (conn.from === hoveredNode) return true;
    // Node is hovered and is the target
    if (conn.to === hoveredNode) return true;

    // Indirect highlight: if hovered node connects to the source or target
    // Highlight connection from A -> B if hovered is A or B
    return false;
  };

  const isNodeHighlighted = (nodeId: string) => {
    if (!hoveredNode) return false;
    if (nodeId === hoveredNode) return true;
    
    // Check if there is a connection between the hovered node and this node
    return connections.some(
      (c) => (c.from === hoveredNode && c.to === nodeId) || (c.to === hoveredNode && c.from === nodeId)
    );
  };

  // Find currently selected node details
  const activeNodeDetails = nodes.find((n) => n.id === (hoveredNode || 'react'));

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
      {/* SVG Graph Visualizer */}
      <div className="lg:col-span-2 bg-slate-950/40 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-center relative overflow-hidden shadow-xl min-h-[350px]">
        {/* Graph Legend */}
        <div className="flex gap-4 mb-4 text-[10px] font-mono text-slate-500 justify-between flex-wrap">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span> Input Layer
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-purple-400"></span> Hidden Layer
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Output Layer
            </span>
          </div>
          <span className="text-slate-600 hidden sm:inline">Synapse Graph: Hover nodes to query weights</span>
        </div>

        {/* Neural Network SVG */}
        <div className="relative w-full aspect-[800/420]">
          <svg
            viewBox="0 0 800 420"
            className="w-full h-full select-none"
          >
            {/* Draw connections first (so nodes stack on top) */}
            {connections.map((conn, idx) => {
              const fromNode = nodes.find((n) => n.id === conn.from);
              const toNode = nodes.find((n) => n.id === conn.to);
              if (!fromNode || !toNode) return null;

              const active = isConnectionActive(conn);

              return (
                <g key={idx}>
                  {/* Outer glowing path when active */}
                  {active && (
                    <line
                      x1={fromNode.x}
                      y1={fromNode.y}
                      x2={toNode.x}
                      y2={toNode.y}
                      stroke={fromNode.layer === 'input' ? '#22d3ee' : '#a855f7'}
                      strokeWidth="3.5"
                      strokeOpacity="0.4"
                      className="transition-all duration-300"
                    />
                  )}
                  {/* Base path line */}
                  <line
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke={active ? (fromNode.layer === 'input' ? '#22d3ee' : '#c084fc') : '#334155'}
                    strokeWidth={active ? '1.8' : '0.8'}
                    strokeOpacity={active ? '0.9' : '0.25'}
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}

            {/* Draw nodes */}
            {nodes.map((node) => {
              const isHovered = hoveredNode === node.id;
              const isHighlighted = isNodeHighlighted(node.id);

              let nodeColor = '#38bdf8'; // input
              if (node.layer === 'hidden') nodeColor = '#c084fc'; // hidden
              if (node.layer === 'output') nodeColor = '#34d399'; // output

              return (
                <g
                  key={node.id}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {/* Outer glowing hover aura ring */}
                  {(isHovered || isHighlighted) && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isHovered ? 20 : 15}
                      fill="none"
                      stroke={nodeColor}
                      strokeWidth="2"
                      strokeOpacity={isHovered ? 0.6 : 0.3}
                      className="transition-all duration-300 animate-pulse"
                    />
                  )}
                  
                  {/* Core node circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isHovered ? 9 : 6}
                    fill="#0f172a"
                    stroke={nodeColor}
                    strokeWidth={isHovered ? 3.5 : 2}
                    className="transition-all duration-300"
                  />

                  {/* Node Label Text */}
                  <text
                    x={node.layer === 'output' ? node.x + 14 : node.x - 14}
                    y={node.y + 4}
                    textAnchor={node.layer === 'output' ? 'start' : 'end'}
                    fill={isHovered ? '#ffffff' : isHighlighted ? '#cbd5e1' : '#94a3b8'}
                    fontSize={isHovered ? '11.5px' : '10.5px'}
                    fontFamily="JetBrains Mono, monospace"
                    fontWeight={isHovered ? 'bold' : 'normal'}
                    className="transition-all duration-300"
                  >
                    {node.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Node Details Inspection Console */}
      <div className="bg-slate-950/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 font-mono flex flex-col justify-between shadow-xl relative group">
        {/* Grid backdrops */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0)_97%,rgba(168,85,247,0.03)_97%)] bg-[size:100%_4px] pointer-events-none"></div>

        <div>
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest">Synapse Inspector</span>
            <span className="text-[9px] text-slate-500 uppercase">Status: Connected</span>
          </div>

          {activeNodeDetails ? (
            <div className="space-y-4">
              {/* Skill Name & Cluster */}
              <div>
                <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      activeNodeDetails.layer === 'input'
                        ? 'bg-cyan-400'
                        : activeNodeDetails.layer === 'hidden'
                        ? 'bg-purple-400'
                        : 'bg-emerald-400'
                    }`}
                  ></span>
                  {activeNodeDetails.name}
                </h3>
                <span className="text-[9px] text-slate-500 uppercase tracking-widest mt-1 block">
                  Cluster: Layer.{activeNodeDetails.layer}
                </span>
              </div>

              {/* Activation Level Bar */}
              <div>
                <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                  <span>ACTIVATION STRENGTH</span>
                  <span className="text-cyan-400 font-bold">{activeNodeDetails.activation}%</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full transition-all duration-500 ${
                      activeNodeDetails.layer === 'input'
                        ? 'bg-cyan-400'
                        : activeNodeDetails.layer === 'hidden'
                        ? 'bg-purple-400'
                        : 'bg-emerald-400'
                    }`}
                    style={{ width: `${activeNodeDetails.activation}%` }}
                  ></div>
                </div>
              </div>

              {/* Network Parameters */}
              <div className="grid grid-cols-2 gap-3 text-xs border-t border-b border-slate-800/80 py-3">
                <div>
                  <span className="text-[9px] text-slate-500 block">ACTIVATION FUNCTION</span>
                  <span className="font-semibold text-slate-200 text-[11px]">
                    f(x) = {activeNodeDetails.func}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 block">WEIGHT VALUE (BIAS)</span>
                  <span className="font-semibold text-slate-200 text-[11px]">
                    {activeNodeDetails.weight}
                  </span>
                </div>
              </div>

              {/* Functional description */}
              <div>
                <span className="text-[9px] text-slate-500 block mb-1">FUNCTIONAL PIPELINE ROLE</span>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  {activeNodeDetails.description}
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-500 text-xs italic">
              Hover nodes in synaptic layers to parse vector metrics.
            </div>
          )}
        </div>

        {/* Small warning disclaimer decoration */}
        <div className="text-[9px] text-slate-600 mt-6 leading-tight border-t border-slate-800/50 pt-3">
          MATRIX_DIM: [14 x 5 x 4] | activation_threshold: 0.50 | validation_confidence: HIGH
        </div>
      </div>
    </div>
  );
}
