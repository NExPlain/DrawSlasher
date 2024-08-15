import React from 'react';

const ScriptWriterLanding = ({ localize, theme }) => {
  // 根据主题选择合适的颜色
  const bgColor = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-800';
  const cardBgColor = theme === 'dark' ? 'bg-gray-700' : 'bg-white';
  const cardTextColor = theme === 'dark' ? 'text-gray-200' : 'text-gray-600';
  const iconColor = theme === 'dark' ? 'text-blue-400' : 'text-blue-600';

  return (
    <div className={`w-full ${bgColor} py-8`}>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className={`text-3xl font-bold mb-4 text-center ${textColor}`}>欢迎使用千里</h1>
        <p className={`text-lg mb-6 text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          让我们一起创造下一部震撼银幕的大作
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <FeatureCard 
            icon={<FeatherIcon />}
            title="创意激发"
            description="输入灵感，AI助手助你拓展"
            cardBgColor={cardBgColor}
            cardTextColor={cardTextColor}
            iconColor={iconColor}
          />
          <FeatureCard 
            icon={<MessageIcon />}
            title="智能对话"
            description="与AI对话，精炼剧本构思"
            cardBgColor={cardBgColor}
            cardTextColor={cardTextColor}
            iconColor={iconColor}
          />
          <FeatureCard 
            icon={<FilmIcon />}
            title="参考经典"
            description="汲取成功案例的精华"
            cardBgColor={cardBgColor}
            cardTextColor={cardTextColor}
            iconColor={iconColor}
          />
          <FeatureCard 
            icon={<SendIcon />}
            title="即时反馈"
            description="获得专业建议，优化剧本"
            cardBgColor={cardBgColor}
            cardTextColor={cardTextColor}
            iconColor={iconColor}
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, cardBgColor, cardTextColor, iconColor }) => (
  <div className={`${cardBgColor} p-4 rounded-lg shadow-md flex flex-col items-center text-center w-64`}>
    <div className={`mb-2 text-2xl ${iconColor}`}>{icon}</div>
    <h3 className={`text-md font-semibold mb-1 ${cardTextColor}`}>{title}</h3>
    <p className={`text-sm ${cardTextColor}`}>{description}</p>
  </div>
);

const FeatherIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
    <line x1="16" y1="8" x2="2" y2="22"></line>
    <line x1="17.5" y1="15" x2="9" y2="15"></line>
  </svg>
);

const MessageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

const FilmIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
    <line x1="7" y1="2" x2="7" y2="22"></line>
    <line x1="17" y1="2" x2="17" y2="22"></line>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <line x1="2" y1="7" x2="7" y2="7"></line>
    <line x1="2" y1="17" x2="7" y2="17"></line>
    <line x1="17" y1="17" x2="22" y2="17"></line>
    <line x1="17" y1="7" x2="22" y2="7"></line>
  </svg>
);

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

export default ScriptWriterLanding;