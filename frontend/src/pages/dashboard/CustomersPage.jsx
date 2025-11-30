import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { DashboardLayout } from '../../components/layout';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
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
  Mail,
  Phone,
} from 'lucide-react';

const CustomersPage = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const customers = [
    {
      id: '1',
      name: 'Max Mustermann',
      email: 'max@example.com',
      phone: '+49 30 123 456',
      company: null,
      devices: 3,
      totalOrders: 7,
      status: 'active',
    },
    {
      id: '2',
      name: 'Anna Schmidt',
      email: 'anna@example.com',
      phone: '+49 30 234 567',
      company: null,
      devices: 2,
      totalOrders: 4,
      status: 'active',
    },
    {
      id: '3',
      name: 'Tech Solutions GmbH',
      email: 'info@techsolutions.de',
      phone: '+49 30 345 678',
      company: 'Tech Solutions GmbH',
      devices: 15,
      totalOrders: 23,
      status: 'active',
    },
    {
      id: '4',
      name: 'Digital Agency',
      email: 'contact@digitalagency.de',
      phone: '+49 30 456 789',
      company: 'Digital Agency',
      devices: 8,
      totalOrders: 12,
      status: 'inactive',
    },
    {
      id: '5',
      name: 'Peter Müller',
      email: 'peter@example.com',
      phone: '+49 30 567 890',
      company: null,
      devices: 1,
      totalOrders: 2,
      status: 'active',
    },
  ];

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (customer.company && customer.company.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-2">
          {t.dashboard.customers}
        </h1>
        <p className="text-muted-foreground">
          Manage your customer relationships and profiles
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
            {t.dashboard.newCustomer}
          </Button>
        </div>
      </div>

      {/* Customers Table */}
      <Card className="border-border/50">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>{t.dashboard.devices}</TableHead>
                <TableHead>Total Orders</TableHead>
                <TableHead>{t.common.status}</TableHead>
                <TableHead className="w-12">{t.common.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {customer.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{customer.name}</p>
                        {customer.company && (
                          <p className="text-xs text-muted-foreground">{customer.company}</p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="w-3.5 h-3.5" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="w-3.5 h-3.5" />
                        {customer.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{customer.devices}</Badge>
                  </TableCell>
                  <TableCell>{customer.totalOrders}</TableCell>
                  <TableCell>
                    <Badge variant={customer.status === 'active' ? 'success' : 'secondary'}>
                      {customer.status === 'active' ? 'Active' : 'Inactive'}
                    </Badge>
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default CustomersPage;
