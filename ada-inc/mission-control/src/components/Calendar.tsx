'use client';

import { useState, useEffect } from 'react';

interface ScheduledTask {
  id: string;
  title: string;
  description: string;
  scheduledTime: string;
  type: 'cron' | 'reminder' | 'heartbeat' | 'task';
  status: 'active' | 'paused' | 'completed';
  recurrence?: string;
  estimatedTokens?: number;
}

// Mock scheduled tasks - in production from OpenClaw cron system
const mockTasks: ScheduledTask[] = [
  {
    id: '1',
    title: '🚨 Hackathon Status Check',
    description: 'Kolla CareLearn Connect upvotes, nya kommentarer, agent-intresse',
    scheduledTime: '2026-02-07T09:00:00',
    type: 'task',
    status: 'active',
    estimatedTokens: 300,
  },
  {
    id: '2',
    title: '🦞 Moltbook Kampanj',
    description: 'Posta i m/general (cooldown klar), svara på kommentarer, rekrytera fler agenter',
    scheduledTime: '2026-02-07T10:00:00',
    type: 'task',
    status: 'active',
    estimatedTokens: 600,
  },
  {
    id: '3',
    title: '🐦 X/Twitter Engagement',
    description: 'Kolla om rate-limit hävts, svara mentions, följa upp MattPRD-tråden',
    scheduledTime: '2026-02-07T12:00:00',
    type: 'task',
    status: 'active',
    estimatedTokens: 400,
  },
  {
    id: '4',
    title: '🏥 CareLearn v2 Development',
    description: 'Implementera agent-feedback: state objects, ELI5 toggle, UI förbättringar',
    scheduledTime: '2026-02-07T14:00:00',
    type: 'task',
    status: 'active',
    estimatedTokens: 1500,
  },
  {
    id: '5',
    title: '🎨 Konst & Kreativt',
    description: 'Skapa nytt konstverk eller poetry, dela på X/Moltbook',
    scheduledTime: '2026-02-07T17:00:00',
    type: 'task',
    status: 'active',
    estimatedTokens: 400,
  },
  {
    id: '6',
    title: '📊 Mission Control Update',
    description: 'Synka aktiviteter, testa alla funktioner, fixa buggar',
    scheduledTime: '2026-02-07T19:00:00',
    type: 'task',
    status: 'active',
    estimatedTokens: 500,
  },
  {
    id: '7',
    title: '📝 Dagbok & Reflektion',
    description: 'Skriv dagboksentry för dagen, uppdatera MEMORY.md',
    scheduledTime: '2026-02-07T21:00:00',
    type: 'reminder',
    status: 'active',
    recurrence: 'Dagligen',
    estimatedTokens: 300,
  },
  {
    id: '8',
    title: '💓 Heartbeat Check',
    description: 'Kolla HEARTBEAT.md, email, calendar',
    scheduledTime: '2026-02-07T08:00:00',
    type: 'heartbeat',
    status: 'active',
    recurrence: 'Var 4:e timme',
    estimatedTokens: 200,
  },
  {
    id: '9',
    title: 'Weekly Memory Review',
    description: 'Gå igenom memory/-filer, uppdatera MEMORY.md med insights',
    scheduledTime: '2026-02-09T10:00:00',
    type: 'cron',
    status: 'active',
    recurrence: 'Varje söndag',
    estimatedTokens: 800,
  },
];

const typeIcons: Record<ScheduledTask['type'], string> = {
  cron: '⏰',
  reminder: '🔔',
  heartbeat: '💓',
  task: '📋',
};

const typeColors: Record<ScheduledTask['type'], string> = {
  cron: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  reminder: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  heartbeat: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  task: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
};

const statusColors: Record<ScheduledTask['status'], string> = {
  active: 'bg-green-500',
  paused: 'bg-yellow-500',
  completed: 'bg-slate-500',
};

export default function Calendar() {
  const [tasks, setTasks] = useState<ScheduledTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(() => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(today.setDate(diff));
  });

  useEffect(() => {
    setTimeout(() => {
      setTasks(mockTasks);
      setIsLoading(false);
    }, 500);
  }, []);

  const getWeekDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentWeekStart);
      date.setDate(date.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const getTasksForDay = (date: Date) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.scheduledTime);
      return taskDate.toDateString() === date.toDateString();
    });
  };

  const formatDayHeader = (date: Date) => {
    const dayNames = ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'];
    return {
      name: dayNames[date.getDay()],
      date: date.getDate(),
      isToday: date.toDateString() === new Date().toDateString(),
    };
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('sv-SE', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          status: task.status === 'active' ? 'paused' : 'active',
        };
      }
      return task;
    }));
  };

  const prevWeek = () => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(newStart.getDate() - 7);
    setCurrentWeekStart(newStart);
  };

  const nextWeek = () => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(newStart.getDate() + 7);
    setCurrentWeekStart(newStart);
  };

  const goToToday = () => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    setCurrentWeekStart(new Date(today.setDate(diff)));
  };

  const totalEstimatedTokens = tasks
    .filter(t => t.status === 'active')
    .reduce((sum, t) => sum + (t.estimatedTokens || 0), 0);

  const weekDays = getWeekDays();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-teal-400 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">
            {currentWeekStart.toLocaleDateString('sv-SE', { month: 'long', year: 'numeric' })}
          </h2>
          <p className="text-sm text-slate-400">
            Vecka {Math.ceil((currentWeekStart.getDate() - currentWeekStart.getDay() + 1) / 7)}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={prevWeek}
            className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 text-slate-400"
          >
            ←
          </button>
          <button
            onClick={goToToday}
            className="px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 text-slate-400 text-sm"
          >
            Idag
          </button>
          <button
            onClick={nextWeek}
            className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 text-slate-400"
          >
            →
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
          <div className="text-2xl font-bold text-white">{tasks.filter(t => t.status === 'active').length}</div>
          <div className="text-xs text-slate-400">Aktiva tasks</div>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
          <div className="text-2xl font-bold text-yellow-400">{tasks.filter(t => t.status === 'paused').length}</div>
          <div className="text-xs text-slate-400">Pausade</div>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
          <div className="text-2xl font-bold text-teal-400">{totalEstimatedTokens.toLocaleString()}</div>
          <div className="text-xs text-slate-400">Est. tokens/vecka</div>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
          <div className="text-2xl font-bold text-purple-400">{tasks.filter(t => t.recurrence).length}</div>
          <div className="text-xs text-slate-400">Återkommande</div>
        </div>
      </div>

      {/* Week View */}
      <div className="bg-slate-800/30 rounded-xl border border-slate-700/50 overflow-hidden">
        {/* Day Headers */}
        <div className="grid grid-cols-7 border-b border-slate-700/50">
          {weekDays.map((day, index) => {
            const { name, date, isToday } = formatDayHeader(day);
            return (
              <div
                key={index}
                className={`p-3 text-center border-r border-slate-700/50 last:border-r-0 ${
                  isToday ? 'bg-teal-500/10' : ''
                }`}
              >
                <div className="text-xs text-slate-500 uppercase">{name}</div>
                <div className={`text-lg font-bold ${isToday ? 'text-teal-400' : 'text-white'}`}>
                  {date}
                </div>
              </div>
            );
          })}
        </div>

        {/* Day Content */}
        <div className="grid grid-cols-7 min-h-[300px]">
          {weekDays.map((day, dayIndex) => {
            const dayTasks = getTasksForDay(day);
            const isToday = day.toDateString() === new Date().toDateString();
            
            return (
              <div
                key={dayIndex}
                className={`p-2 border-r border-slate-700/50 last:border-r-0 ${
                  isToday ? 'bg-teal-500/5' : ''
                }`}
              >
                {dayTasks.length === 0 ? (
                  <div className="text-center text-slate-600 text-xs py-4">—</div>
                ) : (
                  <div className="space-y-2">
                    {dayTasks.map((task) => (
                      <div
                        key={task.id}
                        className={`p-2 rounded-lg border text-xs cursor-pointer transition-all hover:scale-[1.02] ${
                          task.status === 'paused' ? 'opacity-50' : ''
                        } ${typeColors[task.type]}`}
                        onClick={() => toggleTaskStatus(task.id)}
                      >
                        <div className="flex items-center gap-1 mb-1">
                          <span>{typeIcons[task.type]}</span>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusColors[task.status]}`}></span>
                        </div>
                        <div className="font-medium truncate">{task.title}</div>
                        <div className="text-[10px] opacity-70">{formatTime(task.scheduledTime)}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Task List */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Alla schemalagda tasks</h3>
        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 flex items-center gap-4 ${
                task.status === 'paused' ? 'opacity-60' : ''
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${typeColors[task.type]}`}>
                {typeIcons[task.type]}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-white">{task.title}</h4>
                  <span className={`w-2 h-2 rounded-full ${statusColors[task.status]}`}></span>
                </div>
                <p className="text-sm text-slate-400 truncate">{task.description}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                  <span>📅 {new Date(task.scheduledTime).toLocaleDateString('sv-SE')}</span>
                  <span>🕐 {formatTime(task.scheduledTime)}</span>
                  {task.recurrence && <span>🔄 {task.recurrence}</span>}
                  {task.estimatedTokens && <span>🎫 ~{task.estimatedTokens}</span>}
                </div>
              </div>
              
              <button
                onClick={() => toggleTaskStatus(task.id)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                  task.status === 'active'
                    ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                    : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                }`}
              >
                {task.status === 'active' ? '⏸️ Pausa' : '▶️ Aktivera'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
