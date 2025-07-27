import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Badge } from './ui/badge';

const MarketWatch = ({ marketData, indexTrends }) => {
  // 格式化数字显示
  const formatNumber = (num) => {
    return new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 2 }).format(num);
  };

  // 获取涨跌样式
  const getChangeStyle = (change) => {
    if (change > 0) return 'text-green-600 font-medium flex items-center';
    if (change < 0) return 'text-red-600 font-medium flex items-center';
    return 'text-gray-600';
  };

  // 获取涨跌图标
  const getChangeIcon = (change) => {
    if (change > 0) return <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>;
    if (change < 0) return <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14M15 12l-3-3m3 3l-3 3" /></svg>;
    return null;
  };

  return (
    <Card className="shadow-lg border-0 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl">
      <CardHeader className="bg-gradient-to-r from-blue-900 to-blue-800 text-white pb-4">
        <CardTitle className="text-xl font-bold flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          市场行情
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {marketData.map((index, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-4 border border-gray-100 transition-all duration-300 hover:border-blue-200 hover:shadow-md">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">{index.name}</h3>
                  <p className="text-sm text-gray-500">{index.code}</p>
                </div>
                <Badge variant="outline" className="text-xs">{index.category}</Badge>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-gray-900">{formatNumber(index.value)}</span>
                <span className={getChangeStyle(index.change)}>
                  {getChangeIcon(index.change)}
                  {index.change > 0 ? '+' : ''}{index.change} ({index.changePercent}%)
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 市场趋势图表 */}
        <div className="h-64 mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={indexTrends} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorIndex" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="#6b7280" />
              <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                formatter={(value) => [formatNumber(value), '指数值']}
              />
              <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorIndex)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketWatch;