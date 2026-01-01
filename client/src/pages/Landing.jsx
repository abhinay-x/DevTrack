import { ArrowRight, Activity, Code2, Target, ShieldCheck, Sparkles, BarChart3, Users, LogIn, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const keyStats = [
  { label: 'Teams onboarded', value: '42+' },
  { label: 'Snippets saved', value: '18k' },
  { label: 'Weekly check-ins', value: '96%' },
];

const featureColumns = [
  {
    icon: Activity,
    title: 'Engineering Rhythm',
    body: 'Streak-ready logging, habit loops, and weekly reflections keep momentum high across squads.',
    accent: 'from-emerald-400/30 via-emerald-500/20 to-transparent'
  },
  {
    icon: Code2,
    title: 'Reusable Knowledge',
    body: 'Code library with instant search, syntax-highlighted previews, and metadata for faster reuse.',
    accent: 'from-indigo-400/30 via-indigo-500/20 to-transparent'
  },
  {
    icon: Target,
    title: 'Goal Ops',
    body: 'Tie roadmap goals to measurable effort, unblock owners faster, and celebrate shipped outcomes.',
    accent: 'from-rose-400/30 via-rose-500/20 to-transparent'
  }
];

const timeline = [
  { title: 'Kickoff call', body: 'Share rituals and data sources. We map the DevTrack workspace in under 30 minutes.' },
  { title: 'Workspace presets', body: 'Goals, logs, and snippet templates tailored for ICs, Tech Leads, and Eng Managers.' },
  { title: 'Automation boost', body: 'Slack nudges, Postman scripts, and dashboards light up within the first sprint.' }
];

const marketingNav = [
  { label: 'Product', href: '#product' },
  { label: 'Playbooks', href: '#timeline' },
  { label: 'Pricing', href: '#cta' },
  { label: 'Docs', href: '/support' },
];

const footerLinks = [
  {
    title: 'Product',
    links: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Logs', href: '/logs' },
      { label: 'Goals', href: '/goals' },
      { label: 'Snippets', href: '/snippets' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Terms', href: '/terms' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Support', href: '/support' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Postman Collection', href: '/postman/DevTrack.postman_collection.json' },
      { label: 'API Docs', href: '#product' },
      { label: 'Roadmap', href: '/dashboard' },
    ],
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-theme text-primary flex flex-col">
      {/* Marketing Navbar */}
      <header className="sticky top-0 z-40 border-b border-theme/60 backdrop-blur-md bg-theme/80">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 gradient-bg rounded-xl flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-lg">DevTrack</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {marketingNav.map((item) =>
              item.href.startsWith('#') ? (
                <a key={item.label} href={item.href} className="text-secondary hover:text-primary transition-colors">
                  {item.label}
                </a>
              ) : (
                <Link key={item.label} to={item.href} className="text-secondary hover:text-primary transition-colors">
                  {item.label}
                </Link>
              )
            )}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-theme text-secondary hover:text-primary transition"
            >
              <LogIn className="w-4 h-4" />
              Sign in
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center px-5 py-2 rounded-xl bg-primary text-white font-semibold shadow-lg shadow-primary/30 hover:bg-primary-dark transition"
            >
              Join now
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden" id="product">
        <div className="absolute inset-0">
          <div className="absolute -top-20 right-0 w-80 h-80 gradient-bg blur-3xl opacity-40" />
          <div className="absolute bottom-0 left-20 w-72 h-72 gradient-bg-alt blur-3xl opacity-30" />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(99,102,241,0.2) 1px, transparent 0)', backgroundSize: '60px 60px' }} />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12">
          <div className="space-y-8 animate-slideUp">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-white/20 bg-card text-sm text-secondary">
              <Sparkles className="w-4 h-4 text-primary" />
              Developer Operating System
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight gradient-text">
                DevTrack keeps engineering rituals aligned, measurable, and inspiring.
              </h1>
              <p className="mt-6 text-lg text-secondary">
                DevTrack brings together daily logs, goals, and knowledge so engineers can see progress, unblock fast, and stay aligned without opening a spreadsheet.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold shadow-lg shadow-primary/30 hover:bg-primary-dark transition"
              >
                Launch Workspace
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl border-2 border-theme text-primary font-semibold hover:border-primary hover:text-primary-dark transition"
              >
                Create Account
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 pt-4">
              {keyStats.map((stat) => (
                <div key={stat.label} className="flex-1 min-w-[140px]">
                  <p className="text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm tracking-wide uppercase text-tertiary">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-primary/30 via-secondary/30 to-transparent blur-3xl" />
            <div className="relative bg-card border-2 border-theme rounded-3xl p-8 shadow-2xl space-y-6 animate-scaleIn">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center text-white">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-secondary">Live signal</p>
                  <p className="text-lg font-semibold">Momentum dashboard</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-theme border border-theme">
                  <p className="text-xs text-tertiary">Weekly logs</p>
                  <p className="text-3xl font-semibold text-primary mt-2">128</p>
                  <p className="text-xs text-success mt-1">+14% vs last sprint</p>
                </div>
                <div className="p-4 rounded-2xl bg-theme border border-theme">
                  <p className="text-xs text-tertiary">Goal velocity</p>
                  <p className="text-3xl font-semibold text-primary mt-2">92%</p>
                  <p className="text-xs text-success mt-1">on track</p>
                </div>
              </div>
              <div className="rounded-2xl border border-theme p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-secondary">Snippets reused this week</p>
                    <p className="text-lg font-semibold">43 handoffs avoided</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-secondary">Engagement</span>
                  <span className="text-primary font-semibold">87%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-theme overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary via-secondary to-rose-400 rounded-full" style={{ width: '87%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Columns */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-6">
        {featureColumns.map((feature) => (
          <div key={feature.title} className="relative overflow-hidden rounded-3xl border border-theme bg-card/80 p-6 space-y-4">
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.accent}`} />
            <div className="relative flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-card flex items-center justify-center border border-theme">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
            </div>
            <p className="relative text-secondary">{feature.body}</p>
          </div>
        ))}
      </section>

      {/* Timeline */}
      <section className="bg-card py-20 border-y border-theme" id="timeline">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-tertiary">ONBOARDING</p>
              <h2 className="text-3xl font-bold text-primary">Spin up DevTrack in one sprint</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {timeline.map((step, index) => (
              <div key={step.title} className="relative p-6 rounded-2xl border border-theme bg-theme">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-semibold mb-4">
                  0{index + 1}
                </span>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-secondary">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center" id="cta">
        <p className="text-sm uppercase tracking-[0.3em] text-tertiary">READY WHEN YOU ARE</p>
        <h2 className="text-4xl font-bold mt-4 text-primary">Bring clarity to your engineering rituals.</h2>
        <p className="text-secondary mt-4 max-w-3xl mx-auto">
          Consolidate check-ins, goals, snippets, and analytics into one operating window. DevTrack integrates with your existing stack and gives stakeholders a live, trustworthy signal.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-semibold shadow-lg shadow-primary/30 hover:opacity-95 transition"
          >
            Get Started Free
          </Link>
          <Link
            to="/login"
            className="px-8 py-3 rounded-2xl border-2 border-theme text-primary font-semibold hover:border-primary hover:text-primary-dark transition"
          >
            I already have an account
          </Link>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-card border-t border-theme">
        <div className="max-w-6xl mx-auto px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 gradient-bg rounded-xl flex items-center justify-center text-white">
                <Zap className="w-4 h-4" />
              </div>
              <span className="text-lg font-semibold">DevTrack</span>
            </div>
            <p className="text-secondary text-sm">
              Developer activity intelligence for teams that care about focus, clarity, and creative velocity.
            </p>
          </div>
          {footerLinks.map((column) => (
            <div key={column.title}>
              <p className="text-xs font-semibold tracking-[0.3em] text-tertiary mb-4">{column.title.toUpperCase()}</p>
              <div className="space-y-2 text-sm">
                {column.links.map((link) =>
                  link.href.startsWith('/') ? (
                    <Link key={link.label} to={link.href} className="block text-secondary hover:text-primary transition">
                      {link.label}
                    </Link>
                  ) : (
                    <a key={link.label} href={link.href} className="block text-secondary hover:text-primary transition">
                      {link.label}
                    </a>
                  )
                )}
              </div>
            </div>
          ))}
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-tertiary mb-4">NEWSLETTER</p>
            <p className="text-secondary text-sm mb-4">Monthly engineering rituals, templates, and shipping prompts.</p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="work@email.com"
                className="flex-1 rounded-xl border border-theme bg-theme px-4 py-2 focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-theme py-6 text-center text-xs text-tertiary">
          © {new Date().getFullYear()} DevTrack. Built for engineering teams that ship deliberately.
        </div>
      </footer>
    </div>
  );
};

export default Landing;
