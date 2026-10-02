import React from 'react';
import { User } from '../types';

interface HeaderProps {
  cartCount: number;
  user: User | null;
  onOpenCart: () => void;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  user,
  onOpenCart,
  onOpenLogin,
  onLogout,
}) => {
  return (
    <header className="fixed top-0 left-0 w-full h-[80px] bg-black/95 border-b-[3px] border-[#e1c718] z-40 flex items-center justify-between px-4 sm:px-8">
      {/* Brand */}
      <a href="#" className="flex items-center gap-3 text-[#e1c718] no-underline group">
        <img
          src="https://labs.google.com/pomelli_downloads/websites/aUlwhNyOoORdt7mANvU4t4/resources/9bOn9QbYO9i6NsPiU0wkIO?authuser=0"
          alt="갤러리카페520 로고"
          referrerPolicy="no-referrer"
          className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
        <span className="font-pixel text-xs sm:text-sm text-[#e1c718] tracking-wider">
          갤러리카페520
        </span>
      </a>

      {/* Navigation Links */}
      <nav className="hidden lg:flex items-center gap-6">
        <ul className="flex items-center gap-6 list-none m-0 p-0 font-mono-code text-xs uppercase tracking-wider">
          <li>
            <a href="#about" className="text-white hover:text-[#34e0b3] transition-colors">
              소개
            </a>
          </li>
          <li>
            <a href="#products" className="text-white hover:text-[#34e0b3] transition-colors">
              메뉴 &amp; 공간
            </a>
          </li>
          <li>
            <a href="#gallery" className="text-white hover:text-[#34e0b3] transition-colors">
              갤러리
            </a>
          </li>
          <li>
            <a href="#location" className="text-white hover:text-[#34e0b3] transition-colors">
              위치 &amp; 안내
            </a>
          </li>
        </ul>
      </nav>

      {/* Right Controls: Cart & Login */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* 🛒 Cart: [Badge] */}
        <button
          onClick={onOpenCart}
          className="flex items-center gap-1.5 px-3 py-2 border border-[#e1c718]/60 hover:border-[#e1c718] bg-[#0c120c] hover:bg-[#162216] text-[#e1c718] font-mono-code text-xs sm:text-sm transition-all shadow-[0_0_10px_rgba(225,199,24,0.15)] hover:shadow-[0_0_15px_rgba(225,199,24,0.4)] cursor-pointer"
          title="장바구니 확인"
          aria-label={`장바구니 담긴 상품 ${cartCount}개`}
        >
          <span className="font-semibold">🛒 Cart:</span>
          {/* 눈에 띄는 빨간색 숫자 배지 */}
          <span
            className="inline-flex items-center justify-center bg-red-600 text-white font-bold text-xs px-2 py-0.5 rounded-full min-w-[20px] h-5 shadow-[0_0_8px_rgba(239,68,68,0.8)] ml-0.5 tabular-nums transition-transform transform active:scale-125"
          >
            {cartCount}
          </span>
        </button>

        {/* Login / User Status Button */}
        {user ? (
          <button
            onClick={onLogout}
            className="group flex items-center gap-1.5 bg-[#0f170f] text-[#34e0b3] hover:text-red-300 border-2 border-[#34e0b3] hover:border-red-500 hover:bg-red-950/40 px-3.5 py-1.5 font-mono-code text-xs font-bold transition-all shadow-[0_0_12px_rgba(52,224,179,0.25)] cursor-pointer"
            title="클릭 시 로그아웃"
          >
            <span className="truncate max-w-[100px] sm:max-w-[140px] text-white">
              {user.name}님
            </span>
            <span className="text-[#e1c718] group-hover:text-red-400 font-medium">
              (로그아웃)
            </span>
          </button>
        ) : (
          <button
            onClick={onOpenLogin}
            className="inline-block bg-transparent text-[#e1c718] border-2 border-[#e1c718] px-3.5 py-1.5 font-pixel text-[11px] sm:text-xs transition-all shadow-[0_0_10px_rgba(225,199,24,0.3)] hover:bg-[#e1c718] hover:text-black hover:shadow-[0_0_18px_rgba(225,199,24,0.8)] cursor-pointer"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};
