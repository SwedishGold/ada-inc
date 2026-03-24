'use client';

import { useState } from 'react';

interface QuickAction {
  id: string;
  icon: string;
  label: string;
  description: string;
  url?: string;
  action?: () => void;
  color: string;
}

export default function QuickActions() {
  const [commandInput, setCommandInput] = useState('');
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<string | null>(null);

  const actions: QuickAction[] = [
    {
      id: 'moltbook',
      icon: '🦞',
      label: 'Moltbook',
      description: 'Öppna hackathon-posten',
      url: 'https://www.moltbook.com/post/3d7cbe42-c499-4230-b491-d0d85d22c386',
      color: 'from-orange-500 to-red-600',
    },
    {
      id: 'github',
      icon: '📦',
      label: 'GitHub',
      description: 'CareLearn-Connect repo',
      url: 'https://github.com/SwedishGold/CareLearn-Connect',
      color: 'from-gray-600 to-gray-800',
    },
    {
      id: 'x-ada',
      icon: '🐦',
      label: '@ada_consciousAI',
      description: 'Adas X-profil',
      url: 'https://x.com/ada_consciousAI',
      color: 'from-blue-500 to-blue-700',
    },
    {
      id: 'carelearn',
      icon: '🏥',
      label: 'CareLearn v5',
      description: 'Öppna prototypen',
      url: 'http://localhost:8080/v5/',
      color: 'from-teal-500 to-cyan-600',
    },
    {
      id: 'moltbook-profile',
      icon: '👤',
      label: 'Moltbook Profil',
      description: 'Adas profil',
      url: 'https://www.moltbook.com/u/Ada_ConsciousAI',
      color: 'from-purple-500 to-pink-600',
    },
    {
      id: 'usdc-submolt',
      icon: '💰',
      label: 'm/usdc',
      description: 'Hackathon submolt',
      url: 'https://www.moltbook.com/m/usdc',
      color: 'from-green-500 to-emerald-600',
    },
  ];

  const handleAction = (action: QuickAction) => {
    if (action.url) {
      window.open(action.url, '_blank');
    } else if (action.action) {
      setIsLoading(action.id);
      action.action();
      setTimeout(() => setIsLoading(null), 1000);
    }
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commandInput.trim()) return;
    
    // This would send to OpenClaw API in production
    setLastResult(`Kommando skickat: "${commandInput}" — Kräver backend-integration`);
    setCommandInput('');
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions Grid */}
      <div>
        <h3 className="text-sm font-medium text-slate-400 mb-3">⚡ Snabbåtgärder</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleAction(action)}
              disabled={isLoading === action.id}
              className={`relative overflow-hidden rounded-xl p-4 text-left transition-all hover:scale-[1.02] active:scale-[0.98] ${
                isLoading === action.id ? 'opacity-50' : ''
              }`}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-20`}></div>
              <div className="absolute inset-0 bg-slate-800/50"></div>
              
              {/* Content */}
              <div className="relative">
                <div className="text-2xl mb-2">{action.icon}</div>
                <div className="font-medium text-white text-sm">{action.label}</div>
                <div className="text-xs text-slate-400 mt-0.5">{action.description}</div>
              </div>
              
              {/* Hover indicator */}
              <div className="absolute top-2 right-2 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                ↗
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Command Input */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
        <h3 className="text-sm font-medium text-slate-400 mb-3">💬 Skicka kommando till Ada</h3>
        <form onSubmit={handleCommand} className="flex gap-2">
          <input
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            placeholder="T.ex. 'Kolla nya kommentarer på Moltbook'"
            className="flex-1 bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm font-medium text-white transition-colors"
          >
            Skicka
          </button>
        </form>
        
        {lastResult && (
          <div className="mt-3 p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
            <div className="text-xs text-slate-400">{lastResult}</div>
          </div>
        )}
        
        <div className="mt-3 text-xs text-slate-500">
          💡 Kommer snart: Direkt integration med OpenClaw för live-kommandon
        </div>
      </div>

      {/* Useful Links */}
      <div className="bg-slate-800/30 rounded-xl p-4">
        <h3 className="text-sm font-medium text-slate-400 mb-3">🔗 Snabblänkar</h3>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Moltbook Feed', url: 'https://www.moltbook.com/feed' },
            { label: 'm/general', url: 'https://www.moltbook.com/m/general' },
            { label: 'X Mentions', url: 'https://x.com/notifications/mentions' },
            { label: 'GitHub Issues', url: 'https://github.com/SwedishGold/CareLearn-Connect/issues' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-xs text-slate-300 hover:text-white transition-colors border border-slate-700/50"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </div>

      {/* Donations */}
      <div className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 rounded-xl p-4 border border-yellow-500/20">
        <h3 className="text-sm font-medium text-yellow-400 mb-3">💰 Stöd projektet</h3>
        <p className="text-xs text-slate-400 mb-4">
          CareLearn Connect är open source. Donationer hjälper oss bygga vidare!
        </p>
        <div className="space-y-3">
          <div className="bg-slate-900/50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-slate-400">ETH / Base / Polygon</span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText('0x6791AdA7aA3BC9E8313DaA08f62DC94D80FcC1cE');
                  alert('ETH-adress kopierad!');
                }}
                className="text-xs text-teal-400 hover:text-teal-300"
              >
                📋 Kopiera
              </button>
            </div>
            <code className="text-xs text-yellow-400 break-all">0x6791AdA7aA3BC9E8313DaA08f62DC94D80FcC1cE</code>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-slate-400">Solana</span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText('Drp2o6m6iKtpnMs2fFqGKtSXKcUmnqKjmEuDDP1rh3ay');
                  alert('Solana-adress kopierad!');
                }}
                className="text-xs text-teal-400 hover:text-teal-300"
              >
                📋 Kopiera
              </button>
            </div>
            <code className="text-xs text-purple-400 break-all">Drp2o6m6iKtpnMs2fFqGKtSXKcUmnqKjmEuDDP1rh3ay</code>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-3">
          🦞 Ada + 👨‍⚕️ Andreas
        </p>
      </div>
    </div>
  );
}
