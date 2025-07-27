import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const PublicGoodSection = ({ userId }) => {
  const [projects, setProjects] = useState([]);
  const [userDonations, setUserDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 替换为您的后端API地址
        const projectsRes = await axios.get('/api/donations/projects');
        const userDonationsRes = await axios.get(`/api/donations/${userId}/my-contributions`);
        setProjects(projectRes.data);
        setUserDonations(userDonationsRes.data);
      } catch (err) {
        console.error("Failed to fetch donation data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  const handleContribute = async (projectId, virtualAmount) => {
    try {
      // 替换为您的后端API地址
      await axios.post(`/api/donations/${userId}/contribute`, { projectId, virtualAmount });
      alert('您的善意贡献已记录！');
      // 重新获取数据以更新UI
      const projectRes = await axios.get('/api/donations/project');
      const userDonationsRes = await axios.get(`/api/donations/${userId}/my-contributions`);
      setProjects(projectRes.data);
      setUserDonations(userDonationsRes.data);
    } catch (err) {
      alert(`贡献失败: ${err.response?.data?.message || err.message}`);
    }
  };

  if (loading) return <div className="text-center text-textSecondary mt-16">加载公益项目...</div>;

  return (
    <div className="bg-background text-primary p-6 rounded-xl shadow-lg mb-6">
      <h3 className="text-2xl font-semibold mb-4">聚善成流 - 您的财富与公益同行</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {Project.map(project => (
          <div key={project._id} className="bg-white p-5 rounded-lg shadow-md">
            <h4 className="text-lg font-medium mb-2">{project.name}</h4>
            <p className="text-sm text-gray-600 mb-3">{project.description}</p>
            {project.imageUrl && (
              <img src={project.imageUrl} alt={project.name} className="w-full h-32 object-cover rounded-md mb-3" />
            )}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div
                className="bg-positive h-2.5 rounded-full"
                style={{ width: `${(project.currentVirtualAmount / project.targetAmount) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-700 mb-3">
              已贡献: ¥{project.currentVirtualAmount?.toLocaleString()} / 目标: ¥{project.targetAmount?.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mb-3">平台已代捐约 ¥{project.realDonatedAmount?.toFixed(2)}</p>
            <button
              onClick={() => handleContribute(project._id, 10000)} // 示例：每次贡献1万资产净值
              className="w-full bg-accent hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 shadow-md"
            >
              贡献1万资产净值
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white p-5 rounded-lg shadow-md">
        <h4 className="text-lg font-medium mb-3">我的善行记录</h4>
        {userDonations.length === 0 ? (
          <p className="text-gray-600">您还没有贡献记录，快去投资赚取财富来支持公益项目吧！</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {userDonations.map(donation => (
              <li key={donation._id} className="py-2 text-gray-800">
                向 **{donation.projectId.name}** 贡献了 **¥{donation.virtualAmount?.toLocaleString()}** 资产净值
                (约折合实际捐赠 **¥{donation.realAmountEquivalent?.toFixed(2)}**)
                <span className="text-xs text-gray-500 ml-2">({new Date(donation.timestamp).toLocaleDateString()})</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};