import React, { useState } from 'react';
import { MessageSquare, Trash2, Edit2, Search, PanelLeftClose, PanelLeftOpen } from 'lucide-react';

export function Sidebar({ conversations, activeId, onSelect, onDelete, onRename }) {
  const [search, setSearch] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const filtered = conversations.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  if (isCollapsed) {
    return (
      <div style={{
        width: '60px',
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px 0'
      }}>
        <button
          onClick={() => setIsCollapsed(false)}
          style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
        >
          <PanelLeftOpen size={20} />
        </button>
      </div>
    );
  }

  return (
    <aside style={{
      width: '260px',
      background: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', letterSpacing: '1px' }}>
          CHAT HISTORY
        </span>
        <button
          onClick={() => setIsCollapsed(true)}
          style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
        >
          <PanelLeftClose size={18} />
        </button>
      </div>

      <div style={{ padding: '0 16px 12px 16px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'var(--bg-tertiary)',
          border: '1px solid var(--border-color)',
          padding: '6px 10px',
          borderRadius: 'var(--radius-sm)'
        }}>
          <Search size={14} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search chats..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '12px',
              width: '100%'
            }}
          />
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 12px' }}>
        {filtered.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelect(chat.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 12px',
              margin: '4px 0',
              borderRadius: 'var(--radius-sm)',
              background: chat.id === activeId ? 'var(--bg-tertiary)' : 'transparent',
              border: chat.id === activeId ? '1px solid var(--border-active)' : '1px solid transparent',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
              <MessageSquare size={14} color={chat.id === activeId ? 'var(--accent-cyan)' : 'var(--text-muted)'} />
              <span style={{ fontSize: '13px', color: chat.id === activeId ? 'var(--text-primary)' : 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {chat.title}
              </span>
            </div>
            {chat.id === activeId && (
              <div style={{ display: 'flex', gap: '4px' }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const title = prompt('New chat name:', chat.title);
                    if (title) onRename(chat.id, title);
                  }}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  <Edit2 size={12} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(chat.id);
                  }}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  <Trash2 size={12} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}