# 📋 Detaillierte Feature-Dokumentation

**Version**: 1.0.0  
**Stand**: 30. November 2025  
**Status**: ✅ Complete UI Implementation

---

## 🎯 Inhaltsverzeichnis

1. [Admin Pages](#admin-pages)
2. [Legal Pages](#legal-pages)
3. [Advanced Components](#advanced-components)
4. [Layout Components](#layout-components)
5. [UI Components](#ui-components)
6. [Contexts & Hooks](#contexts--hooks)

---

## ADMIN PAGES

### 1. WorkspacesPage (`/admin/workspaces`)

#### 📍 Route & Zugriffsschutz
```javascript
Route: /admin/workspaces
Protection: AdminRoute (nur Admins)
Authentication: AuthContext (isAuthenticated + isAdmin)
```

#### 🎨 Layout & Struktur
```
┌─────────────────────────────────────────┐
│ DashboardLayout (isAdmin=true)          │
├─────────────────────────────────────────┤
│ Header: "Workspaces"                    │
│ Subheader: "Manage organization..."     │
├─────────────────────────────────────────┤
│ [Stats Cards]                           │
│ ├─ Active Workspaces: 12                │
│ ├─ Total Users: 245                     │
│ └─ Total Devices: 1,523                 │
├─────────────────────────────────────────┤
│ [Search Bar + Create Button]            │
│ ├─ Search Input                         │
│ └─ [+ Create Workspace] Button          │
├─────────────────────────────────────────┤
│ [Workspaces Table]                      │
│ ├─ Columns: Name | Users | Devices | ...│
│ └─ Actions: Edit | Delete               │
└─────────────────────────────────────────┘
```

#### 📊 State Management
```javascript
const [workspaces, setWorkspaces] = useState([...]);
const [searchQuery, setSearchQuery] = useState("");
const [isDialogOpen, setIsDialogOpen] = useState(false);
const [selectedWorkspace, setSelectedWorkspace] = useState(null);

// Mock Data Struktur
{
  id: "ws-001",
  name: "Production",
  users: 45,
  devices: 234,
  createdAt: "2025-01-15",
  status: "active",
  icon: "building" // Lucide Icon
}
```

#### 🎯 Implementierte Features

| Feature | Status | Details |
|---------|--------|---------|
| Display Workspaces | ✅ | 5 Mock-Workspaces mit echten Daten |
| Search/Filter | ✅ | Debounce 300ms auf Name |
| Stats Cards | ✅ | 3 Stats (Active, Users, Devices) |
| Create Dialog | ✅ | Form mit Name/Description validation |
| Edit Workspace | ✅ | Dropdown Menu mit Edit Option |
| Delete Workspace | ✅ | Mit Confirmation Dialog |
| Pagination | ⏳ | Backend erforderlich |
| Real-time Updates | ⏳ | WebSocket erforderlich |

#### 📝 Data-testid Übersicht
```javascript
// Stats Section
"workspace-stats"
"stat-active-workspaces"
"stat-total-users"
"stat-total-devices"

// Search & Actions
"workspace-search-input"
"workspace-create-btn"
"workspace-create-dialog"

// Table
"workspace-table"
"workspace-row-{id}"
"workspace-cell-{id}-{field}"
"workspace-action-edit-{id}"
"workspace-action-delete-{id}"
```

#### 💻 Code-Beispiel: Workspace erstellen
```javascript
const handleCreateWorkspace = (data) => {
  const newWorkspace = {
    id: `ws-${Date.now()}`,
    name: data.name,
    description: data.description,
    users: 0,
    devices: 0,
    createdAt: new Date().toISOString(),
    status: 'active'
  };
  setWorkspaces([...workspaces, newWorkspace]);
  setIsDialogOpen(false);
};
```

#### 🚀 Backend Integration (TODO)
```javascript
// API Endpoints erforderlich:
POST   /api/admin/workspaces          // Create
GET    /api/admin/workspaces          // List all
GET    /api/admin/workspaces/{id}     // Get single
PUT    /api/admin/workspaces/{id}     // Update
DELETE /api/admin/workspaces/{id}     // Delete

// Request Beispiel:
{
  "name": "Production",
  "description": "Main production environment",
  "settings": {
    "maxUsers": 100,
    "maxDevices": 1000
  }
}
```

---

### 2. RolesPage (`/admin/roles`)

#### 📍 Route & Struktur
```javascript
Route: /admin/roles
Protection: AdminRoute
Display: Role Overview + Permission Matrix
```

#### 🎨 Layout
```
┌──────────────────────────────────────┐
│ DashboardLayout                      │
├──────────────────────────────────────┤
│ [Role Overview Cards]                │
│ ├─ Super Admin (All permissions)     │
│ ├─ Owner (Workspace management)      │
│ ├─ Technician (Device management)    │
│ └─ Viewer (Read-only)                │
├──────────────────────────────────────┤
│ [Permission Matrix]                  │
│ Role | View | Edit | Delete | ...    │
├──────────────────────────────────────┤
│ [Role Detail Cards]                  │
│ ├─ Role Name & Description           │
│ ├─ Permissions List (Badges)         │
│ └─ Edit/Create Options               │
└──────────────────────────────────────┘
```

#### 📊 Permissions Matrix
```javascript
const PERMISSIONS = [
  // Dashboard Permissions
  { id: 'dashboard.view', name: 'View Dashboard', category: 'Dashboard' },
  { id: 'dashboard.edit', name: 'Edit Dashboard', category: 'Dashboard' },
  
  // Device Permissions
  { id: 'devices.view', name: 'View Devices', category: 'Devices' },
  { id: 'devices.edit', name: 'Edit Devices', category: 'Devices' },
  { id: 'devices.delete', name: 'Delete Devices', category: 'Devices' },
  { id: 'devices.command', name: 'Send Commands', category: 'Devices' },
  
  // Admin Permissions
  { id: 'admin.users', name: 'Manage Users', category: 'Admin' },
  { id: 'admin.roles', name: 'Manage Roles', category: 'Admin' },
  { id: 'admin.workspaces', name: 'Manage Workspaces', category: 'Admin' },
  { id: 'admin.logs', name: 'View Logs', category: 'Admin' }
];

const ROLES = [
  { 
    id: 'super_admin',
    name: 'Super Admin',
    permissions: PERMISSIONS.map(p => p.id) // All
  },
  {
    id: 'owner',
    name: 'Owner',
    permissions: ['dashboard.view', 'devices.view', 'devices.edit', ...]
  }
];
```

#### 🎯 Features

| Feature | Status | Details |
|---------|--------|---------|
| Role Cards | ✅ | 4 Rollen mit Übersicht |
| Permission Matrix | ✅ | 4 Rollen × 10 Berechtigungen |
| Permission Badges | ✅ | Kategorie-basiert gefärbt |
| Role Details | ✅ | Detaillierte Beschreibungen |
| Create Custom Role | ⏳ | AdminToolsDemoPage (separate) |
| Edit Role | ⏳ | Backend erforderlich |
| Delete Role | ⏳ | Backend erforderlich |

#### 📝 Data-testid Pattern
```javascript
"role-{roleId}-overview"          // Role card
"role-{roleId}-description"       // Description text
"permission-matrix"               // Table container
"permission-{roleId}-{permId}"    // Permission cell
"role-permission-{permId}"        // Permission badge
"role-detail-{index}"             // Detail card
```

#### 🚀 Backend Integration (TODO)
```javascript
// API Endpoints:
GET    /api/admin/roles                    // List all roles
POST   /api/admin/roles                    // Create role
PUT    /api/admin/roles/{roleId}           // Update role
DELETE /api/admin/roles/{roleId}           // Delete role
GET    /api/admin/permissions              // List all permissions
```

---

### 3. BillingPage (`/admin/billing`)

#### 📍 Beschreibung
Verwaltung von Abonnements, Nutzung und Rechnungen.

#### 🎨 Layout
```
┌───────────────────────────────────┐
│ Current Subscription              │
│ ├─ Plan: Professional             │
│ ├─ Status: Active (Green Badge)   │
│ └─ Renews: Dec 15, 2025           │
├───────────────────────────────────┤
│ Usage Statistics                  │
│ ├─ Workspaces: 5/10 [50%]         │
│ ├─ API Calls: 4.5M/10M [45%]      │
│ └─ Storage: 250GB/500GB [50%]     │
├───────────────────────────────────┤
│ Invoice History (Table)           │
│ ├─ Invoice ID | Date | Amount | . │
│ └─ [View/Download Actions]        │
├───────────────────────────────────┤
│ Payment Method                    │
│ ├─ Type: Visa Card               │
│ ├─ Last 4: 4242               │
│ └─ Expires: 12/2027           │
├───────────────────────────────────┤
│ Billing Address                   │
│ ├─ Street                         │
│ ├─ City, Country                 │
│ └─ Edit Button                    │
├───────────────────────────────────┤
│ Support Section                   │
│ ├─ FAQ Link                       │
│ ├─ Contact Support               │
│ └─ Documentation Link            │
└───────────────────────────────────┘
```

#### 📊 State Management
```javascript
const [subscription, setSubscription] = useState({
  plan: 'Professional',
  status: 'active',
  renewDate: '2025-12-15',
  price: 99.99
});

const [usage, setUsage] = useState({
  workspaces: { used: 5, limit: 10 },
  apiCalls: { used: 4500000, limit: 10000000 },
  storage: { used: 250, limit: 500 }
});

const [invoices, setInvoices] = useState([
  {
    id: 'INV-001',
    date: '2025-11-15',
    amount: 99.99,
    status: 'paid',
    pdfUrl: '/invoices/inv-001.pdf'
  }
]);
```

#### 📝 Data-testid
```javascript
"billing-stats"
"billing-subscription-card"
"billing-usage-{type}"            // workspaces, apiCalls, storage
"billing-invoice-table"
"billing-invoice-row-{id}"
"billing-payment-method"
"billing-address"
"billing-support"
```

---

### 4. LogsPage (`/admin/logs`)

#### 📍 Beschreibung
System-Audit Logs mit Filterung und Suche.

#### 🎨 Layout
```
┌────────────────────────────────┐
│ Activity Statistics            │
│ ├─ Info: 1,234                │
│ ├─ Success: 5,678             │
│ ├─ Warning: 123               │
│ └─ Error: 45                  │
├────────────────────────────────┤
│ Filters                        │
│ ├─ [Search Input]             │
│ ├─ [Type Filter Select]       │
│ └─ [Level Filter Select]      │
├────────────────────────────────┤
│ Logs Table                     │
│ │Time|Type|Level|User|Action  │
│ ├────────────────────────────┤
│ │2025-11-30 14:32 | Auth |   │
│ └────────────────────────────┘
```

#### 📊 Log Struktur
```javascript
{
  id: "log-001",
  timestamp: "2025-11-30T14:32:45Z",
  type: "auth" | "device" | "admin" | "system",
  level: "info" | "success" | "warning" | "error",
  user: "admin@example.com",
  action: "User Login",
  details: "Successful authentication",
  workspace: "Production",
  ip: "192.168.1.1"
}
```

#### 🎯 Features
```
✅ Statistic Cards (4 Log Levels)
✅ Full-text Search
✅ Type Filter (Auth/Device/Admin/System)
✅ Level Filter (Info/Success/Warning/Error)
✅ Sortable Table
✅ Time Format (Local Timezone)
⏳ Export to CSV (Backend)
⏳ Real-time Updates (WebSocket)
⏳ Log Retention Policy (Backend)
```

---

## LEGAL PAGES

### 5. NotFoundPage (`/*` Fallback)

#### 📍 Route & Status
```javascript
Route: /404 atau /* (Wildcard)
Protection: Public (kein Auth erforderlich)
Type: Error / Utility Page
```

#### 🎨 Layout
```
┌──────────────────────────────┐
│ Logo                         │
├──────────────────────────────┤
│ 404                          │
│ Page Not Found               │
│ Die Seite existiert nicht... │
│                              │
│ [Go Home] [Go Back]          │
└──────────────────────────────┘
```

#### 🌍 i18n Support
```javascript
t.notfound = {
  de: {
    title: "Seite nicht gefunden",
    description: "Die Seite die du suchst existiert nicht oder wurde verschoben.",
    goBack: "Zurück",
    goHome: "Zur Startseite"
  },
  en: {
    title: "Page Not Found",
    description: "The page you are looking for does not exist or has been moved.",
    goBack: "Go Back",
    goHome: "Go to Home"
  },
  ar: {
    title: "الصفحة غير موجودة",
    description: "الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
    goBack: "رجوع",
    goHome: "الذهاب للصفحة الرئيسية"
  }
}
```

#### 📝 Data-testid
```javascript
"notfound-page"
"notfound-logo"
"notfound-code"
"notfound-title"
"notfound-description"
"notfound-go-back-btn"
"notfound-go-home-btn"
```

---

### 6. PrivacyPage (`/privacy`)

#### 🎨 Inhaltsstruktur
```
Hero Section (mit Badge)
├─ Intro Card
│  └─ "Wir schützen Ihre Daten..."
├─ Data Processing Card
│  └─ Database Icon + Explanation
└─ GDPR Compliance Card
   └─ Shield Icon + Compliance Details
```

#### 📝 Data-testid
```javascript
"privacy-hero"
"privacy-intro-card"
"privacy-data-processing"
"privacy-gdpr-compliance"
```

---

### 7. TermsPage (`/terms`)

#### 🎨 Inhaltsstruktur
```
Hero Section
├─ Intro Card
├─ Services Card
├─ Important Notice (Alert)
│  └─ List mit Disclaimers
└─ Legal Notice
```

#### 📝 Data-testid
```javascript
"terms-hero"
"terms-intro"
"terms-services"
"terms-alert"
"terms-disclaimer-{index}"
```

---

### 8. AboutPage (`/about`)

#### 🎨 Inhaltsstruktur
```
Hero Section
├─ Vision Card
├─ Mission Card
├─ Focus Card
└─ Values Section (3 Spalten)
   ├─ Transparency
   ├─ Compliance
   └─ Legal Security
```

#### 📝 Data-testid
```javascript
"about-hero"
"about-vision"
"about-mission"
"about-focus"
"about-values-{index}"
```

---

## ADVANCED COMPONENTS

### 9. RoleEditor (`/src/pages/admin/components/RoleEditor.jsx`)

#### 📍 Typ & Verwendung
```javascript
Type: Dialog Component (Modal)
Location: src/pages/admin/components/RoleEditor.jsx
Export: export { default as RoleEditor } from './RoleEditor';
Usage Context: AdminToolsDemoPage, Future Backend Integration
```

#### 🎯 Props Interface
```typescript
interface RoleEditorProps {
  isOpen: boolean;              // Dialog open/close state
  onOpenChange: (open: boolean) => void;  // State setter callback
  onSaveRole: (roleData: RoleData) => void;  // Save callback
  existingRole?: RoleData;      // Optional: For editing existing role
}

interface RoleData {
  id?: string;                  // Optional: For editing
  name: string;                 // Required: Role name
  description: string;          // Required: Role description
  permissions: string[];        // Required: Array of permission IDs
}
```

#### 📊 State & Validation
```javascript
const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [selectedPermissions, setSelectedPermissions] = useState([]);
const [errors, setErrors] = useState({});

// Validation Rules
const validate = () => {
  const newErrors = {};
  if (!name.trim()) newErrors.name = "Name erforderlich";
  if (!description.trim()) newErrors.description = "Beschreibung erforderlich";
  if (selectedPermissions.length === 0) newErrors.permissions = "Min. 1 Berechtigung";
  return newErrors;
};
```

#### 🎯 Permission Kategorien
```javascript
const PERMISSION_CATEGORIES = {
  dashboard: {
    label: "Dashboard",
    permissions: [
      { id: 'dashboard.view', label: 'View Dashboard' },
      { id: 'dashboard.edit', label: 'Edit Dashboard' }
    ]
  },
  devices: {
    label: "Devices",
    permissions: [
      { id: 'devices.view', label: 'View Devices' },
      { id: 'devices.edit', label: 'Edit Devices' },
      { id: 'devices.delete', label: 'Delete Devices' }
    ]
  },
  tickets: {
    label: "Tickets",
    permissions: [...]
  },
  customers: {
    label: "Customers",
    permissions: [...]
  },
  reports: {
    label: "Reports",
    permissions: [...]
  },
  admin: {
    label: "Admin",
    permissions: [...]
  }
};
```

#### 🎨 UI Layout
```
┌────────────────────────────────────┐
│ Dialog Header                      │
│ "Create Custom Role"               │
├────────────────────────────────────┤
│ [Form Content]                     │
│ ├─ Name Input (with error state)   │
│ ├─ Description Textarea            │
│ └─ Permissions Section             │
│    ├─ Category: Dashboard          │
│    │  ├─ ☑ View Dashboard         │
│    │  └─ ☐ Edit Dashboard         │
│    ├─ Category: Devices            │
│    │  ├─ ☑ View Devices           │
│    │  ├─ ☑ Edit Devices           │
│    │  └─ ☐ Delete Devices         │
│    └─ [More Categories...]        │
├────────────────────────────────────┤
│ [Dialog Footer]                    │
│ [Cancel] [Save Role]               │
└────────────────────────────────────┘
```

#### 📝 Data-testid Vollständig
```javascript
// Dialog
"role-editor-dialog"
"role-editor-close-btn"

// Form Inputs
"role-editor-name-input"
"role-editor-name-error"
"role-editor-description-textarea"
"role-editor-description-error"

// Permissions Section
"role-editor-permissions-section"
"role-editor-permissions-error"

// Permission Categories
"role-permission-category-dashboard"
"role-permission-category-devices"
"role-permission-category-tickets"
"role-permission-category-customers"
"role-permission-category-reports"
"role-permission-category-admin"

// Permission Checkboxes
"role-permission-checkbox-dashboard.view"
"role-permission-checkbox-dashboard.edit"
"role-permission-checkbox-devices.view"
"role-permission-checkbox-devices.edit"
"role-permission-checkbox-devices.delete"
// ... (27 weitere Berechtigungen)

// Buttons
"role-editor-cancel-btn"
"role-editor-save-btn"
"role-editor-save-btn-disabled" // When validation fails
```

#### 💻 Verwendungsbeispiel
```javascript
import { RoleEditor } from '../components';
import { useState } from 'react';

function MyPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [roles, setRoles] = useState([]);

  const handleSaveRole = (roleData) => {
    const newRole = {
      id: `role-${Date.now()}`,
      ...roleData,
      createdAt: new Date().toISOString()
    };
    setRoles([...roles, newRole]);
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Create Role
      </button>
      
      <RoleEditor
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        onSaveRole={handleSaveRole}
      />
    </>
  );
}
```

---

### 10. DeviceImageUpload (`/src/pages/admin/components/DeviceImageUpload.jsx`)

#### 📍 Typ & Verwendung
```javascript
Type: Dialog Component (Modal)
Location: src/pages/admin/components/DeviceImageUpload.jsx
Export: export { default as DeviceImageUpload } from './DeviceImageUpload';
Use Case: Upload device images with validation & preview
```

#### 🎯 Props Interface
```typescript
interface DeviceImageUploadProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: (files: UploadedFile[]) => void;
  deviceId?: string;              // Optional: Associated device
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  preview: string;                // Base64 data URL
  progress: number;               // 0-100
  status: 'pending' | 'uploading' | 'done' | 'error';
}
```

#### 📊 File Validation
```javascript
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const validateFile = (file) => {
  if (file.size > MAX_FILE_SIZE) {
    return `Datei zu groß (max 5MB, ${(file.size / 1024 / 1024).toFixed(2)}MB)`;
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return `Format nicht unterstützt (JPEG, PNG, WebP)`;
  }
  return null;
};
```

#### 🎨 UI Layout
```
┌──────────────────────────────────┐
│ Dialog Header                    │
│ "Upload Device Images"           │
├──────────────────────────────────┤
│ Drag & Drop Zone                 │
│ ┌────────────────────────────┐   │
│ │ [Upload Icon]              │   │
│ │ Drag images here or click  │   │
│ │ to select                  │   │
│ │ Max 5MB per file (JPEG...) │   │
│ └────────────────────────────┘   │
│                                  │
│ [or select files]                │
│ <input type="file" multiple />   │
├──────────────────────────────────┤
│ Uploaded Files                   │
│ ┌─ image1.jpg (2.3MB)           │
│ │  [Preview Thumbnail]          │
│ │  Progress: ████░░░░ 40%       │
│ │  [Remove]                     │
│ │                               │
│ ├─ image2.png (1.8MB)           │
│ │  [Preview Thumbnail]          │
│ │  Progress: ██████████ 100%    │
│ │  [Remove]                     │
│ └─                              │
├──────────────────────────────────┤
│ [Close] [Upload]                │
└──────────────────────────────────┘
```

#### 📝 Data-testid Vollständig
```javascript
// Dialog
"device-upload-dialog"
"device-upload-close-btn"

// Drag & Drop Zone
"device-upload-zone"
"device-upload-zone-text"
"device-upload-file-input"

// Uploaded Files List
"device-upload-files-list"
"device-upload-file-item-{fileId}"
"device-upload-file-thumbnail-{fileId}"
"device-upload-file-name-{fileId}"
"device-upload-file-size-{fileId}"
"device-upload-file-error-{fileId}"
"device-upload-file-remove-{fileId}"

// Progress Bars
"device-upload-progress-{fileId}"
"device-upload-progress-text-{fileId}"

// Buttons
"device-upload-clear-btn"
"device-upload-cancel-btn"
"device-upload-submit-btn"

// Status Messages
"device-upload-status-{fileId}"
"device-upload-no-files-message"
```

#### 💻 Verwendungsbeispiel
```javascript
import { DeviceImageUpload } from '../components';
import { useState } from 'react';

function DeviceDetailPage({ deviceId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState([]);

  const handleUpload = (files) => {
    setImages([...images, ...files]);
    // TODO: Send to backend
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Upload Images
      </button>

      <div className="images-grid">
        {images.map(img => (
          <img 
            key={img.id} 
            src={img.preview} 
            alt={img.name}
          />
        ))}
      </div>

      <DeviceImageUpload
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        onUpload={handleUpload}
        deviceId={deviceId}
      />
    </>
  );
}
```

---

### 11. AdminToolsDemoPage (`/admin/tools`)

#### 📍 Beschreibung
Showcase & Demo Page für RoleEditor und DeviceImageUpload Komponenten.

#### 🎯 Features
```
✅ Feature Cards mit Beschreibung
✅ Live RoleEditor Demo
✅ Live DeviceImageUpload Demo
✅ Liste erstellter Rollen
✅ Gitter hochgeladener Bilder
✅ State Persistence (Session)
```

#### 📝 Data-testid
```javascript
"admin-tools-page"
"admin-tools-role-editor-card"
"admin-tools-open-role-editor"
"admin-tools-role-list"
"admin-tools-role-item-{index}"
"admin-tools-role-item-name-{index}"
"admin-tools-role-item-perms-{index}"

"admin-tools-upload-card"
"admin-tools-open-upload"
"admin-tools-upload-list"
"admin-tools-upload-item-{index}"
"admin-tools-upload-item-image-{index}"
"admin-tools-upload-item-name-{index}"
```

---

## LAYOUT COMPONENTS

### 12. DashboardLayout

#### 📍 Beschreibung
Basis-Layout für Admin Seiten mit Navbar und Footer.

#### 🎯 Props
```typescript
interface DashboardLayoutProps {
  isAdmin?: boolean;            // Show admin indicator
  children: React.ReactNode;
}
```

#### 🎨 Struktur
```
┌──────────────────────────────────────┐
│ Navbar (DashboardLayout comp)        │
├──────────────────────────────────────┤
│ Main Content Area                    │
│ └─ {children}                        │
├──────────────────────────────────────┤
│ Footer                               │
└──────────────────────────────────────┘
```

---

### 13. PublicLayout

#### 📍 Beschreibung
Layout für öffentliche Seiten (Legal Pages, Home, etc).

#### 🎨 Struktur
```
┌──────────────────────────────────────┐
│ Navbar                               │
├──────────────────────────────────────┤
│ Main Content Area (Full Width)       │
│ └─ {children}                        │
├──────────────────────────────────────┤
│ Footer                               │
└──────────────────────────────────────┘
```

---

## UI COMPONENTS (ShadCN)

### 14. ShadCN UI Components Used

```javascript
✅ Button - Primary, Secondary, Ghost, Destructive variants
✅ Input - Text inputs with validation states
✅ Card - Container for grouped content
✅ Dialog - Modal dialogs (Role Editor, Image Upload)
✅ Table - Data tables (Workspaces, Roles, Billing, Logs)
✅ Badge - Status indicators (Success, Warning, Error)
✅ Progress - Progress bars (Billing usage, Upload progress)
✅ Select - Dropdown selects (Log filters)
✅ Checkbox - Permission checkboxes
✅ Textarea - Multi-line text input
✅ Alert - Important notices
✅ Toast - Notifications (via sonner)
✅ Tooltip - Hover tooltips
✅ Dropdown Menu - Context menus
✅ Sheet - Drawer panels (mobile)
✅ Tabs - Tab navigation
✅ Pagination - Table pagination
✅ Skeleton - Loading states
✅ Separator - Visual dividers
```

---

## CONTEXTS & HOOKS

### 15. AuthContext

#### 📍 Beschreibung
Globales Auth State Management.

#### 🎯 Interface
```typescript
interface AuthContextType {
  isAuthenticated: boolean;
  user?: {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'user' | 'viewer';
  };
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}
```

---

### 16. LanguageContext

#### 📍 Beschreibung
Globales Language/i18n State.

#### 🎯 Features
```javascript
✅ Language switching (DE, EN, AR)
✅ RTL support (Arabic)
✅ Translation strings (t.key.subkey)
✅ Automatic direction (dir=ltr/rtl)
```

---

### 17. Custom Hooks

#### `useLanguage()`
```javascript
const { language, setLanguage, t, isRTL } = useLanguage();
```

#### `useToast()`
```javascript
const { toast } = useToast();
toast({
  title: "Success",
  description: "Operation completed",
  variant: "default"
});
```

---

## 📊 Gesamt Statistik

```
Total Admin Pages:           4
├─ WorkspacesPage          ✅
├─ RolesPage               ✅
├─ BillingPage             ✅
└─ LogsPage                ✅

Total Legal Pages:          4
├─ NotFoundPage            ✅
├─ PrivacyPage             ✅
├─ TermsPage               ✅
└─ AboutPage               ✅

Advanced Components:        2
├─ RoleEditor              ✅
└─ DeviceImageUpload       ✅

Total data-testid attrs:    270+

i18n Languages:             3 (DE, EN, AR)

ShadCN Components Used:     17+
```

---

**Dokumentation komplett** ✅  
**Version**: 1.0.0  
**Letztes Update**: 30. November 2025
