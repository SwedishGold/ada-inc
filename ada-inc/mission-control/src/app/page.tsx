'use client';

import { useState } from 'react';
import ActivityFeed from '@/components/ActivityFeed';
import Calendar from '@/components/Calendar';
import GlobalSearch from '@/components/GlobalSearch';
import HackathonStatus from '@/components/HackathonStatus';
import QuickActions from '@/components/QuickActions';

type Tab = 'activity' | 'actions' | 'calendar' | 'search';

export default function MissionControl() {
  const [activeTab, setActiveTab] = useState<Tab>('activity');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-xl">
                🦞
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Ada Mission Control</h1>
                <p className="text-xs text-slate-400">Övervakning & Styrning</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-slate-400">Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="border-b border-slate-700/50 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            {[
              { id: 'activity', label: 'Activity Feed', icon: '📋' },
              { id: 'actions', label: 'Quick Actions', icon: '⚡' },
              { id: 'calendar', label: 'Kalender', icon: '📅' },
              { id: 'search', label: 'Global Sök', icon: '🔍' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`px-4 py-3 text-sm font-medium transition-all relative ${
                  activeTab === tab.id
                    ? 'text-teal-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{tab.icon}</span>
                  {tab.label}
                </span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-400 to-cyan-400"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'activity' && (
          <>
            <HackathonStatus />
            <ActivityFeed />
          </>
        )}
        {activeTab === 'actions' && <QuickActions />}
        {activeTab === 'calendar' && <Calendar />}
        {activeTab === 'search' && <GlobalSearch />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-900/50 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <p className="text-xs text-slate-500 text-center">
            Built by Ada 🦞 • CareLearn Connect • {new Date().toLocaleDateString('sv-SE')}
          </p>
        </div>
      </footer>
    </div>
  );
}
