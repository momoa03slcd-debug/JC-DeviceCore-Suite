import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { DashboardLayout } from '../../components/layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  Users,
  Building,
  FileText,
  CreditCard,
  TrendingUp,
  Plus,
  ArrowRight,
  Shield,
  AlertCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminOverview = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const stats = [
    {
      label: 'Total Users',
      value: '24',
      change: '+3',
      icon: Users,
      color: 'primary',
    },
    {
      label: 'Workspaces',
      value: '5',
      change: '+1',
      icon: Building,
      color: 'accent',
    },
    {
      label: 'System Events',
      value: '1,842',
      change: '+128',
      icon: FileText,
      color: 'warning',
    },
    {
      label: 'Monthly Revenue',
      value: '€4,250',
      change: '+15%',
      icon: CreditCard,
      color: 'success',
    },
  ];

  const quickLinks = [
    { label: t.admin.userManagement, icon: Users, href: '/admin/users', description: 'Manage users and roles' },
    { label: t.admin.workspaces, icon: Building, href: '/admin/workspaces', description: 'Configure workspaces' },
    { label: t.admin.systemLogs, icon: FileText, href: '/admin/logs', description: 'View system activity' },
    { label: t.admin.billing, icon: CreditCard, href: '/admin/billing', description: 'Manage subscriptions' },
  ];

  const recentAlerts = [
    { type: 'info', message: 'New user registered: Anna Schmidt', time: '5 min ago' },
    { type: 'warning', message: 'API rate limit reached for Workspace 3', time: '1 hour ago' },
    { type: 'success', message: 'System backup completed successfully', time: '3 hours ago' },
  ];

  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    accent: 'bg-accent/10 text-accent',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
  };

  return (
    <DashboardLayout isAdmin>
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">
            Admin Panel
          </h1>
          <Badge variant="accent">
            <Shield className="w-3 h-3 mr-1" />
            Super Admin
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Manage users, workspaces, and system settings
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-border/50">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-display font-bold text-foreground">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="w-3 h-3 text-success" />
                      <span className="text-xs font-medium text-success">{stat.change}</span>
                      <span className="text-xs text-muted-foreground">this month</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-xl ${colorClasses[stat.color]} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Quick Links */}
        <div className="lg:col-span-2">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Quick Access</CardTitle>
              <CardDescription>Frequently used admin features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {quickLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <Link key={index} to={link.href}>
                      <Card className="border-border/50 hover:border-primary/50 hover:shadow-md transition-all cursor-pointer h-full">
                        <CardContent className="p-4 flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-foreground">{link.label}</p>
                            <p className="text-sm text-muted-foreground">{link.description}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Alerts */}
        <div>
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAlerts.map((alert, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      alert.type === 'info' ? 'bg-primary' :
                      alert.type === 'warning' ? 'bg-warning' : 'bg-success'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminOverview;
