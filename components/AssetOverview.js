import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const AssetOverview = ({ totalAssets, assetAllocation }) => {
  // 资产配置数据
  const data = [
    { name: '股票', value: assetAllocation.stocks, color: '#3b82f6' },
    { name: '债券', value: assetAllocation.bonds, color: '#10b981' },
    { name: '现金', value: assetAllocation.cash, color: '#f59e0b' },
    { name: '其他', value: assetAllocation.other, color: '#8b5cf6' },
  ];

  // 格式化金额显示
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <Card className="shadow-lg border-0 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl">
      <CardHeader className="bg-gradient-to-r from-blue-900 to-blue-800 text-white pb-4">
        <CardTitle className="text-xl font-bold flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          资产总览
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* 总资产显示 */}
          <div className="text-center md:text-left">
            <p className="text-gray-500 text-sm mb-1">总资产估值</p>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">{formatCurrency(totalAssets)}</h3>
            <p className="text-green-500 text-sm mt-2 flex items-center justify-center md:justify-start">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              较上月增长 3.2%
            </p>
          </div>

          {/* 资产配置饼图 */}
          <div className="w-48 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 资产配置明细 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {data.map((item, index) => (
            <div key={index} className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-gray-600">{item.name}</span>
              <span className="ml-auto text-sm font-medium text-gray-900">{item.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetOverview;