import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Checkbox } from '../../../components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import { AlertCircle, Plus, Save, Trash2 } from 'lucide-react';
import { Alert, AlertDescription } from '../../../components/ui/alert';

/**
 * RoleEditor Komponente - Ermöglicht das Erstellen und Bearbeiten von benutzerdefinierten Rollen
 * Features:
 * - Neue Rollen erstellen
 * - Rollen bearbeiten
 * - Berechtigungen pro Rolle verwalten
 * - Validierung
 * - data-testid für vollständige Testbarkeit
 */
const RoleEditor = ({ isOpen, onOpenChange, onSaveRole, existingRole = null }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: existingRole?.name || '',
    description: existingRole?.description || '',
    permissions: existingRole?.permissions || [],
  });
  const [errors, setErrors] = useState({});

  // Alle verfügbaren Berechtigungen
  const availablePermissions = [
    { id: 'dashboard.view', label: 'Dashboard Access', category: 'Dashboard' },
    { id: 'devices.view', label: 'View Devices', category: 'Devices' },
    { id: 'devices.create', label: 'Create Devices', category: 'Devices' },
    { id: 'devices.edit', label: 'Edit Devices', category: 'Devices' },
    { id: 'devices.delete', label: 'Delete Devices', category: 'Devices' },
    { id: 'tickets.view', label: 'View Tickets', category: 'Tickets' },
    { id: 'tickets.create', label: 'Create Tickets', category: 'Tickets' },
    { id: 'tickets.edit', label: 'Edit Tickets', category: 'Tickets' },
    { id: 'customers.view', label: 'View Customers', category: 'Customers' },
    { id: 'customers.create', label: 'Create Customers', category: 'Customers' },
    { id: 'reports.view', label: 'View Reports', category: 'Reports' },
    { id: 'users.manage', label: 'Manage Users', category: 'Admin' },
    { id: 'roles.manage', label: 'Manage Roles', category: 'Admin' },
    { id: 'workspace.settings', label: 'Workspace Settings', category: 'Admin' },
    { id: 'billing.view', label: 'View Billing', category: 'Admin' },
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Role name is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (formData.permissions.length === 0) {
      newErrors.permissions = 'At least one permission must be selected';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePermissionChange = (permissionId, checked) => {
    if (checked) {
      setFormData({
        ...formData,
        permissions: [...formData.permissions, permissionId],
      });
    } else {
      setFormData({
        ...formData,
        permissions: formData.permissions.filter((p) => p !== permissionId),
      });
    }
  };

  const handleSave = () => {
    if (validateForm()) {
      onSaveRole(formData);
      onOpenChange(false);
      // Reset form
      setFormData({ name: '', description: '', permissions: [] });
      setErrors({});
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setFormData({ name: '', description: '', permissions: [] });
    setErrors({});
  };

  // Gruppiere Berechtigungen nach Kategorie
  const permissionsByCategory = availablePermissions.reduce((acc, perm) => {
    if (!acc[perm.category]) {
      acc[perm.category] = [];
    }
    acc[perm.category].push(perm);
    return acc;
  }, {});

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent data-testid="role-editor-dialog" className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle data-testid="role-editor-title">
            {existingRole ? 'Edit Role' : 'Create New Role'}
          </DialogTitle>
          <DialogDescription>
            {existingRole
              ? 'Update the role name, description, and permissions'
              : 'Create a custom role with specific permissions'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Role Basic Info */}
          <div data-testid="role-editor-basic" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role-name">Role Name</Label>
              <Input
                data-testid="role-editor-name-input"
                id="role-name"
                placeholder="e.g., Technical Support Lead"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: '' });
                }}
                className={errors.name ? 'border-destructive' : ''}
              />
              {errors.name && (
                <p data-testid="role-editor-name-error" className="text-xs text-destructive">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role-description">Description</Label>
              <Input
                data-testid="role-editor-description-input"
                id="role-description"
                placeholder="Brief description of the role's purpose"
                value={formData.description}
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value });
                  if (errors.description) setErrors({ ...errors, description: '' });
                }}
                className={errors.description ? 'border-destructive' : ''}
              />
              {errors.description && (
                <p data-testid="role-editor-description-error" className="text-xs text-destructive">
                  {errors.description}
                </p>
              )}
            </div>
          </div>

          {/* Permissions */}
          <div data-testid="role-editor-permissions" className="space-y-4">
            <div>
              <Label>Permissions</Label>
              <p className="text-xs text-muted-foreground mb-3">
                Select which permissions this role should have
              </p>
            </div>

            {errors.permissions && (
              <Alert data-testid="role-editor-permissions-error" variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.permissions}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-6">
              {Object.entries(permissionsByCategory).map(([category, permissions]) => (
                <Card key={category} data-testid={`role-permission-category-${category}`} className="border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div data-testid={`role-permission-group-${category}`} className="grid grid-cols-2 gap-4">
                      {permissions.map((permission) => (
                        <div
                          key={permission.id}
                          data-testid={`role-permission-item-${permission.id}`}
                          className="flex items-center gap-3"
                        >
                          <Checkbox
                            data-testid={`role-permission-checkbox-${permission.id}`}
                            id={`permission-${permission.id}`}
                            checked={formData.permissions.includes(permission.id)}
                            onCheckedChange={(checked) => handlePermissionChange(permission.id, checked)}
                          />
                          <Label
                            htmlFor={`permission-${permission.id}`}
                            data-testid={`role-permission-label-${permission.id}`}
                            className="cursor-pointer text-sm font-normal"
                          >
                            {permission.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-3">
          <Button
            data-testid="role-editor-cancel-btn"
            variant="outline"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            data-testid="role-editor-save-btn"
            onClick={handleSave}
            className="gap-2"
          >
            <Save className="w-4 h-4" />
            Save Role
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RoleEditor;
