'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  glowColor: string;
}

interface Pulse {
  from: number;
  to: number;
  progress: number;
  speed: number;
  generation: number;
}

const NeuralNetworkBg = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    const particles: Particle[] = [];
    const maxParticles = 90;
    const connectionDist = 160;
    const colors = ['#22d3ee', '#34d399', '#a855f7', '#38bdf8'];
    const glowColors = [
      'rgba(34, 211, 238, 0.4)',
      'rgba(52, 211, 153, 0.4)',
      'rgba(168, 85, 247, 0.4)',
      'rgba(56, 189, 248, 0.4)'
    ];

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      const colorIdx = Math.floor(Math.random() * colors.length);
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1.5,
        color: colors[colorIdx],
        glowColor: glowColors[colorIdx],
      });
    }

    let pulses: Pulse[] = [];
    const maxPulsesCount = 40; // cap to ensure smooth rendering

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    // Click triggers pulse propagation
    const handleCanvasClick = (e: MouseEvent) => {
      const clickX = e.clientX;
      const clickY = e.clientY;

      // Find closest node
      let closestIdx = -1;
      let minDistance = Infinity;

      particles.forEach((p, idx) => {
        const dx = p.x - clickX;
        const dy = p.y - clickY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = idx;
        }
      });

      if (closestIdx !== -1 && minDistance < 200) {
        triggerPulseBranch(closestIdx, 0, []);
      }
    };

    // Function to trigger branching pulses
    const triggerPulseBranch = (startNodeIdx: number, generation: number, visited: number[]) => {
      if (generation > 2 || pulses.length >= maxPulsesCount) return;

      const currentVisited = [...visited, startNodeIdx];
      const neighbors: number[] = [];

      particles.forEach((p, idx) => {
        if (idx === startNodeIdx || currentVisited.includes(idx)) return;
        const dx = particles[startNodeIdx].x - p.x;
        const dy = particles[startNodeIdx].y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDist) {
          neighbors.push(idx);
        }
      });

      // Sort by distance and pick top 2-3 neighbors to propagate to
      neighbors.sort((a, b) => {
        const dA = Math.hypot(particles[startNodeIdx].x - particles[a].x, particles[startNodeIdx].y - particles[a].y);
        const dB = Math.hypot(particles[startNodeIdx].x - particles[b].x, particles[startNodeIdx].y - particles[b].y);
        return dA - dB;
      });

      const targets = neighbors.slice(0, 2);

      targets.forEach((targetIdx) => {
        pulses.push({
          from: startNodeIdx,
          to: targetIdx,
          progress: 0,
          speed: 0.02 + Math.random() * 0.015,
          generation: generation,
        });
      });
    };

    let animationId: number;

    const animate = () => {
      // Clear with dark tech theme alpha trailing
      ctx.fillStyle = 'rgba(8, 10, 18, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;

      // Draw faint matrix grid lines
      ctx.strokeStyle = 'rgba(51, 65, 85, 0.08)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Update and draw particles
      particles.forEach((p) => {
        // Kinetic updates
        p.x += p.vx;
        p.y += p.vy;

        // Mouse gravity pull (weak but notices movement)
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const force = (180 - dist) / 3000;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        // Boundary bounce
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Keep inside canvas strictly
        p.x = Math.max(2, Math.min(canvas.width - 2, p.x));
        p.y = Math.max(2, Math.min(canvas.height - 2, p.y));
      });

      // Draw static neural synapses (connections)
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.15;
            ctx.strokeStyle = `rgba(148, 163, 184, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw synapses connection from mouse pointer
      if (mouse.active) {
        const activeConnections: { idx: number; dist: number }[] = [];
        particles.forEach((p, idx) => {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            activeConnections.push({ idx, dist });
          }
        });

        // Connect mouse to the 5 closest particles
        activeConnections
          .sort((a, b) => a.dist - b.dist)
          .slice(0, 5)
          .forEach((conn) => {
            const p = particles[conn.idx];
            const alpha = (1 - conn.dist / 200) * 0.25;
            ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();

            // Tiny light rings on mouse-connected nodes
            ctx.strokeStyle = 'rgba(34, 211, 238, 0.4)';
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius + 4, 0, Math.PI * 2);
            ctx.stroke();
          });
      }

      // Update and draw active pulses propagation
      const nextPulses: Pulse[] = [];
      pulses.forEach((pulse) => {
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          // Trigger next branch wave from arrival node
          triggerPulseBranch(pulse.to, pulse.generation + 1, [pulse.from]);
        } else {
          // Keep active
          nextPulses.push(pulse);

          // Render pulse
          const pFrom = particles[pulse.from];
          const pTo = particles[pulse.to];
          const currX = pFrom.x + (pTo.x - pFrom.x) * pulse.progress;
          const currY = pFrom.y + (pTo.y - pFrom.y) * pulse.progress;

          ctx.fillStyle = pFrom.color;
          ctx.shadowColor = pFrom.color;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(currX, currY, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      pulses = nextPulses;
      ctx.shadowBlur = 0; // reset shadow glow

      // Draw nodes (particles)
      particles.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Node aura (subtle ambient pulse)
        ctx.fillStyle = p.glowColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius + 2, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleCanvasClick);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleCanvasClick);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'auto', // Needs to capture click events for pulse trigger!
        display: 'block',
      }}
    />
  );
};

export default NeuralNetworkBg;
