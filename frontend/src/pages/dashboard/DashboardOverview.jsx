import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { DashboardLayout } from '../../components/layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  HardDrive,
  Ticket,
  Calendar,
  CheckCircle,
  Plus,
  Search,
  TrendingUp,
  ArrowRight,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardOverview = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const stats = [
    {
      label: t.dashboard.totalDevices,
      value: '1,234',
      change: '+12%',
      icon: HardDrive,
      color: 'primary',
    },
    {
      label: t.dashboard.openTickets,
      value: '42',
      change: '-8%',
      icon: Ticket,
      color: 'warning',
    },
    {
      label: t.dashboard.todayJobs,
      value: '18',
      change: '+5%',
      icon: Calendar,
      color: 'accent',
    },
    {
      label: t.dashboard.completedThisMonth,
      value: '156',
      change: '+23%',
      icon: CheckCircle,
      color: 'success',
    },
  ];

  const quickActions = [
    { label: t.dashboard.addDevice, icon: Plus, href: '/dashboard/devices/new', color: 'primary' },
    { label: t.dashboard.createTicket, icon: Ticket, href: '/dashboard/tickets/new', color: 'accent' },
    { label: t.dashboard.newCustomer, icon: Plus, href: '/dashboard/customers/new', color: 'success' },
    { label: t.dashboard.runAnalysis, icon: Search, href: '/dashboard/analysis', color: 'warning' },
  ];

  const recentActivities = [
    {
      type: 'device',
      title: 'iPhone 14 Pro analysiert',
      description: 'IMEI: 35678900123456',
      time: '2 Min.',
      status: 'success',
    },
    {
      type: 'ticket',
      title: 'Ticket #1042 erstellt',
      description: 'Display-Reparatur Samsung S23',
      time: '15 Min.',
      status: 'info',
    },
    {
      type: 'alert',
      title: 'Aktivierungssperre erkannt',
      description: 'iPad Pro 12.9" - Kundenbenachrichtigung empfohlen',
      time: '1 Std.',
      status: 'warning',
    },
    {
      type: 'device',
      title: 'Gerät hinzugefügt',
      description: 'MacBook Air M2 - Kunde: Tech Solutions GmbH',
      time: '2 Std.',
      status: 'success',
    },
  ];

  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    accent: 'bg-accent/10 text-accent',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
  };

  const statusColors = {
    success: 'bg-success/15 text-success',
    info: 'bg-primary/15 text-primary',
    warning: 'bg-warning/15 text-warning',
  };

  return (
    <DashboardLayout>
      {/* Welcome Header */}
      <div className="mb-8" data-testid="dashboard-welcome">
        <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-2">
          {t.dashboard.welcome}, {user?.name || 'User'}!
        </h1>
        <p className="text-muted-foreground">
          {new Date().toLocaleDateString(undefined, { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
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
                      <TrendingUp className={`w-3 h-3 ${stat.change.startsWith('+') ? 'text-success' : 'text-destructive'}`} />
                      <span className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                        {stat.change}
                      </span>
                      <span className="text-xs text-muted-foreground">vs. last month</span>
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
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card className="border-border/50 h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-muted-foreground" />
                {t.dashboard.recentActivity}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-lg ${statusColors[activity.status]} flex items-center justify-center flex-shrink-0`}>
                      {activity.type === 'device' && <HardDrive className="w-5 h-5" />}
                      {activity.type === 'ticket' && <Ticket className="w-5 h-5" />}
                      {activity.type === 'alert' && <AlertCircle className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{activity.title}</p>
                      <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
                    </div>
                    <span className="text-xs text-muted-foreground flex-shrink-0">{activity.time}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-border">
                <Link to="/dashboard/activity">
                  <Button variant="ghost" className="w-full justify-center">
                    View All Activity
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>{t.dashboard.quickActions}</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Link key={index} to={action.href}>
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-3 h-12"
                      >
                        <div className={`w-8 h-8 rounded-lg ${colorClasses[action.color]} flex items-center justify-center`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        {action.label}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardOverview;
