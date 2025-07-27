import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';

// 导入组件
import AssetOverview from '../components/AssetOverview';
import PortfolioHoldings from '../components/PortfolioHoldings';
import MarketWatch from '../components/MarketWatch';
import { QuickActions } from '../components/QuickActions';
import { PublicGoodSection } from '../components/PublicGoodSection';
import Header from '../components/Header';

export default function App() {
  const [userData, setUserData] = useState(null);
  const [portfolioData, setPortfolioData] = useState([]);
  const [marketData, setMarketData] = useState([]);
  const [indexTrends, setIndexTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 模拟用户ID，实际应用中应从认证服务获取
  const userId = 'mockUserId123';

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // 使用环境变量中的API地址
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
        
        const [userRes, portfolioRes, marketRes, trendsRes] = await Promise.all([
          axios.get(`${apiBaseUrl}/api/users/${userId}/overview`),
          axios.get(`${apiBaseUrl}/api/portfolio/${userId}/holdings`),
          axios.get(`${apiBaseUrl}/api/market/funds`),
          axios.get(`${apiBaseUrl}/api/market/trends`)
        ]);
        setUserData(userRes.data);
        setPortfolioData(portfolioRes.data);
        setMarketData(marketRes.data);
        setIndexTrends(trendsRes.data);
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
            const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
            const marketRes = await axios.get(`${apiBaseUrl}/api/market/funds`);
            const trendsRes = await axios.get(`${apiBaseUrl}/api/market/trends`);
            setMarketData(marketRes.data);
            setIndexTrends(trendsRes.data);
        } catch (err) {
            console.error("轮询市场数据失败:", err);
        }
    }, 5000); // 每5秒更新一次

    return () => clearInterval(marketPolling); // 组件卸载时清除轮询

  }, [userId]);

  const handleDeposit = async (amount) => {
    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
      const res = await axios.post(`${apiBaseUrl}/api/transactions/${userId}/deposit`, { amount });
      setUserData(prev => ({ ...prev, availableBalance: res.data.availableBalance }));
      alert('资金已到账！'); // 实际应用中请使用更友好的通知系统
      // 重新获取用户总览数据以确保所有财务指标更新
      const userRes = await axios.get(`${apiBaseUrl}/api/users/${userId}/overview`);
      setUserData(userRes.data);
    } catch (err) {
      alert(`充值失败: ${err.response?.data?.message || err.message}`);
    }
  };

  const handlePurchase = async (fundId, amount) => {
    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
      const res = await axios.post(`${apiBaseUrl}/api/transactions/${userId}/purchase`, { fundId, amount });
      alert('申购交易已提交！');
      // 重新获取持仓和用户总览数据以反映变化
      const [userRes, portfolioRes] = await Promise.all([
          axios.get(`${apiBaseUrl}/api/users/${userId}/overview`),
          axios.get(`${apiBaseUrl}/api/portfolio/${userId}/holdings`),
      ]);
      setUserData(userRes.data);
      setPortfolioData(portfolioRes.data);

    } catch (err) {
      alert(`申购失败: ${err.response?.data?.message || err.message}`);
    }
  };

  if (loading) return <div className="text-center text-primary text-xl mt-20">正在加载您的财富数据...</div>;
  if (error) return <div className="text-center text-negative text-xl mt-20">{error}</div>;
  if (!userData) return <div className="text-center text-primary text-xl mt-20">未找到用户数据</div>;

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>聚财众发 - 基金组合平台</title>
        <meta name="description" content="聚财众发 - 沉浸式基金组合运营平台" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="container mx-auto p-4 pt-20">
        <AssetOverview 
          totalAssets={userData.totalAssets} 
          assetAllocation={userData.assetAllocation} 
        />
        <QuickActions 
          onDeposit={handleDeposit} 
          onPurchase={handlePurchase} 
          funds={marketData} 
        />
        <PortfolioHoldings holdings={portfolioData} />
        <MarketWatch 
          marketData={marketData} 
          indexTrends={indexTrends} 
        />
        <PublicGoodSection userId={userId} />
      </main>

      {/* 可以在这里添加 Footer 组件 */}
    </div>
  );
}