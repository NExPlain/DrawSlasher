import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Film, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import type { TLoginUser, TStartupConfig } from 'librechat-data-provider';
import type { TAuthContext } from '~/common';
import { useResendVerificationEmail } from '~/data-provider';
import { useLocalize } from '~/hooks';

type TLoginFormProps = {
  onSubmit: (data: TLoginUser) => void;
  startupConfig: TStartupConfig;
  error: Pick<TAuthContext, 'error'>['error'];
  setError: Pick<TAuthContext, 'setError'>['setError'];
};

const LoginForm: React.FC<TLoginFormProps> = ({ onSubmit, startupConfig, error, setError }) => {
  const localize = useLocalize();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginUser>();
  const [showResendLink, setShowResendLink] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    if (error && error.includes('422') && !showResendLink) {
      setShowResendLink(true);
    }
  }, [error, showResendLink]);

  const resendLinkMutation = useResendVerificationEmail({
    onMutate: () => {
      setError(undefined);
      setShowResendLink(false);
    },
  });

  if (!startupConfig) {
    return null;
  }

  const renderError = (fieldName: string) => {
    const errorMessage = errors[fieldName]?.message;
    return errorMessage ? (
      <span role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">
        {String(errorMessage)}
      </span>
    ) : null;
  };

  const handleResendEmail = () => {
    const email = getValues('email');
    if (!email) {
      return setShowResendLink(false);
    }
    resendLinkMutation.mutate({ email });
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <Film className="mx-auto h-12 w-12 text-indigo-600 dark:text-indigo-400" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">登入您的账户</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-indigo-300">开启您的创意旅程</p>
      </div>

      {showResendLink && (
        <div className="rounded-md border border-indigo-500 bg-indigo-50 px-4 py-3 text-sm text-indigo-700 dark:border-indigo-500 dark:bg-indigo-900/10 dark:text-indigo-200">
          {localize('com_auth_email_verification_resend_prompt')}
          <button
            type="button"
            className="ml-2 font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            onClick={handleResendEmail}
            disabled={resendLinkMutation.isLoading}
          >
            {localize('com_auth_email_resend_link')}
          </button>
        </div>
      )}

      <form className="mt-8 space-y-6" onSubmit={handleSubmit((data) => onSubmit(data))}>
        <div className="space-y-4 rounded-md shadow-sm">
          <div>
            <label htmlFor="email" className="sr-only">
              {localize('com_auth_email_address')}
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-5 w-5 text-gray-400 dark:text-gray-300" />
              </div>
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register('email', {
                  required: localize('com_auth_email_required'),
                  pattern: { value: /\S+@\S+\.\S+/, message: localize('com_auth_email_pattern') },
                })}
                className="block w-full rounded-md border border-gray-300 bg-white py-3 pl-10 pr-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
                placeholder={localize('com_auth_email_address')}
              />
            </div>
            {renderError('email')}
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              {localize('com_auth_password')}
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-gray-400 dark:text-gray-300" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                {...register('password', {
                  required: localize('com_auth_password_required'),
                  minLength: { value: 8, message: localize('com_auth_password_min_length') },
                })}
                className="block w-full rounded-md border border-gray-300 bg-white py-3 pl-10 pr-10 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
                placeholder={localize('com_auth_password')}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 dark:text-gray-300" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 dark:text-gray-300" />
                )}
              </button>
            </div>
            {renderError('password')}
          </div>
        </div>

        {startupConfig.passwordResetEnabled && (
          <div className="flex items-center justify-end">
            <a href="/forgot-password" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              {localize('com_auth_password_forgot')}
            </a>
          </div>
        )}

        <div>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-offset-gray-900"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Film className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 dark:text-indigo-300 dark:group-hover:text-indigo-200" />
            </span>
            {localize('com_auth_continue')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;