import React, { useState } from 'react';
import { Send, Paperclip, Mic } from 'lucide-react';

export function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && !disabled) {
      onSend(text);
      setText('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div style={{ padding: '16px 20px', maxWidth: '840px', margin: 'auto', width: '100%' }}>
      <form
        onSubmit={handleSubmit}
        className="glass-panel"
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '10px',
          padding: '10px 14px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)'
        }}
      >
        <button type="button" style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', paddingBottom: '6px' }}>
          <Paperclip size={18} />
        </button>

        <textarea
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask NexaAI anything... (Shift + Enter for new line)"
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text-primary)',
            fontSize: '14px',
            resize: 'none',
            maxHeight: '150px',
            fontFamily: 'inherit'
          }}
        />

        <button type="button" style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', paddingBottom: '6px' }}>
          <Mic size={18} />
        </button>

        <button
          type="submit"
          disabled={!text.trim() || disabled}
          style={{
            background: text.trim() && !disabled ? 'var(--accent-gradient)' : 'var(--bg-tertiary)',
            color: text.trim() && !disabled ? '#000' : 'var(--text-muted)',
            border: 'none',
            padding: '8px',
            borderRadius: 'var(--radius-sm)',
            cursor: text.trim() && !disabled ? 'pointer' : 'not-allowed'
          }}
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}

// Default export সহ যোগ করা হয়েছে যেন কোনো দিক দিয়ে Import error না দেয়
export default ChatInput;