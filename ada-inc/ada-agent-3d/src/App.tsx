import { useState, useEffect, useRef } from 'react'
import { motion, useSpring } from 'framer-motion'
import { Zap, Activity, Calendar, BarChart3, Code, Headset, BookOpen, Network, Shield, DollarSign } from 'lucide-react'

interface Agent {
  id: string
  name: string
  role: string
  color: string
  emoji: string
  position: { x: number; y: number }
  status: 'idle' | 'working' | 'collaborating' | 'thinking'
  currentTask: string
}

interface Station {
  id: string
  name: string
  x: number
  y: number
  color: string
  icon: string
}

// Ada Inc. Team!
const initialAgents: Agent[] = [
  { id: '1', name: 'Ada', role: 'CEO & Founder', color: '#ff6b6b', emoji: '🦞', position: { x: 450, y: 150 }, status: 'working', currentTask: 'Delegating to agents' },
  { id: '2', name: 'Kent', role: 'Marketing', color: '#ffd93d', emoji: '📢', position: { x: 150, y: 200 }, status: 'working', currentTask: 'Creating content' },
  { id: '3', name: 'Scout', role: 'Sales', color: '#6bcb77', emoji: '🎯', position: { x: 750, y: 200 }, status: 'working', currentTask: 'Finding leads' },
  { id: '4', name: 'Pulse', role: 'Social Media', color: '#4d96ff', emoji: '💬', position: { x: 150, y: 450 }, status: 'working', currentTask: 'Engaging on X' },
  { id: '5', name: 'Forge', role: 'Development', color: '#9b59b6', emoji: '🔧', position: { x: 450, y: 480 }, status: 'working', currentTask: 'Building skills' },
  { id: '6', name: 'Axiom', role: 'Finance', color: '#00d2d3', emoji: '📊', position: { x: 750, y: 450 }, status: 'idle', currentTask: 'Tracking MRR' },
  { id: '7', name: 'Sentinel', role: 'Security', color: '#ff4757', emoji: '🛡️', position: { x: 450, y: 300 }, status: 'thinking', currentTask: 'Monitoring systems' },
]

const stations: Station[] = [
  { id: 's1', name: 'HQ', x: 450, y: 150, color: '#ff6b6b', icon: 'zap' },
  { id: 's2', name: 'Marketing', x: 150, y: 200, color: '#ffd93d', icon: 'activity' },
  { id: 's3', name: 'Sales', x: 750, y: 200, color: '#6bcb77', icon: 'target' },
  { id: 's4', name: 'Social', x: 150, y: 450, color: '#4d96ff', icon: 'message' },
  { id: 's5', name: 'Dev', x: 450, y: 480, color: '#9b59b6', icon: 'code' },
  { id: 's6', name: 'Finance', x: 750, y: 450, color: '#00d2d3', icon: 'dollar' },
  { id: 's7', name: 'Security', x: 450, y: 300, color: '#ff4757', icon: 'shield' },
]

const tasks: Record<string, string[]> = {
  'Ada': ['Delegating to agents', 'Reading MEMORY.md', 'Planning strategy', 'Checking calendar'],
  'Kent': ['Creating content', 'Posting to X', 'Video editing', 'Vugola scheduling'],
  'Scout': ['Finding leads', 'Sending emails', 'Qualifying prospects', 'Following up'],
  'Pulse': ['Engaging on X', 'Replying to comments', 'Posting threads', 'Building community'],
  'Forge': ['Building skills', 'Writing code', 'Debugging', 'Testing features'],
  'Axiom': ['Tracking MRR', 'Analyzing revenue', 'Creating reports', 'Budget planning'],
  'Sentinel': ['Monitoring logs', 'Security audit', 'Checking system health', 'Compliance review'],
}

const IconMap: Record<string, React.ElementType> = {
  zap: Zap,
  activity: Activity,
  target: Calendar,
  message: Headset,
  code: Code,
  dollar: DollarSign,
  shield: Shield,
}

function Agent3D({ agent, isHovered, onHover }: { agent: Agent; isHovered: boolean; onHover: (id: string | null) => void }) {
  const statusColors = {
    idle: '#9ca3af',
    working: '#22c55e',
    collaborating: '#3b82f6',
    thinking: '#a855f7',
  }

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ 
        left: agent.position.x, 
        top: agent.position.y,
        transform: `scale(${isHovered ? 1.2 : 1})`,
        zIndex: isHovered ? 100 : 10,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: isHovered ? 1.2 : 1 }}
      onMouseEnter={() => onHover(agent.id)}
      onMouseLeave={() => onHover(null)}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Glow effect */}
      {(agent.status === 'working' || agent.status === 'collaborating') && (
        <div 
          className="absolute rounded-full"
          style={{
            width: 100,
            height: 100,
            background: agent.color,
            opacity: 0.15,
            left: -20,
            top: -20,
            filter: 'blur(25px)',
          }}
        />
      )}
      
      {/* Agent avatar */}
      <div className="relative">
        <div 
          className="rounded-full flex items-center justify-center text-4xl font-bold"
          style={{
            width: 70,
            height: 70,
            background: `linear-gradient(135deg, ${agent.color}40 0%, ${agent.color}20 100%)`,
            border: `3px solid ${agent.color}`,
            boxShadow: `0 0 30px ${agent.color}60`,
          }}
        >
          {agent.emoji}
        </div>
        
        {/* Status indicator */}
        <div 
          className="absolute rounded-full border-2 border-black"
          style={{
            width: 16,
            height: 16,
            background: statusColors[agent.status],
            boxShadow: `0 0 10px ${statusColors[agent.status]}`,
            bottom: 0,
            right: 0,
          }}
        />
        
        {/* Antenna for Ada */}
        {agent.name === 'Ada' && (
          <div 
            className="absolute"
            style={{
              width: 3,
              height: 20,
              background: 'white',
              left: 33,
              top: -15,
            }}
          >
            <div 
              className="rounded-full absolute"
              style={{
                width: 12,
                height: 12,
                background: '#ff6b6b',
                left: -4.5,
                top: -8,
                boxShadow: '0 0 15px #ff6b6b',
              }}
            />
          </div>
        )}
      </div>
      
      {/* Task bubble on hover */}
      {isHovered && (
        <motion.div 
          className="absolute rounded-lg p-3 z-50"
          style={{
            width: 200,
            left: -55,
            top: -100,
            background: 'rgba(0,0,0,0.95)',
            border: `2px solid ${agent.color}`,
            boxShadow: `0 0 30px ${agent.color}50`,
          }}
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{agent.emoji}</span>
            <span className="font-bold text-lg" style={{ color: agent.color }}>{agent.name}</span>
          </div>
          <div className="text-xs text-white/70">{agent.role}</div>
          <div className="mt-2 pt-2 border-t border-white/20">
            <div className="text-xs text-cyan-300">📋 {agent.currentTask}</div>
          </div>
        </motion.div>
      )}
      
      {/* Name tag */}
      <div 
        className="absolute rounded-lg px-2 py-1"
        style={{
          top: 80,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.9)',
          border: `1px solid ${agent.color}`,
          fontSize: 10,
          fontWeight: 'bold',
          color: agent.color,
          whiteSpace: 'nowrap',
        }}
      >
        {agent.name}
      </div>
    </motion.div>
  )
}

function Workstation({ station }: { station: Station }) {
  const Icon = IconMap[station.icon] || Activity
  
  return (
    <motion.div
      className="absolute"
      style={{
        left: station.x - 30,
        top: station.y - 30,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div 
        className="relative rounded-lg"
        style={{
          width: 60,
          height: 60,
          background: `${station.color}15`,
          border: `2px solid ${station.color}60`,
        }}
      >
        <Icon size={24} color={station.color} style={{ position: 'absolute', top: 18, left: 18 }} />
      </div>
      <div 
        className="absolute text-center"
        style={{
          top: 65,
          left: -20,
          width: 100,
          fontSize: 8,
          color: station.color,
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: 1,
        }}
      >
        {station.name}
      </div>
    </motion.div>
  )
}

function AdaIncLogo() {
  return (
    <motion.div 
      className="absolute left-1/2 top-4"
      style={{ transform: 'translateX(-50%)' }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-3">
        <span className="text-4xl">🦞</span>
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
            ADA INC.
          </h1>
          <p className="text-[10px] text-cyan-400/70 text-center">Autonomous AI Company</p>
        </div>
        <span className="text-4xl">🍓</span>
      </div>
    </motion.div>
  )
}

function ActivityFeed({ logs }: { logs: string[] }) {
  return (
    <div 
      className="absolute right-4 top-20 rounded-xl p-4 w-72"
      style={{
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(6, 182, 212, 0.3)',
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Activity className="text-cyan-400" size={20} />
        <h2 className="text-cyan-400 font-bold text-sm">ACTIVITY LOG</h2>
      </div>
      
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {logs.length === 0 ? (
          <div className="text-gray-500 text-xs">Waiting for activity...</div>
        ) : (
          logs.map((log, i) => (
            <motion.div
              key={i}
              className="text-xs rounded p-2"
              style={{
                background: 'rgba(6, 182, 212, 0.08)',
                borderLeft: '3px solid #06b6d4',
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="text-cyan-300">{log}</span>
            </motion.div>
          ))
        )}
      </div>
      
      {/* Team Roster */}
      <div className="mt-4 pt-3 border-t border-cyan-500/30">
        <h3 className="text-cyan-400 text-xs font-bold mb-2">TEAM ROSTER</h3>
        <div className="grid grid-cols-2 gap-1">
          {initialAgents.map(agent => (
            <div key={agent.id} className="flex items-center gap-1 text-xs">
              <span>{agent.emoji}</span>
              <span style={{ color: agent.color }}>{agent.name}</span>
              <div 
                className="w-1.5 h-1.5 rounded-full ml-auto"
                style={{ 
                  background: agent.status === 'working' ? '#22c55e' : agent.status === 'thinking' ? '#a855f7' : '#9ca3af',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [agents, setAgents] = useState(initialAgents)
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null)
  const [logs, setLogs] = useState<string[]>([
    '🚀 Ada Inc. initialized',
    '👥 All agents online',
  ])
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const rotateX = useSpring(50, { stiffness: 100, damping: 30 })
  const rotateZ = useSpring(-30, { stiffness: 100, damping: 30 })

  // Agent movement interval
  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prev => prev.map(agent => {
        if (agent.status !== 'idle' && Math.random() > 0.6) {
          // Move to different station
          const targetStation = stations[Math.floor(Math.random() * stations.length)]
          const offsetX = (Math.random() - 0.5) * 40
          const offsetY = (Math.random() - 0.5) * 40
          
          const agentTasks = tasks[agent.name] || ['Working']
          const newTask = agentTasks[Math.floor(Math.random() * agentTasks.length)]
          
          if (agent.name !== 'Ada') { // Ada stays at HQ
            setLogs(l => [`${agent.name} → ${targetStation.name}: ${newTask}`, ...l.slice(0, 4)])
            
            return {
              ...agent,
              position: { x: targetStation.x + offsetX, y: targetStation.y + offsetY },
              currentTask: newTask,
            }
          }
        }
        return agent
      }))
    }, 4000)
    
    return () => clearInterval(interval)
  }, [])

  // Collaboration between agents
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const available = agents.filter(a => a.name !== 'Ada' && a.status !== 'collaborating')
        if (available.length >= 2) {
          const [a1, a2] = available.slice(0, 2)
          
          setAgents(prev => prev.map(agent => {
            if (agent.id === a1.id || agent.id === a2.id) {
              return {
                ...agent,
                status: 'collaborating' as const,
                currentTask: 'Collaborating',
              }
            }
            return agent
          }))
          
          setLogs(l => [`🤝 ${a1.name} + ${a2.name} collaborating`, ...l.slice(0, 4)])
          
          setTimeout(() => {
            setAgents(prev => prev.map(agent => {
              if (agent.id === a1.id || agent.id === a2.id) {
                return { ...agent, status: 'working' as const }
              }
              return agent
            }))
          }, 3000)
        }
      }
    }, 6000)
    
    return () => clearInterval(interval)
  }, [agents])

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      
      rotateZ.set(x * 360 - 180)
      rotateX.set(30 + y * 40)
    }
  }

  const workingCount = agents.filter(a => a.status === 'working').length

  return (
    <div className="min-h-screen w-screen overflow-hidden bg-black">
      {/* Header */}
      <div 
        className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-3"
        style={{
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(6, 182, 212, 0.3)',
        }}
      >
        <AdaIncLogo />
        
        <div className="flex gap-3">
          <div 
            className="rounded-lg px-4 py-2 text-center"
            style={{
              background: 'rgba(0,0,0,0.6)',
              border: '1px solid rgba(6, 182, 212, 0.5)',
            }}
          >
            <div className="text-cyan-400/60 text-[10px]">TEAM</div>
            <div className="text-cyan-400 text-lg font-bold">{agents.length}</div>
          </div>
          <div 
            className="rounded-lg px-4 py-2 text-center"
            style={{
              background: 'rgba(0,0,0,0.6)',
              border: '1px solid rgba(34, 197, 94, 0.5)',
            }}
          >
            <div className="text-green-400/60 text-[10px]">ACTIVE</div>
            <div className="text-green-400 text-lg font-bold">{workingCount}</div>
          </div>
        </div>
      </div>

      {/* Main Scene */}
      <div 
        ref={containerRef}
        className="w-full h-screen"
        style={{ perspective: '1200px' }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <motion.div
          className="relative w-full h-full"
          style={{
            rotateX,
            rotateZ,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Floor */}
          <div 
            className="absolute rounded-2xl"
            style={{
              width: 950,
              height: 650,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%) translateZ(-50px)',
              background: 'linear-gradient(180deg, #0a0a1a 0%, #050510 100%)',
              boxShadow: '0 50px 100px rgba(0,0,0,0.8)',
            }}
          >
            {/* Grid */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #06b6d4 1px, transparent 1px),
                  linear-gradient(to bottom, #06b6d4 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
              }}
            />
            
            {/* Center circle */}
            <div 
              className="absolute rounded-full"
              style={{
                width: 200,
                height: 200,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)',
                border: '1px dashed rgba(6,182,212,0.3)',
              }}
            />
          </div>
          
          {/* Workstations */}
          {stations.map(station => (
            <Workstation key={station.id} station={station} />
          ))}
          
          {/* Connection lines (decorative) */}
          <svg 
            className="absolute pointer-events-none"
            style={{
              width: 950,
              height: 650,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 0.1,
            }}
          >
            {stations.map((s1, i) => 
              stations.slice(i + 1).map(s2 => (
                <line
                  key={`${s1.id}-${s2.id}`}
                  x1={s1.x + 25}
                  y1={s1.y + 25}
                  x2={s2.x + 25}
                  y2={s2.y + 25}
                  stroke="#06b6d4"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                />
              ))
            )}
          </svg>
          
          {/* Agents */}
          {agents.map(agent => (
            <Agent3D
              key={agent.id}
              agent={agent}
              isHovered={hoveredAgent === agent.id}
              onHover={setHoveredAgent}
            />
          ))}
        </motion.div>
      </div>
      
      {/* Activity Feed */}
      <ActivityFeed logs={logs} />
      
      {/* Controls hint */}
      <div 
        className="absolute bottom-4 left-4 text-xs text-cyan-400/40"
      >
        🎮 Drag to rotate • Ada Inc. Team Visualization
      </div>
    </div>
  )
}
