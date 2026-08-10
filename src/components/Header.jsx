import React from 'react';
import { Bot, Plus, Settings, Sparkles } from 'lucide-react';

export function Header({ selectedModel, setSelectedModel, onNewChat, onOpenSettings }) {
  return (
    <header style={{
      height: '64px',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      background: 'var(--bg-secondary)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          background: 'var(--accent-gradient)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 15px var(--accent-glow)'
        }}>
          <Bot size={20} color="#000" />
        </div>
        <span style={{ fontSize: '18px', fontWeight: '700', letterSpacing: '-0.5px' }}>
          Nexa<span className="gradient-text">AI</span>
        </span>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(0, 242, 254, 0.1)',
          border: '1px solid var(--border-active)',
          padding: '4px 10px',
          borderRadius: '20px',
          fontSize: '12px',
          color: 'var(--accent-cyan)'
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-cyan)' }}></span>
          Online
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          style={{
            background: 'var(--bg-tertiary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
            padding: '8px 12px',
            borderRadius: 'var(--radius-sm)',
            outline: 'none',
            fontSize: '13px',
            cursor: 'pointer'
          }}
        >
          <option value="gemini-1.5-flash">Nexa Fast (Flash)</option>
          <option value="gemini-1.5-pro">Nexa Pro (Advanced)</option>
        </select>

        <button
          onClick={onNewChat}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'var(--accent-gradient)',
            color: '#000',
            border: 'none',
            padding: '8px 14px',
            borderRadius: 'var(--radius-sm)',
            fontWeight: '600',
            fontSize: '13px',
            cursor: 'pointer'
          }}
        >
          <Plus size={16} /> New Chat
        </button>

        <button
          onClick={onOpenSettings}
          style={{
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-secondary)',
            padding: '8px',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer'
          }}
        >
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
}