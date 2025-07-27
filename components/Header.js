import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed w-full z-10 transition-all duration-300">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-blue-900 font-bold text-2xl">聚财众发</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-700 hover:text-blue-900 font-medium transition-colors">首页</Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-900 font-medium transition-colors">关于我们</Link>
          <Link href="/investment" className="text-gray-700 hover:text-blue-900 font-medium transition-colors">投资策略</Link>
          <Link href="/research" className="text-gray-700 hover:text-blue-900 font-medium transition-colors">洞察与研究</Link>
          <Link href="/podcast" className="text-gray-700 hover:text-blue-900 font-medium transition-colors">经视故事汇</Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-900 font-medium transition-colors">联系我们</Link>
        </nav>

        {/* CTA Button - 引导至私域流量 */}
        <div className="hidden md:block">
          <Link 
            href="/contact" 
            className="bg-blue-900 hover:bg-blue-800 text-white px-5 py-2 rounded-md font-medium transition-all transform hover:scale-105"
          >
            预约咨询
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <Link href="/" className="text-gray-700 hover:text-blue-900 font-medium py-2 transition-colors">首页</Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-900 font-medium py-2 transition-colors">关于我们</Link>
            <Link href="/investment" className="text-gray-700 hover:text-blue-900 font-medium py-2 transition-colors">投资策略</Link>
            <Link href="/research" className="text-gray-700 hover:text-blue-900 font-medium py-2 transition-colors">洞察与研究</Link>
            <Link href="/podcast" className="text-gray-700 hover:text-blue-900 font-medium py-2 transition-colors">经视故事汇</Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-900 font-medium py-2 transition-colors">联系我们</Link>
            <Link 
              href="/contact" 
              className="bg-blue-900 hover:bg-blue-800 text-white px-5 py-2 rounded-md font-medium text-center transition-all"
            >
              预约咨询
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;