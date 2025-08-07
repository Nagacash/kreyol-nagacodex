import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTutorResponse } from '../services/geminiService';
import Card from '../components/Card';
import { ChatMessage } from '../types';
import BotIcon from '../components/icons/BotIcon';
import SendIcon from '../components/icons/SendIcon';

const Practice: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const addInitialMessage = useCallback(() => {
    setMessages([
      {
        sender: 'ai',
        text: "Bonjou! I am your AI tutor for Guyanese Creole. Ask me a question, or try saying something in Creole. For example, try asking me 'Kouman ou yé?'",
      },
    ]);
  }, []);

  useEffect(() => {
    addInitialMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const newMessages: ChatMessage[] = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const aiResponse = await getTutorResponse(input, messages);
      setMessages([...newMessages, { sender: 'ai', text: aiResponse }]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Sorry, something went wrong. ${errorMessage}`);
      setMessages([...newMessages, { sender: 'ai', text: "I'm having a little trouble right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <h1 className="text-3xl font-bold tracking-tight text-primary mb-2 font-serif">AI Practice Partner</h1>
      <p className="text-lg text-muted-foreground mb-4">
        Time to practice! Chat with our AI tutor to test your skills in real-time.
      </p>
      <Card className="flex-1 flex flex-col p-0">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    <BotIcon className="w-5 h-5"/>
                  </div>
                )}
                <div
                  className={`max-w-xl p-3 rounded-lg whitespace-pre-wrap ${
                    msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-end gap-2 justify-start">
               <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    <BotIcon className="w-5 h-5"/>
                  </div>
              <div className="p-3 rounded-lg bg-secondary text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></span>
                </div>
              </div>
            </motion.div>
          )}
          {error && <div className="text-destructive text-sm text-center">{error}</div>}
          <div ref={messagesEndRef} />
        </div>
        <div className="border-t p-4 bg-card">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message here..."
              className="w-full px-4 py-2 pr-12 border border-input rounded-full bg-secondary focus:ring-2 focus:ring-ring focus:outline-none"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground h-8 w-8 rounded-full flex items-center justify-center disabled:opacity-50 hover:bg-primary/90 transition-opacity"
              aria-label="Send message"
            >
              <SendIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Practice;