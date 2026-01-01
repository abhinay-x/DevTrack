const Privacy = () => {
  const sections = [
    {
      title: 'Data We Collect',
      content:
        'We store only the information required to provide your DevTrack workspace: account credentials, activity logs, and goal/snippet metadata you choose to save.',
    },
    {
      title: 'How We Use Your Data',
      content:
        'Your data powers dashboards, insights, and reminders. We never sell personal data and only use third-party services needed to run DevTrack securely.',
    },
    {
      title: 'Your Controls',
      content:
        'Export or delete logs, snippets, and goals at any time from within the app. Contact support@devtrack.app if you need assistance removing your account.',
    },
  ];

  return (
    <div className="min-h-screen bg-theme">
      <div className="bg-card border-b-2 border-theme">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-bold text-primary mb-2">Privacy Policy</h1>
          <p className="text-secondary max-w-2xl">
            DevTrack is built for developers who care about privacy. Here is how we protect your information.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        {sections.map((section) => (
          <div key={section.title} className="bg-card border border-theme rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-primary mb-3">{section.title}</h2>
            <p className="text-secondary leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Privacy;
