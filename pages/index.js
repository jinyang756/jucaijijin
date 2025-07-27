import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';

// 导入组件
import { AssetOverview } from '../components/AssetOverview';
import { PortfolioHoldings } from '../components/PortfolioHoldings';
import { MarketWatch } from '../components/MarketWatch';
import { QuickActions } from '../components/QuickActions';
import { PublicGoodSection } from '../components/PublicGoodSection';
import Header from '../components/Header';

export default function App() {
  const [userData, setUserData] = useState(null);
  const [portfolioData, setPortfolioData] = useState([]);
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 模拟用户ID，实际应用中应从认证服务获取
  const userId = 'mockUserId123';

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // 替换为您的后端API地址
        const [userRes, portfolioRes, marketRes] = await Promise.all([
          axios.get(`/api/users/${userId}/overview`),
          axios.get(`/api/portfolio/${userId}/holdings`),
          axios.get('/api/market/funds'),
        ]);
        setUserData(userRes.data);
        setPortfolioData(portfolioRes.data);
        setMarketData(marketRes.data);
      } catch (err) {
        setError('加载数据失败，请重试。');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

    // 设置实时市场数据更新的轮询
    const marketPolling = setInterval(async () => {
        try {
            // 替换为您的后端API地址
            const marketRes = await axios.get('/api/market/funds');
            setMarketData(marketRes.data);
        } catch (err) {
            console.error("轮询市场数据失败:", err);
        }
    }, 5000); // 每5秒更新一次

    return () => clearInterval(marketPolling); // 组件卸载时清除轮询

  }, [userId]);

  const handleDeposit = async (amount) => {
    try {
      // 替换为您的后端API地址
      const res = await axios.post(`/api/transactions/${userId}/deposit`, { amount });
      setUserData(prev => ({ ...prev, availableBalance: res.data.availableBalance }));
      alert('资金已到账！'); // 实际应用中请使用更友好的通知系统
      // 重新获取用户总览数据以确保所有财务指标更新
      const userRes = await axios.get(`/api/users/${userId}/overview`);
      setUserData(userRes.data);
    } catch (err) {
      alert(`充值失败: ${err.response?.data?.message || err.message}`);
    }
  };

  const handlePurchase = async (fundId, amount) => {
    try {
      // 替换为您的后端API地址
      const res = await axios.post(`/api/transactions/${userId}/purchase`, { fundId, amount });
      alert('申购交易已提交！');
      // 重新获取持仓和用户总览数据以反映变化
      const [userRes, portfolioRes] = await Promise.all([
          axios.get(`/api/users/${userId}/overview`),
          axios.get(`/api/portfolio/${userId}/holdings`),
      ]);
      setUserData(userRes.data);
      setPortfolioData(portfolioRes.data);

    } catch (err) {
      alert(`申购失败: ${err.response?.data?.message || err.message}`);
    }
  };

  if (loading) return <div className="text-center text-primary text-xl mt-20">正在加载您的财富数据...</div>;
  if (error) return <div className="text-center text-negative text-xl mt-20">{error}</div>;

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>聚财众发 - 基金组合平台</title>
        <meta name="description" content="聚财众发 - 沉浸式基金组合运营平台" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header /> {/* 使用 Header 组件 */}

      <main className="container mx-auto p-4">
        <AssetOverview data={userData} />
        <QuickActions onDeposit={handleDeposit} onPurchase={handlePurchase} funds={marketData} />
        <PortfolioHoldings data={portfolioData} />
        <MarketWatch funds={marketData} />
        <PublicGoodSection userId={userId} />
      </main>

      {/* 可以在这里添加 Footer 组件 */}
    </div>
  );
}