
import React from 'react';
import { WhatsAppMessage, MessageStatus } from '../types';
import { Icons } from '../constants';

interface MessageListProps {
  messages: WhatsAppMessage[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const MessageList: React.FC<MessageListProps> = ({ messages, selectedId, onSelect }) => {
  const getStatusLabel = (status: MessageStatus) => {
    switch (status) {
      case MessageStatus.NEW: return 'جدید';
      case MessageStatus.REVIEWED: return 'در حال بررسی';
      case MessageStatus.APPROVED: return 'تایید شده';
      case MessageStatus.REJECTED: return 'رد شده';
      default: return status;
    }
  };

  const getStatusColor = (status: MessageStatus) => {
    switch (status) {
      case MessageStatus.NEW: return 'bg-blue-100 text-blue-700';
      case MessageStatus.REVIEWED: return 'bg-yellow-100 text-yellow-700';
      case MessageStatus.APPROVED: return 'bg-green-100 text-green-700';
      case MessageStatus.REJECTED: return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-slate-200 sticky top-0 bg-white z-10">
        <h2 className="text-lg font-bold text-slate-800">صندوق ورودی</h2>
        <p className="text-sm text-slate-500">وب‌هوک‌های رسمی API واتس‌اپ</p>
      </div>
      <div className="flex-1">
        {messages.map((msg) => (
          <button
            key={msg.id}
            onClick={() => onSelect(msg.id)}
            className={`w-full text-right p-4 border-b border-slate-100 transition hover:bg-slate-50 ${
              selectedId === msg.id ? 'bg-blue-50 border-r-4 border-r-blue-600' : ''
            }`}
          >
            <div className="flex justify-between items-start mb-1">
              <span className="font-semibold text-slate-900">{msg.sender_name}</span>
              <span className="text-[10px] text-slate-400">
                {new Date(msg.timestamp).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <div className="text-sm text-slate-500 mb-2 truncate">{msg.content}</div>
            <div className="flex items-center justify-between">
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getStatusColor(msg.status)}`}>
                {getStatusLabel(msg.status)}
              </span>
              {msg.media_url && <Icons.PaperClip className="w-3.5 h-3.5 text-slate-400" />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MessageList;
