import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { DashboardLayout } from '../../components/layout';
import { Card, CardContent } from '../../components/ui/card';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
} from 'lucide-react';

const TicketsPage = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const tickets = [
    {
      id: '#1042',
      title: 'Display-Reparatur',
      device: 'Samsung Galaxy S23',
      customer: 'Anna Schmidt',
      status: 'in_progress',
      priority: 'high',
      created: '2024-01-15',
      due: '2024-01-17',
    },
    {
      id: '#1041',
      title: 'Akku-Tausch',
      device: 'iPhone 13',
      customer: 'Max Mustermann',
      status: 'pending',
      priority: 'medium',
      created: '2024-01-14',
      due: '2024-01-18',
    },
    {
      id: '#1040',
      title: 'Software-Update',
      device: 'MacBook Pro 14"',
      customer: 'Tech Solutions GmbH',
      status: 'completed',
      priority: 'low',
      created: '2024-01-13',
      due: '2024-01-15',
    },
    {
      id: '#1039',
      title: 'Geräte-Check vor Ankauf',
      device: 'iPad Air 5',
      customer: 'Digital Agency',
      status: 'cancelled',
      priority: 'low',
      created: '2024-01-12',
      due: '2024-01-14',
    },
    {
      id: '#1038',
      title: 'Wasserschaden-Diagnose',
      device: 'iPhone 14 Pro',
      customer: 'Peter Müller',
      status: 'in_progress',
      priority: 'high',
      created: '2024-01-11',
      due: '2024-01-13',
    },
  ];

  const statusConfig = {
    pending: { label: 'Pending', variant: 'warning', icon: Clock },
    in_progress: { label: 'In Progress', variant: 'info', icon: AlertCircle },
    completed: { label: 'Completed', variant: 'success', icon: CheckCircle },
    cancelled: { label: 'Cancelled', variant: 'secondary', icon: XCircle },
  };

  const priorityConfig = {
    high: { label: 'High', variant: 'destructive' },
    medium: { label: 'Medium', variant: 'warning' },
    low: { label: 'Low', variant: 'secondary' },
  };

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.device.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-2">
          {t.dashboard.tickets}
        </h1>
        <p className="text-muted-foreground">
          Manage service tickets and repair jobs
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {Object.entries(statusConfig).map(([key, config]) => {
          const Icon = config.icon;
          const count = tickets.filter((t) => t.status === key).length;
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

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={`${t.common.search}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            {t.common.filter}
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            {t.common.export}
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            {t.dashboard.createTicket}
          </Button>
        </div>
      </div>

      {/* Tickets Table */}
      <Card className="border-border/50">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>{t.common.status}</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="w-12">{t.common.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => {
                const status = statusConfig[ticket.status];
                const priority = priorityConfig[ticket.priority];
                const StatusIcon = status.icon;
                return (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-mono font-medium">
                      {ticket.id}
                    </TableCell>
                    <TableCell className="font-medium">{ticket.title}</TableCell>
                    <TableCell>{ticket.device}</TableCell>
                    <TableCell>{ticket.customer}</TableCell>
                    <TableCell>
                      <Badge variant={status.variant} className="gap-1">
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={priority.variant}>{priority.label}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(ticket.due).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            {t.common.view}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            {t.common.edit}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            {t.common.delete}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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

export default TicketsPage;
