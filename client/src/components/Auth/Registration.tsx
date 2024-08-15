import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useRegisterUserMutation } from 'librechat-data-provider/react-query';
import type { TRegisterUser, TError } from 'librechat-data-provider';
import type { TLoginLayoutContext } from '~/common';
import { ErrorMessage } from './ErrorMessage';
import { useLocalize } from '~/hooks';
import { Film, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const localize = useLocalize();
  const { startupConfig, startupConfigError, isFetching } = useOutletContext<TLoginLayoutContext>();

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterUser>({ mode: 'onChange' });
  const password = watch('password');

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [countdown, setCountdown] = useState<number>(3);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const registerUser = useRegisterUserMutation({
    onSuccess: () => {
      setCountdown(3);
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timer);
            navigate('/c/new', { replace: true });
            return 0;
          } else {
            return prevCountdown - 1;
          }
        });
      }, 1000);
    },
    onError: (error: unknown) => {
      if ((error as TError).response?.data?.message) {
        setErrorMessage((error as TError).response?.data?.message ?? '');
      }
    },
  });

  useEffect(() => {
    if (startupConfig?.registrationEnabled === false) {
      navigate('/login');
    }
  }, [startupConfig, navigate]);

  const renderInput = (id: string, label: string, type: string, icon: React.ReactNode, validation: object) => (
    <div className="mb-4">
      <label htmlFor={id} className="sr-only">
        {localize(label)}
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          {icon}
        </div>
        <input
          id={id}
          type={type === 'password' ? (id === 'password' ? (showPassword ? 'text' : 'password') : (showConfirmPassword ? 'text' : 'password')) : type}
          autoComplete={id}
          aria-label={localize(label)}
          {...register(
            id as 'name' | 'email' | 'username' | 'password' | 'confirm_password',
            validation,
          )}
          aria-invalid={!!errors[id]}
          className="block w-full rounded-md border border-gray-300 bg-white py-3 pl-10 pr-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
          placeholder={localize(label)}
          data-testid={id}
        />
        {type === 'password' && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => id === 'password' ? setShowPassword(!showPassword) : setShowConfirmPassword(!showConfirmPassword)}
          >
            {(id === 'password' ? showPassword : showConfirmPassword) ? (
              <EyeOff className="h-5 w-5 text-gray-400 dark:text-gray-300" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 dark:text-gray-300" />
            )}
          </button>
        )}
      </div>
      {errors[id] && (
        <span role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">
          {String(errors[id]?.message) ?? ''}
        </span>
      )}
    </div>
  );

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <Film className="mx-auto h-12 w-12 text-indigo-500 dark:text-indigo-400" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">创建您的账户</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-indigo-300">开始您的创意之旅</p>
      </div>

      {errorMessage && (
        <ErrorMessage>
          {localize('com_auth_error_create')} {errorMessage}
        </ErrorMessage>
      )}
      {registerUser.isSuccess && countdown > 0 && (
        <div
          className="rounded-md border border-green-500 bg-green-50 px-3 py-2 text-sm text-green-700 dark:border-green-500 dark:bg-green-900/10 dark:text-green-200"
          role="alert"
        >
          {localize(
            startupConfig?.emailEnabled
              ? 'com_auth_registration_success_generic'
              : 'com_auth_registration_success_insecure',
          ) +
            ' ' +
            localize('com_auth_email_verification_redirecting', countdown.toString())}
        </div>
      )}
      {!startupConfigError && !isFetching && (
        <form
          className="mt-8 space-y-6"
          aria-label="Registration form"
          method="POST"
          onSubmit={handleSubmit((data: TRegisterUser) => registerUser.mutate(data))}
        >
          {renderInput('name', 'com_auth_full_name', 'text', <User className="h-5 w-5 text-gray-400 dark:text-gray-300" />, {
            required: localize('com_auth_name_required'),
            minLength: {
              value: 3,
              message: localize('com_auth_name_min_length'),
            },
            maxLength: {
              value: 80,
              message: localize('com_auth_name_max_length'),
            },
          })}
          {renderInput('username', 'com_auth_username', 'text', <User className="h-5 w-5 text-gray-400 dark:text-gray-300" />, {
            minLength: {
              value: 2,
              message: localize('com_auth_username_min_length'),
            },
            maxLength: {
              value: 80,
              message: localize('com_auth_username_max_length'),
            },
          })}
          {renderInput('email', 'com_auth_email', 'email', <Mail className="h-5 w-5 text-gray-400 dark:text-gray-300" />, {
            required: localize('com_auth_email_required'),
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: localize('com_auth_email_pattern'),
            },
          })}
          {renderInput('password', 'com_auth_password', 'password', <Lock className="h-5 w-5 text-gray-400 dark:text-gray-300" />, {
            required: localize('com_auth_password_required'),
            minLength: {
              value: 8,
              message: localize('com_auth_password_min_length'),
            },
            maxLength: {
              value: 128,
              message: localize('com_auth_password_max_length'),
            },
          })}
          {renderInput('confirm_password', 'com_auth_password_confirm', 'password', <Lock className="h-5 w-5 text-gray-400 dark:text-gray-300" />, {
            validate: (value: string) =>
              value === password || localize('com_auth_password_not_match'),
          })}

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-offset-gray-900"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Film className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 dark:text-indigo-300 dark:group-hover:text-indigo-200" />
              </span>
              {localize('com_auth_create_account')}
            </button>
          </div>
        </form>
      )}

      <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
        {localize('com_auth_already_have_account')}{' '}
        <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
          {localize('com_auth_login')}
        </a>
      </p>
    </div>
  );
};

export default Registration;