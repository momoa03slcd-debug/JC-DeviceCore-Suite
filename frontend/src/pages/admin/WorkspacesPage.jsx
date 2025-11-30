import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { DashboardLayout } from '../../components/layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
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
  DropdownMenuSeparator,
} from '../../components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import {
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Building,
  Users,
  HardDrive,
  Settings,
} from 'lucide-react';

const WorkspacesPage = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  // Mock data
  const workspaces = [
    {
      id: '1',
      name: 'Headquarters',
      plan: 'Enterprise',
      users: 12,
      devices: 450,
      status: 'active',
      createdAt: '2023-06-15',
    },
    {
      id: '2',
      name: 'Berlin Branch',
      plan: 'Pro',
      users: 5,
      devices: 180,
      status: 'active',
      createdAt: '2023-09-20',
    },
    {
      id: '3',
      name: 'Hamburg Branch',
      plan: 'Pro',
      users: 4,
      devices: 120,
      status: 'active',
      createdAt: '2023-11-10',
    },
    {
      id: '4',
      name: 'Munich Office',
      plan: 'Starter',
      users: 2,
      devices: 45,
      status: 'inactive',
      createdAt: '2024-01-05',
    },
    {
      id: '5',
      name: 'Partner Shop A',
      plan: 'Starter',
      users: 1,
      devices: 30,
      status: 'active',
      createdAt: '2024-01-12',
    },
  ];

  const planConfig = {
    Starter: { variant: 'secondary' },
    Pro: { variant: 'info' },
    Enterprise: { variant: 'accent' },
  };

  const filteredWorkspaces = workspaces.filter(
    (ws) =>
      ws.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUsers = workspaces.reduce((sum, ws) => sum + ws.users, 0);
  const totalDevices = workspaces.reduce((sum, ws) => sum + ws.devices, 0);
  const activeWorkspaces = workspaces.filter((ws) => ws.status === 'active').length;

  return (
    <DashboardLayout isAdmin>
      <div className="mb-8">
        <h1 data-testid="workspaces-title" className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-2">
          {t.admin.workspaces}
        </h1>
        <p className="text-muted-foreground">
          Manage workspaces and tenant configurations
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="border-border/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{activeWorkspaces}</p>
              <p className="text-xs text-muted-foreground">Active Workspaces</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{totalUsers}</p>
              <p className="text-xs text-muted-foreground">Total Users</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <HardDrive className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{totalDevices}</p>
              <p className="text-xs text-muted-foreground">Total Devices</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            data-testid="workspace-search"
            placeholder={`${t.common.search}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="add-workspace-btn">
              <Plus className="w-4 h-4 mr-2" />
              Add Workspace
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Workspace</DialogTitle>
              <DialogDescription>
                Set up a new workspace for your organization or partner
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="ws-name">Workspace Name</Label>
                <Input id="ws-name" placeholder="e.g., Berlin Branch" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ws-plan">Plan</Label>
                <select id="ws-plan" className="w-full h-10 px-3 rounded-md border border-input bg-background">
                  <option value="starter">Starter</option>
                  <option value="pro">Pro</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ws-admin">Admin Email</Label>
                <Input id="ws-admin" type="email" placeholder="admin@company.com" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                {t.common.cancel}
              </Button>
              <Button onClick={() => setDialogOpen(false)}>Create Workspace</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Workspaces Table */}
      <Card className="border-border/50">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Workspace</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Devices</TableHead>
                <TableHead>{t.common.status}</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-12">{t.common.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWorkspaces.map((workspace) => (
                <TableRow key={workspace.id} data-testid={`workspace-row-${workspace.id}`}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Building className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-medium">{workspace.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={planConfig[workspace.plan]?.variant || 'secondary'}>
                      {workspace.plan}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      {workspace.users}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <HardDrive className="w-4 h-4 text-muted-foreground" />
                      {workspace.devices}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={workspace.status === 'active' ? 'success' : 'secondary'}>
                      {workspace.status === 'active' ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {new Date(workspace.createdAt).toLocaleDateString()}
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
                          <Settings className="w-4 h-4 mr-2" />
                          Configure
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          {t.common.edit}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
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

export default WorkspacesPage;
