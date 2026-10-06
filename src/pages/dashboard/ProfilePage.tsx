import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import {
  User as UserIcon, Mail, Calendar, Users, Ruler,
  MapPin, Phone, Edit2, Save, X, HeartPulse,
} from 'lucide-react';
import type { User } from '@/types';

export function ProfilePage() {
  const { user, updateUser } = useAuth();
  const { showToast } = useToast();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<User>(user!);

  const handleSave = () => {
    updateUser(form);
    showToast('Profile updated successfully', 'success');
    setEditing(false);
  };

  const handleCancel = () => {
    setForm(user!);
    setEditing(false);
  };

  if (!user) return null;

  const fields = [
    { key: 'fullName', label: 'Full Name', icon: UserIcon, type: 'text' },
    { key: 'email', label: 'Email', icon: Mail, type: 'email' },
    { key: 'age', label: 'Age', icon: Calendar, type: 'number' },
    { key: 'gender', label: 'Gender', icon: Users, type: 'select', options: ['Male', 'Female', 'Other', ''] },
    { key: 'height', label: 'Height', icon: Ruler, type: 'text' },
    { key: 'contact', label: 'Contact', icon: Phone, type: 'text' },
    { key: 'city', label: 'City', icon: MapPin, type: 'text' },
    { key: 'state', label: 'State', icon: MapPin, type: 'text' },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 animate-fade-in">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-ink-800 sm:text-3xl">My Profile</h1>
          <p className="mt-1 text-sm text-ink-500">View and manage your personal information</p>
        </div>
        {!editing ? (
          <button onClick={() => setEditing(true)} className="btn-primary">
            <Edit2 className="h-4 w-4" /> Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={handleCancel} className="btn-secondary">
              <X className="h-4 w-4" /> Cancel
            </button>
            <button onClick={handleSave} className="btn-primary">
              <Save className="h-4 w-4" /> Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="card-base overflow-hidden animate-fade-in animate-delay-100">
        {/* Profile header */}
        <div className="relative h-32 bg-gradient-to-br from-rose-100 via-white to-lavender-100">
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <HeartPulse className="h-24 w-24 text-rose-300" />
          </div>
        </div>
        <div className="px-5 pb-5">
          <div className="-mt-12 flex items-end gap-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-white bg-gradient-to-br from-rose-400 to-rose-600 text-3xl font-bold text-white shadow-card">
              {user.fullName.charAt(0)}
            </div>
            <div className="pb-2">
              <h2 className="font-display text-xl font-bold text-ink-800">{user.fullName}</h2>
              <p className="text-sm text-ink-400">{user.email}</p>
            </div>
          </div>

          {/* Fields */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {fields.map((field) => {
  const value = String(form[field.key as keyof User] || '');
  return (
              <div key={field.key} className="rounded-2xl border border-ink-100 p-4 transition-all hover:shadow-soft">
                <div className="flex items-center gap-2 text-ink-400">
                  <field.icon className="h-4 w-4" />
                  <label className="text-xs font-medium">{field.label}</label>
                </div>
                {editing ? (
                  field.type === 'select' ? (
                    <select
                      value={value}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value as User['gender'] })}
                      className="mt-2 input-field text-sm"
                    >
                      <option value="">Prefer not to say</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      value={value}
                      onChange={(e) => setForm({ ...form, [field.key]: field.type === 'number' ? parseInt(e.target.value) || 0 : e.target.value })}
                      className="mt-2 input-field text-sm"
                    />
                  )
                ) : (
                  <p className="mt-2 text-sm font-semibold text-ink-800">{value || '—'}</p>
                )}
              </div>
              );
            })}
          </div>

          {/* Account info */}
          <div className="mt-6 rounded-2xl bg-ink-50 p-4">
            <p className="text-xs font-semibold text-ink-500">Account Information</p>
            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-xs text-ink-400">
              <span>Member since: {user.createdAt}</span>
              <span>User ID: {user.id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
