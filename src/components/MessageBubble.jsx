import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Bot, User, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import { CodeBlock } from './CodeBlock';

export function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className="animate-fade" style={{
      display: 'flex',
      gap: '16px',
      margin: '20px 0',
      justifyContent: isUser ? 'flex-end' : 'flex-start'
    }}>
      {!isUser && (
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          background: 'var(--accent-gradient)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <Bot size={18} color="#000" />
        </div>
      )}

      <div style={{
        maxWidth: '80%',
        background: isUser ? 'var(--bg-tertiary)' : 'transparent',
        border: isUser ? '1px solid var(--border-color)' : 'none',
        padding: isUser ? '12px 16px' : '0',
        borderRadius: isUser ? 'var(--radius-md) var(--radius-md) 2px var(--radius-md)' : '0',
        lineHeight: '1.6',
        fontSize: '14px'
      }}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <CodeBlock language={match[1]} code={String(children).replace(/\n$/, '')} />
              ) : (
                <code style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px' }} {...props}>
                  {children}
                </code>
              );
            }
          }}
        >
          {message.content}
        </ReactMarkdown>

        {!isUser && (
          <div style={{ display: 'flex', gap: '12px', marginTop: '10px', color: 'var(--text-muted)' }}>
            <button onClick={() => navigator.clipboard.writeText(message.content)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
              <Copy size={14} />
            </button>
            <button style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
              <ThumbsUp size={14} />
            </button>
            <button style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
              <ThumbsDown size={14} />
            </button>
          </div>
        )}
      </div>

      {isUser && (
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          background: 'var(--bg-tertiary)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <User size={18} color="var(--text-secondary)" />
        </div>
      )}
    </div>
  );
}