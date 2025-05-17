import React, { useState, useEffect, useRef } from 'react';
import './ChatbotWidget.css';
import EzhuLogo from '../../assets/ezhu-high-resolution-logo-transparent.png';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! How can I help you?', timestamp: new Date() },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { from: 'user', text: input, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    try {
      // Use the correct backend URL (update based on Flask server IP)
const url = `${process.env.REACT_APP_CHATBOT_URL || 'https://exquisite-unity-production.up.railway.app'}/handle_message`;
      console.log('Sending request to:', url, 'REACT_APP_CHATBOT_URL:', process.env.REACT_APP_CHATBOT_URL);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      console.log('Response status:', response.status, 'Response ok:', response.ok);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      if (!data.response) {
        throw new Error('No response from server');
      }

      const botMsg = { from: 'bot', text: data.response, timestamp: new Date() };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: `Error: ${error.message || 'Unable to connect to chatbot server. Check CORS or network.'}`, timestamp: new Date() },
      ]);
    }
  };

  return (
    <div className="chatbot-container">
      <button
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chatbot' : 'Open chatbot'}
      >
        💬
      </button>
      <div className={`chatbot-box ${isOpen ? 'open' : ''}`} role="dialog" aria-hidden={!isOpen}>
        <div className="chatbot-header">
          <div className="header-two">
            <span style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>Ezhu</span>
            <img src={EzhuLogo} alt="Ezhu Logo" className="chatbot-logo" />
          </div>
          <button className="chatbot-close" onClick={() => setIsOpen(false)} aria-label="Close chatbot">
            ✕
          </button>
        </div>
        <div className="chatbot-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chatbot-msg ${msg.from}`}>
              <div className="chatbot-avatar">{msg.from === 'bot' ? '🤖' : '👤'}</div>
              <div className="chatbot-msg-content">
                <p>{msg.text}</p>
                <span className="chatbot-timestamp">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="chatbot-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            aria-label="Chat input"
          />
          <button onClick={sendMessage} aria-label="Send message">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13" />
              <path d="M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotWidget;