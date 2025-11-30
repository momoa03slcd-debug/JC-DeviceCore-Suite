import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { DashboardLayout } from '../../components/layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  CreditCard,
  Download,
  TrendingUp,
  Building,
  Users,
  HardDrive,
  Calendar,
  FileText,
  ArrowUpRight,
  CheckCircle,
} from 'lucide-react';

const BillingPage = () => {
  const { t } = useLanguage();

  // Mock billing data
  const currentPlan = {
    name: 'Enterprise',
    price: '€199',
    period: 'month',
    renewalDate: '2024-02-15',
    status: 'active',
  };

  const usage = {
    devices: { used: 825, limit: 'Unlimited', percentage: 0 },
    users: { used: 24, limit: 'Unlimited', percentage: 0 },
    workspaces: { used: 5, limit: 10, percentage: 50 },
    apiCalls: { used: 45000, limit: 100000, percentage: 45 },
  };

  const invoices = [
    { id: 'INV-2024-001', date: '2024-01-01', amount: '€199.00', status: 'paid' },
    { id: 'INV-2023-012', date: '2023-12-01', amount: '€199.00', status: 'paid' },
    { id: 'INV-2023-011', date: '2023-11-01', amount: '€199.00', status: 'paid' },
    { id: 'INV-2023-010', date: '2023-10-01', amount: '€199.00', status: 'paid' },
    { id: 'INV-2023-009', date: '2023-09-01', amount: '€79.00', status: 'paid' },
  ];

  const stats = [
    {
      label: 'Current Plan',
      value: currentPlan.name,
      icon: CreditCard,
      color: 'primary',
      badge: currentPlan.price + '/' + currentPlan.period,
    },
    {
      label: 'Active Workspaces',
      value: usage.workspaces.used,
      icon: Building,
      color: 'accent',
      subtext: `of ${usage.workspaces.limit}`,
    },
    {
      label: 'Total Users',
      value: usage.users.used,
      icon: Users,
      color: 'success',
      subtext: 'Unlimited',
    },
    {
      label: 'Next Billing',
      value: new Date(currentPlan.renewalDate).toLocaleDateString('de-DE', { day: '2-digit', month: 'short' }),
      icon: Calendar,
      color: 'warning',
      subtext: '2024',
    },
  ];

  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    accent: 'bg-accent/10 text-accent',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
  };

  return (
    <DashboardLayout isAdmin>
      <div className="mb-8">
        <h1 data-testid="billing-title" className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-2">
          {t.admin.billing}
        </h1>
        <p className="text-muted-foreground">
          Manage your subscription, view usage, and download invoices
        </p>
      </div>

      {/* Stats Overview */}
      <div data-testid="billing-stats" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} data-testid={`billing-stat-${index}`} className="border-border/50">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p data-testid={`billing-stat-label-${index}`} className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p data-testid={`billing-stat-value-${index}`} className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
                    {stat.badge && (
                      <Badge data-testid={`billing-stat-badge-${index}`} variant="accent" className="mt-2">{stat.badge}</Badge>
                    )}
                    {stat.subtext && (
                      <p data-testid={`billing-stat-subtext-${index}`} className="text-xs text-muted-foreground mt-1">{stat.subtext}</p>
                    )}
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

      <div data-testid="billing-content" className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Usage & Plan */}
        <div data-testid="billing-main" className="lg:col-span-2 space-y-6">
          {/* Current Plan */}
          <Card data-testid="billing-plan-card" className="border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle data-testid="billing-plan-title">Current Subscription</CardTitle>
                  <CardDescription>Your active plan and features</CardDescription>
                </div>
                <Button data-testid="billing-upgrade-btn" variant="outline">
                  <ArrowUpRight className="w-4 h-4 mr-2" />
                  Upgrade Plan
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div data-testid="billing-plan-info" className="flex items-center gap-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center">
                  <CreditCard className="w-7 h-7 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 data-testid="billing-plan-name" className="text-xl font-bold text-foreground">{currentPlan.name}</h3>
                    <Badge data-testid="billing-plan-status" variant="success" className="gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Active
                    </Badge>
                  </div>
                  <p data-testid="billing-plan-details" className="text-muted-foreground">
                    {currentPlan.price}/{currentPlan.period} • Renews on {new Date(currentPlan.renewalDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div data-testid="billing-usage" className="grid sm:grid-cols-2 gap-4 mt-6">
                <div data-testid="billing-usage-workspaces" className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Workspaces</span>
                    <span className="font-medium">{usage.workspaces.used} / {usage.workspaces.limit}</span>
                  </div>
                  <Progress data-testid="billing-usage-ws-progress" value={usage.workspaces.percentage} className="h-2" />
                </div>
                <div data-testid="billing-usage-api" className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">API Calls</span>
                    <span className="font-medium">{usage.apiCalls.used.toLocaleString()} / {usage.apiCalls.limit.toLocaleString()}</span>
                  </div>
                  <Progress data-testid="billing-usage-api-progress" value={usage.apiCalls.percentage} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Invoices */}
          <Card data-testid="billing-invoices-card" className="border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle data-testid="billing-invoices-title">Invoice History</CardTitle>
                  <CardDescription>Download past invoices</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table data-testid="billing-invoices-table">
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>{t.common.status}</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody data-testid="billing-invoices-body">
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id} data-testid={`invoice-row-${invoice.id}`}>
                      <TableCell data-testid={`invoice-id-${invoice.id}`} className="font-mono text-sm">{invoice.id}</TableCell>
                      <TableCell data-testid={`invoice-date-${invoice.id}`}>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                      <TableCell data-testid={`invoice-amount-${invoice.id}`} className="font-medium">{invoice.amount}</TableCell>
                      <TableCell data-testid={`invoice-status-${invoice.id}`}>
                        <Badge variant="success" className="gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Paid
                        </Badge>
                      </TableCell>
                      <TableCell data-testid={`invoice-download-${invoice.id}`}>
                        <Button variant="ghost" size="icon" data-testid={`invoice-download-btn-${invoice.id}`}>
                          <Download className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Payment Method */}
        <div data-testid="billing-sidebar" className="space-y-6">
          <Card data-testid="billing-payment-card" className="border-border/50">
            <CardHeader>
              <CardTitle data-testid="billing-payment-title">Payment Method</CardTitle>
              <CardDescription>Your default payment method</CardDescription>
            </CardHeader>
            <CardContent>
              <div data-testid="billing-payment-info" className="p-4 rounded-lg border border-border bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 rounded bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">VISA</span>
                  </div>
                  <div>
                    <p data-testid="billing-card-number" className="font-medium text-foreground">•••• •••• •••• 4242</p>
                    <p data-testid="billing-card-expires" className="text-xs text-muted-foreground">Expires 12/2025</p>
                  </div>
                </div>
              </div>
              <Button data-testid="billing-update-payment-btn" variant="outline" className="w-full mt-4">
                Update Payment Method
              </Button>
            </CardContent>
          </Card>

          <Card data-testid="billing-address-card" className="border-border/50">
            <CardHeader>
              <CardTitle data-testid="billing-address-title">Billing Address</CardTitle>
            </CardHeader>
            <CardContent>
              <div data-testid="billing-address-content" className="text-sm text-muted-foreground space-y-1">
                <p className="font-medium text-foreground">JC DeviceCore GmbH</p>
                <p>Musterstraße 123</p>
                <p>10115 Berlin</p>
                <p>Germany</p>
                <p className="pt-2">VAT: DE123456789</p>
              </div>
              <Button data-testid="billing-edit-address-btn" variant="outline" className="w-full mt-4">
                Edit Address
              </Button>
            </CardContent>
          </Card>

          <Card data-testid="billing-support-card" className="border-border/50 bg-accent/5">
            <CardContent className="p-6">
              <h3 data-testid="billing-support-title" className="font-semibold text-foreground mb-2">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Contact our billing support for any questions about your subscription.
              </p>
              <Button data-testid="billing-contact-support-btn" variant="outline" className="w-full">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BillingPage;
