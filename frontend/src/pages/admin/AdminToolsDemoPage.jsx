import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { DashboardLayout } from '../../components/layout';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { RoleEditor, DeviceImageUpload } from './components';
import { Plus, Upload, Settings } from 'lucide-react';

/**
 * AdminToolsDemoPage - Demonstration der Admin-UI Tools
 * Zeigt die Verwendung von:
 * - RoleEditor Komponente
 * - DeviceImageUpload Komponente
 * - Verschiedene Admin-UI-Features
 */
const AdminToolsDemoPage = () => {
  const { t } = useLanguage();
  const [isRoleEditorOpen, setIsRoleEditorOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [createdRoles, setCreatedRoles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleSaveRole = (roleData) => {
    const newRole = {
      id: Math.random().toString(36).substring(7),
      ...roleData,
      createdAt: new Date().toLocaleString(),
    };
    setCreatedRoles((prev) => [...prev, newRole]);
  };

  const handleImageUpload = (files) => {
    setUploadedImages((prev) => [...prev, ...files.map((f) => ({
      ...f,
      uploadedAt: new Date().toLocaleString(),
    }))]);
  };

  return (
    <DashboardLayout isAdmin>
      <div className="mb-8">
        <h1 data-testid="admin-tools-title" className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-2">
          Admin UI Tools & Components
        </h1>
        <p className="text-muted-foreground">
          Demonstration of advanced admin UI components with full testability
        </p>
      </div>

      {/* Tools Overview */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Role Editor Tool */}
        <Card data-testid="admin-tools-role-editor-card" className="border-border/50">
          <CardHeader>
            <CardTitle data-testid="admin-tools-role-title" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Settings className="w-5 h-5 text-primary" />
              </div>
              Role Editor
            </CardTitle>
            <CardDescription>
              Create and manage custom roles with granular permissions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              The Role Editor component allows you to:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li data-testid="role-editor-feature-1" className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Create new custom roles with validation</span>
              </li>
              <li data-testid="role-editor-feature-2" className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Manage permissions by category (Dashboard, Devices, Tickets, etc.)</span>
              </li>
              <li data-testid="role-editor-feature-3" className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Fully accessible with keyboard navigation</span>
              </li>
              <li data-testid="role-editor-feature-4" className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Complete data-testid coverage for testing</span>
              </li>
            </ul>

            <Button
              data-testid="admin-tools-open-role-editor"
              onClick={() => setIsRoleEditorOpen(true)}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Open Role Editor
            </Button>
          </CardContent>
        </Card>

        {/* Device Upload Tool */}
        <Card data-testid="admin-tools-upload-card" className="border-border/50">
          <CardHeader>
            <CardTitle data-testid="admin-tools-upload-title" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Upload className="w-5 h-5 text-accent" />
              </div>
              Device Image Upload
            </CardTitle>
            <CardDescription>
              Upload device images with drag & drop support
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              The Device Upload component features:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li data-testid="upload-feature-1" className="flex items-start gap-2">
                <span className="text-accent mt-1">✓</span>
                <span>Drag & drop file selection</span>
              </li>
              <li data-testid="upload-feature-2" className="flex items-start gap-2">
                <span className="text-accent mt-1">✓</span>
                <span>File validation (type, size)</span>
              </li>
              <li data-testid="upload-feature-3" className="flex items-start gap-2">
                <span className="text-accent mt-1">✓</span>
                <span>Image preview with progress tracking</span>
              </li>
              <li data-testid="upload-feature-4" className="flex items-start gap-2">
                <span className="text-accent mt-1">✓</span>
                <span>Ready for backend integration</span>
              </li>
            </ul>

            <Button
              data-testid="admin-tools-open-upload"
              variant="accent"
              onClick={() => setIsUploadOpen(true)}
              className="w-full"
            >
              <Upload className="w-4 h-4 mr-2" />
              Open Upload Dialog
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Created Roles */}
      {createdRoles.length > 0 && (
        <Card data-testid="admin-tools-created-roles-card" className="border-border/50 mb-8">
          <CardHeader>
            <CardTitle data-testid="admin-tools-created-roles-title">
              Created Roles ({createdRoles.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div data-testid="admin-tools-roles-list" className="space-y-3">
              {createdRoles.map((role, idx) => (
                <div
                  key={role.id}
                  data-testid={`admin-tools-role-item-${idx}`}
                  className="p-4 rounded-lg border border-border/50 bg-muted/50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h4 data-testid={`admin-tools-role-name-${idx}`} className="font-semibold text-foreground">
                        {role.name}
                      </h4>
                      <p data-testid={`admin-tools-role-desc-${idx}`} className="text-sm text-muted-foreground">
                        {role.description}
                      </p>
                      <div data-testid={`admin-tools-role-perms-${idx}`} className="flex flex-wrap gap-2 mt-2">
                        {role.permissions.slice(0, 3).map((perm) => (
                          <Badge key={perm} variant="secondary" className="text-xs">
                            {perm}
                          </Badge>
                        ))}
                        {role.permissions.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{role.permissions.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p data-testid={`admin-tools-role-date-${idx}`} className="text-xs text-muted-foreground whitespace-nowrap">
                      {role.createdAt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Uploaded Images */}
      {uploadedImages.length > 0 && (
        <Card data-testid="admin-tools-uploaded-images-card" className="border-border/50">
          <CardHeader>
            <CardTitle data-testid="admin-tools-uploaded-title">
              Uploaded Images ({uploadedImages.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div data-testid="admin-tools-images-grid" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {uploadedImages.map((img, idx) => (
                <div
                  key={img.id}
                  data-testid={`admin-tools-image-item-${idx}`}
                  className="rounded-lg overflow-hidden border border-border/50 bg-muted p-3 text-center"
                >
                  {img.preview && (
                    <img
                      src={img.preview}
                      alt={img.name}
                      data-testid={`admin-tools-image-${idx}`}
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                  )}
                  <p data-testid={`admin-tools-image-name-${idx}`} className="text-xs font-medium truncate">
                    {img.name}
                  </p>
                  <p data-testid={`admin-tools-image-time-${idx}`} className="text-xs text-muted-foreground">
                    {img.uploadedAt}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modals */}
      <RoleEditor
        isOpen={isRoleEditorOpen}
        onOpenChange={setIsRoleEditorOpen}
        onSaveRole={handleSaveRole}
      />
      <DeviceImageUpload
        isOpen={isUploadOpen}
        onOpenChange={setIsUploadOpen}
        onUpload={handleImageUpload}
      />
    </DashboardLayout>
  );
};

export default AdminToolsDemoPage;
