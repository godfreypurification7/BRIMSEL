import { useState, useRef, useEffect } from 'react';

export default function ChatWindow({ messages, onSendMessage, loading }) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className="chat-container">
      <div className="messages-list">
        {messages.map((msg, index) => (
          <div key={index} className={`message-bubble ${msg.sender === 'user' ? 'user-msg' : 'bot-msg'}`}>
            <span className="msg-icon">{msg.sender === 'user' ? '👦' : '🤖'}</span>
            <div className="msg-text">
              {msg.text.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        ))}
        {loading && (
          <div className="message-bubble bot-msg">
            <span className="msg-icon">🤖</span>
            <div className="msg-text typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input-form" onSubmit={handleSend}>
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your answer or say hello... 💬"
          maxLength={500}
          disabled={loading}
        />
        <button type="submit" disabled={loading || !input.trim()}>
          Send 🚀
        </button>
      </form>
    </div>
  );
}