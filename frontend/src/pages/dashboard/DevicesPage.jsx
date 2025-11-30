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
  Smartphone,
  Tablet,
  Laptop,
  Eye,
  Edit,
  Trash2,
  Download,
} from 'lucide-react';

const DevicesPage = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const devices = [
    {
      id: '1',
      model: 'iPhone 14 Pro',
      type: 'smartphone',
      imei: '356789001234567',
      status: 'clean',
      customer: 'Max Mustermann',
      lastAction: 'Analyse',
      date: '2024-01-15',
    },
    {
      id: '2',
      model: 'Samsung Galaxy S23',
      type: 'smartphone',
      imei: '356789001234568',
      status: 'locked',
      customer: 'Anna Schmidt',
      lastAction: 'Reparatur',
      date: '2024-01-14',
    },
    {
      id: '3',
      model: 'iPad Pro 12.9"',
      type: 'tablet',
      imei: '356789001234569',
      status: 'warning',
      customer: 'Tech Solutions GmbH',
      lastAction: 'Check',
      date: '2024-01-13',
    },
    {
      id: '4',
      model: 'MacBook Air M2',
      type: 'laptop',
      serial: 'C02ZW1YZMD6M',
      status: 'clean',
      customer: 'Digital Agency',
      lastAction: 'Analyse',
      date: '2024-01-12',
    },
    {
      id: '5',
      model: 'Google Pixel 8',
      type: 'smartphone',
      imei: '356789001234570',
      status: 'clean',
      customer: 'Peter Müller',
      lastAction: 'Verkauf',
      date: '2024-01-11',
    },
  ];

  const statusConfig = {
    clean: { label: 'Clean', variant: 'success' },
    locked: { label: 'Locked', variant: 'destructive' },
    warning: { label: 'Warning', variant: 'warning' },
  };

  const deviceIcons = {
    smartphone: Smartphone,
    tablet: Tablet,
    laptop: Laptop,
  };

  const filteredDevices = devices.filter(
    (device) =>
      device.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (device.imei && device.imei.includes(searchQuery)) ||
      (device.serial && device.serial.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-2">
          {t.dashboard.devices}
        </h1>
        <p className="text-muted-foreground">
          Manage and analyze your device inventory
        </p>
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
            {t.dashboard.addDevice}
          </Button>
        </div>
      </div>

      {/* Devices Table */}
      <Card className="border-border/50">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device</TableHead>
                <TableHead>IMEI/Serial</TableHead>
                <TableHead>{t.common.status}</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Last Action</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-12">{t.common.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDevices.map((device) => {
                const Icon = deviceIcons[device.type];
                const status = statusConfig[device.status];
                return (
                  <TableRow key={device.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                          <Icon className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <span className="font-medium">{device.model}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {device.imei || device.serial}
                    </TableCell>
                    <TableCell>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </TableCell>
                    <TableCell>{device.customer}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{device.lastAction}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(device.date).toLocaleDateString()}
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

export default DevicesPage;
