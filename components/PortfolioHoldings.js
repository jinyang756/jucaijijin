import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const PortfolioHoldings = ({holdings}) => {
  // 格式化数字显示
  const formatNumber = (num) => {
    return new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 2 }).format(num);
  };

  // 格式化金额显示
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY', maximumFractionDigits: 2 }).format(amount);
  };

  // 计算收益百分比样式
  const getReturnStyle = (returnRate) => {
    if (returnRate > 0) return 'text-green-600 font-medium';
    if (returnRate < 0) return 'text-red-600 font-medium';
    return 'text-gray-600';
  };

  return (
    <Card className="shadow-lg border-0 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl">
      <CardHeader className="bg-gradient-to-r from-blue-900 to-blue-800 text-white pb-4">
        <CardTitle className="text-xl font-bold flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
          </svg>
          我的持仓
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th scope="col" className="w-[200px] pl-6 text-left">基金名称</th>
                <th scope="col" className="text-left">持仓数量</th>
                <th scope="col" className="text-left">成本价</th>
                <th scope="col" className="text-left">当前价</th>
                <th scope="col" className="text-left">持仓市值</th>
                <th scope="col" className="text-left">收益率</th>
                <th scope="col" className="text-right pr-6">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {holdings.length > 0 ? (
                holdings.map((holding, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="pl-6 font-medium">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <span className="text-blue-900 font-bold text-sm">{holding.code}</span>
                        </div>
                        <div>
                          <div>{holding.name}</div>
                          <Badge variant="outline" className="text-xs mt-1">{holding.type}</Badge>
                        </div>
                      </div>
                    </td>
                    <td>{formatNumber(holding.quantity)}</td>
                    <td>{formatCurrency(holding.costPrice)}</td>
                    <td>{formatCurrency(holding.currentPrice)}</td>
                    <td>{formatCurrency(holding.marketValue)}</td>
                    <td className={getReturnStyle(holding.returnRate)}>
                      {holding.returnRate > 0 ? '+' : ''}{holding.returnRate}%
                    </td>
                    <td className="text-right pr-6">
                      <div className="flex space-x-2 justify-end">
                        <button className="text-blue-900 hover:text-blue-700 text-sm font-medium transition-colors">
                          赎回
                        </button>
                        <button className="text-green-700 hover:text-green-600 text-sm font-medium transition-colors">
                          加仓
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    暂无持仓数据
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioHoldings;