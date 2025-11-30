import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Smartphone,
  LayoutDashboard,
  HardDrive,
  Ticket,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronDown,
  Bell,
  Search,
  Shield,
  Building,
  FileText,
  CreditCard,
  Menu,
  X,
  Globe,
} from 'lucide-react';
import { Input } from '../ui/input';

export const DashboardLayout = ({ children, isAdmin = false }) => {
  const { t, language, setLanguage, isRTL } = useLanguage();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const mainNavItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: t.dashboard.overview },
    { path: '/dashboard/devices', icon: HardDrive, label: t.dashboard.devices },
    { path: '/dashboard/tickets', icon: Ticket, label: t.dashboard.tickets },
    { path: '/dashboard/customers', icon: Users, label: t.dashboard.customers },
    { path: '/dashboard/reports', icon: BarChart3, label: t.dashboard.reports },
    { path: '/dashboard/settings', icon: Settings, label: t.dashboard.settings },
  ];

  const adminNavItems = [
    { path: '/admin', icon: LayoutDashboard, label: t.dashboard.overview },
    { path: '/admin/users', icon: Shield, label: t.admin.userManagement },
    { path: '/admin/workspaces', icon: Building, label: t.admin.workspaces },
    { path: '/admin/roles', icon: Shield, label: t.admin.rolesPermissions || 'Roles' },
    { path: '/admin/logs', icon: FileText, label: t.admin.systemLogs },
    { path: '/admin/billing', icon: CreditCard, label: t.admin.billing },
  ];

  const navItems = isAdmin ? adminNavItems : mainNavItems;

  const isActive = (path) => {
    if (path === '/dashboard' || path === '/admin') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const languages = [
    { code: 'de', name: 'DE', flag: '🇩🇪' },
    { code: 'en', name: 'EN', flag: '🇬🇧' },
    { code: 'ar', name: 'عر', flag: '🇸🇦' },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 ${isRTL ? 'right-0' : 'left-0'} z-50 w-64 gradient-sidebar transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : isRTL ? 'translate-x-full' : '-translate-x-full'
        } lg:static lg:inset-auto`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-primary-foreground/10">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-accent-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-primary-foreground text-lg leading-tight">
                  JC DeviceCore
                </span>
                <span className="text-[10px] text-primary-foreground/60 -mt-0.5">
                  {isAdmin ? 'Admin Panel' : 'Suite'}
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive(item.path)
                          ? 'bg-accent text-accent-foreground'
                          : 'text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-primary-foreground/10">
            {!isAdmin && user?.role === 'admin' && (
              <Link to="/admin">
                <Button variant="glass" className="w-full mb-3 text-primary-foreground border-primary-foreground/20">
                  <Shield className="w-4 h-4 mr-2" />
                  Admin Panel
                </Button>
              </Link>
            )}
            {isAdmin && (
              <Link to="/dashboard">
                <Button variant="glass" className="w-full mb-3 text-primary-foreground border-primary-foreground/20">
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  {t.nav.dashboard}
                </Button>
              </Link>
            )}
            <div className="flex items-center gap-3 px-2">
              <Avatar className="w-10 h-10 border-2 border-accent">
                <AvatarFallback className="bg-accent text-accent-foreground font-semibold">
                  {user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-primary-foreground truncate">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-primary-foreground/60 truncate">
                  {user?.company || 'Company'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t.common.search + '...'}
                className="w-64 pl-10 bg-muted/50 border-0 focus-visible:ring-1"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1 px-2">
                  <Globe className="w-4 h-4" />
                  <span className="text-xs">
                    {languages.find((l) => l.code === language)?.name}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isRTL ? 'start' : 'end'}>
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 px-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      {user?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline text-sm font-medium">
                    {user?.name || 'User'}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isRTL ? 'start' : 'end'} className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/settings">
                    <Settings className="w-4 h-4 mr-2" />
                    {t.dashboard.settings}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
