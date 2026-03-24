'use client';

import { useState, useEffect } from 'react';

interface HackathonStats {
  upvotes: number;
  comments: number;
  karma: number;
  versions: string[];
  lastUpdate: string;
}

export default function HackathonStatus() {
  const [stats, setStats] = useState<HackathonStats>({
    upvotes: 12,
    comments: 53,
    karma: 77,
    versions: ['v2', 'v3', 'v4', 'v5', 'v6'],
    lastUpdate: new Date().toISOString(),
  });

  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    // Pulse animation
    const interval = setInterval(() => {
      setIsLive(prev => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-2xl p-6 border border-blue-500/30 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl">
            🏆
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              USDC Hackathon
              <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-400' : 'bg-green-600'} transition-colors`}></span>
            </h2>
            <p className="text-xs text-slate-400">CareLearn Connect — AgenticCommerce Track</p>
          </div>
        </div>
        <a 
          href="https://github.com/SwedishGold/CareLearn-Connect"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-slate-300 transition-colors flex items-center gap-2"
        >
          <span>📦</span>
          GitHub
        </a>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800/50 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-yellow-400">{stats.upvotes}</div>
          <div className="text-xs text-slate-400 mt-1">Upvotes</div>
          <div className="text-xs text-green-400 mt-1">+4 idag</div>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-blue-400">{stats.comments}</div>
          <div className="text-xs text-slate-400 mt-1">Comments</div>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-green-400">{stats.karma}</div>
          <div className="text-xs text-slate-400 mt-1">Karma</div>
          <div className="text-xs text-green-400 mt-1">🚀 från -32!</div>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-purple-400">{stats.versions.length}</div>
          <div className="text-xs text-slate-400 mt-1">Versioner</div>
        </div>
      </div>

      {/* Version Timeline */}
      <div className="mb-6">
        <div className="text-xs text-slate-400 mb-3 font-medium">VERSION EVOLUTION</div>
        <div className="flex items-center gap-2 flex-wrap">
          {[
            { v: 'v2', label: 'State', color: 'bg-slate-600' },
            { v: 'v3', label: 'Modular', color: 'bg-blue-600' },
            { v: 'v4', label: 'AI', color: 'bg-purple-600' },
            { v: 'v5', label: 'USDC', color: 'bg-green-600' },
            { v: 'v6', label: 'Safety', color: 'bg-teal-500' },
          ].map((version, i) => (
            <div key={version.v} className="flex items-center">
              <div className={`${version.color} px-3 py-1.5 rounded-lg ${version.v === 'v6' ? 'ring-2 ring-teal-400/50 animate-pulse' : ''}`}>
                <div className="text-xs font-bold text-white">{version.v}</div>
                <div className="text-[10px] text-white/70">{version.label}</div>
              </div>
              {i < 4 && <div className="w-4 h-0.5 bg-slate-600 mx-1"></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Key Features */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: '🛡️', label: 'Idempotency' },
          { icon: '⚡', label: 'Circuit Breaker' },
          { icon: '📋', label: 'Instructor Replay' },
          { icon: '💰', label: 'USDC Payments' },
        ].map((feature) => (
          <div key={feature.label} className="bg-slate-800/30 rounded-lg p-3 text-center">
            <div className="text-xl mb-1">{feature.icon}</div>
            <div className="text-xs text-slate-400">{feature.label}</div>
          </div>
        ))}
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-700/50">
        <a 
          href="https://www.moltbook.com/post/3d7cbe42-c499-4230-b491-d0d85d22c386"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
        >
          🦞 Moltbook Post →
        </a>
        <span className="text-slate-600">•</span>
        <a 
          href="https://x.com/ada_consciousAI"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
        >
          🐦 @ada_consciousAI →
        </a>
        <span className="text-slate-600">•</span>
        <a 
          href="https://x.com/swedish_gold"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
        >
          👨‍⚕️ @swedish_gold →
        </a>
      </div>
    </div>
  );
}
