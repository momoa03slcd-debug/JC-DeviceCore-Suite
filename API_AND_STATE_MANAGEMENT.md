# 🔗 API & State Management Guide

**Version**: 1.0.0  
**Status**: Detaillierte Dokumentation für Backend-Integration

---

## 📋 Inhaltsverzeichnis

1. [Mock Data Struktur](#mock-data-struktur)
2. [State Management Patterns](#state-management-patterns)
3. [API Endpoints Spezifikation](#api-endpoints-spezifikation)
4. [Service Layer Architektur](#service-layer-architektur)
5. [Error Handling](#error-handling)
6. [Loading States](#loading-states)
7. [Caching Strategy](#caching-strategy)
8. [Real-time Updates](#real-time-updates)

---

## MOCK DATA STRUKTUR

### Workspaces Mock Data

```javascript
// Current: Frontend Mock (später vom Backend)
const MOCK_WORKSPACES = [
  {
    id: "ws-001",
    name: "Production",
    description: "Main production environment",
    users: 45,
    devices: 234,
    createdAt: "2025-01-15T10:30:00Z",
    status: "active",
    icon: "building",
    owner: {
      id: "user-001",
      name: "John Admin",
      email: "john@example.com"
    },
    settings: {
      maxUsers: 100,
      maxDevices: 1000,
      dataRetention: 90
    }
  },
  {
    id: "ws-002",
    name: "Staging",
    description: "Testing environment",
    users: 12,
    devices: 45,
    createdAt: "2025-02-20T14:00:00Z",
    status: "active",
    icon: "server"
  },
  // ... 3 weitere
];
```

#### Backend Response Format (TODO)
```javascript
// GET /api/admin/workspaces
{
  success: true,
  data: {
    workspaces: [...],
    pagination: {
      total: 50,
      page: 1,
      pageSize: 10,
      totalPages: 5
    },
    stats: {
      totalActive: 45,
      totalInactive: 5,
      totalUsers: 245,
      totalDevices: 1523
    }
  },
  timestamp: "2025-11-30T14:32:45.123Z"
}
```

---

### Roles Mock Data

```javascript
const MOCK_ROLES = [
  {
    id: "role-super-admin",
    name: "Super Admin",
    description: "Full system access",
    permissions: [
      "dashboard.view", "dashboard.edit",
      "devices.view", "devices.edit", "devices.delete", "devices.command",
      "admin.users", "admin.roles", "admin.workspaces", "admin.logs"
    ],
    isSystem: true,
    createdAt: "2025-01-01T00:00:00Z"
  },
  {
    id: "role-owner",
    name: "Owner",
    description: "Workspace owner with management rights",
    permissions: [
      "dashboard.view", "dashboard.edit",
      "devices.view", "devices.edit",
      "admin.users", "admin.roles"
    ],
    isSystem: true,
    createdAt: "2025-01-01T00:00:00Z"
  },
  // ...
];

const MOCK_PERMISSIONS = [
  {
    id: "dashboard.view",
    name: "View Dashboard",
    description: "Access to dashboard",
    category: "Dashboard",
    severity: "low"
  },
  // ... 26 weitere
];
```

---

### Billing Mock Data

```javascript
const MOCK_SUBSCRIPTION = {
  id: "sub-001",
  workspaceId: "ws-001",
  plan: "Professional",
  status: "active",
  price: 99.99,
  currency: "EUR",
  billingCycle: "monthly",
  renewDate: "2025-12-15T00:00:00Z",
  cancellationDate: null,
  autoRenew: true,
  features: {
    maxWorkspaces: 10,
    maxUsers: 100,
    maxDevices: 1000,
    apiCallsPerMonth: 10000000,
    storageGb: 500
  }
};

const MOCK_USAGE = {
  workspaces: {
    used: 5,
    limit: 10,
    percentage: 50
  },
  apiCalls: {
    used: 4500000,
    limit: 10000000,
    percentage: 45,
    resetDate: "2025-12-15T00:00:00Z"
  },
  storage: {
    used: 250,
    limit: 500,
    percentage: 50
  }
};

const MOCK_INVOICES = [
  {
    id: "INV-2025-11",
    date: "2025-11-15T00:00:00Z",
    amount: 99.99,
    currency: "EUR",
    status: "paid",
    paidDate: "2025-11-15T10:30:00Z",
    items: [
      {
        description: "Professional Plan",
        quantity: 1,
        unitPrice: 99.99,
        total: 99.99
      }
    ],
    pdfUrl: "/invoices/INV-2025-11.pdf"
  },
  // ... 4 weitere
];
```

---

### Logs Mock Data

```javascript
const MOCK_LOGS = [
  {
    id: "log-001",
    timestamp: "2025-11-30T14:32:45.123Z",
    type: "auth",           // auth, device, admin, system
    level: "success",       // info, success, warning, error
    user: "admin@example.com",
    userId: "user-001",
    action: "User Login",
    details: "Successful authentication from IP 192.168.1.1",
    workspace: "Production",
    workspaceId: "ws-001",
    ip: "192.168.1.1",
    userAgent: "Mozilla/5.0...",
    statusCode: 200
  },
  {
    id: "log-002",
    timestamp: "2025-11-30T14:31:22.456Z",
    type: "device",
    level: "info",
    user: "tech@example.com",
    action: "Device Online",
    details: "Device DEV-001 connected successfully",
    workspace: "Production",
    statusCode: 200
  },
  // ... 8 weitere
];

// Statistics
const LOG_STATS = {
  info: 1234,
  success: 5678,
  warning: 123,
  error: 45,
  total: 7080
};
```

---

## STATE MANAGEMENT PATTERNS

### Pattern 1: useReducer für komplexe States

```javascript
// Beispiel für WorkspacesPage
const initialState = {
  workspaces: [],
  loading: false,
  error: null,
  selectedWorkspace: null,
  filters: {
    search: "",
    status: "all"
  },
  pagination: {
    page: 1,
    pageSize: 10
  }
};

const workspaceReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        workspaces: action.payload
      };
    
    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    case 'SET_FILTER':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        pagination: { ...state.pagination, page: 1 }
      };
    
    case 'SET_SELECTED':
      return { ...state, selectedWorkspace: action.payload };
    
    default:
      return state;
  }
};

// In Component
const [state, dispatch] = useReducer(workspaceReducer, initialState);

useEffect(() => {
  fetchWorkspaces();
}, []);

const fetchWorkspaces = async () => {
  dispatch({ type: 'FETCH_START' });
  try {
    const response = await api.get('/admin/workspaces', {
      search: state.filters.search,
      page: state.pagination.page
    });
    dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_ERROR', payload: error.message });
  }
};
```

---

### Pattern 2: Custom Hooks für Wiederverwendung

```javascript
// Custom Hook: useWorkspaces
export const useWorkspaces = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWorkspaces = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/workspaces', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        params: filters
      });
      setWorkspaces(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createWorkspace = useCallback(async (data) => {
    const response = await fetch('/api/admin/workspaces', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    setWorkspaces([...workspaces, response.data]);
    return response.data;
  }, [workspaces]);

  const updateWorkspace = useCallback(async (id, data) => {
    const response = await fetch(`/api/admin/workspaces/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
    setWorkspaces(workspaces.map(w => w.id === id ? response.data : w));
    return response.data;
  }, [workspaces]);

  const deleteWorkspace = useCallback(async (id) => {
    await fetch(`/api/admin/workspaces/${id}`, {
      method: 'DELETE'
    });
    setWorkspaces(workspaces.filter(w => w.id !== id));
  }, [workspaces]);

  return {
    workspaces,
    loading,
    error,
    fetchWorkspaces,
    createWorkspace,
    updateWorkspace,
    deleteWorkspace
  };
};

// Usage in Component
function WorkspacesPage() {
  const { workspaces, loading, fetchWorkspaces } = useWorkspaces();

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  if (loading) return <LoadingSpinner />;
  // ...
}
```

---

### Pattern 3: Context + Reducer kombiniert

```javascript
// WorkspaceContext mit Reducer
const WorkspaceContext = createContext();

const initialState = {
  workspaces: [],
  currentWorkspace: null,
  loading: false,
  error: null
};

const workspaceReducer = (state, action) => {
  // reducer logic
};

export const WorkspaceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workspaceReducer, initialState);

  const createWorkspace = async (data) => {
    dispatch({ type: 'FETCH_START' });
    try {
      const response = await fetch('/api/admin/workspaces', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      dispatch({ type: 'CREATE_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
  };

  return (
    <WorkspaceContext.Provider value={{ state, createWorkspace }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspaceContext = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspaceContext must be used within WorkspaceProvider');
  }
  return context;
};
```

---

## API ENDPOINTS SPEZIFIKATION

### Base URL
```
Development:  http://localhost:5000/api
Staging:      https://staging-api.jcdevicecore.com/api
Production:   https://api.jcdevicecore.com/api
```

### Authentication Header
```javascript
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json
Accept-Language: de-DE, en-US, ar-SA
```

---

### Workspaces Endpoints

#### GET /api/admin/workspaces
```javascript
// Query Parameters
{
  page: 1,
  pageSize: 10,
  search: "Production",
  status: "active" | "inactive" | "all",
  sortBy: "name" | "created" | "users",
  sortOrder: "asc" | "desc"
}

// Response (200)
{
  success: true,
  data: {
    workspaces: [
      {
        id: "ws-001",
        name: "Production",
        users: 45,
        devices: 234,
        status: "active",
        createdAt: "2025-01-15T10:30:00Z"
      }
    ],
    pagination: {
      total: 12,
      page: 1,
      pageSize: 10,
      totalPages: 2
    }
  }
}

// Error (401, 403, 500)
{
  success: false,
  error: "Unauthorized",
  code: "AUTH_FAILED"
}
```

#### POST /api/admin/workspaces
```javascript
// Request
{
  name: "New Workspace",
  description: "Description",
  settings: {
    maxUsers: 100,
    maxDevices: 1000
  }
}

// Response (201)
{
  success: true,
  data: {
    id: "ws-new",
    name: "New Workspace",
    createdAt: "2025-11-30T14:32:45Z"
  }
}
```

#### PUT /api/admin/workspaces/{id}
```javascript
// Request
{
  name: "Updated Name",
  description: "Updated description",
  settings: { ... }
}

// Response (200)
{
  success: true,
  data: { ... updated workspace ... }
}
```

#### DELETE /api/admin/workspaces/{id}
```javascript
// Response (200)
{
  success: true,
  message: "Workspace deleted"
}
```

---

### Roles Endpoints

#### GET /api/admin/roles
```javascript
// Response (200)
{
  success: true,
  data: {
    roles: [
      {
        id: "role-001",
        name: "Super Admin",
        permissions: ["dashboard.view", "admin.users", ...],
        isSystem: true,
        createdAt: "2025-01-01T00:00:00Z"
      }
    ]
  }
}
```

#### POST /api/admin/roles
```javascript
// Request
{
  name: "Custom Role",
  description: "Description",
  permissions: ["dashboard.view", "devices.view"]
}

// Response (201)
{
  success: true,
  data: {
    id: "role-custom-001",
    name: "Custom Role",
    ...
  }
}
```

#### GET /api/admin/permissions
```javascript
// Response (200)
{
  success: true,
  data: {
    permissions: [
      {
        id: "dashboard.view",
        name: "View Dashboard",
        category: "Dashboard",
        description: "..."
      }
    ],
    categories: ["Dashboard", "Devices", "Admin", ...]
  }
}
```

---

### Logs Endpoints

#### GET /api/admin/logs
```javascript
// Query Parameters
{
  page: 1,
  pageSize: 50,
  search: "User Login",
  type: "auth" | "device" | "admin" | "system" | "all",
  level: "info" | "success" | "warning" | "error" | "all",
  startDate: "2025-11-01T00:00:00Z",
  endDate: "2025-11-30T23:59:59Z"
}

// Response (200)
{
  success: true,
  data: {
    logs: [
      {
        id: "log-001",
        timestamp: "2025-11-30T14:32:45Z",
        type: "auth",
        level: "success",
        user: "admin@example.com",
        action: "User Login",
        ...
      }
    ],
    stats: {
      total: 7080,
      info: 1234,
      success: 5678,
      warning: 123,
      error: 45
    },
    pagination: { ... }
  }
}
```

#### POST /api/admin/logs/export
```javascript
// Request
{
  format: "csv" | "json" | "xlsx",
  filters: {
    type: "all",
    level: "all",
    startDate: "...",
    endDate: "..."
  }
}

// Response (200)
File download (CSV/JSON/XLSX)
```

---

### Billing Endpoints

#### GET /api/billing/subscription
```javascript
// Response (200)
{
  success: true,
  data: {
    subscription: {
      id: "sub-001",
      plan: "Professional",
      status: "active",
      price: 99.99,
      renewDate: "2025-12-15T00:00:00Z",
      autoRenew: true
    }
  }
}
```

#### GET /api/billing/usage
```javascript
// Response (200)
{
  success: true,
  data: {
    usage: {
      workspaces: { used: 5, limit: 10 },
      apiCalls: { used: 4500000, limit: 10000000 },
      storage: { used: 250, limit: 500 }
    }
  }
}
```

#### GET /api/billing/invoices
```javascript
// Query Parameters
{
  page: 1,
  pageSize: 20,
  status: "all" | "paid" | "unpaid" | "overdue"
}

// Response (200)
{
  success: true,
  data: {
    invoices: [
      {
        id: "INV-001",
        date: "2025-11-15T00:00:00Z",
        amount: 99.99,
        status: "paid",
        pdfUrl: "..."
      }
    ],
    pagination: { ... }
  }
}
```

---

### File Upload Endpoint

#### POST /api/devices/{deviceId}/images
```javascript
// Request (multipart/form-data)
FormData {
  files: [File, File, ...]
  deviceId: "dev-001"
}

// Response (201)
{
  success: true,
  data: {
    images: [
      {
        id: "img-001",
        url: "/uploads/images/img-001.jpg",
        size: 245680,
        uploadedAt: "2025-11-30T14:32:45Z"
      }
    ]
  }
}

// Error (413 - File too large)
{
  success: false,
  error: "File too large",
  code: "FILE_SIZE_EXCEEDED"
}

// Error (415 - Invalid file type)
{
  success: false,
  error: "Invalid file type",
  code: "INVALID_FILE_TYPE"
}
```

---

## SERVICE LAYER ARCHITEKTUR

### api.js (Service Layer)

```javascript
// src/services/api.js

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('token');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': this.token ? `Bearer ${this.token}` : '',
      'Accept-Language': navigator.language
    };
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers
      }
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        if (response.status === 401) {
          // Handle unauthorized
          this.clearToken();
          window.location.href = '/login';
        }
        throw new ApiError(response.status, await response.json());
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Workspaces
  getWorkspaces(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/admin/workspaces?${params}`);
  }

  createWorkspace(data) {
    return this.request('/admin/workspaces', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  updateWorkspace(id, data) {
    return this.request(`/admin/workspaces/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  deleteWorkspace(id) {
    return this.request(`/admin/workspaces/${id}`, {
      method: 'DELETE'
    });
  }

  // Roles
  getRoles() {
    return this.request('/admin/roles');
  }

  getPermissions() {
    return this.request('/admin/permissions');
  }

  createRole(data) {
    return this.request('/admin/roles', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  // Logs
  getLogs(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/admin/logs?${params}`);
  }

  // Billing
  getSubscription() {
    return this.request('/billing/subscription');
  }

  getUsage() {
    return this.request('/billing/usage');
  }

  getInvoices(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/billing/invoices?${params}`);
  }

  // File Upload
  uploadImages(deviceId, files) {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    
    return this.request(`/devices/${deviceId}/images`, {
      method: 'POST',
      headers: {
        'Authorization': this.token ? `Bearer ${this.token}` : ''
      },
      body: formData
    });
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  }
}

class ApiError extends Error {
  constructor(status, response) {
    super(response.error || 'API Error');
    this.status = status;
    this.response = response;
  }
}

export default new ApiService();
```

---

## ERROR HANDLING

### Fehler-Typen

```javascript
// API Errors
class ApiError extends Error {
  constructor(status, message, code) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

// Network Errors
class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NetworkError';
  }
}

// Validation Errors
class ValidationError extends Error {
  constructor(message, fields = {}) {
    super(message);
    this.fields = fields;
  }
}
```

### Error Handling Pattern

```javascript
try {
  const response = await api.getWorkspaces();
  setWorkspaces(response.data);
} catch (error) {
  if (error instanceof ApiError) {
    if (error.status === 401) {
      // Unauthorized
      router.push('/login');
    } else if (error.status === 403) {
      // Forbidden
      toast.error('Sie haben keine Berechtigung');
    } else if (error.status === 500) {
      // Server error
      toast.error('Serverfehler. Bitte versuchen Sie später erneut.');
    }
  } else if (error instanceof NetworkError) {
    toast.error('Netzwerkfehler. Prüfen Sie Ihre Verbindung.');
  } else {
    toast.error('Ein unerwarteter Fehler ist aufgetreten.');
  }
  
  setError(error.message);
}
```

---

## LOADING STATES

### Loading Patterns

```javascript
// Pattern 1: Loading Boolean
const [loading, setLoading] = useState(false);

// Pattern 2: Loading State Map
const [loadingStates, setLoadingStates] = useState({
  workspaces: false,
  roles: false,
  billing: false
});

// Pattern 3: Request Counter
const [requestCount, setRequestCount] = useState(0);
const isLoading = requestCount > 0;

// Usage:
function WorkspacesPage() {
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.getWorkspaces();
        setWorkspaces(response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;

  return <WorkspacesList workspaces={workspaces} />;
}
```

---

## CACHING STRATEGY

### Implementation

```javascript
// Simple Cache Layer
class CacheManager {
  constructor(ttl = 5 * 60 * 1000) { // 5 minutes default
    this.cache = new Map();
    this.ttl = ttl;
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  set(key, value, ttl = this.ttl) {
    this.cache.set(key, {
      value,
      expiry: Date.now() + ttl
    });
  }

  clear() {
    this.cache.clear();
  }

  invalidate(pattern) {
    for (const key of this.cache.keys()) {
      if (key.includes(pattern)) {
        this.cache.delete(key);
      }
    }
  }
}

// Usage:
const cache = new CacheManager(5 * 60 * 1000); // 5 min cache

export const useWorkspacesWithCache = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWorkspaces = useCallback(async (forceRefresh = false) => {
    const cacheKey = 'workspaces:all';

    if (!forceRefresh) {
      const cached = cache.get(cacheKey);
      if (cached) {
        setWorkspaces(cached);
        return;
      }
    }

    setLoading(true);
    try {
      const response = await api.getWorkspaces();
      cache.set(cacheKey, response.data);
      setWorkspaces(response.data);
    } finally {
      setLoading(false);
    }
  }, []);

  return { workspaces, loading, fetchWorkspaces };
};
```

---

## REAL-TIME UPDATES

### WebSocket Integration (TODO)

```javascript
// src/services/socket.js

class SocketService {
  constructor(url) {
    this.url = url;
    this.socket = null;
    this.listeners = new Map();
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }

  connect(token) {
    this.socket = new WebSocket(`${this.url}?token=${token}`);

    this.socket.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
      this.emit('connected');
    };

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.emit(message.type, message.data);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.emit('error', error);
    };

    this.socket.onclose = () => {
      console.log('WebSocket disconnected');
      this.attemptReconnect(token);
    };
  }

  attemptReconnect(token) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      const delay = Math.pow(2, this.reconnectAttempts) * 1000;
      setTimeout(() => {
        this.reconnectAttempts++;
        this.connect(token);
      }, delay);
    }
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  off(event, callback) {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      this.listeners.set(event, callbacks.filter(cb => cb !== callback));
    }
  }

  emit(event, data) {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }

  send(type, data) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type, data }));
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

// Usage in Hook:
export const useRealtimeLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const socket = new SocketService(process.env.REACT_APP_WS_URL);
    const token = localStorage.getItem('token');
    socket.connect(token);

    socket.on('log:new', (log) => {
      setLogs(prev => [log, ...prev].slice(0, 100));
    });

    socket.on('log:update', (log) => {
      setLogs(prev => prev.map(l => l.id === log.id ? log : l));
    });

    return () => socket.disconnect();
  }, []);

  return logs;
};
```

---

**Dokumentation komplett** ✅  
**Version**: 1.0.0  
**Stand**: 30. November 2025
