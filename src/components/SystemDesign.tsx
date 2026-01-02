
import React, { useState } from 'react';
import { Icons } from '../constants';

const SystemDesign: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ui' | 'code'>('ui');

  const webhookCode = `// app/api/whatsapp/route.ts (Next.js 13+ App Router)
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  // این همان Verify Token است که در فیس‌بوک وارد می‌کنید
  const VERIFY_TOKEN = 'MySecret123'; 

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 });
  }
  return new Response('Forbidden', { status: 403 });
}

export async function POST(request: Request) {
  const body = await request.json();
  console.log('رسید پیام جدید:', JSON.stringify(body, null, 2));
  
  // اینجا باید منطق ذخیره در دیتابیس را بنویسید
  
  return NextResponse.json({ status: 'ok' });
}`;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        {/* هدر */}
        <div className="bg-slate-900 p-8 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-600 rounded-2xl">
              <Icons.Shield className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">اتصال نهایی به Vercel و Meta</h1>
              <p className="text-slate-400 text-sm">راهنمای تکمیل کادرهای خالی در تصویر شما</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* ستون اول: راهنمای فرم */}
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
                راهنمای تکمیل فرم Configuration
              </h2>
              
              <div className="space-y-6">
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 relative">
                  <span className="absolute -right-3 top-5 bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">۱</span>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Callback URL</label>
                  <p className="text-xs text-slate-500 mb-3">آدرس دپلوی شده در ورسل را به همراه مسیر API وارد کنید:</p>
                  <div className="bg-white p-3 rounded-lg border border-blue-200 font-mono text-sm text-blue-700 break-all">
                    https://your-app.vercel.app/api/whatsapp
                  </div>
                </div>

                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 relative">
                  <span className="absolute -right-3 top-5 bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">۲</span>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Verify token</label>
                  <p className="text-xs text-slate-500 mb-3">یک عبارت دلخواه بنویسید (باید با کد سمت سرور یکی باشد):</p>
                  <div className="bg-white p-3 rounded-lg border border-blue-200 font-mono text-sm text-blue-700">
                    MySecret123
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex gap-3">
                  <Icons.Clock className="w-6 h-6 text-amber-600 shrink-0" />
                  <p className="text-xs text-amber-800 leading-relaxed">
                    <strong>دقت کنید:</strong> بعد از زدن دکمه <strong>Verify and Save</strong> در پنل متا، فیس‌بوک یک درخواست تست به سایت شما می‌فرستد. اگر کد مرحله بعد را در پروژه نداشته باشید، خطا می‌دهد.
                  </p>
                </div>
              </div>
            </div>

            {/* ستون دوم: کد برنامه */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-800">کد مورد نیاز برای Next.js</h2>
                <div className="flex bg-slate-100 p-1 rounded-lg text-[10px] font-bold">
                  <button onClick={() => setActiveTab('ui')} className={`px-3 py-1 rounded-md ${activeTab === 'ui' ? 'bg-white shadow-sm' : ''}`}>توضیح</button>
                  <button onClick={() => setActiveTab('code')} className={`px-3 py-1 rounded-md ${activeTab === 'code' ? 'bg-white shadow-sm' : ''}`}>کد کامل</button>
                </div>
              </div>

              {activeTab === 'code' ? (
                <div className="relative group">
                  <pre className="bg-slate-900 text-blue-300 p-6 rounded-2xl text-[11px] font-mono overflow-x-auto h-[400px]">
                    {webhookCode}
                  </pre>
                  <button 
                    onClick={() => navigator.clipboard.writeText(webhookCode)}
                    className="absolute top-4 left-4 bg-white/10 hover:bg-white/20 text-white text-[10px] px-3 py-1.5 rounded-lg transition"
                  >
                    کپی کد
                  </button>
                </div>
              ) : (
                <div className="bg-blue-600 rounded-2xl p-8 text-white h-[400px] flex flex-col justify-center">
                  <h3 className="text-xl font-bold mb-4">این کد چه می‌کند؟</h3>
                  <ul className="space-y-4 text-sm opacity-90">
                    <li className="flex gap-2">
                      <Icons.Check className="w-5 h-5 shrink-0" />
                      تایید هویت سایت شما توسط فیس‌بوک (Handshake)
                    </li>
                    <li className="flex gap-2">
                      <Icons.Check className="w-5 h-5 shrink-0" />
                      دریافت لحظه‌ای پیام‌ها (POST Request)
                    </li>
                    <li className="flex gap-2">
                      <Icons.Check className="w-5 h-5 shrink-0" />
                      امکان استخراج متن و عکس رسید از داخل پیام
                    </li>
                  </ul>
                  <div className="mt-8 pt-8 border-t border-white/20">
                    <p className="text-xs italic">پس از قرار دادن این کد در پروژه و دپلوی در ورسل، دکمه آبی پنل متا را بزنید.</p>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemDesign;
