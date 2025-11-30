# 👨‍💻 Developer Guide & Code Conventions

**Version**: 1.0.0  
**Zielgruppe**: Entwickler, die an der Codebase arbeiten

---

## 📋 Inhaltsverzeichnis

1. [Projekt-Struktur](#projekt-struktur)
2. [Naming Conventions](#naming-conventions)
3. [Code Style Guide](#code-style-guide)
4. [Component Patterns](#component-patterns)
5. [Best Practices](#best-practices)
6. [Error Handling](#error-handling)
7. [Performance Tips](#performance-tips)
8. [Common Patterns & Examples](#common-patterns--examples)

---

## PROJEKT-STRUKTUR

### Verzeichnis-Layout
```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── DashboardLayout.jsx      # Admin pages layout
│   │   │   ├── PublicLayout.jsx         # Public pages layout
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   └── ui/                          # ShadCN UI components
│   │       ├── button.jsx
│   │       ├── input.jsx
│   │       ├── dialog.jsx
│   │       └── ... (17+ components)
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── AdminOverview.jsx
│   │   │   ├── WorkspacesPage.jsx       # NEW
│   │   │   ├── RolesPage.jsx            # NEW
│   │   │   ├── BillingPage.jsx          # NEW
│   │   │   ├── LogsPage.jsx             # NEW
│   │   │   ├── AdminToolsDemoPage.jsx   # NEW
│   │   │   └── components/
│   │   │       ├── RoleEditor.jsx       # NEW
│   │   │       ├── DeviceImageUpload.jsx# NEW
│   │   │       └── index.js
│   │   ├── auth/
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── dashboard/
│   │   │   ├── CustomersPage.jsx
│   │   │   └── ... (other pages)
│   │   ├── legal/
│   │   │   ├── PrivacyPage.jsx          # NEW
│   │   │   ├── TermsPage.jsx            # NEW
│   │   │   └── AboutPage.jsx            # NEW
│   │   ├── public/
│   │   │   └── ... (public pages)
│   │   └── NotFoundPage.jsx             # NEW
│   ├── context/
│   │   ├── AuthContext.jsx              # Authentication state
│   │   └── LanguageContext.jsx          # i18n state
│   ├── hooks/
│   │   ├── useLanguage.js               # Language management
│   │   └── use-toast.js
│   ├── i18n/
│   │   └── translations.js              # Translation strings
│   ├── lib/
│   │   └── utils.js                     # Utility functions
│   ├── services/
│   │   ├── api.js                       # API calls (TODO)
│   │   └── auth.js                      # Auth service (TODO)
│   ├── App.js                           # Main app routing
│   ├── App.css
│   ├── index.js                         # Entry point
│   └── index.css                        # Global styles
├── package.json
├── tailwind.config.js
├── craco.config.js
└── README.md
```

### Struktur-Konventionen

```
✅ Funktionale Module gruppiert (pages, components, hooks)
✅ Getrennte Layouts für Admin & Public
✅ Wiederverwendbare UI-Komponenten in /components/ui
✅ Page-spezifische Komponenten in /pages/{page}/components
✅ Globale State in /context
✅ Custom Hooks in /hooks
✅ API-Calls in /services (zukünftig)
```

---

## NAMING CONVENTIONS

### Dateinamen

```javascript
// ✅ RICHTIG
WorkspacesPage.jsx              // Page components (PascalCase)
workspace-form.jsx              // Sub-components (kebab-case)
useWorkspaces.js                // Hooks (useXxx)
workspaceService.js             // Services
constants.js                    // Constants file
helpers.js                      // Utility functions

// ❌ FALSCH
workspacePage.jsx               // PascalCase für pages
WorkspaceForm.jsx               // Außer Komponenten
useWorkspaceHook.js             // "Hook" im Namen redundant
```

---

### Variable & Function Namen

```javascript
// ✅ RICHTIG
const [workspaces, setWorkspaces] = useState([]);
const [isDialogOpen, setIsDialogOpen] = useState(false);
const [selectedWorkspace, setSelectedWorkspace] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const handleCreateWorkspace = () => {};
const fetchWorkspaces = async () => {};
const validateForm = () => {};
const calculateTotal = () => {};

// ❌ FALSCH
const [workspace, setWorkspace] = useState([]);    // "workspace" für Array unklar
const [open, setOpen] = useState(false);           // "open" ist zu vague
const [data, setData] = useState(null);            // "data" ist zu generisch
const [w, setW] = useState([]);                    // Abkürzung unklar

const createWorkspace = () => {};                  // ohne "handle" für Callback
const ws = () => {};                               // Abkürzung vermeiden
const fnc = () => {};                              // Abkürzung vermeiden
```

---

### Data-testid Namen

```javascript
// ✅ RICHTIG - Hierarchische Struktur
"workspace-stats"                       // Section
"stat-active-workspaces"                // Element in Section
"workspace-table"                       // Table
"workspace-row-{id}"                    // Row mit ID
"workspace-cell-{id}-name"              // Cell mit Row & Column

"role-editor-dialog"                    // Component
"role-editor-name-input"                // Input in component
"role-permission-checkbox-dashboard.view"  // Checkbox mit permission ID

"device-upload-file-item-{fileId}"     // List item mit ID

// ❌ FALSCH
"workspace-1"                           // Zu vage
"btn-delete"                            // "btn" Prefix unnötig
"input-workspace-name"                  // Zu lang
"ws-table"                              // Abkürzung unklar
```

---

### CSS Classes

```javascript
// ✅ RICHTIG - Tailwind utility classes
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
className="bg-blue-500 hover:bg-blue-600 transition-colors"
className="text-sm font-medium text-gray-700"

// ❌ FALSCH
className="my-custom-class grid-3"      // Custom CSS unnötig
style={{ color: 'blue' }}               // Inline styles statt Tailwind
```

---

## CODE STYLE GUIDE

### Komponenten-Struktur

```javascript
// ✅ RICHTIG - Klare Struktur
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { api } from '@/services/api';

/**
 * WorkspacesPage - Verwaltet Workspaces für Admins
 * 
 * @returns {React.ReactElement}
 */
const WorkspacesPage = () => {
  // 1. State Management
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // 2. Contexts & Hooks
  const { t } = useLanguage();

  // 3. Effects
  useEffect(() => {
    fetchWorkspaces();
  }, []);

  // 4. Callbacks
  const fetchWorkspaces = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.getWorkspaces();
      setWorkspaces(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreateWorkspace = useCallback(async (data) => {
    try {
      const response = await api.createWorkspace(data);
      setWorkspaces([...workspaces, response.data]);
      setIsDialogOpen(false);
    } catch (err) {
      setError(err.message);
    }
  }, [workspaces]);

  // 5. Render Logic
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  // 6. JSX Return
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Header title="Workspaces" />
        <StatsCards stats={workspaces} />
        <WorkspacesTable workspaces={workspaces} />
      </div>
    </DashboardLayout>
  );
};

export default WorkspacesPage;
```

---

### Imports organisieren

```javascript
// ✅ RICHTIG - Sortiert nach Kategorie
// 1. React & externe Libraries
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. ShadCN UI Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog } from '@/components/ui/dialog';

// 3. Custom Components
import { DashboardLayout } from '@/components/layout';
import { StatsCard } from '@/components/common';

// 4. Hooks & Context
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/context/AuthContext';

// 5. Services & Utils
import { api } from '@/services/api';
import { cn } from '@/lib/utils';

// 6. Icons
import { Plus, Edit, Trash } from 'lucide-react';

// ❌ FALSCH - Durcheinander
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { api } from '@/services/api';
import { useLanguage } from '@/hooks/useLanguage';
```

---

### Spacing & Formatierung

```javascript
// ✅ RICHTIG
const Component = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1>Counter: {count}</h1>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
};

// ❌ FALSCH - Zu kompakt
const Component=()=>{const[count,setCount]=useState(0);const handleClick=()=>{setCount(count+1);};return(<div className="flex flex-col gap-4"><h1>Counter: {count}</h1><button onClick={handleClick}>Increment</button></div>);};
```

---

## COMPONENT PATTERNS

### Functional Component Pattern

```javascript
/**
 * MyComponent - Beschreibung
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Component title
 * @param {Function} props.onAction - Callback when action occurs
 * @returns {React.ReactElement}
 */
const MyComponent = ({ title, onAction }) => {
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={onAction}>Action</button>
    </div>
  );
};

MyComponent.defaultProps = {
  title: 'Default Title'
};

export default MyComponent;
```

---

### Dialog/Modal Pattern

```javascript
const MyDialog = ({ isOpen, onOpenChange, onSubmit }) => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    // Validation
    const newErrors = {};
    if (!data.name) newErrors.name = "Name erforderlich";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit
    onSubmit(data);
    onOpenChange(false);
    setData({});
    setErrors({});
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>My Dialog</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input
              value={data.name || ''}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Abbrechen
          </Button>
          <Button onClick={handleSubmit}>
            Speichern
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MyDialog;
```

---

### Form Pattern mit Validierung

```javascript
const MyForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email erforderlich';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Gültige Email erforderlich';
    }

    if (!formData.password) {
      newErrors.password = 'Passwort erforderlich';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Min. 6 Zeichen erforderlich';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field on change
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.submit && (
        <Alert variant="destructive">
          {errors.submit}
        </Alert>
      )}

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div>
        <Label htmlFor="password">Passwort</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? 'border-red-500' : ''}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Wird eingereicht...' : 'Einreichen'}
      </Button>
    </form>
  );
};

export default MyForm;
```

---

## BEST PRACTICES

### 1. State Management

```javascript
// ✅ RICHTIG - Logisch zusammengefasste States
const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: ''
});

const [uiState, setUiState] = useState({
  isDialogOpen: false,
  activeTab: 'general'
});

const [asyncState, setAsyncState] = useState({
  loading: false,
  error: null,
  data: []
});

// ❌ FALSCH - Zu viele einzelne States
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');
const [isDialogOpen, setIsDialogOpen] = useState(false);
const [activeTab, setActiveTab] = useState('general');
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [data, setData] = useState([]);
```

---

### 2. useCallback für Performance

```javascript
// ✅ RICHTIG - Memoized callbacks
const handleClick = useCallback(() => {
  console.log('Clicked');
}, []); // Dependencies array

// ❌ FALSCH - Keine Memoization
const handleClick = () => {
  console.log('Clicked');
};

// Bei Dependencies:
const handleSearch = useCallback((query) => {
  fetchResults(query);
}, [fetchResults]); // fetchResults als Dependency
```

---

### 3. Conditional Rendering

```javascript
// ✅ RICHTIG - Klare Pattern
if (loading) return <LoadingSpinner />;
if (error) return <ErrorMessage message={error} />;
if (!data || data.length === 0) return <EmptyState />;

return <DataList data={data} />;

// ❌ FALSCH - Verschachtelte ternaries
return loading ? <LoadingSpinner /> : error ? <ErrorMessage /> : data?.length > 0 ? <DataList data={data} /> : <EmptyState />;
```

---

### 4. Event Handling

```javascript
// ✅ RICHTIG
const handleFormChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};

// Oder mit useCallback
const handleClick = useCallback((id) => {
  onDelete(id);
}, [onDelete]);

// ❌ FALSCH
const handleFormChange = (name, value) => {
  setFormData({ ...formData, [name]: value });
}; // Fehlt reference zu e.target

// Event Handler mit direktem setState
<button onClick={() => setCount(count + 1)}>  // Ineffizient
```

---

## ERROR HANDLING

### Try-Catch Pattern

```javascript
const fetchData = async () => {
  setLoading(true);
  setError(null);

  try {
    const response = await api.getData();
    setData(response.data);
  } catch (err) {
    // Spezifische Error Handling
    if (err.status === 404) {
      setError('Daten nicht gefunden');
    } else if (err.status === 403) {
      setError('Sie haben keine Berechtigung');
    } else if (err.status === 500) {
      setError('Serverfehler. Bitte später versuchen.');
    } else {
      setError(err.message || 'Ein Fehler ist aufgetreten');
    }
    
    console.error('Error fetching data:', err);
  } finally {
    setLoading(false);
  }
};
```

---

### Error Boundary (für kritische Fehler)

```javascript
// ErrorBoundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <h2 className="font-bold text-red-700">Etwas ging schief</h2>
          <p className="text-red-600">{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage in App.js
<ErrorBoundary>
  <WorkspacesPage />
</ErrorBoundary>
```

---

## PERFORMANCE TIPS

### 1. React.memo für Komponenten

```javascript
// ✅ Memoize übergebene Komponenten
const StatsCard = React.memo(({ title, value, icon: Icon }) => {
  return (
    <div className="p-4 bg-white rounded">
      <Icon />
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
});

export default StatsCard;
```

---

### 2. useMemo für teure Berechnungen

```javascript
// ✅ Memoize teure Operationen
const filteredWorkspaces = useMemo(() => {
  return workspaces.filter(w => 
    w.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
}, [workspaces, searchQuery]);

// Nur recalculated wenn dependencies ändern
```

---

### 3. Lazy Loading Pages

```javascript
// ✅ Code Splitting mit React.lazy
import { lazy, Suspense } from 'react';

const WorkspacesPage = lazy(() => import('./pages/admin/WorkspacesPage'));
const RolesPage = lazy(() => import('./pages/admin/RolesPage'));

// In Routes:
<Suspense fallback={<LoadingSpinner />}>
  <Route path="/admin/workspaces" element={<WorkspacesPage />} />
  <Route path="/admin/roles" element={<RolesPage />} />
</Suspense>
```

---

## COMMON PATTERNS & EXAMPLES

### Pagination Pattern

```javascript
const [page, setPage] = useState(1);
const [pageSize] = useState(10);

const paginatedData = useMemo(() => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return data.slice(start, end);
}, [data, page, pageSize]);

const totalPages = Math.ceil(data.length / pageSize);

// In JSX:
<Pagination>
  <Button 
    onClick={() => setPage(p => Math.max(1, p - 1))}
    disabled={page === 1}
  >
    Zurück
  </Button>
  <span>Seite {page} von {totalPages}</span>
  <Button 
    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
    disabled={page === totalPages}
  >
    Weiter
  </Button>
</Pagination>
```

---

### Debounced Search

```javascript
const [searchQuery, setSearchQuery] = useState('');
const [debouncedQuery, setDebouncedQuery] = useState('');

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedQuery(searchQuery);
  }, 300); // 300ms debounce

  return () => clearTimeout(timer);
}, [searchQuery]);

// Use debouncedQuery for filtering
useEffect(() => {
  if (debouncedQuery) {
    fetchResults(debouncedQuery);
  }
}, [debouncedQuery]);

// In JSX:
<Input
  placeholder="Search..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>
```

---

**Dokumentation komplett** ✅  
**Version**: 1.0.0  
**Stand**: 30. November 2025
