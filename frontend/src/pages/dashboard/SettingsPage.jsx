import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { DashboardLayout } from '../../components/layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { Separator } from '../../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import {
  User,
  Bell,
  Key,
  Shield,
  Globe,
  Save,
  Camera,
} from 'lucide-react';
import { toast } from 'sonner';

const SettingsPage = () => {
  const { t, language, setLanguage } = useLanguage();
  const { user } = useAuth();

  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    company: user?.company || '',
    phone: '+49 30 123 456',
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
    reports: true,
  });

  const handleSaveProfile = () => {
    toast.success('Profile saved successfully!');
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-2">
          {t.dashboard.settings}
        </h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="profile" className="gap-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="gap-2">
            <Key className="w-4 h-4" />
            <span className="hidden sm:inline">API</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {profile.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline">
                  <Camera className="w-4 h-4 mr-2" />
                  Change Photo
                </Button>
              </div>

              <Separator />

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t.auth.name}</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t.auth.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">{t.auth.company}</Label>
                  <Input
                    id="company"
                    value={profile.company}
                    onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>
              </div>

              <Separator />

              {/* Language Selection */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Language
                </Label>
                <div className="flex gap-2">
                  {[
                    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
                    { code: 'en', label: 'English', flag: '🇬🇧' },
                    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
                  ].map((lang) => (
                    <Button
                      key={lang.code}
                      variant={language === lang.code ? 'default' : 'outline'}
                      onClick={() => setLanguage(lang.code)}
                    >
                      <span className="mr-2">{lang.flag}</span>
                      {lang.label}
                    </Button>
                  ))}
                </div>
              </div>

              <Button onClick={handleSaveProfile}>
                <Save className="w-4 h-4 mr-2" />
                {t.common.save}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { key: 'email', label: 'Email Notifications', description: 'Receive notifications via email' },
                { key: 'push', label: 'Push Notifications', description: 'Receive push notifications in browser' },
                { key: 'reports', label: 'Weekly Reports', description: 'Receive weekly summary reports' },
                { key: 'marketing', label: 'Marketing Emails', description: 'Receive product updates and news' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch
                    checked={notifications[item.key]}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, [item.key]: checked })
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Current Password</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label>New Password</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label>Confirm New Password</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
              </div>
              <Button>Update Password</Button>

              <Separator />

              <div>
                <h3 className="font-medium text-foreground mb-2">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Add an extra layer of security to your account
                </p>
                <Button variant="outline">Enable 2FA</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Tab */}
        <TabsContent value="api">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage your API access keys</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <p className="text-sm text-muted-foreground mb-2">Your API Key</p>
                <code className="text-sm font-mono bg-background px-3 py-2 rounded border border-border block">
                  jc_live_sk_1234567890abcdef...
                </code>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Regenerate Key</Button>
                <Button variant="outline">View Documentation</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default SettingsPage;
