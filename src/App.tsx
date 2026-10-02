/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Product, CartItem, User } from './types';
import {
  FEATURED_PRODUCT,
  SPACE_PRODUCTS,
  SPECIALTY_PRODUCTS,
} from './data/products';
import { Header } from './components/Header';
import { Toast } from './components/Toast';
import { LoginModal } from './components/LoginModal';
import { CartModal } from './components/CartModal';

export default function App() {
  // 1. 장바구니 상태 및 로컬스토리지 연동
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('gallerycafe520_cart');
      if (savedCart) {
        return JSON.parse(savedCart);
      }
    } catch {
      // fallback to empty if localStorage parsing fails
    }
    return [];
  });

  // 2. 회원 상태 및 로컬스토리지 연동
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem('gallerycafe520_user');
      if (savedUser) {
        return JSON.parse(savedUser);
      }
    } catch {
      // fallback to null
    }
    return null;
  });

  // 3. 토스트 알림 상태 (2초 후 자동 사라짐)
  const [toastMessage, setToastMessage] = useState<string>('');
  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 4. 모달 상태
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  // 장바구니 변경 시 로컬스토리지 저장
  useEffect(() => {
    try {
      localStorage.setItem('gallerycafe520_cart', JSON.stringify(cartItems));
    } catch (err) {
      console.error('Failed to save cart to localStorage', err);
    }
  }, [cartItems]);

  // 회원 정보 변경 시 로컬스토리지 저장
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('gallerycafe520_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('gallerycafe520_user');
      }
    } catch (err) {
      console.error('Failed to save user to localStorage', err);
    }
  }, [user]);

  // 총 장바구니 상품 수량
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // 토스트 메시지 띄우기 (2초 지속)
  const triggerToast = (message: string) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToastMessage(message);
    setIsToastVisible(true);

    toastTimeoutRef.current = setTimeout(() => {
      setIsToastVisible(false);
    }, 2000);
  };

  // Add to Cart 핸들러: 모든 'Add to Cart' 버튼에서 호출
  const handleAddToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.product.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });

    // 요구사항: 'Add to Cart' 버튼을 누를 때마다 화면 오른쪽 위에 "☕ 장바구니에 상품이 담겼습니다!"라는 깔끔한 토스트 알림창이 2초간 떴다가 사라지게 해줘.
    triggerToast('☕ 장바구니에 상품이 담겼습니다!');
  };

  // 장바구니 수량 조정 (+ / -)
  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  // 장바구니 개별 삭제
  const handleRemoveItem = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  // 장바구니 비우기
  const handleClearCart = () => {
    setCartItems([]);
  };

  // 로그인 핸들러
  const handleLogin = (newUser: User) => {
    setUser(newUser);
    triggerToast(`✨ ${newUser.name}님 환영합니다!`);
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    setUser(null);
    triggerToast('로그아웃되었습니다.');
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans-kr selection:bg-[#e1c718] selection:text-black">
      {/* 1. 상단 헤더 */}
      <Header
        cartCount={totalCartCount}
        user={user}
        onOpenCart={() => setIsCartModalOpen(true)}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* 토스트 알림창 */}
      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
      />

      {/* 로그인 모달 */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />

      {/* 장바구니 모달 / 드로어 */}
      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Main Content Area */}
      <main className="pt-[80px]">
        {/* Hero Section */}
        <section
          className="relative min-h-[calc(100vh-80px)] flex items-center justify-center p-6 sm:p-16 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://labs.google.com/pomelli_downloads/websites/aUlwhNyOoORdt7mANvU4t4/resources/9ya4X5xOcMTejZFKR3g4ha?authuser=0')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/65 to-black/95 pointer-events-none" />

          <div className="relative z-10 max-w-[900px] w-full text-center border-2 border-[#369807] bg-black/88 p-8 sm:p-14 shadow-[0_0_35px_rgba(54,152,7,0.35)]">
            <span className="inline-block font-pixel text-xs text-[#34e0b3] bg-[#34e0b3]/10 border border-[#34e0b3] px-3.5 py-1.5 mb-6">
              BRITISH VINTAGE &amp; MAGIC
            </span>

            <h1 className="text-3xl sm:text-5xl font-black text-[#e1c718] mb-4 tracking-tight drop-shadow-[0_0_12px_rgba(225,199,24,0.4)]">
              갤러리카페520
            </h1>

            <p className="text-base sm:text-lg text-white mb-6 max-w-[750px] mx-auto leading-relaxed">
              해리포터 영화를 바탕으로 한 앤틱하고 고전적인 카페에서의 커피 한모금.
              바쁜 일상에 치여 진정한 쉼을 필요로 하는 사람들의 영국 해리포터를 연상시키는
              앤틱하고 고전적인 커피숍
            </p>

            <div className="font-mono-code text-[#34e0b3] text-sm sm:text-base border-t border-[#e1c718]/30 pt-4 inline-block mb-6">
              해리포터 영화를 바탕으로 한 앤틱한 커피숍에서의 한모금 커피향
            </div>

            {/* Quick Hero CTA to Featured Item */}
            <div className="pt-2 flex justify-center items-center gap-4 flex-wrap">
              <button
                onClick={() => handleAddToCart(FEATURED_PRODUCT)}
                className="bg-[#e1c718] text-black font-pixel text-xs px-6 py-3.5 hover:bg-[#ffe234] transition-all shadow-[0_0_20px_rgba(225,199,24,0.5)] cursor-pointer flex items-center gap-2"
              >
                <span>🛒 Add to Cart</span>
                <span className="text-xs font-mono-code font-bold">
                  (시그니처 세트 담기)
                </span>
              </button>
              <a
                href="#products"
                className="border-2 border-[#34e0b3] text-[#34e0b3] font-mono-code text-xs px-5 py-3 hover:bg-[#34e0b3]/10 transition-colors"
              >
                전체 메뉴 둘러보기 ↓
              </a>
            </div>
          </div>
        </section>

        {/* Section 1: About / Core Values */}
        <section id="about" className="py-20 px-4 sm:px-8 max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <span className="font-pixel text-[#34e0b3] text-xs mb-2 block tracking-wider">
              ABOUT US
            </span>
            <h2 className="text-3xl sm:text-4xl text-[#e1c718] font-black tracking-tight">
              진정한 쉼을 위한 마법 같은 공간
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="bg-[#090e09] border-l-4 border-[#369807] p-8 sm:p-10 shadow-[0_5px_25px_rgba(0,0,0,0.6)]">
              <p className="text-stone-300 text-base leading-relaxed mb-4">
                해리포터 영화를 바탕으로 한 앤틱하고 고전적인 카페에서의 커피 한모금.
                바쁜 일상에 치여 진정한 쉼을 필요로 하는 사람들의 영국 해리포터를 연상시키는
                앤틱하고 고전적인 커피숍입니다.
              </p>
              <p className="text-stone-300 text-base leading-relaxed mb-6">
                고전적인 영국풍 앤틱 감성과 장인정신이 어우러진 특별한 분위기 속에서 바쁜
                일상을 잠시 잊고 휴식을 즐겨보세요.
              </p>

              <div className="flex flex-col gap-3.5 mt-6">
                <div className="flex items-center gap-4 bg-[#e1c718]/5 border border-[#e1c718] p-3.5 sm:p-4">
                  <i className="fa-solid fa-scale-balanced text-[#e1c718] text-xl w-6 text-center" />
                  <span className="font-mono-code text-[#e1c718] font-bold text-sm sm:text-base">
                    Pricing transparency
                  </span>
                </div>
                <div className="flex items-center gap-4 bg-[#e1c718]/5 border border-[#e1c718] p-3.5 sm:p-4">
                  <i className="fa-solid fa-hat-wizard text-[#e1c718] text-xl w-6 text-center" />
                  <span className="font-mono-code text-[#e1c718] font-bold text-sm sm:text-base">
                    해리포터 테마 감성
                  </span>
                </div>
                <div className="flex items-center gap-4 bg-[#e1c718]/5 border border-[#e1c718] p-3.5 sm:p-4">
                  <i className="fa-solid fa-gem text-[#e1c718] text-xl w-6 text-center" />
                  <span className="font-mono-code text-[#e1c718] font-bold text-sm sm:text-base">
                    고전적인 앤틱 인테리어
                  </span>
                </div>
              </div>
            </div>

            <div className="border-2 border-[#369807] overflow-hidden shadow-[0_0_25px_rgba(54,152,7,0.25)]">
              <img
                src="https://labs.google.com/pomelli_downloads/websites/aUlwhNyOoORdt7mANvU4t4/resources/bGgSg-bcFi6fAmAEEQXkbL?authuser=0"
                alt="해리포터 마법사 모자 및 난로"
                referrerPolicy="no-referrer"
                className="w-full h-full max-h-[460px] object-cover hover:scale-102 transition-transform duration-500"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://labs.google.com/pomelli_downloads/websites/aUlwhNyOoORdt7mANvU4t4/resources/9-FMICtcH-33zXzW3zxO29?authuser=0';
                }}
              />
            </div>
          </div>
        </section>

        {/* Section 2: Products & Featured Space */}
        <section id="products" className="py-20 px-4 sm:px-8 max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <span className="font-pixel text-[#34e0b3] text-xs mb-2 block tracking-wider">
              PRODUCTS &amp; SPACE
            </span>
            <h2 className="text-3xl sm:text-4xl text-[#e1c718] font-black tracking-tight">
              대표 상품 및 공간 소개
            </h2>
            <p className="text-stone-400 font-mono-code text-xs sm:text-sm mt-2">
              원하는 상품의 [Add to Cart]를 클릭하여 장바구니에 담아보세요.
            </p>
          </div>

          {/* Product Hero Card */}
          <div className="bg-[#080c08] border-2 border-[#e1c718] p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 mb-14 items-center shadow-[0_0_30px_rgba(225,199,24,0.2)]">
            <div className="border border-[#369807] overflow-hidden">
              <img
                src={FEATURED_PRODUCT.image}
                alt={FEATURED_PRODUCT.title}
                referrerPolicy="no-referrer"
                className="w-full h-[340px] sm:h-[400px] object-cover hover:scale-103 transition-transform duration-300"
              />
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <span className="font-pixel text-[10px] text-[#34e0b3] border border-[#34e0b3] px-2 py-0.5 inline-block mb-3 bg-[#34e0b3]/10">
                  {FEATURED_PRODUCT.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#e1c718] mb-3">
                  {FEATURED_PRODUCT.title}
                </h3>
                <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-4">
                  {FEATURED_PRODUCT.description}
                </p>
                <div className="font-mono-code text-xs text-[#34e0b3] bg-[#34e0b3]/10 border border-[#34e0b3] px-3 py-1.5 inline-block mb-4">
                  {FEATURED_PRODUCT.subtitle}
                </div>
                <div className="font-mono-code text-2xl font-bold text-[#e1c718] mb-6">
                  {FEATURED_PRODUCT.price.toLocaleString()}원
                </div>
              </div>

              {/* Add to Cart button */}
              <button
                type="button"
                onClick={() => handleAddToCart(FEATURED_PRODUCT)}
                className="w-full sm:w-auto self-start bg-transparent text-[#e1c718] hover:bg-[#e1c718] hover:text-black border-2 border-[#e1c718] px-6 py-3 font-pixel text-xs sm:text-sm tracking-wider transition-all shadow-[0_0_12px_rgba(225,199,24,0.3)] hover:shadow-[0_0_20px_rgba(225,199,24,0.7)] cursor-pointer flex items-center justify-center gap-2"
              >
                <span>🛒 Add to Cart</span>
                <span className="font-mono-code font-bold">(장바구니 담기)</span>
              </button>
            </div>
          </div>

          {/* Highlights Grid (Space & Experience Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
            {SPACE_PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                className="bg-[#0d120c]/90 border border-[#369807] p-5 flex flex-col justify-between hover:border-[#e1c718] transition-all hover:-translate-y-1 shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
              >
                <div>
                  <div className="overflow-hidden border border-[#e1c718]/30 mb-4">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-[220px] object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-pixel text-[9px] text-[#34e0b3]">
                      {prod.badge}
                    </span>
                    <span className="font-mono-code text-sm font-bold text-[#e1c718]">
                      {prod.price.toLocaleString()}원
                    </span>
                  </div>
                  <h4 className="font-mono-code text-[#34e0b3] font-bold text-base mb-2">
                    {prod.title}
                  </h4>
                  <p className="text-stone-400 text-xs sm:text-sm leading-relaxed mb-4">
                    {prod.description}
                  </p>
                </div>

                {/* Add to Cart button */}
                <button
                  type="button"
                  onClick={() => handleAddToCart(prod)}
                  className="w-full bg-[#121c12] hover:bg-[#e1c718] text-[#e1c718] hover:text-black border border-[#e1c718] py-2.5 px-3 font-pixel text-[11px] transition-all shadow-[0_0_10px_rgba(225,199,24,0.2)] hover:shadow-[0_0_15px_rgba(225,199,24,0.6)] cursor-pointer flex items-center justify-center gap-1.5 mt-2"
                >
                  <span>🛒 Add to Cart</span>
                </button>
              </div>
            ))}
          </div>

          {/* Specialty Signature Menu & MD Collection */}
          <div className="mt-12 bg-[#090e09] border border-[#e1c718]/50 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
              <div>
                <span className="font-pixel text-[10px] text-[#34e0b3] block mb-1">
                  BRITISH VINTAGE COLLECTION
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#e1c718]">
                  인기 시그니처 &amp; 앤틱 컬렉션
                </h3>
              </div>
              <span className="font-mono-code text-xs text-stone-400">
                매장 한정 스페셜 에디션
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {SPECIALTY_PRODUCTS.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-[#050805] border border-stone-800 hover:border-[#e1c718] p-4 flex gap-4 items-center transition-all"
                >
                  <img
                    src={prod.image}
                    alt={prod.title}
                    referrerPolicy="no-referrer"
                    className="w-24 h-24 sm:w-28 sm:h-28 object-cover border border-[#369807] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="font-pixel text-[9px] text-[#34e0b3]">
                      {prod.badge}
                    </span>
                    <h4 className="font-semibold text-sm sm:text-base text-[#e1c718] truncate mt-0.5">
                      {prod.title}
                    </h4>
                    <p className="text-xs text-stone-400 line-clamp-2 mt-1">
                      {prod.description}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-mono-code text-sm font-bold text-white">
                        {prod.price.toLocaleString()}원
                      </span>
                      <button
                        type="button"
                        onClick={() => handleAddToCart(prod)}
                        className="bg-transparent hover:bg-[#e1c718] text-[#e1c718] hover:text-black border border-[#e1c718] px-3 py-1 font-pixel text-[10px] transition-all cursor-pointer"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Gallery */}
        <section id="gallery" className="py-20 px-4 sm:px-8 max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <span className="font-pixel text-[#34e0b3] text-xs mb-2 block tracking-wider">
              ATMOSPHERE GALLERY
            </span>
            <h2 className="text-3xl sm:text-4xl text-[#e1c718] font-black tracking-tight">
              앤틱 갤러리 둘러보기
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#0d120c] border border-[#34e0b3]/30 hover:border-[#e1c718] transition-all hover:-translate-y-1">
              <img
                src="https://labs.google.com/pomelli_downloads/websites/aUlwhNyOoORdt7mANvU4t4/resources/9-FMICtcH-33zXzW3zxO29?authuser=0"
                alt="카페 전경 및 앤틱 수레바퀴 조명"
                referrerPolicy="no-referrer"
                className="w-full h-[250px] object-cover"
              />
              <div className="p-4 font-mono-code text-xs text-[#34e0b3] text-center bg-[#050805]">
                카페 메인 홀 전경
              </div>
            </div>

            <div className="bg-[#0d120c] border border-[#34e0b3]/30 hover:border-[#e1c718] transition-all hover:-translate-y-1">
              <img
                src="https://labs.google.com/pomelli_downloads/websites/aUlwhNyOoORdt7mANvU4t4/resources/8iCLrZE2cPT7jqUta_ak6m?authuser=0"
                alt="다양한 악기와 빈티지 가구"
                referrerPolicy="no-referrer"
                className="w-full h-[250px] object-cover"
              />
              <div className="p-4 font-mono-code text-xs text-[#34e0b3] text-center bg-[#050805]">
                빈티지 악기 &amp; 컬렉션
              </div>
            </div>

            <div className="bg-[#0d120c] border border-[#34e0b3]/30 hover:border-[#e1c718] transition-all hover:-translate-y-1">
              <img
                src="https://labs.google.com/pomelli_downloads/websites/aUlwhNyOoORdt7mANvU4t4/resources/brqFFmuMF4hcQdU3OKCkWH?authuser=0"
                alt="갤러리카페520 건물의 외관"
                referrerPolicy="no-referrer"
                className="w-full h-[250px] object-cover"
              />
              <div className="p-4 font-mono-code text-xs text-[#34e0b3] text-center bg-[#050805]">
                갤러리카페520 외관
              </div>
            </div>

            <div className="bg-[#0d120c] border border-[#34e0b3]/30 hover:border-[#e1c718] transition-all hover:-translate-y-1">
              <img
                src="https://labs.google.com/pomelli_downloads/websites/aUlwhNyOoORdt7mANvU4t4/resources/9dLeWfVdLuy2dHHoqq74l2?authuser=0"
                alt="정갈하게 차려진 찻상 차림"
                referrerPolicy="no-referrer"
                className="w-full h-[250px] object-cover"
              />
              <div className="p-4 font-mono-code text-xs text-[#34e0b3] text-center bg-[#050805]">
                티 세트 &amp; 디저트
              </div>
            </div>

            <div className="bg-[#0d120c] border border-[#34e0b3]/30 hover:border-[#e1c718] transition-all hover:-translate-y-1">
              <img
                src="https://labs.google.com/pomelli_downloads/websites/aUlwhNyOoORdt7mANvU4t4/resources/aGvTPOLTt1tbZBOFjyP4Eb?authuser=0"
                alt="앤틱 우드 소품 세부"
                referrerPolicy="no-referrer"
                className="w-full h-[250px] object-cover"
              />
              <div className="p-4 font-mono-code text-xs text-[#34e0b3] text-center bg-[#050805]">
                앤틱 디테일 &amp; 소품
              </div>
            </div>

            {/* Gallery Order Highlight Card */}
            <div className="bg-[#080d08] border border-[#e1c718]/40 p-6 flex flex-col justify-center items-center text-center">
              <span className="text-3xl mb-3">🎩</span>
              <h4 className="text-lg font-bold text-[#e1c718] mb-2 font-pixel text-xs">
                갤러리카페520 현장 방문
              </h4>
              <p className="text-xs text-stone-300 font-mono-code mb-4">
                중세 테마 포토존과 마법사 의상 체험이 준비되어 있습니다.
              </p>
              <button
                type="button"
                onClick={() => handleAddToCart(SPACE_PRODUCTS[0])}
                className="border border-[#34e0b3] text-[#34e0b3] hover:bg-[#34e0b3] hover:text-black px-4 py-2 font-pixel text-[10px] transition-colors"
              >
                Add to Cart (테마룸 예약)
              </button>
            </div>
          </div>
        </section>

        {/* Section 4: Location & Operating Hours */}
        <section id="location" className="py-20 px-4 sm:px-8 max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <span className="font-pixel text-[#34e0b3] text-xs mb-2 block tracking-wider">
              INFORMATION &amp; LOCATION
            </span>
            <h2 className="text-3xl sm:text-4xl text-[#e1c718] font-black tracking-tight">
              오시는 길 및 이용 안내
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-[#080c08] border-2 border-[#369807] p-8 sm:p-12 shadow-[0_0_20px_rgba(54,152,7,0.2)]">
            {/* Info Column 1 */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#e1c718] mb-6 border-b-2 border-[#e1c718] pb-2 font-sans-kr">
                매장 정보
              </h3>

              <div className="mb-5">
                <label className="font-pixel text-[11px] text-[#34e0b3] block mb-1">
                  ADDRESS
                </label>
                <p className="text-stone-100 text-sm sm:text-base">
                  충북 충주시 문화동 성터5길 20, 충주시, 충청북도, 27420, KR
                </p>
              </div>

              <div className="mb-5">
                <label className="font-pixel text-[11px] text-[#34e0b3] block mb-1">
                  PHONE
                </label>
                <p className="text-stone-100 text-sm sm:text-base font-mono-code">
                  043-855-5180
                </p>
              </div>

              <div className="mb-6">
                <label className="font-pixel text-[11px] text-[#34e0b3] block mb-2">
                  SEARCH KEYWORDS
                </label>
                <div className="flex gap-2 flex-wrap">
                  <span className="bg-[#369807]/20 border border-[#369807] text-white px-3 py-1 text-xs font-mono-code">
                    문화예술센터
                  </span>
                  <span className="bg-[#369807]/20 border border-[#369807] text-white px-3 py-1 text-xs font-mono-code">
                    갤러리카페520
                  </span>
                  <span className="bg-[#369807]/20 border border-[#369807] text-white px-3 py-1 text-xs font-mono-code">
                    해리포터카페
                  </span>
                  <span className="bg-[#369807]/20 border border-[#369807] text-white px-3 py-1 text-xs font-mono-code">
                    충주앤틱카페
                  </span>
                </div>
              </div>

              <div>
                <label className="font-pixel text-[11px] text-[#34e0b3] block mb-2">
                  SOCIAL LINK
                </label>
                <a
                  href="https://www.linkedin.com/company/갤러리카페520"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 bg-[#0077b5] text-white px-5 py-2.5 font-mono-code text-xs sm:text-sm hover:bg-[#005582] transition-colors"
                >
                  <i className="fa-brands fa-linkedin text-base" /> LinkedIn Official
                </a>
              </div>
            </div>

            {/* Info Column 2: Hours */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#e1c718] mb-6 border-b-2 border-[#e1c718] pb-2 font-sans-kr">
                영업시간 (OPERATING HOURS)
              </h3>

              <table className="w-full border-collapse font-mono-code text-sm">
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="py-2.5 text-stone-400">Monday</td>
                    <td className="py-2.5 text-right text-[#ff5555]">Closed</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2.5 text-stone-400">Tuesday</td>
                    <td className="py-2.5 text-right text-[#ff5555]">Closed</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2.5 text-stone-400">Wednesday</td>
                    <td className="py-2.5 text-right text-[#ff5555]">Closed</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2.5 text-stone-400">Thursday</td>
                    <td className="py-2.5 text-right text-[#ff5555]">Closed</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2.5 text-stone-400">Friday</td>
                    <td className="py-2.5 text-right text-[#ff5555]">Closed</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2.5 text-stone-400">Saturday</td>
                    <td className="py-2.5 text-right text-[#e1c718] font-bold">
                      12:00 PM - 6:00 PM
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-stone-400">Sunday</td>
                    <td className="py-2.5 text-right text-[#e1c718] font-bold">
                      12:00 PM - 6:00 PM
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-8 p-4 bg-[#111811] border border-[#369807]/50 text-xs font-mono-code text-[#34e0b3]">
                💡 단체 대관 및 촬영 문의는 유선 전화(043-855-5180)로 미리 예약해 주시면 더욱 편리하게 이용하실 수 있습니다.
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t-2 border-[#e1c718] py-12 px-4 text-center text-stone-400 font-mono-code text-xs leading-relaxed">
        <p className="text-white font-bold text-sm mb-2 font-sans-kr">
          갤러리카페520
        </p>
        <p className="mb-1">
          충북 충주시 문화동 성터5길 20, 충주시, 충청북도, 27420, KR | 전화번호: 0438555180
        </p>
        <p className="mb-3">
          웹사이트:{' '}
          <a
            href="https://beanroasters.example.com"
            target="_blank"
            rel="noreferrer"
            className="text-[#e1c718] hover:underline"
          >
            https://beanroasters.example.com
          </a>
        </p>
        <div className="mt-4">
          <a
            href="https://www.linkedin.com/company/갤러리카페520"
            target="_blank"
            rel="noreferrer"
            className="text-[#e1c718] hover:underline inline-flex items-center gap-1.5"
          >
            <i className="fa-brands fa-linkedin" /> LinkedIn
          </a>
        </div>
        <p className="mt-6 text-stone-600 text-[11px]">
          © {new Date().getFullYear()} 갤러리카페520. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
