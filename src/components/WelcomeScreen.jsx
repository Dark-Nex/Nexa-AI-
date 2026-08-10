import React from 'react';
import { Code, Lightbulb, Compass, Rocket } from 'lucide-react';

export function WelcomeScreen({ onSelectPrompt }) {
  const cards = [
    { icon: <Code color="var(--accent-cyan)" size={24} />, title: "Build a React Application", desc: "Generate architecture and custom components for web apps." },
    { icon: <Lightbulb color="#ffb703" size={24} />, title: "Explain a Complex Topic", desc: "Break down intricate algorithms, tech concepts, or science." },
    { icon: <Compass color="#a855f7" size={24} />, title: "Write & Refine Code", desc: "Debug, optimize, or translate code across programming languages." },
    { icon: <Rocket color="#ec4899" size={24} />, title: "Create a Business Strategy", desc: "Draft pitch ideas, marketing plans, and SaaS project roadmaps." }
  ];

  return (
    <div style={{
      maxWidth: '800px',
      margin: 'auto',
      padding: '40px 20px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '70vh'
    }}>
      <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '12px' }}>
        How can I help you today?
      </h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginBottom: '40px' }}>
        Ask anything. Build anything. Explore ideas with <span className="gradient-text">NexaAI</span>.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px',
        width: '100%'
      }}>
        {cards.map((card, idx) => (
          <div
            key={idx}
            onClick={() => onSelectPrompt(card.title)}
            className="glass-panel"
            style={{
              padding: '20px',
              borderRadius: 'var(--radius-md)',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
          >
            <div style={{ marginBottom: '12px' }}>{card.icon}</div>
            <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '6px' }}>{card.title}</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}