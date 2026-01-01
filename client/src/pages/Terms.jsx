const Terms = () => {
  const clauses = [
    {
      title: 'Use of Service',
      content: 'DevTrack is intended for personal and team productivity tracking. You agree not to misuse the platform, attempt to break security, or resell access.',
    },
    {
      title: 'Your Content',
      content: 'You own your logs, snippets, and goals. By using DevTrack, you grant us permission to process that content solely to provide the service.',
    },
    {
      title: 'Availability & Changes',
      content: 'We strive for uninterrupted uptime but may update or pause features for maintenance. We will notify you of major changes whenever possible.',
    },
  ];

  return (
    <div className="min-h-screen bg-theme">
      <div className="bg-card border-b-2 border-theme">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-bold text-primary mb-2">Terms of Service</h1>
          <p className="text-secondary max-w-2xl">
            These terms outline your rights and responsibilities when using DevTrack.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        {clauses.map((clause) => (
          <div key={clause.title} className="bg-card border border-theme rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-primary mb-3">{clause.title}</h2>
            <p className="text-secondary leading-relaxed">{clause.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Terms;
