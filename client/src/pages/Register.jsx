import { useState, useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, Check, Flame, BarChart3, Save, Target, Zap } from 'lucide-react';
import { Button, Input } from '../components/ui';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const particles = [];
    const particleCount = 50;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
    });

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle());
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fill();

        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    resizeCanvas();
    initParticles();
    drawParticles();

    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
};

const Register = () => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const benefits = [
    { icon: Flame, text: 'Build Daily Streaks', delay: 'stagger-1' },
    { icon: BarChart3, text: 'Visualize Your Growth', delay: 'stagger-2' },
    { icon: Save, text: 'Save Code Snippets', delay: 'stagger-3' },
    { icon: Target, text: 'Achieve Your Goals', delay: 'stagger-4' },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === 'password') {
      calculatePasswordStrength(e.target.value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9!@#$%^&*]/.test(password)) strength += 25;
    setPasswordStrength(strength);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await register(form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Particle System */}
      <div className="hidden lg:flex lg:w-3/5 gradient-bg-alt relative overflow-hidden">
        <ParticleBackground />

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
            Start Your Journey
          </h1>
          <p className="text-xl text-white/80 mb-8 text-center animate-slideUp stagger-1">
            Join 2,487 developers tracking their progress
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 animate-slideUp ${benefit.delay}`}
              >
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Registration Form */}
      <div className="w-full lg:w-2/5 bg-card flex items-center justify-center p-8">
        <div className="w-full max-w-md animate-slideInRight">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 gradient-bg-alt rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">DevTrack</span>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary mb-2">
              Create Account
            </h2>
            <p className="text-secondary">
              Start tracking your development journey
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-danger/10 border-2 border-danger/20 rounded-xl text-danger animate-shake">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Username"
              name="username"
              type="text"
              placeholder="Choose a username"
              value={form.username}
              onChange={handleChange}
              icon={User}
              required
              autoComplete="username"
            />

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
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                icon={Lock}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-tertiary hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Password Strength */}
            {form.password && (
              <div className="space-y-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                        i * 25 <= passwordStrength
                          ? passwordStrength < 50
                            ? 'bg-danger'
                            : passwordStrength < 75
                            ? 'bg-warning'
                            : 'bg-success'
                          : 'bg-theme'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-secondary">
                  {passwordStrength < 50 && 'Weak password'}
                  {passwordStrength >= 50 && passwordStrength < 75 && 'Medium strength'}
                  {passwordStrength >= 75 && 'Strong password'}
                </p>
              </div>
            )}

            <div className="relative">
              <Input
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={handleChange}
                icon={Check}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 text-tertiary hover:text-primary transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              loading={loading}
              className="w-full py-3 text-lg"
            >
              Create Account
            </Button>
          </form>

          {/* Login Link */}
          <p className="mt-8 text-center text-secondary">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-primary font-semibold hover:text-secondary transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
