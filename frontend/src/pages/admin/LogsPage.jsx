import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { DashboardLayout } from '../../components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  Search,
  Filter,
  Download,
  RefreshCw,
  User,
  Shield,
  HardDrive,
  Settings,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  Clock,
} from 'lucide-react';

const LogsPage = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');

  // Mock audit log data
  const logs = [
    {
      id: '1',
      timestamp: '2024-01-15 14:32:15',
      type: 'auth',
      level: 'info',
      user: 'max@example.com',
      action: 'User logged in',
      details: 'Successful login from IP 192.168.1.100',
      workspace: 'Headquarters',
    },
    {
      id: '2',
      timestamp: '2024-01-15 14:28:42',
      type: 'device',
      level: 'success',
      user: 'anna@example.com',
      action: 'Device analyzed',
      details: 'iPhone 14 Pro (IMEI: 356789001234567) - Clean status',
      workspace: 'Berlin Branch',
    },
    {
      id: '3',
      timestamp: '2024-01-15 14:15:30',
      type: 'system',
      level: 'warning',
      user: 'System',
      action: 'API rate limit warning',
      details: 'Workspace "Berlin Branch" approaching API limit (85%)',
      workspace: 'Berlin Branch',
    },
    {
      id: '4',
      timestamp: '2024-01-15 13:55:18',
      type: 'admin',
      level: 'info',
      user: 'admin@company.com',
      action: 'User role updated',
      details: 'Changed role for peter@example.com from Viewer to Technician',
      workspace: 'Headquarters',
    },
    {
      id: '5',
      timestamp: '2024-01-15 13:42:05',
      type: 'auth',
      level: 'error',
      user: 'unknown@test.com',
      action: 'Failed login attempt',
      details: 'Invalid credentials from IP 10.0.0.55 (3rd attempt)',
      workspace: '-',
    },
    {
      id: '6',
      timestamp: '2024-01-15 13:30:00',
      type: 'system',
      level: 'success',
      user: 'System',
      action: 'Backup completed',
      details: 'Daily backup completed successfully (Size: 2.4 GB)',
      workspace: 'All',
    },
    {
      id: '7',
      timestamp: '2024-01-15 12:45:22',
      type: 'device',
      level: 'warning',
      user: 'lisa@example.com',
      action: 'Activation lock detected',
      details: 'iPad Pro 12.9" (Serial: DLXYZ123) - iCloud lock present',
      workspace: 'Headquarters',
    },
    {
      id: '8',
      timestamp: '2024-01-15 12:20:10',
      type: 'admin',
      level: 'info',
      user: 'admin@company.com',
      action: 'New workspace created',
      details: 'Created workspace "Munich Office" with Starter plan',
      workspace: 'Munich Office',
    },
    {
      id: '9',
      timestamp: '2024-01-15 11:55:33',
      type: 'device',
      level: 'success',
      user: 'anna@example.com',
      action: 'Ticket resolved',
      details: 'Ticket #1040 marked as completed',
      workspace: 'Berlin Branch',
    },
    {
      id: '10',
      timestamp: '2024-01-15 11:30:00',
      type: 'system',
      level: 'info',
      user: 'System',
      action: 'Scheduled maintenance',
      details: 'System maintenance window started',
      workspace: 'All',
    },
  ];

  const typeConfig = {
    auth: { label: 'Auth', icon: User, color: 'primary' },
    device: { label: 'Device', icon: HardDrive, color: 'accent' },
    admin: { label: 'Admin', icon: Shield, color: 'warning' },
    system: { label: 'System', icon: Settings, color: 'secondary' },
  };

  const levelConfig = {
    info: { label: 'Info', icon: Info, variant: 'info' },
    success: { label: 'Success', icon: CheckCircle, variant: 'success' },
    warning: { label: 'Warning', icon: AlertTriangle, variant: 'warning' },
    error: { label: 'Error', icon: XCircle, variant: 'destructive' },
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || log.type === filterType;
    const matchesLevel = filterLevel === 'all' || log.level === filterLevel;
    return matchesSearch && matchesType && matchesLevel;
  });

  return (
    <DashboardLayout isAdmin>
      <div className="mb-8">
        <h1 data-testid="logs-title" className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-2">
          {t.admin.systemLogs}
        </h1>
        <p className="text-muted-foreground">
          View system activity, audit trail, and security events
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {Object.entries(levelConfig).map(([key, config]) => {
          const Icon = config.icon;
          const count = logs.filter((l) => l.level === key).length;
          return (
            <Card key={key} className="border-border/50">
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-${config.variant === 'info' ? 'primary' : config.variant}/10 flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 text-${config.variant === 'info' ? 'primary' : config.variant}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{count}</p>
                  <p className="text-xs text-muted-foreground">{config.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            data-testid="logs-search"
            placeholder={`${t.common.search} logs...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="auth">Auth</SelectItem>
            <SelectItem value="device">Device</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterLevel} onValueChange={setFilterLevel}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="info">Info</SelectItem>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
            <SelectItem value="error">Error</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          {t.common.export}
        </Button>
      </div>

      {/* Logs Table */}
      <Card className="border-border/50">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[160px]">Timestamp</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Workspace</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => {
                const type = typeConfig[log.type];
                const level = levelConfig[log.level];
                const TypeIcon = type.icon;
                const LevelIcon = level.icon;
                return (
                  <TableRow key={log.id} data-testid={`log-row-${log.id}`}>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {log.timestamp}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="gap-1">
                        <TypeIcon className="w-3 h-3" />
                        {type.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={level.variant} className="gap-1">
                        <LevelIcon className="w-3 h-3" />
                        {level.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{log.user}</TableCell>
                    <TableCell className="font-medium">{log.action}</TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-[300px] truncate">
                      {log.details}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{log.workspace}</Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default LogsPage;
