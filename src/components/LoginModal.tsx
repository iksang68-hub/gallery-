import React, { useState } from 'react';
import { User } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  // 1초 구글 로그인 핸들러
  const handleGoogleLogin = () => {
    // Google 1-click login
    const googleUser: User = {
      id: 'usr-google-101',
      name: 'iksang68',
      email: 'iksang68@gmail.com',
      loginType: 'google'
    };
    onLogin(googleUser);
    onClose();
  };

  // 일반 아이디 / 비밀번호 로그인 핸들러
  const handleStandardLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setErrorMessage('아이디를 입력해주세요.');
      return;
    }
    if (!password.trim()) {
      setErrorMessage('비밀번호를 입력해주세요.');
      return;
    }

    const standardUser: User = {
      id: `usr-${Date.now()}`,
      name: username.trim(),
      email: username.includes('@') ? username.trim() : `${username.trim()}@cafe520.kr`,
      loginType: 'standard'
    };

    onLogin(standardUser);
    onClose();
  };

  const handleQuickFill = (name: string) => {
    setUsername(name);
    setPassword('cafe520!');
    setErrorMessage('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-md bg-[#0a0f0a] border-2 border-[#e1c718] p-6 sm:p-8 shadow-[0_0_40px_rgba(225,199,24,0.35)] text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-[#e1c718] font-mono-code text-lg p-1 transition-colors"
          aria-label="모달 닫기"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-block text-[#34e0b3] font-pixel text-[10px] tracking-wider border border-[#34e0b3] px-2.5 py-1 mb-2 bg-[#34e0b3]/10">
            MEMBER LOGIN
          </div>
          <h2 id="login-modal-title" className="text-2xl font-bold text-[#e1c718] tracking-tight">
            갤러리카페520 회원 로그인
          </h2>
          <p className="text-xs text-stone-400 font-mono-code mt-1.5">
            영국 앤틱 감성의 마법 공간에 오신 것을 환영합니다
          </p>
        </div>

        {/* 1. 구글 계정으로 1초 로그인 버튼 */}
        <div className="mb-6">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white text-stone-900 font-bold py-3 px-4 border-2 border-white hover:bg-stone-100 hover:border-[#e1c718] transition-all shadow-[0_4px_12px_rgba(255,255,255,0.15)] group"
          >
            {/* Google Logo SVG */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.13C3.27 21.39 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.26C.46 8.18 0 9.99 0 12s.46 3.82 1.26 5.42l4.02-3.13z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.27 2.61 1.26 6.58l4.02 3.13c.95-2.83 3.6-4.96 6.72-4.96z"
              />
            </svg>
            <span className="font-sans-kr text-sm group-hover:text-black">
              구글 계정으로 1초 로그인
            </span>
          </button>
          <div className="flex items-center justify-center mt-2">
            <span className="text-[11px] text-[#34e0b3] font-mono-code">
              ⚡ 클릭 한 번으로 즉시 로그인됩니다 (iksang68님)
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-5">
          <div className="border-t border-stone-700 w-full" />
          <span className="bg-[#0a0f0a] px-3 text-xs font-mono-code text-stone-500 whitespace-nowrap">
            또는 일반 아이디 로그인
          </span>
          <div className="border-t border-stone-700 w-full" />
        </div>

        {/* 2. 일반 아이디/비밀번호 입력창 */}
        <form onSubmit={handleStandardLogin} className="space-y-4">
          {errorMessage && (
            <div className="p-2.5 bg-red-950/80 border border-red-500 text-red-200 text-xs font-mono-code">
              ⚠️ {errorMessage}
            </div>
          )}

          <div>
            <label className="block text-xs font-mono-code text-[#e1c718] mb-1.5">
              아이디 (USERNAME)
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="예: iksang68 또는 해리포터"
              className="w-full bg-[#121a12] border border-stone-700 focus:border-[#e1c718] focus:ring-1 focus:ring-[#e1c718] px-3.5 py-2.5 text-sm text-white placeholder-stone-600 outline-none transition-colors font-mono-code"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-code text-[#e1c718] mb-1.5">
              비밀번호 (PASSWORD)
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#121a12] border border-stone-700 focus:border-[#e1c718] focus:ring-1 focus:ring-[#e1c718] px-3.5 py-2.5 text-sm text-white placeholder-stone-600 outline-none transition-colors font-mono-code"
            />
          </div>

          {/* Quick Demo Test Buttons */}
          <div className="pt-1">
            <span className="text-[11px] text-stone-500 font-mono-code block mb-1.5">
              빠른 테스트 계정 선택:
            </span>
            <div className="flex gap-2 flex-wrap">
              {['iksang68', '해리포터', '헤르미온느'].map((testName) => (
                <button
                  key={testName}
                  type="button"
                  onClick={() => handleQuickFill(testName)}
                  className="text-xs bg-[#1a251a] hover:bg-[#253925] text-[#34e0b3] border border-[#34e0b3]/40 px-2.5 py-1 font-mono-code transition-colors"
                >
                  {testName}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-transparent text-[#e1c718] border-2 border-[#e1c718] py-2.5 px-4 font-mono-code font-bold text-sm tracking-wider hover:bg-[#e1c718] hover:text-black transition-all shadow-[0_0_15px_rgba(225,199,24,0.3)] hover:shadow-[0_0_20px_rgba(225,199,24,0.7)]"
          >
            로그인 (LOGIN)
          </button>
        </form>

        <div className="mt-5 text-center">
          <p className="text-[11px] text-stone-500 font-mono-code">
            로그인 시 장바구니 및 주문 내역이 안전하게 보존됩니다.
          </p>
        </div>
      </div>
    </div>
  );
};
