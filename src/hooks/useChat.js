import { useState, useEffect } from 'react';
import { sendChatMessage } from '../services/aiService';

export function useChat() {
  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem('nexa_chats');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeId, setActiveId] = useState(() => {
    const savedId = localStorage.getItem('nexa_active_id');
    return savedId || null;
  });

  const [selectedModel, setSelectedModel] = useState('gemini-1.5-flash');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem('nexa_chats', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    if (activeId) localStorage.setItem('nexa_active_id', activeId);
    else localStorage.removeItem('nexa_active_id');
  }, [activeId]);

  const activeChat = conversations.find((c) => c.id === activeId) || null;

  const createNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: 'New Conversation',
      createdAt: new Date().toISOString(),
      messages: []
    };
    setConversations((prev) => [newChat, ...prev]);
    setActiveId(newChat.id);
    return newChat.id;
  };

  const deleteChat = (id) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeId === id) {
      setActiveId(null);
    }
  };

  const renameChat = (id, newTitle) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, title: newTitle } : c))
    );
  };

  const sendMessage = async (content) => {
    if (!content.trim()) return;

    let currentId = activeId;
    let currentChat = activeChat;

    if (!currentId || !currentChat) {
      currentId = createNewChat();
    }

    const userMsg = { id: Date.now().toString(), role: 'user', content, timestamp: new Date().toISOString() };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === currentId) {
          const updatedMessages = [...c.messages, userMsg];
          const newTitle = c.messages.length === 0 ? content.slice(0, 30) + '...' : c.title;
          return { ...c, title: newTitle, messages: updatedMessages };
        }
        return c;
      })
    );

    setIsLoading(true);
    setError(null);

    try {
      const chatHistory = [...(activeChat?.messages || []), userMsg];
      const replyText = await sendChatMessage(chatHistory, selectedModel);

      const aiMsg = { id: (Date.now() + 1).toString(), role: 'assistant', content: replyText, timestamp: new Date().toISOString() };

      setConversations((prev) =>
        prev.map((c) => (c.id === currentId ? { ...c, messages: [...c.messages, aiMsg] } : c))
      );
    } catch (err) {
      setError(err.message || 'Failed to communicate with AI server');
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
  };
}