import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { DashboardLayout } from '../../components/layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
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
  Shield,
  User,
  Eye,
  Crown,
  Check,
  X,
  Settings,
  HardDrive,
  Ticket,
  Users,
  BarChart3,
  FileText,
  CreditCard,
} from 'lucide-react';

const RolesPage = () => {
  const { t } = useLanguage();

  const roles = [
    {
      id: 'super-admin',
      name: 'Super Admin',
      description: 'Full system access across all workspaces',
      icon: Crown,
      color: 'destructive',
      users: 2,
    },
    {
      id: 'owner',
      name: 'Owner / Workspace Admin',
      description: 'Full access within their workspace',
      icon: Shield,
      color: 'accent',
      users: 5,
    },
    {
      id: 'technician',
      name: 'Technician',
      description: 'Manage devices, tickets, and customers',
      icon: User,
      color: 'primary',
      users: 12,
    },
    {
      id: 'viewer',
      name: 'Viewer',
      description: 'Read-only access to data',
      icon: Eye,
      color: 'secondary',
      users: 5,
    },
  ];

  const permissions = [
    { name: 'Dashboard Access', icon: BarChart3 },
    { name: 'Device Management', icon: HardDrive },
    { name: 'Ticket Management', icon: Ticket },
    { name: 'Customer Management', icon: Users },
    { name: 'Reports & Analytics', icon: BarChart3 },
    { name: 'Settings', icon: Settings },
    { name: 'User Management', icon: Users },
    { name: 'Workspace Settings', icon: Settings },
    { name: 'Billing Access', icon: CreditCard },
    { name: 'System Logs', icon: FileText },
  ];

  const permissionMatrix = {
    'super-admin': [true, true, true, true, true, true, true, true, true, true],
    'owner': [true, true, true, true, true, true, true, true, true, false],
    'technician': [true, true, true, true, true, false, false, false, false, false],
    'viewer': [true, false, false, false, true, false, false, false, false, false],
  };

  const colorClasses = {
    destructive: 'bg-destructive/10 text-destructive',
    accent: 'bg-accent/10 text-accent',
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-muted text-muted-foreground',
  };

  return (
    <DashboardLayout isAdmin>
      <div className="mb-8">
        <h1 data-testid="roles-title" className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-2">
          Roles & Permissions
        </h1>
        <p className="text-muted-foreground">
          View and understand the role-based access control system
        </p>
      </div>

      {/* Roles Overview */}
      <div data-testid="roles-overview" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <Card key={role.id} className="border-border/50" data-testid={`role-card-${role.id}`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${colorClasses[role.color]} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 data-testid={`role-name-${role.id}`} className="font-semibold text-foreground mb-1">{role.name}</h3>
                    <p data-testid={`role-description-${role.id}`} className="text-xs text-muted-foreground mb-2">{role.description}</p>
                    <Badge data-testid={`role-users-${role.id}`} variant="secondary">{role.users} users</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Permission Matrix */}
      <Card data-testid="roles-permission-matrix" className="border-border/50">
        <CardHeader>
          <CardTitle data-testid="permission-matrix-title">Permission Matrix</CardTitle>
          <CardDescription>Overview of permissions for each role</CardDescription>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table data-testid="permission-table">
            <TableHeader>
              <TableRow data-testid="permission-table-header">
                <TableHead className="min-w-[200px]">Permission</TableHead>
                {roles.map((role) => (
                  <TableHead key={role.id} data-testid={`permission-header-${role.id}`} className="text-center min-w-[120px]">
                    <div className="flex flex-col items-center gap-1">
                      <role.icon className="w-4 h-4" />
                      <span className="text-xs">{role.name.split(' ')[0]}</span>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody data-testid="permission-table-body">
              {permissions.map((permission, pIndex) => {
                const Icon = permission.icon;
                return (
                  <TableRow key={permission.name} data-testid={`permission-row-${pIndex}`}>
                    <TableCell data-testid={`permission-name-${pIndex}`}>
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-muted-foreground" />
                        <span>{permission.name}</span>
                      </div>
                    </TableCell>
                    {roles.map((role) => (
                      <TableCell key={role.id} data-testid={`permission-cell-${role.id}-${pIndex}`} className="text-center">
                        {permissionMatrix[role.id][pIndex] ? (
                          <div className="flex justify-center">
                            <div data-testid={`permission-check-${role.id}-${pIndex}`} className="w-6 h-6 rounded-full bg-success/15 flex items-center justify-center">
                              <Check className="w-4 h-4 text-success" />
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            <div data-testid={`permission-x-${role.id}-${pIndex}`} className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                              <X className="w-4 h-4 text-muted-foreground" />
                            </div>
                          </div>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Role Descriptions */}
      <div data-testid="roles-descriptions" className="grid lg:grid-cols-2 gap-6 mt-8">
        {roles.map((role) => {
          const Icon = role.icon;
          const rolePermissions = permissions.filter((_, i) => permissionMatrix[role.id][i]);
          return (
            <Card key={role.id} data-testid={`role-details-${role.id}`} className="border-border/50">
              <CardHeader>
                <CardTitle data-testid={`role-details-title-${role.id}`} className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${colorClasses[role.color]} flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {role.name}
                </CardTitle>
                <CardDescription data-testid={`role-details-desc-${role.id}`}>{role.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <h4 className="text-sm font-medium text-foreground mb-3">Permissions:</h4>
                <div data-testid={`role-permissions-${role.id}`} className="flex flex-wrap gap-2">
                  {rolePermissions.map((perm) => (
                    <Badge key={perm.name} data-testid={`role-permission-badge-${role.id}-${perm.name}`} variant="secondary" className="gap-1">
                      <perm.icon className="w-3 h-3" />
                      {perm.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </DashboardLayout>
  );
};

export default RolesPage;
