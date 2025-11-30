# JC DeviceCore Suite - UI Components & Testing Guide

## Übersicht

Dieses Dokument beschreibt die erweiterten UI-Komponenten und Best Practices für Tests im JC DeviceCore Suite Frontend.

## Implementierte UI-Komponenten

### 1. Admin Pages mit vollständiger `data-testid` Abdeckung

#### WorkspacesPage
- **Pfad**: `/admin/workspaces`
- **Features**:
  - Workspace-Verwaltung mit Suche und Filterung
  - Create/Edit/Delete Operationen
  - Statistiken (Active Workspaces, Total Users, Total Devices)
  - **Testbarkeit**: Alle Elemente haben eindeutige `data-testid` Attribute

```javascript
// Beispiel Test-Selektoren:
data-testid="workspace-stats"
data-testid="workspace-row-{id}"
data-testid="add-workspace-btn"
data-testid="workspace-search"
```

#### RolesPage
- **Pfad**: `/admin/roles`
- **Features**:
  - Rollenübersicht mit Statistiken
  - Permission Matrix (Berechtigungen pro Rolle)
  - Rolle Details mit Permissions
  - **Testbarkeit**: Granulare Test-IDs für jede Rolle und Berechtigung

```javascript
// Beispiel Test-Selektoren:
data-testid="roles-overview"
data-testid="role-card-{role-id}"
data-testid="permission-matrix-title"
data-testid="permission-cell-{role-id}-{perm-index}"
```

#### BillingPage
- **Pfad**: `/admin/billing`
- **Features**:
  - Abonnement-Status und Verwendung
  - Rechnungs-Verlauf
  - Zahlungsmethoden-Verwaltung
  - Billing-Adresse
  - **Testbarkeit**: Vollständige Test-Abdeckung für alle Abrechnungsfunktionen

```javascript
// Beispiel Test-Selektoren:
data-testid="billing-stats"
data-testid="billing-plan-info"
data-testid="invoice-row-{invoice-id}"
data-testid="billing-upgrade-btn"
```

#### LogsPage
- **Pfad**: `/admin/logs`
- **Features**:
  - System-Logs mit Filterung (Type, Level)
  - Suchfunktion
  - Export-Funktionalität
  - Statistiken nach Level (Info, Success, Warning, Error)
  - **Testbarkeit**: Test-IDs für alle Log-Einträge und Filter

```javascript
// Beispiel Test-Selektoren:
data-testid="logs-stats"
data-testid="logs-filters"
data-testid="log-row-{log-id}"
data-testid="logs-type-filter"
data-testid="logs-level-filter"
```

### 2. Erweiterte Admin-Komponenten

#### RoleEditor
- **Datei**: `/src/pages/admin/components/RoleEditor.jsx`
- **Verwendung**:
  ```jsx
  import { RoleEditor } from './components';
  
  const [isOpen, setIsOpen] = useState(false);
  
  <RoleEditor
    isOpen={isOpen}
    onOpenChange={setIsOpen}
    onSaveRole={(roleData) => {
      // roleData = { name, description, permissions: [] }
      console.log('New role created:', roleData);
    }}
    existingRole={roleToEdit}
  />
  ```

- **Features**:
  - Rollenname und Beschreibung eingeben
  - Berechtigungen nach Kategorie auswählen
  - Validierung (Formulardaten)
  - Dialog-Interface mit Save/Cancel
  - **Test-Selektoren**:
    ```
    data-testid="role-editor-dialog"
    data-testid="role-editor-name-input"
    data-testid="role-permission-checkbox-{permission-id}"
    data-testid="role-editor-save-btn"
    ```

#### DeviceImageUpload
- **Datei**: `/src/pages/admin/components/DeviceImageUpload.jsx`
- **Verwendung**:
  ```jsx
  import { DeviceImageUpload } from './components';
  
  const [isOpen, setIsOpen] = useState(false);
  
  <DeviceImageUpload
    isOpen={isOpen}
    onOpenChange={setIsOpen}
    onUpload={(files) => {
      // files = Array of { name, size, type, preview, status }
      console.log('Images uploaded:', files);
    }}
    deviceId="device-123"
  />
  ```

- **Features**:
  - Drag & Drop Upload
  - Mehrere Dateien auswählen
  - Dateivalidierung (Größe: 5MB, Typen: JPEG, PNG, WebP)
  - Bildvorschau
  - Simulierter Upload mit Fortschrittsanzeige
  - Error Handling
  - **Test-Selektoren**:
    ```
    data-testid="device-upload-dialog"
    data-testid="device-upload-dropzone"
    data-testid="device-upload-file-card-{file-id}"
    data-testid="device-upload-progress-{file-id}"
    data-testid="device-upload-submit-btn"
    ```

### 3. Legal Pages

#### AboutPage
- **Pfad**: `/about`
- **Sections**: Vision, Mission, Focus, Core Values
- **Test-IDs**: `data-testid="about-section-{index}"`

#### PrivacyPage
- **Pfad**: `/privacy`
- **Sections**: Intro, Data Processing, GDPR Compliance
- **Test-IDs**: `data-testid="privacy-{section}"`

#### TermsPage
- **Pfad**: `/terms`
- **Sections**: Intro, Services, Legal Notice, Disclaimer
- **Test-IDs**: `data-testid="terms-{section}"`

#### NotFoundPage
- **Pfad**: `/*` (Fallback)
- **Test-IDs**: `data-testid="notfound-page"`, `data-testid="notfound-title"`

## i18n Integration (DE/EN/AR)

Alle Komponenten sind vollständig internationalisiert:

```javascript
import { useLanguage } from '../../context/LanguageContext';

const { t, isRTL } = useLanguage();

// Verwendung in Komponenten:
<h1>{t.admin.workspaces}</h1>
<p className={isRTL ? 'text-right' : 'text-left'}>
  {t.admin.systemLogs}
</p>
```

### Neue Übersetzungsschlüssel (translations.js):

```javascript
de: {
  notfound: {
    title: 'Seite nicht gefunden',
    description: '...',
    goBack: 'Zurück',
  },
}

en: {
  notfound: {
    title: 'Page Not Found',
    description: '...',
    goBack: 'Go Back',
  },
}

ar: {
  notfound: {
    title: 'الصفحة غير موجودة',
    description: '...',
    goBack: 'رجوع',
  },
}
```

## Testing Beispiele

### Unit Tests mit React Testing Library

```javascript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RoleEditor from './RoleEditor';

describe('RoleEditor', () => {
  test('renders role editor dialog', () => {
    render(
      <RoleEditor 
        isOpen={true} 
        onOpenChange={() => {}}
        onSaveRole={() => {}}
      />
    );
    
    expect(screen.getByTestId('role-editor-dialog')).toBeInTheDocument();
  });

  test('validates role name input', async () => {
    const user = userEvent.setup();
    const onSave = jest.fn();
    
    render(
      <RoleEditor 
        isOpen={true} 
        onOpenChange={() => {}}
        onSaveRole={onSave}
      />
    );

    // Versuche zu speichern ohne Name
    await user.click(screen.getByTestId('role-editor-save-btn'));
    
    expect(screen.getByTestId('role-editor-name-error')).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  test('creates role with selected permissions', async () => {
    const user = userEvent.setup();
    const onSave = jest.fn();
    
    render(
      <RoleEditor 
        isOpen={true} 
        onOpenChange={() => {}}
        onSaveRole={onSave}
      />
    );

    await user.type(screen.getByTestId('role-editor-name-input'), 'Support Lead');
    await user.type(screen.getByTestId('role-editor-description-input'), 'Support team lead');
    
    // Wähle einige Berechtigungen
    await user.click(screen.getByTestId('role-permission-checkbox-devices.view'));
    await user.click(screen.getByTestId('role-permission-checkbox-tickets.edit'));
    
    await user.click(screen.getByTestId('role-editor-save-btn'));
    
    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Support Lead',
        permissions: expect.arrayContaining(['devices.view', 'tickets.edit']),
      })
    );
  });
});
```

### E2E Tests mit Cypress

```javascript
describe('Admin Tools Demo Page', () => {
  beforeEach(() => {
    cy.login(); // Custom command für Login
    cy.visit('/admin/tools');
  });

  it('should create a new role', () => {
    // Öffne Role Editor
    cy.get('[data-testid="admin-tools-open-role-editor"]').click();
    
    // Fülle Formular aus
    cy.get('[data-testid="role-editor-name-input"]').type('Custom Role');
    cy.get('[data-testid="role-editor-description-input"]').type('Custom role description');
    
    // Wähle Berechtigungen
    cy.get('[data-testid="role-permission-checkbox-devices.view"]').check();
    cy.get('[data-testid="role-permission-checkbox-tickets.view"]').check();
    
    // Speichern
    cy.get('[data-testid="role-editor-save-btn"]').click();
    
    // Verify Rolle wurde erstellt
    cy.get('[data-testid="admin-tools-role-item-0"]').should('exist');
    cy.get('[data-testid="admin-tools-role-name-0"]').should('contain', 'Custom Role');
  });

  it('should upload device images', () => {
    cy.get('[data-testid="admin-tools-open-upload"]').click();
    
    // Simuliere Datei-Upload
    cy.get('[data-testid="device-upload-file-input"]').selectFile(
      'cypress/fixtures/device-image.jpg'
    );
    
    // Bestätige Upload
    cy.get('[data-testid="device-upload-submit-btn"]').click();
    
    // Verify Upload erfolgt
    cy.get('[data-testid="admin-tools-image-item-0"]').should('exist');
  });
});
```

## Namenskonventionen für data-testid

### Allgemeine Richtlinien:

1. **Komponenten-Prefix**: `{component-name}-`
   - Beispiel: `role-editor-`, `device-upload-`

2. **Bereich/Sektion**: `-{section}-` (optional)
   - Beispiel: `role-editor-basic-`, `device-upload-files-`

3. **Element-Typ**: `-{type}`
   - `-btn`: Button
   - `-input`: Input Field
   - `-card`: Card Container
   - `-title`: Überschrift
   - `-error`: Error Message
   - `-progress`: Progress Bar
   - `-row-{id}`: Table Row
   - `-cell-{property}-{id}`: Table Cell

4. **Dynamische IDs**: `-{id}` oder `-{index}`
   - Beispiel: `log-row-123`, `role-permission-checkbox-devices.view`

### Beispiel-Struktur:

```
component-parent-section-element-{id/index}
└─ device-upload-files-card-abc123
   ├─ device-upload-preview-abc123
   ├─ device-upload-filename-abc123
   ├─ device-upload-progress-abc123
   └─ device-upload-remove-abc123
```

## Deployment Checklist

- ✅ Alle Admin Pages haben data-testid für jeden Container, Button, Input
- ✅ RoleEditor Komponente mit vollständiger Testbarkeit
- ✅ DeviceImageUpload mit Drag & Drop und Validierung
- ✅ i18n DE/EN/AR für alle neuen Pages/Features
- ✅ Legal Pages (About, Privacy, Terms, 404) mit data-testid
- ✅ AdminToolsDemoPage als Showcase für neue Komponenten
- ✅ Responsive Design (Mobile, Tablet, Desktop)
- ✅ Accessibility (Keyboard Navigation, ARIA Labels)

## Nächste Schritte (Backend Integration)

1. **RoleEditor Integration**:
   - API Endpoint: `POST /api/admin/roles` (Create)
   - API Endpoint: `PUT /api/admin/roles/{id}` (Update)
   - Permissions-System im Backend

2. **DeviceImageUpload Integration**:
   - API Endpoint: `POST /api/devices/{id}/images`
   - Cloud Storage (S3, Azure Blob, etc.)
   - Image Processing (Resize, Optimize)

3. **Admin Pages Integration**:
   - Real API Calls statt Mock Data
   - Pagination für Tables
   - Real-time Updates mit WebSocket

## Komponenten-Import

```javascript
// Komponenten importieren
import { RoleEditor, DeviceImageUpload } from './pages/admin/components';

// Kontext importieren
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

// ShadCN UI Komponenten
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
```

---

**Version**: 1.0.0  
**Letztes Update**: November 30, 2025  
**Maintainer**: JC DeviceCore Suite Team
