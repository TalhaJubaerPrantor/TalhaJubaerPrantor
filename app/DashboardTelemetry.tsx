'use client';

import { useState, useEffect } from 'react';

export default function DashboardTelemetry() {
  const [epoch, setEpoch] = useState(1402);
  const [loss, setLoss] = useState(0.0214);
  const [latency, setLatency] = useState(14);
  const [memory, setMemory] = useState(11.8);
  const [learningRate, setLearningRate] = useState(0.001);

  useEffect(() => {
    // Dynamic simulated training metrics
    const interval = setInterval(() => {
      // Incremental epoch
      setEpoch((prev) => prev + (Math.random() > 0.7 ? 1 : 0));
      
      // Decay loss with small fluctuations
      setLoss((prev) => {
        const nextLoss = prev - 0.00001 + (Math.random() - 0.5) * 0.0001;
        return Math.max(0.0082, parseFloat(nextLoss.toFixed(6)));
      });

      // Fluctuating latency
      setLatency((prev) => {
        const delta = Math.floor((Math.random() - 0.5) * 4);
        const nextLatency = prev + delta;
        return Math.max(8, Math.min(22, nextLatency));
      });

      // Memory oscillation
      setMemory((prev) => {
        const nextMem = prev + (Math.random() - 0.5) * 0.15;
        return Math.max(10.5, Math.min(13.2, parseFloat(nextMem.toFixed(1))));
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-slate-950/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 grid grid-cols-2 md:grid-cols-5 gap-6 text-slate-100 font-mono shadow-2xl relative overflow-hidden group">
      {/* Scanline backdrop simulation */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0)_97%,rgba(6,182,212,0.05)_97%)] bg-[size:100%_4px] pointer-events-none"></div>

      {/* Box 1: Architecture Card */}
      <div className="flex flex-col justify-between border-r border-slate-800/80 pr-4 last:border-0">
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Architecture</span>
          <h4 className="text-sm font-bold text-cyan-400">Transformer.dev</h4>
        </div>
        <div className="mt-4">
          <span className="text-xs text-slate-300">Model: TJP-Fullstack</span>
        </div>
      </div>

      {/* Box 2: Training Epoch */}
      <div className="flex flex-col justify-between border-r border-slate-800/80 pr-4 last:border-0 md:pl-2">
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Training Epoch</span>
          <h4 className="text-2xl font-semibold text-slate-100 tabular-nums">
            {epoch}
          </h4>
        </div>
        <div className="mt-4 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="text-[10px] text-emerald-400">Optimization Active</span>
        </div>
      </div>

      {/* Box 3: Loss Metric */}
      <div className="flex flex-col justify-between border-r border-slate-800/80 pr-4 last:border-0 pl-2">
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Training Loss</span>
          <h4 className="text-2xl font-semibold text-purple-400 tabular-nums">
            {loss.toFixed(5)}
          </h4>
        </div>
        <div className="mt-4 flex items-center gap-1">
          {/* Faux tiny graph */}
          <svg className="w-20 h-4 text-purple-500" viewBox="0 0 100 20" fill="none">
            <path
              d="M0 15 Q25 10 50 12 T100 2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="100" cy="2" r="2" fill="currentColor" />
          </svg>
          <span className="text-[9px] text-slate-500">Decaying</span>
        </div>
      </div>

      {/* Box 4: Inference Latency */}
      <div className="flex flex-col justify-between border-r border-slate-800/80 pr-4 last:border-0 md:pl-2">
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Inference Latency</span>
          <h4 className="text-2xl font-semibold text-emerald-400 tabular-nums">
            {latency}ms
          </h4>
        </div>
        <div className="mt-4">
          <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-400 h-full transition-all duration-500" 
              style={{ width: `${(latency / 22) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Box 5: VRAM / System Memory */}
      <div className="flex flex-col justify-between col-span-2 md:col-span-1 pl-2">
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">GPU Memory (VRAM)</span>
          <h4 className="text-lg font-semibold text-cyan-400 tabular-nums">
            {memory} / 16.0 GB
          </h4>
        </div>
        <div className="mt-4">
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-700" 
              style={{ width: `${(memory / 16) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
