import React, { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { WelcomeScreen } from './components/WelcomeScreen';
import { MessageBubble } from './components/MessageBubble';
import { ChatInput } from './components/ChatInput';
import { SettingsModal } from './components/SettingsModal';
import { useChat } from './hooks/useChat';

export function App() {
  const {
    conversations,
    activeChat,
    activeId,
    setActiveId,
    selectedModel,
    setSelectedModel,
    isLoading,
    error,
    createNewChat,
    deleteChat,
    renameChat,
    sendMessage
  } = useChat();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages, isLoading]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Header
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        onNewChat={createNewChat}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar
          conversations={conversations}
          activeId={activeId}
          onSelect={setActiveId}
          onDelete={deleteChat}
          onRename={renameChat}
        />

        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-primary)' }}>
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
            {!activeChat || activeChat.messages.length === 0 ? (
              <WelcomeScreen onSelectPrompt={(prompt) => sendMessage(prompt)} />
            ) : (
              <div style={{ maxWidth: '840px', margin: 'auto' }}>
                {activeChat.messages.map((msg) => (
                  <MessageBubble key={msg.id} message={msg} />
                ))}

                {isLoading && (
                  <div style={{ color: 'var(--accent-cyan)', fontSize: '13px', margin: '10px 0', fontStyle: 'italic' }}>
                    NexaAI is thinking...
                  </div>
                )}

                {error && (
                  <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', borderRadius: '8px', margin: '10px 0', fontSize: '13px' }}>
                    {error}
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>
            )}
          </div>

          <ChatInput onSend={sendMessage} disabled={isLoading} />
        </main>
      </div>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}

export default App;