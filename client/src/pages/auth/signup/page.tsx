import { useAuthStore } from '@store';
import { FormEvent, useState } from 'react';
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from 'lucide-react';
import { AuthImagePattern, Input } from '@components';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { AppRoutes, ERROR_MESSAGE } from '@constants';
import toast from 'react-hot-toast';

export const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!form.fullName.trim())
      return toast.error(ERROR_MESSAGE.required('Full name'));
    if (!form.email.trim()) return toast.error(ERROR_MESSAGE.required('Email'));
    if (!/\S+@\S+\.\S+/.test(form.email))
      return toast.error(ERROR_MESSAGE.invalidEmail);
    if (!form.password.trim())
      return toast.error(ERROR_MESSAGE.required('Password'));
    if (form.password.length < 6)
      return toast.error(ERROR_MESSAGE.minPasswordChar);

    return true;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const seccess = validateForm();
    if (seccess === true) signup(form);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-6">
          <div className="mb-8 text-center">
            <div className="group flex flex-col items-center gap-2">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h1 className="mt-2 text-2xl font-bold">Create Account</h1>
              <p className="text-base-content/60">
                Get started with your free account
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <Input
              label="Full Name"
              placeholder="John Doe"
              value={form.fullName}
              leftIcon={<User className="size-5 text-base-content/40" />}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, fullName: e.target.value }))
              }
            />

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
              disabled={isSigningUp}
              className={clsx('btn btn-primary mt-3 w-full', {
                'btn-disabled': isSigningUp,
              })}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{' '}
              <Link className="link link-primary" to={AppRoutes.Login}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};
