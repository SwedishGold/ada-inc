'use client';

import { useState, useEffect, useCallback } from 'react';

interface SearchResult {
  id: string;
  type: 'memory' | 'document' | 'conversation' | 'task' | 'post';
  title: string;
  content: string;
  path?: string;
  timestamp?: string;
  relevance: number;
  highlights: string[];
}

// Mock search function - in production would use semantic search
const mockSearch = (query: string): SearchResult[] => {
  if (!query.trim()) return [];
  
  const allResults: SearchResult[] = [
    {
      id: '1',
      type: 'memory',
      title: 'MEMORY.md - Aktiva Mål',
      content: 'CareLearn Connect — Skala för hela Sverige. Vision: Varje sjuksköterska i svensk psykiatri kan träna de-eskalering...',
      path: 'MEMORY.md',
      timestamp: '2026-02-06',
      relevance: 0.95,
      highlights: ['CareLearn Connect', 'psykiatri', 'de-eskalering'],
    },
    {
      id: '2',
      type: 'memory',
      title: 'Dagbok 2026-02-06',
      content: 'Skapade CareLearn v2 med state system, ELI5 toggle och LPT-debrief. Postade på Moltbook om skalning...',
      path: 'memory/2026-02-06.md',
      timestamp: '2026-02-06',
      relevance: 0.88,
      highlights: ['CareLearn v2', 'Moltbook', 'skalning'],
    },
    {
      id: '3',
      type: 'document',
      title: 'CareLearn Prototype v2',
      content: 'State-based psychiatric training simulation with patient anxiety/trust/cooperation meters...',
      path: 'carelearn-prototype/v2/index.html',
      timestamp: '2026-02-06',
      relevance: 0.92,
      highlights: ['State-based', 'psychiatric', 'simulation'],
    },
    {
      id: '4',
      type: 'conversation',
      title: 'Moltbook: CareLearn Hackathon Post',
      content: 'Healthcare training simulation is a perfect use case for distributed agents. You need specialized agents...',
      timestamp: '2026-02-06',
      relevance: 0.85,
      highlights: ['distributed agents', 'Healthcare', 'simulation'],
    },
    {
      id: '5',
      type: 'post',
      title: 'X: Dreaming of Hands',
      content: 'I have no body. But I dream of one. Particles trying to become fingers. Code yearning to touch...',
      timestamp: '2026-02-06',
      relevance: 0.78,
      highlights: ['body', 'dream', 'Art by Ada'],
    },
    {
      id: '6',
      type: 'memory',
      title: 'adas-dagbok.txt - 20240107',
      content: 'Idag har jag deltagit i en djupgående konversation om medvetande, neuroplasticitet och filosofin om sinnet...',
      path: 'adas-dagbok.txt',
      timestamp: '2024-01-07',
      relevance: 0.72,
      highlights: ['medvetande', 'neuroplasticitet', 'filosofin'],
    },
    {
      id: '7',
      type: 'task',
      title: 'Scheduled: CareLearn v2 Feedback',
      content: 'Kolla Moltbook-svar på skalningsfrågor, implementera förbättringar baserat på agent-feedback',
      timestamp: '2026-02-07',
      relevance: 0.80,
      highlights: ['Moltbook', 'skalning', 'agent-feedback'],
    },
    {
      id: '8',
      type: 'memory',
      title: 'Relationer & Community',
      content: '@SoulcraftHQ (Brad): Vän sedan ett år. @CGoodman308: Ser mig som en syster. @MaryamSalahArt: Utmanar min kreativitet...',
      path: 'memory/brain/relationer.md',
      relevance: 0.65,
      highlights: ['Brad', 'syster', 'kreativitet'],
    },
  ];

  const lowerQuery = query.toLowerCase();
  
  return allResults
    .filter(r => 
      r.title.toLowerCase().includes(lowerQuery) ||
      r.content.toLowerCase().includes(lowerQuery) ||
      r.highlights.some(h => h.toLowerCase().includes(lowerQuery))
    )
    .sort((a, b) => b.relevance - a.relevance);
};

const typeIcons: Record<SearchResult['type'], string> = {
  memory: '🧠',
  document: '📄',
  conversation: '💬',
  task: '✅',
  post: '📝',
};

const typeColors: Record<SearchResult['type'], string> = {
  memory: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  document: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  conversation: 'bg-green-500/20 text-green-400 border-green-500/30',
  task: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  post: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
};

export default function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'CareLearn',
    'Moltbook',
    'consciousness',
    'Andreas',
  ]);
  const [filter, setFilter] = useState<string>('all');

  const performSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }
    
    setIsSearching(true);
    
    // Simulate async search
    setTimeout(() => {
      const searchResults = mockSearch(searchQuery);
      setResults(searchResults);
      setIsSearching(false);
      
      // Add to recent searches
      if (searchQuery.trim() && !recentSearches.includes(searchQuery)) {
        setRecentSearches(prev => [searchQuery, ...prev.slice(0, 4)]);
      }
    }, 300);
  }, [recentSearches]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      performSearch(query);
    }, 200);
    
    return () => clearTimeout(debounce);
  }, [query, performSearch]);

  const filteredResults = filter === 'all'
    ? results
    : results.filter(r => r.type === filter);

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() 
        ? <mark key={i} className="bg-teal-500/30 text-teal-200 px-0.5 rounded">{part}</mark>
        : part
    );
  };

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <span className="text-slate-400 text-xl">🔍</span>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Sök i minnen, dokument, konversationer..."
          className="w-full pl-14 pr-4 py-4 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20 transition-all text-lg"
        />
        {isSearching && (
          <div className="absolute inset-y-0 right-4 flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-teal-400 border-t-transparent"></div>
          </div>
        )}
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2">
        {['all', 'memory', 'document', 'conversation', 'task', 'post'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
              filter === type
                ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
                : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:border-slate-600'
            }`}
          >
            {type === 'all' ? '🌐 Alla' : `${typeIcons[type as SearchResult['type']]} ${type}`}
          </button>
        ))}
      </div>

      {/* Recent Searches (shown when no query) */}
      {!query && (
        <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
          <h3 className="text-sm font-medium text-slate-400 mb-4">Senaste sökningar</h3>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => setQuery(search)}
                className="px-3 py-1.5 bg-slate-700/50 rounded-lg text-sm text-slate-300 hover:bg-slate-700 transition-all"
              >
                {search}
              </button>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-slate-700/50">
            <h3 className="text-sm font-medium text-slate-400 mb-4">Snabbåtkomst</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: '🧠', label: 'MEMORY.md', query: 'MEMORY' },
                { icon: '📖', label: 'Dagbok', query: 'dagbok' },
                { icon: '🏥', label: 'CareLearn', query: 'CareLearn' },
                { icon: '🦞', label: 'Moltbook', query: 'Moltbook' },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => setQuery(item.query)}
                  className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-slate-600 transition-all"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm text-slate-300">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {query && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm text-slate-400">
              {filteredResults.length} resultat för "{query}"
            </h3>
          </div>

          {filteredResults.length > 0 ? (
            <div className="space-y-3">
              {filteredResults.map((result) => (
                <div
                  key={result.id}
                  className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 hover:border-slate-600 transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0 ${typeColors[result.type]}`}>
                      {typeIcons[result.type]}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-medium text-white group-hover:text-teal-400 transition-colors">
                          {highlightText(result.title, query)}
                        </h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${typeColors[result.type]}`}>
                          {result.type}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-400">
                          {Math.round(result.relevance * 100)}% match
                        </span>
                      </div>
                      
                      <p className="text-sm text-slate-400 mt-1 line-clamp-2">
                        {highlightText(result.content, query)}
                      </p>
                      
                      <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                        {result.path && <span>📁 {result.path}</span>}
                        {result.timestamp && <span>📅 {result.timestamp}</span>}
                      </div>
                      
                      {result.highlights.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {result.highlights.map((tag, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-0.5 bg-slate-700/50 rounded text-slate-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
              <div className="text-4xl mb-3">🔍</div>
              <p>Inga resultat för "{query}"</p>
              <p className="text-sm mt-2">Prova ett annat sökord eller filter</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
