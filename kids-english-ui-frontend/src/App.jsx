import { useState, useEffect } from 'react';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import ProgressDashboard from './components/ProgressDashboard';
import { sendMessage, getProgress, resetProgress } from './services/api';
import { getChildId } from './utils/storage';
import './App.css';

export default function App() {
  const [childId] = useState(getChildId());
  const [progress, setProgress] = useState({
    level: 1,
    correctStreak: 0,
    totalCorrect: 0,
    totalAnswered: 0,
    mode: 'learning'
  });
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hello, little star! 🌟 Let's learn English together! What color is the sky? 💙" }
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProgress(childId)
      .then((res) => {
        if (res.success) setProgress(res.progress);
      })
      .catch(() => console.error("Failed to load progress"));
  }, [childId]);

  const handleSendMessage = async (text) => {
    const userMsg = { sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const response = await sendMessage(childId, text);
      if (response.success) {
        setMessages((prev) => [...prev, { sender: 'bot', text: response.reply }]);
        setProgress(response.progress);
      }
    } catch {
      setMessages((prev) => [
        ...prev, 
        { sender: 'bot', text: "Oops! Something went wrong, but let's keep playing! 🌟" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    try {
      const res = await resetProgress(childId);
      if (res.success) {
        setProgress({
          level: 1,
          correctStreak: 0,
          totalCorrect: 0,
          totalAnswered: 0,
          mode: 'learning'
        });
        setMessages([
          { sender: 'bot', text: "Progress reset! Let's start fresh. 🚀 What color is the sky? 💙" }
        ]);
      }
    } catch {
      console.error("Failed to reset progress");
    }
  };

  return (
    <div className="app-layout">
      <Header 
        childId={childId} 
        mode={progress.mode} 
        level={progress.level} 
        correctStreak={progress.correctStreak} 
      />
      <div className="main-content">
        <div className="chat-section">
          <ChatWindow 
            messages={messages} 
            onSendMessage={handleSendMessage} 
            loading={loading} 
          />
        </div>
        <div className="sidebar-section">
          <ProgressDashboard 
            progress={progress} 
            onReset={handleReset} 
          />
        </div>
      </div>
    </div>
  );
}