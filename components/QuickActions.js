import React, { useState } from 'react';

export const QuickActions = ({ onDeposit, onPurchase, funds }) => {
  const [depositAmount, setDepositAmount] = useState('');
  const [purchaseFundId, setPurchaseFundId] = useState('');
  const [purchaseAmount, setPurchaseAmount] = useState('');

  const handleDepositSubmit = (e) => {
    e.preventDefault();
    if (!depositAmount) return alert('请输入充值金额');
    onDeposit(parseFloat(depositAmount));
    setDepositAmount('');
  };

  const handlePurchaseSubmit = (e) => {
    e.preventDefault();
    if (!purchaseFundId) return alert('请选择基金');
    if (!purchaseAmount) return alert('请输入申购金额');
    onPurchase(purchaseFundId, parseFloat(purchaseAmount));
    setPurchaseFundId('');
    setPurchaseAmount('');
  };

  return (
    <div className="bg-background text-primary p-6 rounded-xl shadow-lg mb-6">
      <h3 className="text-2xl font-semibold mb-4">快速操作</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 充值模块 */}
        <div className="bg-secondary p-5 rounded-lg shadow-md">
          <h4 className="text-lg font-medium mb-3">账户充值</h4>
          <form onSubmit={handleDepositSubmit}>
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              placeholder="请输入充值金额"
              className="w-full p-3 mb-3 rounded-md bg-background text-primary border border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              className="w-full bg-accent hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-md transition-colors duration-200 shadow-md"
            >
              确认充值
            </button>
          </form>
        </div>

        {/* 基金申购模块 */}
        <div className="bg-secondary p-5 rounded-lg shadow-md">
          <h4 className="text-lg font-medium mb-3">基金申购</h4>
          <form onSubmit={handlePurchaseSubmit}>
            <select
              value={purchaseFundId}
              onChange={(e) => setPurchaseFundId(e.target.value)}
              className="w-full p-3 mb-3 rounded-md bg-background text-primary border border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">请选择基金</option>
              {funds.map(fund => (
                <option key={fund._id} value={fund._id}>{fund.name} (¥{fund.currentNav.toFixed(4)})</option>
              ))}
            </select>
            <input
              type="number"
              value={purchaseAmount}
              onChange={(e) => setPurchaseAmount(e.target.value)}
              placeholder="请输入申购金额"
              className="w-full p-3 mb-3 rounded-md bg-background text-primary border border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              className="w-full bg-accent hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-md transition-colors duration-200 shadow-md"
            >
              确认申购
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};