import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, TrendingUp, Package, Users, IndianRupee, AlertTriangle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency } from '@/lib/utils';
import { askAI } from "@/services/aiService";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const suggestions = [
  { icon: Package, text: 'How much stock is available?' },
  { icon: AlertTriangle, text: 'Which products are low in stock?' },
  { icon: Users, text: 'Who are the top customers?' },
  { icon: IndianRupee, text: "What is today's revenue?" },
  { icon: TrendingUp, text: "Forecast next month's sales" },
  { icon: AlertTriangle, text: 'Which invoices are overdue?' },
];





export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', role: 'assistant', content: '👋 Hello! I\'m **Jayasree AI**, your intelligent business assistant.\n\nI can analyze your inventory, sales, customers, and financials in real-time. Ask me anything about your business!', timestamp: new Date() },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const getAIResponse = async (message: string) => {
  try {
    setLoading(true);

    const response = await askAI(message);

    return response.answer;
  } catch (err) {
    console.error(err);
    return "Unable to connect to the AI server.";
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
  if (!text.trim()) return;

  const userMsg: Message = {
    id: Date.now().toString(),
    role: "user",
    content: text,
    timestamp: new Date(),
  };

  setMessages((prev) => [...prev, userMsg]);
  setInput("");
  setIsTyping(true);

  try {
    const response = await getAIResponse(text);

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiMsg]);
  } catch (error: any) {
    console.error("AI Error");
    console.log(error);
    console.log(error.response);
    console.log(error.response?.data);

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "Unable to connect to the AI server.",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiMsg]);
  } finally {
    setIsTyping(false);
  }
};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - var(--header-height) - 3rem)' }}>
      <div style={{ marginBottom: '1rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={24} color="var(--color-accent-400)" /> Jayasree AI Assistant
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>AI-powered business intelligence at your fingertips</p>
      </div>

      {/* Chat Area */}
      <div className="glass-card" style={{ flex: 1, padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <AnimatePresence>
            {messages.map(msg => (
              <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', maxWidth: msg.role === 'user' ? '80%' : '90%', alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                  background: msg.role === 'assistant' ? 'var(--gradient-accent)' : 'var(--bg-tertiary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {msg.role === 'assistant' ? <Bot size={16} color="var(--text-inverse)" /> : <User size={16} color="var(--text-secondary)" />}
                </div>
                <div style={{
                  padding: '1rem 1.25rem', borderRadius: 'var(--radius-lg)',
                  background: msg.role === 'user' ? 'rgba(245,158,11,0.1)' : 'var(--bg-tertiary)',
                  border: `1px solid ${msg.role === 'user' ? 'rgba(245,158,11,0.2)' : 'var(--border-primary)'}`,
                  fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text-secondary)',
                  whiteSpace: 'pre-wrap',
                }}>
                  {msg.content.split('\n').map((line, i) => {
                    if (line.startsWith('**') && line.endsWith('**')) return <strong key={i} style={{ color: 'var(--text-primary)' }}>{line.replace(/\*\*/g, '')}<br /></strong>;
                    if (line.startsWith('|')) return <span key={i} style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{line}<br /></span>;
                    if (line.startsWith('💡') || line.startsWith('📊') || line.startsWith('📈') || line.startsWith('📦') || line.startsWith('⚠️') || line.startsWith('🔴') || line.startsWith('👥') || line.startsWith('💰')) return <div key={i} style={{ marginTop: '0.5rem', color: 'var(--text-primary)' }}>{line}</div>;
                    return <span key={i}>{line}<br /></span>;
                  })}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--gradient-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={16} color="var(--text-inverse)" />
              </div>
              <div style={{ display: 'flex', gap: '0.3rem', padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-lg)' }}>
                <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} color="var(--color-accent-400)" />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Analyzing...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div style={{ padding: '0 1.5rem 1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {suggestions.map(s => {
              const Icon = s.icon;
              return (
                <button key={s.text} onClick={() => sendMessage(s.text)}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all var(--transition-fast)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent-400)'; e.currentTarget.style.color = 'var(--color-accent-400)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-primary)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>
                  <Icon size={14} /> {s.text}
                </button>
              );
            })}
          </div>
        )}

        {/* Input */}
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-primary)', display: 'flex', gap: '0.75rem' }}>
          <input className="input-field" placeholder="Ask Jayasree AI anything about your business..." value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') sendMessage(input); }}
            style={{ flex: 1, height: 44 }} />
          <button onClick={() => sendMessage(input)} className="btn btn-primary" style={{ height: 44, width: 44, padding: 0 }} disabled={!input.trim() || isTyping}>
            <Send size={18} />
          </button>
        </div>
      </div>

      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
