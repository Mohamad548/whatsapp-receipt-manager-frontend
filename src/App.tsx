
import React, { useState, useMemo, useEffect } from 'react';
import { MessageStatus, WhatsAppMessage } from './types';
import { Icons } from './constants';
import MessageList from './components/MessageList';
import MessageDetail from './components/MessageDetail';
import SystemDesign from './components/SystemDesign';
import DashboardOverview from './components/DashboardOverview';
import { fetchMessages, updateMessageStatus as updateStatus } from './api/client';

const App: React.FC = () => {
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [view, setView] = useState<'dashboard' | 'messages' | 'design'>('dashboard');
  const [loading, setLoading] = useState(true);

  // بارگذاری پیام‌ها از Backend
  useEffect(() => {
    const loadMessages = async () => {
      try {
        setLoading(true);
        const data = await fetchMessages();
        setMessages(data);
      } catch (error) {
        console.error('Error loading messages:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
    
    // بارگذاری مجدد هر 30 ثانیه
    const interval = setInterval(loadMessages, 30000);
    return () => clearInterval(interval);
  }, []);

  const selectedMessage = useMemo(() => 
    messages.find(m => m.id === selectedMessageId) || null
  , [messages, selectedMessageId]);

  const handleUpdateStatus = async (id: string, status: MessageStatus) => {
    try {
      const updated = await updateStatus(id, status);
      if (updated) {
        setMessages(prev => prev.map(m => m.id === id ? updated : m));
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden" dir="rtl">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Icons.Shield className="w-6 h-6 text-blue-400" />
            حساب‌تراک
          </h1>
          <p className="text-xs text-slate-400 mt-1">مدیریت رسیدهای واتس‌اپ</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setView('dashboard')}
            className={`w-full text-right px-4 py-3 rounded-lg transition flex items-center justify-between ${view === 'dashboard' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            داشبورد
          </button>
          <button 
            onClick={() => setView('messages')}
            className={`w-full text-right px-4 py-3 rounded-lg transition flex items-center justify-between ${view === 'messages' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <span>پیام‌های دریافتی</span>
            {messages.filter(m => m.status === MessageStatus.NEW).length > 0 && (
              <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                {messages.filter(m => m.status === MessageStatus.NEW).length}
              </span>
            )}
          </button>
          <button 
            onClick={() => setView('design')}
            className={`w-full text-right px-4 py-3 rounded-lg transition flex items-center justify-between ${view === 'design' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            راهنمای اتصال (API)
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
          نسخه ۱.۲.۰ - آماده بهره‌برداری
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {view === 'dashboard' && <DashboardOverview messages={messages} />}
        
        {view === 'messages' && (
          <div className="flex-1 flex overflow-hidden">
            <div className="w-96 border-l border-slate-200 bg-white overflow-y-auto">
              {loading ? (
                <div className="p-8 text-center text-slate-400">
                  <Icons.Clock className="w-8 h-8 mx-auto mb-2 animate-spin" />
                  <p>در حال بارگذاری پیام‌ها...</p>
                </div>
              ) : (
                <MessageList 
                  messages={messages} 
                  selectedId={selectedMessageId} 
                  onSelect={setSelectedMessageId} 
                />
              )}
            </div>
            <div className="flex-1 bg-white overflow-y-auto">
              <MessageDetail 
                message={selectedMessage} 
                onUpdateStatus={handleUpdateStatus} 
              />
            </div>
          </div>
        )}

        {view === 'design' && (
          <div className="flex-1 overflow-y-auto p-8">
            <SystemDesign />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
