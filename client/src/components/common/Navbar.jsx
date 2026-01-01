import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Zap, Search, Bell, User, Menu, X, Home, FileText, Code, Target, Settings, LogOut } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useKeyboardNavigation, useFocusManagement } from '../../hooks/useKeyboardNavigation';
import AccessibleButton from './AccessibleButton';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/logs', label: 'Logs', icon: FileText },
    { path: '/snippets', label: 'Snippets', icon: Code },
    { path: '/goals', label: 'Goals', icon: Target },
  ];

  // Keyboard navigation
  useKeyboardNavigation({
    keys: [
      { key: 'm', ctrl: true, callback: () => setMobileMenuOpen((prev) => !prev) },
      { key: 'p', ctrl: true, callback: () => setProfileMenuOpen(!profileMenuOpen) }
    ],
    onEscape: () => {
      setMobileMenuOpen(false);
      setProfileMenuOpen(false);
    }
  });

  // Focus management for accessibility
  useFocusManagement(['button', 'a', 'input', '[tabindex]'], mobileMenuOpen || profileMenuOpen);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuOpen && !event.target.closest('.profile-menu')) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [profileMenuOpen]);

  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleQuickAction = () => {
    setMobileMenuOpen(false);
    navigate('/logs?create=true');
  };

  const handleLogout = () => {
    logout();
    setProfileMenuOpen(false);
    setMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <>
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-theme" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-theme rounded-lg p-1"
            aria-label="DevTrack - Go to Dashboard"
          >
            <div className="w-9 h-9 gradient-bg rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <Zap className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <span className="text-xl font-bold gradient-text">DevTrack</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1" role="menubar">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                role="menuitem"
                className="px-4 py-2 rounded-lg text-sm font-medium text-secondary hover:text-primary hover:bg-hover transition-all duration-300 relative group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-theme"
                aria-label={`Navigate to ${link.label}`}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <AccessibleButton
              variant="ghost"
              size="sm"
              className="hidden sm:flex items-center gap-2"
              ariaLabel="Search functionality"
            >
              <Search className="w-4 h-4" aria-hidden="true" />
              <span className="text-sm">Search...</span>
            </AccessibleButton>

            {/* Notifications */}
            <AccessibleButton
              variant="ghost"
              className="relative p-2"
              ariaLabel="View notifications"
              ariaDescribedBy="notification-badge"
            >
              <Bell className="w-5 h-5" aria-hidden="true" />
              <span 
                id="notification-badge"
                className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full animate-pulse" 
                aria-label="Unread notifications"
              />
            </AccessibleButton>

            {/* Theme Toggle */}
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            {/* Profile */}
            <div className="relative hidden sm:block profile-menu">
              <AccessibleButton
                variant="ghost"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                ariaLabel="Open profile menu"
                ariaExpanded={profileMenuOpen}
                ariaHaspopup="menu"
              >
                <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center">
                  <User className="w-4 h-4 text-white" aria-hidden="true" />
                </div>
              </AccessibleButton>
              {profileMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-40 bg-card border-2 border-theme rounded-lg shadow-md z-50"
                  role="menu"
                  aria-label="Profile menu"
                >
                  <Link
                    to="/profile"
                    onClick={() => setProfileMenuOpen(false)}
                    role="menuitem"
                    className="block px-4 py-2 text-sm text-secondary hover:bg-hover hover:text-primary rounded-t-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                  >
                    Profile Settings
                  </Link>
                  <AccessibleButton
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-secondary hover:bg-hover hover:text-danger rounded-b-lg"
                    role="menuitem"
                  >
                    Logout
                  </AccessibleButton>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <AccessibleButton
              variant="ghost"
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              ariaLabel={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
              ariaExpanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </AccessibleButton>
          </div>
        </div>
      </div>
    </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-slate-900/80 backdrop-blur-lg z-40 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <div className="w-80 max-w-full h-full bg-gradient-to-b from-slate-900 via-slate-900/95 to-primary/90 border-l border-slate-800 shadow-2xl animate-slideInRight">
            <div className="flex items-center justify-between p-6 border-b border-slate-800">
              <Link 
                to="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3"
                aria-label="DevTrack Home"
              >
                <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <span className="text-xl font-semibold text-white">DevTrack</span>
              </Link>
              <AccessibleButton
                variant="ghost"
                className="p-2 text-white"
                onClick={() => setMobileMenuOpen(false)}
                ariaLabel="Close mobile menu"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </AccessibleButton>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center">
                  <User className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-white font-semibold">Welcome back!</p>
                  <p className="text-sm text-white/70">Track your dev journey</p>
                </div>
              </div>

              <nav className="space-y-2">
                {navLinks.map((link) => {
                  const IconComponent = link.icon;
                  const active = isActivePath(link.path);
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-4 px-4 py-3 rounded-2xl border ${
                        active
                          ? 'border-white/30 bg-white/10 text-white'
                          : 'border-white/5 text-white/80 hover:border-white/20 hover:bg-white/5'
                      } transition-all`}
                      aria-label={`Navigate to ${link.label}`}
                    >
                      <IconComponent className="w-5 h-5" aria-hidden="true" />
                      <span className="font-medium flex-1">{link.label}</span>
                      {active && <span className="w-2 h-2 rounded-full bg-violet-300" />}
                    </Link>
                  );
                })}
              </nav>

              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Quick Actions</p>
                <AccessibleButton
                  variant="ghost"
                  className="w-full justify-start px-4 py-3 bg-white/5 text-white rounded-2xl border border-white/10 hover:bg-white/10"
                  onClick={handleQuickAction}
                  ariaLabel="Add new log"
                >
                  <FileText className="w-4 h-4 mr-3" aria-hidden="true" />
                  Add Quick Log
                </AccessibleButton>
                <Link
                  to="/settings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-white border border-white/10 hover:bg-white/5"
                >
                  <Settings className="w-4 h-4" aria-hidden="true" />
                  Settings
                </Link>
                <AccessibleButton
                  variant="ghost"
                  className="w-full justify-start px-4 py-3 text-white/80 hover:text-danger"
                  onClick={handleLogout}
                  ariaLabel="Sign out"
                >
                  <LogOut className="w-4 h-4 mr-3" aria-hidden="true" />
                  Sign Out
                </AccessibleButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
