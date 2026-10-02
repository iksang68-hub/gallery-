import React, { useState } from 'react';
import { CartItem } from '../types';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleOrder = () => {
    setOrderComplete(true);
  };

  const handleFinishOrder = () => {
    onClearCart();
    setOrderComplete(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg bg-[#080c08] border-2 border-[#e1c718] p-6 shadow-[0_0_40px_rgba(225,199,24,0.35)] text-white max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛒</span>
            <h2 id="cart-modal-title" className="text-xl font-bold text-[#e1c718] font-pixel text-sm sm:text-base">
              장바구니 (CART)
            </h2>
            <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full ml-1">
              {totalCount}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-[#e1c718] font-mono-code text-xl p-1"
            aria-label="장바구니 닫기"
          >
            ✕
          </button>
        </div>

        {orderComplete ? (
          <div className="py-10 px-4 text-center">
            <div className="w-16 h-16 rounded-full bg-[#369807]/20 border-2 border-[#369807] flex items-center justify-center mx-auto mb-4 text-3xl text-[#34e0b3]">
              ✓
            </div>
            <h3 className="text-2xl font-bold text-[#e1c718] mb-2 font-pixel text-base">
              주문이 접수되었습니다!
            </h3>
            <p className="text-stone-300 font-mono-code text-sm mb-4">
              갤러리카페520의 마법 같은 스페셜티 상품이 준비됩니다.
            </p>
            <div className="bg-[#101710] p-4 border border-stone-800 mb-6 text-left font-mono-code text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-stone-400">주문 번호:</span>
                <span className="text-[#34e0b3]">#CAFE520-{Date.now().toString().slice(-6)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">총 결제 금액:</span>
                <span className="text-[#e1c718] font-bold">{totalPrice.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">수령 방법:</span>
                <span className="text-white">매장 방문 수령 / 테이블 서빙</span>
              </div>
            </div>
            <button
              onClick={handleFinishOrder}
              className="bg-[#e1c718] text-black font-bold px-6 py-2.5 hover:bg-[#ffe234] transition-colors font-mono-code text-sm"
            >
              확인 및 닫기
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="py-16 text-center">
            <span className="text-5xl block mb-3 opacity-60">☕</span>
            <p className="text-stone-400 font-mono-code text-sm">
              장바구니가 비어 있습니다.
            </p>
            <p className="text-stone-600 font-mono-code text-xs mt-1">
              갤러리카페520의 대표 메뉴와 상품을 둘러보세요!
            </p>
            <button
              onClick={onClose}
              className="mt-6 border border-[#e1c718] text-[#e1c718] px-5 py-2 font-mono-code text-xs hover:bg-[#e1c718] hover:text-black transition-colors"
            >
              메뉴 둘러보기
            </button>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-3 bg-[#111711] p-3 border border-stone-800 hover:border-stone-700"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 object-cover border border-[#369807]"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        'https://labs.google.com/pomelli_downloads/websites/aUlwhNyOoORdt7mANvU4t4/resources/bkWrqLSldCAbCvp9MW4_Py?authuser=0';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-[#e1c718] truncate">
                      {item.product.title}
                    </h4>
                    <p className="text-xs text-[#34e0b3] font-mono-code">
                      {item.product.price.toLocaleString()}원
                    </p>
                    <p className="text-[11px] text-stone-500 font-mono-code truncate">
                      {item.product.subtitle}
                    </p>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-1.5 bg-black/60 border border-stone-700 px-2 py-1">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, -1)}
                      className="text-stone-400 hover:text-white px-1.5 text-xs font-mono-code"
                      aria-label="수량 감소"
                    >
                      -
                    </button>
                    <span className="font-mono-code text-xs font-bold text-white min-w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, 1)}
                      className="text-stone-400 hover:text-white px-1.5 text-xs font-mono-code"
                      aria-label="수량 증가"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="text-stone-500 hover:text-red-400 p-1 text-xs"
                    aria-label="상품 삭제"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            {/* Total and Actions */}
            <div className="pt-4 border-t border-stone-800 space-y-3 font-mono-code">
              <div className="flex justify-between items-center text-sm">
                <span className="text-stone-400">총 상품 수량</span>
                <span className="text-white font-bold">{totalCount}개</span>
              </div>
              <div className="flex justify-between items-center text-base">
                <span className="text-stone-300">총 결제 예정 금액</span>
                <span className="text-[#e1c718] font-bold text-lg">
                  {totalPrice.toLocaleString()}원
                </span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={onClearCart}
                  className="flex-1 bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white text-xs py-3 border border-stone-700 transition-colors"
                >
                  비우기 (CLEAR)
                </button>
                <button
                  onClick={handleOrder}
                  className="flex-2 bg-[#e1c718] hover:bg-[#ffe234] text-black font-bold text-sm py-3 transition-colors shadow-[0_0_15px_rgba(225,199,24,0.3)]"
                >
                  주문하기 (CHECKOUT)
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
