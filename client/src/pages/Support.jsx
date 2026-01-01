import { Mail, MessageSquare, LifeBuoy } from 'lucide-react';

const Support = () => {
  const channels = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Reach us anytime for account questions or feature requests.',
      action: 'support@devtrack.app',
    },
    {
      icon: MessageSquare,
      title: 'Community Forum',
      description: 'Share ideas with other builders, vote on roadmap items, and get tips.',
      action: 'community.devtrack.app',
    },
    {
      icon: LifeBuoy,
      title: 'Priority Response',
      description: 'Need urgent help? We respond within 4 business hours.',
      action: 'pro@devtrack.app',
    },
  ];

  return (
    <div className="min-h-screen bg-theme">
      <div className="bg-card border-b-2 border-theme">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-bold text-primary mb-2">Support</h1>
          <p className="text-secondary max-w-2xl">
            We're here to keep you shipping. Choose the channel that works best for you.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 grid gap-6 md:grid-cols-3">
        {channels.map((channel) => {
          const Icon = channel.icon;
          return (
            <div key={channel.title} className="bg-card border border-theme rounded-2xl p-6 shadow-sm flex flex-col h-full">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Icon className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-semibold text-primary mb-2">{channel.title}</h2>
              <p className="text-secondary flex-1">{channel.description}</p>
              <p className="text-primary font-medium mt-4">{channel.action}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Support;
