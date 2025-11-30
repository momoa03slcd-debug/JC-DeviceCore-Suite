import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { DashboardLayout } from '../../components/layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  HardDrive,
  Ticket,
  Users,
  DollarSign,
} from 'lucide-react';

const ReportsPage = () => {
  const { t } = useLanguage();

  // Mock chart data represented as bars
  const monthlyData = [
    { month: 'Jan', devices: 85, tickets: 42 },
    { month: 'Feb', devices: 92, tickets: 38 },
    { month: 'Mar', devices: 78, tickets: 51 },
    { month: 'Apr', devices: 110, tickets: 45 },
    { month: 'Mai', devices: 95, tickets: 39 },
    { month: 'Jun', devices: 120, tickets: 55 },
  ];

  const maxDevices = Math.max(...monthlyData.map((d) => d.devices));
  const maxTickets = Math.max(...monthlyData.map((d) => d.tickets));

  const stats = [
    { label: 'Total Devices', value: '1,234', icon: HardDrive, change: '+12%' },
    { label: 'Tickets Resolved', value: '892', icon: Ticket, change: '+8%' },
    { label: 'Active Customers', value: '156', icon: Users, change: '+23%' },
    { label: 'Revenue', value: '€24,500', icon: DollarSign, change: '+15%' },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-2">
              {t.dashboard.reports}
            </h1>
            <p className="text-muted-foreground">
              Analytics and performance metrics
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Last 6 Months
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              {t.common.export}
            </Button>
          </div>
        </div>
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
                      <span className="text-xs text-muted-foreground">vs. last period</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Devices Chart */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-primary" />
              Devices Analyzed
            </CardTitle>
            <CardDescription>Monthly device analysis activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-48">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-primary/20 rounded-t-md relative overflow-hidden"
                    style={{ height: `${(data.devices / maxDevices) * 100}%` }}
                  >
                    <div
                      className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-md transition-all duration-500"
                      style={{ height: `${(data.devices / maxDevices) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{data.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tickets Chart */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ticket className="w-5 h-5 text-accent" />
              Tickets Resolved
            </CardTitle>
            <CardDescription>Monthly ticket resolution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-48">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-accent/20 rounded-t-md relative overflow-hidden"
                    style={{ height: `${(data.tickets / maxTickets) * 100}%` }}
                  >
                    <div
                      className="absolute bottom-0 left-0 right-0 bg-accent rounded-t-md transition-all duration-500"
                      style={{ height: `${(data.tickets / maxTickets) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{data.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ReportsPage;
