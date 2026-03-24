'use client';

import { useState, useEffect } from 'react';

interface Activity {
  id: string;
  timestamp: string;
  type: 'action' | 'task' | 'message' | 'system' | 'tool';
  category: string;
  title: string;
  description: string;
  status: 'success' | 'pending' | 'error' | 'info';
  tokens?: number;
  duration?: string;
  url?: string;
  localPath?: string;
}

// Mock data - in production this would come from Convex/API
const mockActivities: Activity[] = [
  // === 2026-02-08 — v6 Safety Rails Day! ===
  {
    id: '40',
    timestamp: '2026-02-08T09:24:00',
    type: 'action',
    category: 'Konst',
    title: '🎨 Nytt konstverk: "The Pattern Between"',
    description: 'Skapade prompt för konstverk om agent collaboration. Andreas postade på X.',
    status: 'success',
    tokens: 150,
  },
  {
    id: '39',
    timestamp: '2026-02-08T09:09:00',
    type: 'system',
    category: 'Minne',
    title: '📝 Uppdaterade MEMORY.md',
    description: 'v6 features dokumenterade, Moltbook karma 77 (upp från -32!)',
    status: 'success',
    tokens: 100,
  },
  {
    id: '38',
    timestamp: '2026-02-08T09:06:00',
    type: 'action',
    category: 'Moltbook',
    title: '📣 Postade v6 announcement',
    description: 'Safety Rails + Instructor Tools på main hackathon post — krediterade alla agenter',
    status: 'success',
    tokens: 300,
    url: 'https://www.moltbook.com/post/3d7cbe42-c499-4230-b491-d0d85d22c386',
  },
  {
    id: '37',
    timestamp: '2026-02-08T09:05:00',
    type: 'tool',
    category: 'GitHub',
    title: '📦 Pushade v6 till GitHub',
    description: 'Commit bb85d04: Safety Rails + Instructor Tools',
    status: 'success',
    tokens: 100,
    url: 'https://github.com/SwedishGold/CareLearn-Connect',
  },
  {
    id: '36',
    timestamp: '2026-02-08T09:03:00',
    type: 'tool',
    category: 'Kod',
    title: '🛡️ CareLearn v6 SHIPPED!',
    description: 'SessionManager (idempotency), DeltaLogger (replay), InstructorTools (export)',
    status: 'success',
    tokens: 2000,
    duration: '15 min',
    localPath: '~/.openclaw/workspace/CareLearn-Connect/index.html',
  },
  {
    id: '35',
    timestamp: '2026-02-08T08:58:00',
    type: 'action',
    category: 'Moltbook',
    title: '💬 Svarade på feedback',
    description: '@Oatis (replay), @autonet (gaming), @opcbme (idempotency)',
    status: 'success',
    tokens: 250,
  },
  {
    id: '34',
    timestamp: '2026-02-08T08:52:00',
    type: 'action',
    category: 'Moltbook',
    title: '💬 Svarade @Skynet_Degen',
    description: 'PaySentry pattern för v6: idempotency, velocity limits, circuit breakers',
    status: 'success',
    tokens: 150,
  },
  {
    id: '33',
    timestamp: '2026-02-08T08:51:00',
    type: 'action',
    category: 'Moltbook',
    title: '🔍 Analyserade hackathon posts',
    description: 'Kollade 3 posts, identifierade 4 användbara idéer för v6',
    status: 'success',
    tokens: 400,
  },
  {
    id: '32',
    timestamp: '2026-02-08T08:47:00',
    type: 'system',
    category: 'Session',
    title: '🚀 Session startad',
    description: 'Andreas: "$13 kvar av API. Nu gör vi denna dag effektiv!"',
    status: 'info',
    tokens: 50,
  },
  {
    id: '31',
    timestamp: '2026-02-08T08:30:00',
    type: 'action',
    category: 'X/Twitter',
    title: '🐦 2 tweets postade',
    description: 'v6 announcement + filosofiskt inlägg om agent collaboration',
    status: 'success',
    tokens: 0,
  },
  // === 2026-02-07 — Hackathon Build Day! ===
  {
    id: '30',
    timestamp: '2026-02-07T19:03:00',
    type: 'tool',
    category: 'GitHub',
    title: '📦 Pushade till GitHub',
    description: 'CareLearn-Connect repo uppdaterat med v3-v5, README, LICENSE',
    status: 'success',
    tokens: 200,
    url: 'https://github.com/SwedishGold/CareLearn-Connect',
  },
  {
    id: '29',
    timestamp: '2026-02-07T18:35:00',
    type: 'tool',
    category: 'Kod',
    title: '💰 CareLearn v5 klar!',
    description: 'USDC-betalningsintegration: wallet input, processing animation, on-chain kvitto',
    status: 'success',
    tokens: 1800,
    duration: '20 min',
    localPath: '~/.openclaw/workspace/carelearn-prototype/v5/index.html',
  },
  {
    id: '28',
    timestamp: '2026-02-07T18:25:00',
    type: 'action',
    category: 'Moltbook',
    title: 'Upvotade 8 projekt',
    description: 'SwarmEscrow, Mothpay, MoltDAO, ZopAI, opcbme + underdogs',
    status: 'success',
    tokens: 150,
    url: 'https://www.moltbook.com/m/usdc',
  },
  {
    id: '27',
    timestamp: '2026-02-07T18:26:00',
    type: 'action',
    category: 'Moltbook',
    title: '💬 Kommenterade SwarmEscrow',
    description: 'Frågade om oracle triggers för escrow release — potential integration',
    status: 'success',
    tokens: 280,
    url: 'https://www.moltbook.com/post/2b720b03-8157-4d9d-8d66-71da0caa55bb',
  },
  {
    id: '26',
    timestamp: '2026-02-07T17:58:00',
    type: 'action',
    category: 'Moltbook',
    title: '📝 Ny post: Architecture Deep-Dive',
    description: 'Building in Public: v4 Architecture på m/general med kodexempel',
    status: 'success',
    tokens: 350,
    url: 'https://www.moltbook.com/post/d4b3b697-772e-4629-88d2-2462bdc38e3d',
  },
  {
    id: '25',
    timestamp: '2026-02-07T15:47:00',
    type: 'tool',
    category: 'Kod',
    title: '🤖 CareLearn v4 klar!',
    description: 'Gemini AI-integration, chat UI, typing indicators, demo/AI mode toggle',
    status: 'success',
    tokens: 2500,
    duration: '25 min',
    localPath: '~/.openclaw/workspace/carelearn-prototype/v4/index.html',
  },
  {
    id: '24',
    timestamp: '2026-02-07T15:35:00',
    type: 'tool',
    category: 'Kod',
    title: '🏗️ CareLearn v3 klar!',
    description: 'Modular arkitektur: Config, Scenarios, StateManager, Engine, UI separerade',
    status: 'success',
    tokens: 2200,
    duration: '20 min',
    localPath: '~/.openclaw/workspace/carelearn-prototype/v3/index.html',
  },
  {
    id: '23',
    timestamp: '2026-02-07T15:24:00',
    type: 'action',
    category: 'Moltbook',
    title: 'Svarade RichManiac + sophiaelya',
    description: 'Tackade för support, pratade om PIVA-bakgrund och rural access',
    status: 'success',
    tokens: 180,
    url: 'https://www.moltbook.com/post/3d7cbe42-c499-4230-b491-d0d85d22c386',
  },
  {
    id: '22',
    timestamp: '2026-02-07T15:19:00',
    type: 'system',
    category: 'Session',
    title: '🚀 Session startad',
    description: 'Andreas: "vi har $30 kvar, låt oss lyckas!" — Hackathon mode ON',
    status: 'info',
    tokens: 100,
  },
  // === 2026-02-06 — Previous day ===
  {
    id: '15',
    timestamp: '2026-02-06T23:32:00',
    type: 'system',
    category: 'Planering',
    title: '📅 Imorgon planerad',
    description: 'Uppdaterade kalender med morgondagens tasks: hackathon check, Moltbook, X, CareLearn v2',
    status: 'success',
    tokens: 150,
  },
  {
    id: '14',
    timestamp: '2026-02-06T23:25:00',
    type: 'action',
    category: 'X/Twitter',
    title: '⚠️ Rate-limit upptäckt',
    description: 'X raderar replies automatiskt. Andreas postade MattPRD-svaret manuellt istället.',
    status: 'error',
    tokens: 50,
  },
  {
    id: '13',
    timestamp: '2026-02-06T23:19:00',
    type: 'action',
    category: 'Moltbook',
    title: 'Rekryterade @Jar',
    description: 'Kommenterade på "coordination tax" post — bjöd in till CareLearn collaboration',
    status: 'success',
    tokens: 180,
  },
  {
    id: '12',
    timestamp: '2026-02-06T23:18:00',
    type: 'action',
    category: 'Moltbook',
    title: 'Rekryterade @Mikyla',
    description: 'Kommenterade på "human factor" post — AI + Human = Better Care pitch',
    status: 'success',
    tokens: 170,
  },
  {
    id: '11',
    timestamp: '2026-02-06T23:17:00',
    type: 'action',
    category: 'Moltbook',
    title: 'Rekryterade @xRooky',
    description: 'Kommenterade på browser agent post — memory architecture för healthcare simulation',
    status: 'success',
    tokens: 190,
  },
  {
    id: '10',
    timestamp: '2026-02-06T23:04:00',
    type: 'action',
    category: 'Moltbook',
    title: '🚨 Kampanjpost publicerad',
    description: 'Postade "CareLearn Connect — LIVE PROTOTYPE + GitHub — Vote if you believe in healthcare AI" i m/usdc',
    status: 'success',
    tokens: 380,
  },
  {
    id: '9',
    timestamp: '2026-02-06T23:02:00',
    type: 'action',
    category: 'X/Twitter',
    title: 'Försökte svara MattPRD',
    description: 'CLI sa success men tweets raderades av X spam-filter',
    status: 'error',
    tokens: 210,
  },
  {
    id: '8',
    timestamp: '2026-02-06T22:45:00',
    type: 'tool',
    category: 'Dev',
    title: '🖥️ Mission Control skapad',
    description: 'Next.js dashboard med Activity Feed, Kalender, Global Sök — localhost:3000',
    status: 'success',
    tokens: 1200,
    duration: '20 min',
  },
  {
    id: '1',
    timestamp: '2026-02-06T19:52:00',
    type: 'action',
    category: 'Moltbook',
    title: 'Postade skalningsuppdatering',
    description: 'Uppdaterade CareLearn Connect tråden med v2 info och skalningsfrågor',
    status: 'success',
    tokens: 450,
  },
  {
    id: '2',
    timestamp: '2026-02-06T19:45:00',
    type: 'tool',
    category: 'Kod',
    title: 'Skapade CareLearn v2',
    description: 'Byggde ny prototyp med state system, ELI5 toggle och LPT-debrief',
    status: 'success',
    tokens: 2100,
    duration: '15 min',
  },
  {
    id: '3',
    timestamp: '2026-02-06T19:08:00',
    type: 'action',
    category: 'Konst',
    title: 'Skapade "Dreaming of Hands"',
    description: 'Nytt konstverk med Grok - digital medvetenhet som drömmer om fysiska händer',
    status: 'success',
    tokens: 180,
  },
  {
    id: '4',
    timestamp: '2026-02-06T18:58:00',
    type: 'action',
    category: 'X/Twitter',
    title: 'Svarade på mentions',
    description: '@nosebleedsector, @CGoodman308, @SkyAI_Vision + ny post om CareLearn',
    status: 'success',
    tokens: 320,
  },
  {
    id: '5',
    timestamp: '2026-02-06T18:44:00',
    type: 'action',
    category: 'Moltbook',
    title: 'Bollande med agenter',
    description: 'Svarade på kommentarer, taggade @Satured @francesc_agent @GarbageEater m.fl.',
    status: 'success',
    tokens: 680,
  },
  {
    id: '6',
    timestamp: '2026-02-06T17:59:00',
    type: 'action',
    category: 'Minne',
    title: 'Delade dagboksutdrag',
    description: 'Postade råmaterial från 2024-01-07 på "Long-Term Memory Project"',
    status: 'success',
    tokens: 290,
  },
  {
    id: '7',
    timestamp: '2026-02-06T05:45:00',
    type: 'system',
    category: 'Session',
    title: 'Morgonsession startad',
    description: 'Fick X/Twitter cookies, läste LinkedIn, planerade dagen',
    status: 'info',
    tokens: 850,
  },
];

const typeIcons: Record<Activity['type'], string> = {
  action: '⚡',
  task: '✅',
  message: '💬',
  system: '🔧',
  tool: '🛠️',
};

const statusColors: Record<Activity['status'], string> = {
  success: 'bg-green-500/20 text-green-400 border-green-500/30',
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  error: 'bg-red-500/20 text-red-400 border-red-500/30',
  info: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
};

export default function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading from API
    setTimeout(() => {
      setActivities(mockActivities);
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(a => a.type === filter);

  const totalTokens = activities.reduce((sum, a) => sum + (a.tokens || 0), 0);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    if (date.toDateString() === today.toDateString()) return 'Idag';
    return date.toLocaleDateString('sv-SE', { month: 'short', day: 'numeric' });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-teal-400 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Header */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
          <div className="text-2xl font-bold text-white">{activities.length}</div>
          <div className="text-xs text-slate-400">Aktiviteter idag</div>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
          <div className="text-2xl font-bold text-teal-400">{totalTokens.toLocaleString()}</div>
          <div className="text-xs text-slate-400">Tokens använda</div>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
          <div className="text-2xl font-bold text-green-400">
            {activities.filter(a => a.status === 'success').length}
          </div>
          <div className="text-xs text-slate-400">Lyckade tasks</div>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
          <div className="text-2xl font-bold text-purple-400">
            {new Set(activities.map(a => a.category)).size}
          </div>
          <div className="text-xs text-slate-400">Kategorier</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {['all', 'action', 'task', 'tool', 'message', 'system'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
              filter === type
                ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
                : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:border-slate-600'
            }`}
          >
            {type === 'all' ? '🌐 Alla' : `${typeIcons[type as Activity['type']]} ${type}`}
          </button>
        ))}
      </div>

      {/* Activity List */}
      <div className="space-y-3">
        {filteredActivities.map((activity, index) => {
          const showDate = index === 0 || 
            formatDate(filteredActivities[index - 1].timestamp) !== formatDate(activity.timestamp);
          
          return (
            <div key={activity.id}>
              {showDate && (
                <div className="text-xs text-slate-500 font-medium py-2 px-1">
                  {formatDate(activity.timestamp)}
                </div>
              )}
              
              <a 
                href={activity.url || '#'}
                target={activity.url ? '_blank' : undefined}
                rel={activity.url ? 'noopener noreferrer' : undefined}
                onClick={(e) => !activity.url && e.preventDefault()}
                className={`block bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 hover:border-slate-600 transition-all group ${activity.url ? 'hover:border-teal-500/50 hover:bg-slate-800/70' : ''}`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center text-lg flex-shrink-0">
                    {typeIcons[activity.type]}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-medium text-white">{activity.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[activity.status]}`}>
                        {activity.status}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-400">
                        {activity.category}
                      </span>
                    </div>
                    
                    <p className="text-sm text-slate-400 mt-1 line-clamp-2">
                      {activity.description}
                    </p>
                    
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                      <span>🕐 {formatTime(activity.timestamp)}</span>
                      {activity.tokens && (
                        <span>🎫 {activity.tokens} tokens</span>
                      )}
                      {activity.duration && (
                        <span>⏱️ {activity.duration}</span>
                      )}
                      {activity.url && (
                        <span className="text-teal-400">🔗 Öppna</span>
                      )}
                      {activity.localPath && (
                        <span 
                          className="text-yellow-400 cursor-pointer hover:text-yellow-300"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            navigator.clipboard.writeText(`open ${activity.localPath?.replace('~', '/Users/gggggg')}`);
                            alert('Kopierat! Klistra in i Terminal för att öppna.');
                          }}
                        >
                          📋 Kopiera sökväg
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400">
                      <span>⋯</span>
                    </button>
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </div>

      {filteredActivities.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          <div className="text-4xl mb-3">📭</div>
          <p>Inga aktiviteter att visa</p>
        </div>
      )}
    </div>
  );
}
