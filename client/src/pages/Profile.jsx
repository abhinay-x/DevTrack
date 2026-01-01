import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { updateProfile } from '../services/userService';
import { Card, CardHeader, CardBody, Button, Input } from '../components/ui';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    username: user?.username || '',
    email: user?.email || '',
    profilePicture: user?.profilePicture || '',
    password: '',
    confirmPassword: '',
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password && form.password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    const payload = {
      username: form.username,
      email: form.email,
      profilePicture: form.profilePicture,
    };
    if (form.password) payload.password = form.password;

    try {
      setSaving(true);
      const { data } = await updateProfile(payload);
      // Persist the latest auth payload and refresh so AuthProvider picks it up
      localStorage.setItem('devtrack_user', JSON.stringify(data));
      toast.success('Profile updated');
      window.location.reload();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-theme">
      <div className="bg-card border-b-2 border-theme">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-2xl font-bold text-primary">Profile</h1>
          <p className="text-secondary">Manage your account information</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <Card hover>
          <CardHeader>
            <h2 className="text-lg font-semibold text-primary">Account Details</h2>
          </CardHeader>
          <CardBody className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-theme border-2 border-theme">
                  {form.profilePicture ? (
                    // eslint-disable-next-line jsx-a11y/img-redundant-alt
                    <img src={form.profilePicture} alt="Profile picture" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-tertiary text-sm">No photo</div>
                  )}
                </div>
                <div className="flex-1">
                  <Input
                    label="Profile Photo URL"
                    name="profilePicture"
                    placeholder="https://..."
                    value={form.profilePicture}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Username"
                  name="username"
                  placeholder="Your name"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="New Password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                />
                <Input
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" loading={saving}>
                  Save Changes
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
