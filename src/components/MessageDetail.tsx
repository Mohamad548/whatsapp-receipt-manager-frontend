
import React from 'react';
import { WhatsAppMessage, MessageStatus } from '../types';
import { Icons } from '../constants';

interface MessageDetailProps {
  message: WhatsAppMessage | null;
  onUpdateStatus: (id: string, status: MessageStatus) => void;
}

const MessageDetail: React.FC<MessageDetailProps> = ({ message, onUpdateStatus }) => {
  if (!message) {
    return (
      <div className="h-full flex items-center justify-center text-slate-400 flex-col gap-4">
        <div className="p-8 bg-slate-50 rounded-full">
          <Icons.PaperClip className="w-12 h-12" />
        </div>
        <p>یک پیام را برای بررسی رسید پرداخت انتخاب کنید</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto" dir="rtl">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{message.sender_name}</h2>
          <p className="text-slate-500" dir="ltr">{message.sender_phone} • شناسه: {message.wa_id}</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => onUpdateStatus(message.id, MessageStatus.APPROVED)}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            <Icons.Check className="w-4 h-4" /> تایید رسید
          </button>
          <button 
            onClick={() => onUpdateStatus(message.id, MessageStatus.REJECTED)}
            className="flex items-center gap-2 border border-red-200 text-red-600 px-6 py-2 rounded-lg hover:bg-red-50 transition"
          >
            <Icons.XMark className="w-4 h-4" /> رد تراکنش
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 border-b pb-2">متن پیام مشتری</h3>
            <p className="text-slate-800 leading-relaxed">{message.content}</p>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 border-b pb-2">اطلاعات سیستمی</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-500 text-sm">زمان ارسال:</span>
                <span className="text-slate-800 text-sm font-medium">{new Date(message.timestamp).toLocaleString('fa-IR')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 text-sm">نوع فایل:</span>
                <span className="text-slate-800 text-sm font-medium" dir="ltr">{message.mime_type || 'نامشخص'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 text-sm">وضعیت فعلی:</span>
                <span className={`text-sm font-bold ${
                  message.status === MessageStatus.APPROVED ? 'text-green-600' : 
                  message.status === MessageStatus.REJECTED ? 'text-red-600' : 'text-blue-600'
                }`}>
                  {message.status === MessageStatus.APPROVED ? 'تایید شده' : 
                   message.status === MessageStatus.REJECTED ? 'رد شده' : 'در انتظار بررسی'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          {message.media_url ? (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">تصویر رسید پرداخت</h3>
              <div className="relative group border border-slate-200 rounded-xl overflow-hidden shadow-lg bg-black">
                <img 
                  src={message.media_url} 
                  alt="رسید پرداخت" 
                  className="w-full h-auto object-contain max-h-[600px] hover:scale-105 transition duration-500"
                />
              </div>
              <p className="text-[11px] text-center text-slate-400 italic">تصویر از فضای ابری امن بارگذاری شده است</p>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 text-slate-400">
              تصویری به این پیام ضمیمه نشده است.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageDetail;
