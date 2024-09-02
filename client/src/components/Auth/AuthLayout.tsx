import React, { useState, useEffect } from 'react';
import { useLocalize } from '~/hooks';
import { BlinkAnimation } from './BlinkAnimation';
import { TStartupConfig } from 'librechat-data-provider';
import SocialLoginRender from './SocialLoginRender';
import Footer from './Footer';
import { Sun, Moon, Feather, MessageSquare, Film, Send } from 'lucide-react';

const ErrorRender = ({ children }) => (
  <div className="mt-4 rounded-md border border-red-500 bg-red-500/10 px-3 py-2 text-sm text-gray-600 dark:text-gray-200" role="alert">
    {children}
  </div>
);

const FeatureItem = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center text-white">
    <div className="mb-2 rounded-full bg-white/20 p-3">{icon}</div>
    <h3 className="mb-1 text-lg font-semibold">{title}</h3>
    <p className="text-sm text-indigo-100">{description}</p>
  </div>
);

function AuthLayout({
  children,
  header,
  isFetching,
  startupConfig,
  startupConfigError,
  pathname,
  error,
}) {
  const localize = useLocalize();
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = 'dark';
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  // const toggleTheme = () => {
  //   const newTheme = theme === 'light' ? 'dark' : 'light';
  //   setTheme(newTheme);
  //   localStorage.setItem('theme', newTheme);
  //   document.documentElement.classList.toggle('dark', newTheme === 'dark');
  // };

  const DisplayError = () => {
    if (startupConfigError !== null && startupConfigError !== undefined) {
      return <ErrorRender>{localize('com_auth_error_login_server')}</ErrorRender>;
    } else if (error === 'com_auth_error_invalid_reset_token') {
      return (
        <ErrorRender>
          {localize('com_auth_error_invalid_reset_token')}{' '}
          <a className="font-semibold text-indigo-600 hover:underline" href="/forgot-password">
            {localize('com_auth_click_here')}
          </a>{' '}
          {localize('com_auth_to_try_again')}
        </ErrorRender>
      );
    } else if (error) {
      return <ErrorRender>{localize(error)}</ErrorRender>;
    }
    return null;
  };

  return (
    <div className="flex min-h-screen dark:bg-gray-900 dark:text-white bg-gray-50 text-gray-900">
      {/* Left side - Cinematic Intro */}
      <div className="hidden w-1/2 lg:flex flex-col justify-center relative overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/assets/homepage.m4v" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10 px-12">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-5xl font-bold text-white">光合作用</h1>
            <p className="text-xl text-indigo-100">让创意插上翱翔的翅膀</p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <FeatureItem icon={<Feather />} title="创意激发" description="AI助手助你拓展灵感" />
            <FeatureItem icon={<MessageSquare />} title="智能对话" description="与AI深度探讨剧本构思" />
            <FeatureItem icon={<Film />} title="参考经典" description="汲取成功案例的精华" />
            <FeatureItem icon={<Send />} title="即时反馈" description="获得专业建议，优化剧本" />
          </div>
        </div>
      </div>

      {/* Right side - Auth form */}
      <div className="flex w-full flex-col justify-between lg:w-1/2">
        <BlinkAnimation active={isFetching}>
          <div className="mx-auto mt-8 h-16 w-full max-w-md"></div>
        </BlinkAnimation>

        <div className="mx-auto w-full max-w-md px-6 py-8">
          <DisplayError />
          {!startupConfigError && !isFetching && (
            <div className="text-center">
              <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">{header}</h2>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                {pathname.includes('login') ? '欢迎回来，让我们继续您的创作之旅' : '加入我们，开启您的编剧生涯'}
              </p>
            </div>
          )}
          {children}
          {(pathname.includes('login') || pathname.includes('register')) && (
            <SocialLoginRender startupConfig={startupConfig} />
          )}
        </div>

        <div className="mb-4 flex items-center justify-between px-6">
          {/* <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
          </button> */}
          <Footer startupConfig={startupConfig} />
        </div> 
      </div>
    </div>
  );
}

export default AuthLayout;