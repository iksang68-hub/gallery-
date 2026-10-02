import { Product } from '../types';

export const FEATURED_PRODUCT: Product = {
  id: 'prod-featured-signature',
  title: '갤러리카페520 시그니처 블렌드 & 드립백 세트',
  subtitle: 'ARTISAN CRAFT & BRITISH VINTAGE',
  price: 18000,
  image: 'https://labs.google.com/pomelli_downloads/websites/aUlwhNyOoORdt7mANvU4t4/resources/9AeIWMK5hlR0WyoQXMBkQd?authuser=0',
  description: '해리포터 영화를 바탕으로 한 영국풍의 커피숍 대표 스페셜티 블렌드 원두와 핸드드립 백 컬렉션 세트입니다.',
  badge: 'SIGNATURE ROAST',
  category: '원두/드립백'
};

export const SPACE_PRODUCTS: Product[] = [
  {
    id: 'prod-theme-room',
    title: '해리포터 테마 룸 프라이빗 이용권',
    subtitle: 'MEDIEVAL CHESS & VINTAGE LOUNGE',
    price: 30000,
    image: 'https://labs.google.com/pomelli_downloads/websites/aUlwhNyOoORdt7mANvU4t4/resources/9uk_pJYMzrL81IMyF8VkOX?authuser=0',
    description: '중세 문양 문장과 고전적 장식품, 유니온잭 포인트 쿠션이 돋보이는 테마 공간 1시간 프라이빗 예약권입니다.',
    badge: 'THEME EXPERIENCE',
    category: '공간 예약'
  },
  {
    id: 'prod-owl-lounge',
    title: '부엉이 갤러리 라운지 애프터눈 티 세트',
    subtitle: 'MYSTICAL OWL GALLERY HIGH TEA',
    price: 25000,
    image: 'https://labs.google.com/pomelli_downloads/websites/aUlwhNyOoORdt7mANvU4t4/resources/a5RhLgok0HGdGBx7fX744G?authuser=0',
    description: '신비로운 부엉이 상과 비비드 그린 라운지에서 즐기는 정통 영국식 스콘과 홍차 세트입니다.',
    badge: 'AFTERNOON TEA',
    category: '티/디저트'
  },
  {
    id: 'prod-hand-drip',
    title: '핸드메이드 싱글오리진 스페셜티 커피',
    subtitle: 'APOTHECARY DARK ROAST DRIP',
    price: 8500,
    image: 'https://labs.google.com/pomelli_downloads/websites/aUlwhNyOoORdt7mANvU4t4/resources/bkWrqLSldCAbCvp9MW4_Py?authuser=0',
    description: '깊은 향미를 가진 스페셜티 원두를 황동 드립퍼로 정성껏 추출한 한모금 커피향의 여유를 전합니다.',
    badge: 'HAND DRIP',
    category: '스페셜티 커피'
  }
];

export const SPECIALTY_PRODUCTS: Product[] = [
  {
    id: 'prod-butter-einspanner',
    title: '골든 버터크림 앤틱 아인슈페너',
    subtitle: 'BUTTERSCOTCH VIENNA COFFEE',
    price: 7500,
    image: 'https://labs.google.com/pomelli_downloads/websites/aUlwhNyOoORdt7mANvU4t4/resources/9dLeWfVdLuy2dHHoqq74l2?authuser=0',
    description: '부드러운 버터스카치 수제 크림과 진한 에스프레소 베이스가 어우러진 갤러리카페520의 명품 시그니처 음료.',
    badge: 'BEST MENU',
    category: '시그니처 음료'
  },
  {
    id: 'prod-vintage-mug',
    title: '갤러리카페520 브리티시 앤틱 세라믹 머그',
    subtitle: 'BRITISH VINTAGE CERAMIC CUP',
    price: 22000,
    image: 'https://labs.google.com/pomelli_downloads/websites/aUlwhNyOoORdt7mANvU4t4/resources/aGvTPOLTt1tbZBOFjyP4Eb?authuser=0',
    description: '영국 고전 카페의 품격을 담은 황동 로고 인각 핸드크래프트 세라믹 머그잔입니다.',
    badge: 'LIMITED EDITION',
    category: '굿즈/MD'
  }
];

export const ALL_PRODUCTS: Product[] = [
  FEATURED_PRODUCT,
  ...SPACE_PRODUCTS,
  ...SPECIALTY_PRODUCTS
];
