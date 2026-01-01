import { ArrowRight, Activity, Code2, Target, ShieldCheck, Sparkles, BarChart3, Users } from 'lucide-react';
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

const Landing = () => {
  return (
    <div className="min-h-screen bg-theme text-primary">
      {/* Hero */}
      <section className="relative overflow-hidden">
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
                Default landing page for teams who ship deliberately.
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
      <section className="bg-card py-20 border-y border-theme">
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
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
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
    </div>
  );
};

export default Landing;
