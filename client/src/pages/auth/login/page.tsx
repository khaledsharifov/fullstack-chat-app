import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from 'lucide-react';
import { useAuthStore } from '@store';
import { AuthImagePattern, Input } from '@components';
import clsx from 'clsx';
import { ERROR_MESSAGE } from '@constants';
import toast from 'react-hot-toast';

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const { login, isLoggingIn } = useAuthStore();

  const validateForm = () => {
    if (!form.email.trim()) return toast.error(ERROR_MESSAGE.required('Email'));
    if (!/\S+@\S+\.\S+/.test(form.email))
      return toast.error(ERROR_MESSAGE.invalidEmail);
    if (!form.password.trim())
      return toast.error(ERROR_MESSAGE.required('Password'));
    if (form.password.length < 6)
      return toast.error(ERROR_MESSAGE.minPasswordChar);

    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const seccess = validateForm();
    if (seccess === true) login(form);
  };

  return (
    <div className="grid h-screen lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="mb-8 text-center">
            <div className="group flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h1 className="mt-2 text-2xl font-bold">Welcome Back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <Input
              label="Email"
              placeholder="john@example.com"
              value={form.email}
              leftIcon={<Mail className="size-5 text-base-content/40" />}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, email: e.target.value }))
              }
            />

            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="********"
              value={form.password}
              leftIcon={<Lock className="size-5 text-base-content/40" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="cursor-pointer"
                >
                  {!showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              }
              onChange={(e) =>
                setForm((prev) => ({ ...prev, password: e.target.value }))
              }
            />

            <button
              type="submit"
              className={clsx('btn btn-primary mt-3 w-full', {
                'btn-disabled': isLoggingIn,
              })}
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="link link-primary">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      <AuthImagePattern
        title={'Welcome back!'}
        subtitle={
          'Sign in to continue your conversations and catch up with your messages.'
        }
      />
    </div>
  );
};
