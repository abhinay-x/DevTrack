import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Code, Flame, Target, Zap } from 'lucide-react';
import { Button, Input } from '../components/ui';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: Flame, text: 'Build Daily Streaks', delay: 'stagger-1' },
    { icon: Code, text: 'Track Your Progress', delay: 'stagger-2' },
    { icon: Target, text: 'Achieve Your Goals', delay: 'stagger-3' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Animated Gradient */}
      <div className="hidden lg:flex lg:w-3/5 gradient-bg relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Floating Shapes */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full px-12 text-white">
          {/* Logo */}
          <div className="mb-8 animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Zap className="w-7 h-7" />
              </div>
              <span className="text-3xl font-bold">DevTrack</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-5xl font-bold mb-4 text-center animate-slideUp">
            Track Your Growth
          </h1>
          <p className="text-xl text-white/80 mb-12 text-center animate-slideUp stagger-1">
            Join developers building better habits
          </p>

          {/* Features */}
          <div className="space-y-6 w-full max-w-md">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 animate-slideUp ${feature.delay}`}
              >
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6" />
                </div>
                <span className="text-lg font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-2/5 bg-card flex items-center justify-center p-8">
        <div className="w-full max-w-md animate-slideInRight">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">DevTrack</span>
          </div>

          {/* Welcome Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary mb-2">
              Welcome Back 👋
            </h2>
            <p className="text-secondary">
              Sign in to continue your journey
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-danger/10 border-2 border-danger/20 rounded-xl text-danger animate-shake">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              icon={Mail}
              required
              autoComplete="email"
            />

            <div className="relative">
              <Input
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                icon={Lock}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-tertiary hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={(e) => setForm({ ...form, remember: e.target.checked })}
                  className="w-4 h-4 rounded border-2 border-theme text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-sm text-secondary group-hover:text-primary transition-colors">
                  Remember me
                </span>
              </label>
              <Link 
                to="/forgot-password" 
                className="text-sm text-primary hover:text-secondary transition-colors font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              loading={loading}
              className="w-full py-3 text-lg"
            >
              Sign In
            </Button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-secondary">
            Don't have an account?{' '}
            <Link 
              to="/register" 
              className="text-primary font-semibold hover:text-secondary transition-colors"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
