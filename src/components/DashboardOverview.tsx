
import React from 'react';
import { WhatsAppMessage, MessageStatus } from '../types';
import { Icons } from '../constants';

interface DashboardOverviewProps {
  messages: WhatsAppMessage[];
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ messages }) => {
  const stats = {
    total: messages.length,
    new: messages.filter(m => m.status === MessageStatus.NEW).length,
    approved: messages.filter(m => m.status === MessageStatus.APPROVED).length,
    reviewed: messages.filter(m => m.status === MessageStatus.REVIEWED).length,
  };

  return (
    <div className="p-8 space-y-8" dir="rtl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <header>
          <h1 className="text-3xl font-bold text-slate-900">میز کار حسابداری</h1>
          <p className="text-slate-500">خلاصه وضعیت رسیدهای دریافتی امروز</p>
        </header>
        
        {/* وضعیت اتصال با جزئیات فنی */}
        <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-left font-mono">
            <p className="text-[9px] text-slate-400 font-bold uppercase leading-none mb-1">Connected Phone ID</p>
            <p className="text-[10px] font-bold text-blue-600 leading-none tracking-tighter">105432XXXXX987</p>
          </div>
          <div className="h-8 w-px bg-slate-100"></div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="text-right">
              <p className="text-[9px] text-slate-400 font-bold leading-none mb-0.5">وضعیت API</p>
              <p className="text-[11px] font-bold text-slate-700 leading-none">Cloud v20.0</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="کل تراکنش‌ها" value={stats.total} icon={<Icons.PaperClip className="w-6 h-6" />} color="bg-blue-500" />
        <StatCard title="در انتظار بررسی" value={stats.new} icon={<Icons.Clock className="w-6 h-6" />} color="bg-amber-500" />
        <StatCard title="تایید نهایی شده" value={stats.approved} icon={<Icons.Check className="w-6 h-6" />} color="bg-green-500" />
        <StatCard title="پرونده‌های مشکوک" value={stats.reviewed} icon={<Icons.XMark className="w-6 h-6" />} color="bg-slate-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold mb-4">نمودار پیشرفت بررسی‌ها</h2>
          <div className="h-4 w-full bg-slate-100 rounded-full flex flex-row-reverse overflow-hidden">
            <div className="bg-green-500 h-full" style={{ width: `${(stats.approved / (stats.total || 1)) * 100}%` }}></div>
            <div className="bg-amber-500 h-full" style={{ width: `${(stats.new / (stats.total || 1)) * 100}%` }}></div>
            <div className="bg-slate-300 h-full" style={{ width: `${((stats.total - stats.approved - stats.new) / (stats.total || 1)) * 100}%` }}></div>
          </div>
          <div className="flex gap-6 mt-4 text-sm justify-start">
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full"></div> تایید شده</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-amber-500 rounded-full"></div> جدید</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-slate-300 rounded-full"></div> سایر موارد</div>
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl text-white flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
               <h2 className="font-bold">راهنمای هوشمند</h2>
               <Icons.Shield className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              برای دیدن پیام‌های واقعی، باید <strong>Webhook</strong> را روی آدرس دامنه خود تنظیم کنید. در حال حاضر پیام‌های نمایش داده شده صرفاً جهت دمو هستند.
            </p>
            <button className="w-full text-xs bg-blue-600 hover:bg-blue-500 py-2.5 rounded-lg transition font-bold">مشاهده مستندات فنی</button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }: any) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between transition hover:shadow-md">
    <div className="text-right">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{title}</p>
      <p className="text-3xl font-extrabold text-slate-900">{value}</p>
    </div>
    <div className={`p-3 rounded-2xl text-white ${color} shadow-lg shadow-${color.split('-')[1]}-200`}>
      {icon}
    </div>
  </div>
);

export default DashboardOverview;
