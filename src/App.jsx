import React, { useState, useEffect, useRef } from 'react';
// BrowserRouter, Routes, Route va Link komponentlarini import qilamiz
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  HiOutlineShoppingBag, HiHeart, HiMenu, HiX, HiPlus, HiMinus, 
  HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineUser, HiChevronDown 
} from 'react-icons/hi';
import { FaInstagram, FaTelegram, FaFacebook } from 'react-icons/fa';

// Original Menyular (Sahifa ichidagi filtrlar uchun)
const menuTabs = [
  "Новинки", "Комбо", "Лаваш", "Бургеры", "Хот-дог", 
  "Сендвич", "Донар", "Салаты", "Coyc", "Мафины", 
  "Кофе", "Гарниры", "Напитки",
];

// Header bo'limlari uchun dinamik array (Nomi va o'tadigan sahifa manzili)
const navLinks = [
  { name: 'О нас', path: '/about' },
  { name: 'Меню', path: '/' }, // Menyu bosilganda asosiy sahifaga qaytadi
  { name: 'Акции', path: '/promotions' },
  { name: 'Вакансии', path: '/jobs' },
  { name: 'Филиалы', path: '/branches' },
  { name: 'Контакты', path: '/contacts' },
];

// Slider (Karusel) uchun dinamik ma'lumotlar arrayi
const bannerSlides = [
  {
    id: 1,
    title: "Donarchi & Piramida",
    badge: "Специальное ограниченное предложение",
    desc: "Действует только при доставке",
    price: 45000,
    oldPrice: 59000,
    discount: "-24%",
    bgColor: "bg-[#E31E24]",
    bgImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1920"
  },
  {
    id: 2,
    title: "Piramida Combo",
    badge: "Новинка сезона",
    desc: "Eng to'yimli va katta combo faqat siz uchun",
    price: 48000,
    oldPrice: 59000,
    discount: "-19%",
    bgColor: "bg-[#1E293B]",
    bgImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1920"
  },
  {
    id: 3,
    title: "Piramida Combo",
    badge: "Новинка сезона",
    desc: "Eng to'yimli va katta combo faqat siz uchun",
    price: 48000,
    oldPrice: 59000,
    discount: "-19%",
    bgColor: "bg-[#1E293B]",
    bgImage: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=1920"
  },
  {
    id: 4,
    title: "Piramida Combo",
    badge: "Новинка сезона",
    desc: "Eng to'yimli va katta combo faqat siz uchun",
    price: 48000,
    oldPrice: 59000,
    discount: "-19%",
    bgColor: "bg-[#1E293B]",
    bgImage: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=1920"
  },
];

// Mahsulotlar ma'lumotlari
const productsData = [
  { id: 1, category: "Новинки", name: "PIRAMIDA COMBO", price: 48000, oldPrice: 59000, badge: "Новинка", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=640" },
  { id: 2, category: "Новинки", name: "DONARCHI", price: 45000, oldPrice: 59000, badge: "Новинка", image: "https://feedup.uz/_next/image?url=https%3A%2F%2Fcdn.zoomda.uz%2Fproducts%2F2026%2F04%2F03%2F1775216347561680440.webp&w=640&q=75" },
  { id: 3, category: "Новинки", name: "DONAR TOVUQLI DISH", price: 32000, badge: "Новинка", image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=640" },
  { id: 4, category: "Новинки", name: "DONAR GO'SHTLI DISH", price: 36000, badge: "Новинка", image: "https://feedup.uz/_next/image?url=https%3A%2F%2Fcdn.zoomda.uz%2Fproducts%2F2026%2F04%2F28%2F1777380621804305382.webp&w=640&q=75" },
  { id: 5, category: "Комбо", name: "PIRAMIDA COMBO", price: 48000, oldPrice: 59000, image: "https://images.unsplash.com/photo-1610614819513-58e34989848b?q=80&w=640" },
  { id: 6, category: "Комбо", name: "KREATIV COMBO", price: 56000, oldPrice: 67000, image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=640" },
  { id: 7, category: "Комбо", name: "FEEDUP COMBO", price: 42000, oldPrice: 50000, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=640" },
  { id: 8, category: "Комбо", name: "KLASSIK COMBO", price: 38000, oldPrice: 45000, image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?q=80&w=640" },
  { id: 9, category: "Лаваш", name: "LAVASH STANDART GO'SHTLI", price: 28000, image: "https://feedup.uz/_next/image?url=https%3A%2F%2Fcdn.zoomda.uz%2Fproducts%2F2025%2F07%2F15%2F1752571911832937647.jpg&w=640&q=75" },
  { id: 10, category: "Лаваш", name: "LAVASH BIG GO'SHTLI", price: 35000, image: "https://feedup.uz/_next/image?url=https%3A%2F%2Fcdn.zoomda.uz%2Fproducts%2F2025%2F07%2F15%2F1752571931849681182.jpg&w=640&q=75" },
  { id: 11, category: "Лаваш", name: "LAVASH PISHLOQLI GO'SHTLI", price: 33000, image: "https://feedup.uz/_next/image?url=https%3A%2F%2Fcdn.zoomda.uz%2Fproducts%2F2025%2F07%2F15%2F1752571951857748904.jpg&w=640&q=75" },
  { id: 12, category: "Бургеры", name: "CHEESEBURGER", price: 25000, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=640" },
  { id: 13, category: "Бургеры", name: "BIG BURGER", price: 35000, image: "https://images.unsplash.com/photo-1549611016-3a70d82b5040?q=80&w=640" },
  { id: 14, category: "Бургеры", name: "LONG APPER (go'shtli)", price: 58000, image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=640" },
  { id: 15, category: "Хот-дог", name: "HOT-DOG CLASSIK", price: 16000, image: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?q=80&w=640" },
  { id: 16, category: "Хот-дог", name: "HOT-DOG PISHLOQLI", price: 20000, image: "https://images.unsplash.com/photo-1541214113241-21578d2d9b62?q=80&w=640" },
  { id: 17, category: "Сендвич", name: "CLUB SANDWICH TOVUQLI", price: 26000, image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=640" },
  { id: 18, category: "Сендвич", name: "SANDWICH STANDART", price: 22000, image: "https://images.unsplash.com/photo-1619860860774-1e2e17343432?q=80&w=640" },
  { id: 19, category: "Донар", name: "BIG DONAR GO'SHTLI", price: 47000, image: "https://feedup.uz/_next/image?url=https%3A%2F%2Fcdn.zoomda.uz%2Fproducts%2F2025%2F07%2F15%2F1752573434014414653.jpg&w=640&q=75" },
  { id: 20, category: "Донар", name: "DONAR TOVUQLI DISH", price: 32000, image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=640" },
  { id: 21, category: "Салаты", name: "SALAT CEZAR", price: 22000, image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=640" },
  { id: 22, category: "Салаты", name: "SALAT GRECHESKIY", price: 18000, image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=640" },
  { id: 23, category: "Соус", name: "KETCHUP", price: 3000, image: "https://images.unsplash.com/photo-1607305387299-a3d9611cd46f?q=80&w=640" },
  { id: 24, category: "Соус", name: "MAYONEZ", price: 3000, image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=640" },
  { id: 25, category: "Соус", name: "CHILLI SOUS", price: 4000, image: "https://images.unsplash.com/photo-1528592916295-696fd5e5f553?q=80&w=640" },
  { id: 26, category: "Мафины", name: "MUFFIN SHOKOLADLI", price: 12000, image: "https://images.unsplash.com/photo-1612240498936-65f5101365d2?q=80&w=640" },
  { id: 27, category: "Мафины", name: "MUFFIN VANILLI", price: 12000, image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=640" },
  { id: 28, category: "Кофе", name: "AMERICANO", price: 10000, image: "https://feedup.uz/_next/image?url=https%3A%2F%2Fcdn.zoomda.uz%2Fproducts%2F2025%2F07%2F14%2F1752507629747609313.webp&w=640&q=75" },
  { id: 29, category: "Кофе", name: "CAPPUCCINO", price: 14000, image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=640" },
  { id: 30, category: "Кофе", name: "LATTE", price: 15000, image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=640" },
  { id: 31, category: "Гарниры", name: "KARTOSHKA FRI STANDART", price: 12000, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=640" },
  { id: 32, category: "Гарниры", name: "KARTOSHKA FRI BIG", price: 16000, image: "https://feedup.uz/_next/image?url=https%3A%2F%2Fcdn.zoomda.uz%2Fproducts%2F2025%2F07%2F15%2F1752574785015354129.jpg&w=640&q=75" },
  { id: 33, category: "Гарниры", name: "DEREVENSKAYA KARTOSHKA", price: 13000, image: "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?q=80&w=640" },
  { id: 34, category: "Напитки", name: "COCA-COLA 0.5L", price: 8000, image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=640" },
  { id: 35, category: "Напитки", name: "COCA-COLA 1.5L", price: 14000, image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?q=80&w=640" },
  { id: 36, category: "Напитки", name: "FUSTEA 0.5L", price: 8000, image: "https://images.unsplash.com/photo-1556881286-fc6915169721?q=80&w=640" },
  { id: 37, category: "Напитки", name: "SUVE BORJOMI", price: 15000, image: "https://feedup.uz/_next/image?url=https%3A%2F%2Fcdn.zoomda.uz%2Fproducts%2F2025%2F07%2F15%2F1752575872117032633.jpg&w=640&q=75" }
];

// ================= ALOHIDA SAHIFA KOMPONENTLARI =================
const AboutPage = () =><div className="max-w-6xl mx-auto px-4 py-12 font-sans text-gray-800">
      
      {/* Sarlavha qismi */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Oʻzimiz haqimizda
        </h1>
        <div className="w-24 h-1 bg-red-500 mx-auto rounded-full"></div>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Biz nafaqat taom tayyorlaymiz, balki sizga unutilmas taʼm va aʼlo kayfiyat ulashamiz!
        </p>
      </div>

      {/* Asosiy blok: Matn va Ma'lumotlar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        
        {/* Chap tomon: Biz haqimizda matni */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Katta sevgi bilan tayyorlangan fast-fud!
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Kompaniyamizga asos solingan kundan boshlab, bizning asosiy maqsadimiz — mijozlarimizga eng yangi va sifatli masalliqlardan tayyorlangan taomlarni taqdim etishdir. Har bir burger, lavash va sendvich oʻz ishining ustalari tomonidan oʻzgacha mehr bilan tayyorlanadi.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Biz har bir detalga eʼtibor beramiz: doimo yangi pishirilgan issiq nonlar, suvli goʻsht va sarxil sabzavotlar. Shuning uchun ham mijozlarimiz bizni tanlashadi va yaqinlariga tavsiya qilishadi.
          </p>
          
          {/* Kichik afzalliklar ro'yxati */}
          <div className="pt-4 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌱</span>
              <span className="font-medium text-gray-700">100% Tabiiy mahsulotlar</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚡</span>
              <span className="font-medium text-gray-700">Tezkor yetkazib berish</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">👨‍🍳</span>
              <span className="font-medium text-gray-700">Professional oshpazlar</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">❤️</span>
              <span className="font-medium text-gray-700">Hamyonbop narxlar</span>
            </div>
          </div>
        </div>

        {/* O'ng tomon: Vizual statistika kartochkalari */}
        <div className="bg-gray-100 p-8 rounded-3xl grid grid-cols-2 gap-6 shadow-inner">
          <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
            <h3 className="text-3xl font-extrabold text-red-500 mb-1">5+</h3>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Yillik tajriba</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
            <h3 className="text-3xl font-extrabold text-red-500 mb-1">20+</h3>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Shahar boʻylab filiallar</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
            <h3 className="text-3xl font-extrabold text-red-500 mb-1">150k+</h3>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Mamnun mijozlar</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
            <h3 className="text-3xl font-extrabold text-red-500 mb-1">50+</h3>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Turli xil taomlar</p>
          </div>
        </div>

      </div>

      {/* Shior qismi */}
      <div className="bg-red-500 text-white rounded-3xl p-8 md:p-12 text-center shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          "Sifat va taʼm — bizning oliy qadriyatimizdir!"
        </h2>
        <p className="text-red-100 max-w-xl mx-auto">
          Biz har kuni oʻz ustimizda ishlaymiz va sizga yanada yaxshiroq xizmat koʻrsatishga intilamiz. Bizni tanlaganingiz uchun rahmat!
        </p>
      </div>

</div>;
const PromotionsPage = () => <div className="max-w-7xl mx-auto p-12 text-center text-2xl font-black uppercase text-gray-800">Sahifa: Aksiyalar va Chegirmalar (Акции)</div>;
const JobsPage = () => <div className="max-w-7xl mx-auto p-12 text-center text-2xl font-black uppercase text-gray-800">Sahifa: Bo'sh ish o'rinlari (Вакансии)</div>;
const BranchesPage = () => <div className="max-w-7xl mx-auto p-12 text-center text-2xl font-black uppercase text-gray-800">Sahifa: Bizning filiallar (Филиалы)</div>;
const ContactsPage = () => <div className="max-w-7xl mx-auto p-12 text-center text-2xl font-black uppercase text-gray-800">Sahifa: Kontaktlar (Контакты)</div>;

// ALOHIDA NAVIGATSIYA QISMI (Header ichidagi useLocation to'g'ri ishlashi uchun)
function NavigationHeader({ 
  totalItems, setIsCartOpen, isMobileMenuOpen, setIsMobileMenuOpen, 
  isOrderTypeOpen, setIsOrderTypeOpen, orderType, setOrderType 
}) {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 py-3 px-4 md:px-12 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo & Navigation */}
        <div className="flex items-center gap-10">
        <a href="#" className="text-[#E31E24] font-black italic text-2xl tracking-tighter uppercase select-none cursor-pointer">
            feed <span className="text-gray-900 not-italic font-black text-2xl tracking-normal">up</span>
        </a>
          
          <nav className="hidden lg:flex items-center gap-6 text-[14px] font-bold text-[#2B2D33]/90">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className={`cursor-pointer transition-all duration-200 relative py-1 group ${isActive ? 'text-[#E31E24]' : 'text-gray-600 hover:text-[#E31E24]'}`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-[#E31E24] transition-all rounded-full ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Elements */}
        <div className="flex items-center gap-6">
          <div className="relative hidden sm:block">
            <div 
              onClick={() => setIsOrderTypeOpen(!isOrderTypeOpen)}
              className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-1.5 bg-white cursor-pointer hover:border-gray-300 transition-all"
            >
              <div className="flex flex-col">
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tight">Тип заказа</span>
                <span className="text-xs font-extrabold text-gray-700">{orderType}</span>
              </div>
              <HiChevronDown size={14} className="text-gray-400 mt-2" />
            </div>
            
            {isOrderTypeOpen && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-100 rounded-xl shadow-lg py-1 z-50 text-xs font-bold">
                {["Доставка", "Самовывоз"].map((type) => (
                  <div 
                    key={type} 
                    onClick={() => { setOrderType(type); setIsOrderTypeOpen(false); }}
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-700 hover:text-[#E31E24]"
                  >
                    {type}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="hidden md:flex flex-col text-left">
            <span className="text-[14px] font-black text-gray-900 tracking-tight cursor-pointer hover:text-[#E31E24] transition-colors">
              +998 71 200 2211
            </span>
          </div>

          <div className="bg-gray-50 text-gray-400 font-extrabold text-[12px] px-3 py-1 rounded-xl hidden md:block border border-gray-100">
            QR080
          </div>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="p-2.5 bg-gray-50 hover:bg-red-50 rounded-xl relative transition-all active:scale-95 group border border-gray-100 cursor-pointer flex items-center"
          >
            <HiOutlineShoppingBag size={20} className="text-gray-700 group-hover:text-[#E31E24]" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#E31E24] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black">
                {totalItems}
              </span>
            )}
          </button>

          <button 
            onClick={() => setIsMobileMenuOpen(true)} 
            className="lg:hidden p-1 text-gray-700 hover:text-[#E31E24] cursor-pointer"
          >
            <HiMenu size={24} />
          </button>
        </div>

      </div>
    </header>
  );
}

// MAIN CONTENT (Asosiy Menyu va Mahsulotlar Ro'yxati)
function MainMenu({ 
  activeTab, setActiveTab, cart, favorites, toggleFav, addToCart, updateQuantity, 
  currentSlide, isDragging, handleMouseDown, handleMouseMove, handleMouseUpOrLeave, prevSlide, nextSlide, scrollToSection 
}) {
  return (
    <>
      {/* ================= HERO BANNER SLIDER ================= */}
      <section className="max-w-7xl mx-auto px-4 md:px-12 pt-5 select-none">
        <div 
          className={`rounded-[2.5rem] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-xl transition-all duration-700 min-h-[420px] ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            backgroundImage: `url('${bannerSlides[currentSlide].bgImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent z-0 pointer-events-none"></div>

          <button 
            onClick={(e) => { e.stopPropagation(); prevSlide(); }} 
            className="absolute left-4 md:left-6 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-[#E31E24] backdrop-blur-md rounded-full flex items-center justify-center transition-all cursor-pointer border border-white/30 group shadow-lg active:scale-95"
          >
            <HiOutlineChevronLeft size={24} className="text-white group-hover:scale-110" />
          </button>

          <div className="z-10 w-full md:w-1/2 space-y-6 text-center md:text-left pl-12 md:pl-16 pr-4 pointer-events-none">
            <div className="inline-block bg-[#E31E24] px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md">
              {bannerSlides[currentSlide].badge}
            </div>
            <div className="text-[14px] opacity-90 font-bold tracking-wide drop-shadow-md">
              {bannerSlides[currentSlide].desc}
            </div>
            <h1 className="text-4xl md:text-6xl font-black italic uppercase leading-none tracking-tighter drop-shadow-2xl whitespace-nowrap">
              {bannerSlides[currentSlide].title.split('&')[0]} 
              {bannerSlides[currentSlide].title.split('&')[1] && (
                <>
                  <br /> & <span className="text-yellow-400">{bannerSlides[currentSlide].title.split('&')[1]}</span>
                </>
              )}
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
              <div className="bg-yellow-400 text-gray-900 font-black text-[12px] px-2.5 py-1 rounded-md transform -rotate-2 shadow-md">
                {bannerSlides[currentSlide].discount}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-4xl font-black text-yellow-400 tracking-tight drop-shadow-lg leading-none">
                  {bannerSlides[currentSlide].price.toLocaleString()} <small className="text-xs uppercase font-extrabold text-white ml-0.5">сум</small>
                </span>
                <span className="text-lg line-through opacity-50 italic font-bold mt-1">
                  {bannerSlides[currentSlide].oldPrice.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="z-10 w-full md:w-1/2 flex justify-center mt-8 md:mt-0 relative pointer-events-none"></div>

          <button 
            onClick={(e) => { e.stopPropagation(); nextSlide(); }} 
            className="absolute right-4 md:right-6 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-[#E31E24] backdrop-blur-md rounded-full flex items-center justify-center transition-all cursor-pointer border border-white/30 group shadow-lg active:scale-95"
          >
            <HiOutlineChevronRight size={24} className="text-white group-hover:scale-110" />
          </button>
        </div>
      </section>

      {/* ================= CATEGORY NAV ================= */}
      <div className="sticky top-[60px] z-40 bg-[#F8F9FB]/95 backdrop-blur-md border-b border-gray-200/30 py-3 px-4 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
          {menuTabs.map((tab) => (
            <button 
              key={tab}
              onClick={() => scrollToSection(tab)}
              className={`whitespace-nowrap px-4.5 py-2.5 rounded-xl text-[13px] font-black uppercase tracking-tight transition-all duration-150 cursor-pointer ${
                activeTab === tab 
                ? 'bg-white text-[#E31E24] shadow-sm border border-gray-100' 
                : 'bg-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ================= PRODUCTS LIST ================= */}
      <main className="max-w-7xl mx-auto px-4 md:px-12 py-10">
        <div className="space-y-12">
          {menuTabs.map((category) => {
            const currentItems = productsData.filter(p => p.category === category);
            if (currentItems.length === 0) return null;

            return (
              <section key={category} id={`section-${category}`} className="scroll-mt-36">
                <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight mb-6">{category}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {currentItems.map((product) => {
                    const hasFav = favorites.includes(product.id);
                    return (
                      <div key={product.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full relative group overflow-hidden">
                        <div className="relative w-full h-48 bg-gray-50 flex items-center justify-center overflow-hidden">
                          <button 
                            onClick={() => toggleFav(product.id)}
                            className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-white/80 backdrop-blur-md shadow-sm transition-all duration-300 cursor-pointer active:scale-90"
                          >
                            <HiHeart 
                              size={18} 
                              className={`transition-colors duration-300 ${hasFav ? 'text-[#E31E24]' : 'text-black'}`}
                              fill={hasFav ? "currentColor" : "none"} 
                              stroke="currentColor" 
                              strokeWidth="2" 
                            />
                          </button>
                          {product.badge && (
                            <span className="absolute top-4 left-4 z-20 bg-[#E31E24] text-white text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-wider shadow-xs">
                              {product.badge}
                            </span>
                          )}
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>

                        <div className="p-4.5 space-y-3 flex-1 flex flex-col justify-between">
                          <h3 className="font-extrabold text-gray-800 text-[14px] uppercase tracking-tight leading-tight line-clamp-2 min-h-[2.5rem]">
                            {product.name}
                          </h3>
                          <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                            <div className="flex flex-col">
                              <span className="font-black text-[16px] text-gray-900 tracking-tight">
                                {product.price.toLocaleString()} <small className="text-[10px] text-gray-400 font-bold uppercase">сум</small>
                              </span>
                              {product.oldPrice && (
                                <span className="text-[11px] text-gray-300 line-through font-bold leading-none">
                                  {product.oldPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                            <button 
                              onClick={() => addToCart(product)} 
                              className="bg-[#F8F9FB] hover:bg-[#E31E24] text-gray-700 hover:text-white font-black text-[12px] px-4 py-2 rounded-xl transition-all border border-gray-200 cursor-pointer active:scale-95"
                            >
                              Добавить
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("Новинки");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOrderTypeOpen, setIsOrderTypeOpen] = useState(false);
  const [orderType, setOrderType] = useState("Доставка");
  const [favorites, setFavorites] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const currentTranslate = useRef(0);

  const nextSlide = () => { setCurrentSlide((prev) => (prev === bannerSlides.length - 1 ? 0 : prev + 1)); };
  const prevSlide = () => { setCurrentSlide((prev) => (prev === 0 ? bannerSlides.length - 1 : prev - 1)); };

  useEffect(() => {
    const timer = setInterval(() => { nextSlide(); }, 10000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleMouseDown = (e) => { setIsDragging(true); startX.current = e.clientX; };
  const handleMouseMove = (e) => { if (!isDragging) return; currentTranslate.current = e.clientX - startX.current; };
  const handleMouseUpOrLeave = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (currentTranslate.current < -50) nextSlide();
    else if (currentTranslate.current > 50) prevSlide();
    currentTranslate.current = 0;
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === product.id);
      if (exist) return prev.map((item) => item.id === product.id ? { ...item, qnty: item.qnty + 1 } : item);
      return [...prev, { ...product, qnty: 1 }];
    });
  };

  const updateQuantity = (id, amount) => {
    setCart((prev) => prev.map((item) => {
      if (item.id === id) {
        const newQnty = item.qnty + amount;
        return newQnty > 0 ? { ...item, qnty: newQnty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const toggleFav = (id) => {
    setFavorites((prev) => prev.includes(id) ? prev.filter((fId) => fId !== id) : [...prev, id]);
  };

  const scrollToSection = (tabName) => {
    setActiveTab(tabName);
    const target = document.getElementById(`section-${tabName}`);
    if (target) {
      const topOffset = target.getBoundingClientRect().top + window.scrollY - 160;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.qnty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qnty), 0);

  return (
    // Loyihani Router bilan o'raymiz
    <Router>
      <div className="min-h-screen bg-[#F8F9FB] text-[#2B2D33] font-sans selection:bg-[#E31E24] selection:text-white antialiased">
        
        {/* Navigation Header */}
        <NavigationHeader 
          totalItems={totalItems} 
          setIsCartOpen={setIsCartOpen}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          isOrderTypeOpen={isOrderTypeOpen}
          setIsOrderTypeOpen={setIsOrderTypeOpen}
          orderType={orderType}
          setOrderType={setOrderType}
        />

        {/* ================= ROUTER SAHIFALARI ================= */}
        <Routes>
          {/* Asosiy sahifa (Menyu va Slider shu yerda chiqadi) */}
          <Route path="/" element={
            <MainMenu 
              activeTab={activeTab} setActiveTab={setActiveTab} cart={cart} favorites={favorites}
              toggleFav={toggleFav} addToCart={addToCart} updateQuantity={updateQuantity}
              currentSlide={currentSlide} isDragging={isDragging} handleMouseDown={handleMouseDown}
              handleMouseMove={handleMouseMove} handleMouseUpOrLeave={handleMouseUpOrLeave}
              prevSlide={prevSlide} nextSlide={nextSlide} scrollToSection={scrollToSection}
            />
          } />
          
          {/* Qolgan alohida ochiladigan sahifalar */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/promotions" element={<PromotionsPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/branches" element={<BranchesPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
        </Routes>

        {/* ================= FOOTER ================= */}
        <footer className="bg-white border-t border-gray-100 pt-14 pb-8 px-6 md:px-12 mt-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
              <div className="space-y-4">
                <Link to="/" className="text-[#E31E24] font-black italic text-2xl uppercase tracking-tighter">feed<span className="text-gray-900 not-italic">up</span></Link>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-tight leading-relaxed max-w-xs">Сеть ресторанов быстрого питания по всему Узбекистану. 100% Халяльное качество.</p>
                <div className="flex gap-3 pt-1">
                  {[FaInstagram, FaTelegram, FaFacebook].map((Icon, i) => (
                    <div key={i} className="w-8 h-8 bg-[#F8F9FB] rounded-lg flex items-center justify-center text-gray-400 hover:bg-[#E31E24] hover:text-white transition-all cursor-pointer"><Icon size={14} /></div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-black uppercase text-xs text-gray-800 mb-4">Menu</h4>
                <ul className="space-y-2.5 text-xs font-bold text-gray-400 uppercase tracking-tight">
                  <li className="hover:text-[#E31E24] cursor-pointer">Лаваш</li>
                  <li className="hover:text-[#E31E24] cursor-pointer">Бургеры</li>
                  <li className="hover:text-[#E31E24] cursor-pointer">Комбо</li>
                </ul>
              </div>
              <div>
                <h4 className="font-black uppercase text-xs text-gray-800 mb-4">Правовая информация</h4>
                <ul className="space-y-2.5 text-xs font-bold text-gray-400 uppercase tracking-tight">
                  <li className="hover:text-[#E31E24] cursor-pointer">Публичная оферта</li>
                  <li className="hover:text-[#E31E24] cursor-pointer">Условия доставки</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-black uppercase text-xs text-gray-800 mb-4">Контакты</h4>
                <p className="text-xl font-black text-gray-900 tracking-tight">+998 71 200 2211</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Прием заказов: 10:00 - 03:00</p>
              </div>
            </div>
            <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center text-[10px] font-black text-gray-300 uppercase tracking-widest gap-3">
              <p>© 2026 Feed Up. Все права защищены.</p>
              <p>Official Pixel-Perfect Design</p>
            </div>
          </div>
        </footer>

        {/* ================= MOBILE MENU DRAWER ================= */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setIsMobileMenuOpen(false)} />
            <div className="absolute inset-y-0 left-0 w-full max-w-xs bg-white p-6 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center pb-6 border-b border-gray-100">
                  <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-[#E31E24] font-black italic text-2xl uppercase tracking-tighter">feed<span>up</span></Link>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 p-1"><HiX size={24} /></button>
                </div>
                <nav className="flex flex-col gap-5 pt-6 text-sm font-black uppercase tracking-wider text-gray-700">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.name} 
                      to={link.path} 
                      onClick={() => setIsMobileMenuOpen(false)} 
                      className={`cursor-pointer`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="pt-6 border-t border-gray-100 space-y-4">
                <div className="text-sm font-black text-gray-800">+998 71 200 2211</div>
              </div>
            </div>
          </div>
        )}

        {/* ================= CART SIDEBAR ================= */}
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-xs" onClick={() => setIsCartOpen(false)} />
            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
                <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-[#F8F9FB]">
                  <h2 className="text-[15px] font-black uppercase tracking-tight text-gray-800">Корзина ({totalItems})</h2>
                  <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-gray-600 p-1"><HiX size={20} /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-2">
                      <HiOutlineShoppingBag size={40} className="text-gray-200" />
                      <p className="text-xs font-black text-gray-400 uppercase tracking-wider">Корзина пуста</p>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between border-b border-gray-50 pb-3">
                        <div className="flex items-center gap-3">
                          <img src={item.image} alt={item.name} className="w-10 h-10 object-contain" />
                          <div>
                            <h4 className="text-xs font-black uppercase text-gray-800 leading-tight w-44 truncate">{item.name}</h4>
                            <span className="text-xs font-bold text-gray-400">{(item.price * item.qnty).toLocaleString()} сум</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 bg-[#F8F9FB] p-1.5 rounded-xl border border-gray-100">
                          <button onClick={() => updateQuantity(item.id, -1)} className="text-gray-400"><HiMinus size={14} /></button>
                          <span className="text-xs font-black w-4 text-center">{item.qnty}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="text-gray-400"><HiPlus size={14} /></button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                {cart.length > 0 && (
                  <div className="p-5 border-t border-gray-100 bg-[#F8F9FB] space-y-4">
                    <div className="flex justify-between items-center font-black uppercase text-xs tracking-tight">
                      <span>Итого:</span>
                      <span className="text-base text-gray-900">{totalPrice.toLocaleString()} сум</span>
                    </div>
                    <button className="w-full bg-[#E31E24] hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider py-4 rounded-xl transition-all active:scale-98 shadow-md cursor-pointer">
                      Оформить заказ
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </Router>
  );
}