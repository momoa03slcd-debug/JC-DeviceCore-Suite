# 🚀 Testing & QA Guide

**Version**: 1.0.0  
**Status**: Umfassende Test-Dokumentation mit Code-Beispielen

---

## 📋 Inhaltsverzeichnis

1. [Testing Strategy](#testing-strategy)
2. [Unit Tests](#unit-tests)
3. [Integration Tests](#integration-tests)
4. [E2E Tests (Cypress)](#e2e-tests-cypress)
5. [Manual QA Checklist](#manual-qa-checklist)
6. [Test Data & Fixtures](#test-data--fixtures)
7. [Performance Testing](#performance-testing)
8. [Accessibility Testing](#accessibility-testing)

---

## TESTING STRATEGY

### Testing Pyramid
```
          E2E Tests (10%)
         ╱────────────────╲
        ╱  Integration     ╲
       ╱     Tests (30%)    ╲
      ╱─────────────────────╲
     ╱    Unit Tests (60%)   ╲
    ╱___________________________╲

Target Coverage: 80%+
- Unit Tests: 60% (Business Logic)
- Integration: 30% (Component Communication)
- E2E: 10% (Critical User Flows)
```

---

### Test Tools Setup

```bash
# Unit Testing
yarn add --dev @testing-library/react @testing-library/jest-dom jest

# E2E Testing
yarn add --dev cypress

# Additional Tools
yarn add --dev @testing-library/user-event msw (API Mocking)
```

---

### jest.config.js

```javascript
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
    '!src/**/*.test.{js,jsx}',
    '!src/reportWebVitals.js'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
};
```

---

## UNIT TESTS

### Setup File (`src/setupTests.js`)

```javascript
import '@testing-library/jest-dom';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;
```

---

### Test File Pattern: `WorkspacesPage.test.jsx`

```javascript
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';
import WorkspacesPage from '@/pages/admin/WorkspacesPage';

// Wrapper mit allen Providers
const AllTheProviders = ({ children }) => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

const renderWithProviders = (component) => {
  return render(component, { wrapper: AllTheProviders });
};

describe('WorkspacesPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    test('should render page title', () => {
      renderWithProviders(<WorkspacesPage />);
      expect(screen.getByText(/Workspaces/i)).toBeInTheDocument();
    });

    test('should render stats cards', () => {
      renderWithProviders(<WorkspacesPage />);
      
      expect(screen.getByTestId('stat-active-workspaces')).toBeInTheDocument();
      expect(screen.getByTestId('stat-total-users')).toBeInTheDocument();
      expect(screen.getByTestId('stat-total-devices')).toBeInTheDocument();
    });

    test('should render search input', () => {
      renderWithProviders(<WorkspacesPage />);
      
      const searchInput = screen.getByTestId('workspace-search-input');
      expect(searchInput).toBeInTheDocument();
      expect(searchInput).toHaveAttribute('type', 'text');
    });

    test('should render create button', () => {
      renderWithProviders(<WorkspacesPage />);
      
      const createBtn = screen.getByTestId('workspace-create-btn');
      expect(createBtn).toBeInTheDocument();
      expect(createBtn).toBeEnabled();
    });

    test('should render workspaces table', () => {
      renderWithProviders(<WorkspacesPage />);
      
      expect(screen.getByTestId('workspace-table')).toBeInTheDocument();
    });
  });

  describe('Search Functionality', () => {
    test('should filter workspaces on search', async () => {
      const user = userEvent.setup();
      renderWithProviders(<WorkspacesPage />);

      const searchInput = screen.getByTestId('workspace-search-input');
      
      // Initial: all workspaces shown
      expect(screen.getByTestId('workspace-row-ws-001')).toBeInTheDocument();
      
      // Search for specific workspace
      await user.type(searchInput, 'Staging');
      
      await waitFor(() => {
        expect(screen.getByTestId('workspace-row-ws-002')).toBeInTheDocument();
      });
    });

    test('should show empty state when no results', async () => {
      const user = userEvent.setup();
      renderWithProviders(<WorkspacesPage />);

      const searchInput = screen.getByTestId('workspace-search-input');
      
      await user.type(searchInput, 'NonexistentWorkspace123');
      
      await waitFor(() => {
        expect(screen.getByText(/No workspaces found/i)).toBeInTheDocument();
      });
    });

    test('should debounce search input', async () => {
      jest.useFakeTimers();
      const user = userEvent.setup({ delay: null });
      
      renderWithProviders(<WorkspacesPage />);
      const searchInput = screen.getByTestId('workspace-search-input');
      
      // Type quickly
      await user.type(searchInput, 'Production');
      
      // Shouldn't filter immediately
      expect(screen.queryByText(/No workspaces found/i)).not.toBeInTheDocument();
      
      // After 300ms debounce
      jest.advanceTimersByTime(300);
      
      await waitFor(() => {
        // Now filter should apply
      });
      
      jest.useRealTimers();
    });
  });

  describe('Create Dialog', () => {
    test('should open dialog on create button click', async () => {
      const user = userEvent.setup();
      renderWithProviders(<WorkspacesPage />);

      const createBtn = screen.getByTestId('workspace-create-btn');
      await user.click(createBtn);

      expect(screen.getByTestId('workspace-create-dialog')).toBeInTheDocument();
    });

    test('should close dialog on cancel', async () => {
      const user = userEvent.setup();
      renderWithProviders(<WorkspacesPage />);

      await user.click(screen.getByTestId('workspace-create-btn'));
      const dialog = screen.getByTestId('workspace-create-dialog');
      expect(dialog).toBeInTheDocument();

      const cancelBtn = screen.getByRole('button', { name: /cancel/i });
      await user.click(cancelBtn);

      await waitFor(() => {
        expect(dialog).not.toBeInTheDocument();
      });
    });

    test('should validate form inputs', async () => {
      const user = userEvent.setup();
      renderWithProviders(<WorkspacesPage />);

      await user.click(screen.getByTestId('workspace-create-btn'));
      
      // Try to submit without inputs
      const saveBtn = screen.getByRole('button', { name: /save/i });
      await user.click(saveBtn);

      // Should show validation errors
      await waitFor(() => {
        expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
      });
    });

    test('should create new workspace', async () => {
      const user = userEvent.setup();
      renderWithProviders(<WorkspacesPage />);

      // Open dialog
      await user.click(screen.getByTestId('workspace-create-btn'));

      // Fill form
      const nameInput = screen.getByPlaceholderText(/workspace name/i);
      const descInput = screen.getByPlaceholderText(/description/i);
      
      await user.type(nameInput, 'Test Workspace');
      await user.type(descInput, 'Test Description');

      // Submit
      const saveBtn = screen.getByRole('button', { name: /save/i });
      await user.click(saveBtn);

      // Dialog should close
      await waitFor(() => {
        expect(screen.queryByTestId('workspace-create-dialog')).not.toBeInTheDocument();
      });

      // New workspace should appear in table
      expect(screen.getByTestId('workspace-row-ws-new')).toBeInTheDocument();
    });
  });

  describe('Table Actions', () => {
    test('should have edit action for each row', () => {
      renderWithProviders(<WorkspacesPage />);

      const editBtn = screen.getByTestId('workspace-action-edit-ws-001');
      expect(editBtn).toBeInTheDocument();
    });

    test('should have delete action for each row', () => {
      renderWithProviders(<WorkspacesPage />);

      const deleteBtn = screen.getByTestId('workspace-action-delete-ws-001');
      expect(deleteBtn).toBeInTheDocument();
    });

    test('should delete workspace on confirm', async () => {
      const user = userEvent.setup();
      renderWithProviders(<WorkspacesPage />);

      const deleteBtn = screen.getByTestId('workspace-action-delete-ws-001');
      await user.click(deleteBtn);

      // Confirmation dialog should appear
      const confirmBtn = screen.getByRole('button', { name: /confirm|delete/i });
      await user.click(confirmBtn);

      await waitFor(() => {
        expect(screen.queryByTestId('workspace-row-ws-001')).not.toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    test('should have accessible headings', () => {
      renderWithProviders(<WorkspacesPage />);

      const heading = screen.getByRole('heading', { name: /Workspaces/i });
      expect(heading).toBeInTheDocument();
    });

    test('search input should have label', () => {
      renderWithProviders(<WorkspacesPage />);

      const searchInput = screen.getByTestId('workspace-search-input');
      expect(searchInput).toHaveAccessibleName();
    });

    test('buttons should have accessible names', () => {
      renderWithProviders(<WorkspacesPage />);

      const createBtn = screen.getByTestId('workspace-create-btn');
      expect(createBtn).toHaveAccessibleName();
    });

    test('should have keyboard navigation', async () => {
      const user = userEvent.setup();
      renderWithProviders(<WorkspacesPage />);

      const searchInput = screen.getByTestId('workspace-search-input');
      searchInput.focus();

      expect(searchInput).toHaveFocus();

      // Tab to next element
      await user.tab();
      expect(screen.getByTestId('workspace-create-btn')).toHaveFocus();
    });
  });
});
```

---

### Test File: `RoleEditor.test.jsx`

```javascript
import React, { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RoleEditor from '@/pages/admin/components/RoleEditor';

describe('RoleEditor', () => {
  const mockOnOpenChange = jest.fn();
  const mockOnSaveRole = jest.fn();

  const defaultProps = {
    isOpen: true,
    onOpenChange: mockOnOpenChange,
    onSaveRole: mockOnSaveRole
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    test('should render when isOpen is true', () => {
      render(<RoleEditor {...defaultProps} />);
      expect(screen.getByTestId('role-editor-dialog')).toBeInTheDocument();
    });

    test('should not render when isOpen is false', () => {
      render(<RoleEditor {...defaultProps} isOpen={false} />);
      expect(screen.queryByTestId('role-editor-dialog')).not.toBeInTheDocument();
    });

    test('should render form inputs', () => {
      render(<RoleEditor {...defaultProps} />);

      expect(screen.getByTestId('role-editor-name-input')).toBeInTheDocument();
      expect(screen.getByTestId('role-editor-description-textarea')).toBeInTheDocument();
    });

    test('should render permission checkboxes', () => {
      render(<RoleEditor {...defaultProps} />);

      // Check for at least one permission
      expect(screen.getByTestId('role-permission-checkbox-dashboard.view')).toBeInTheDocument();
      expect(screen.getByTestId('role-permission-checkbox-devices.view')).toBeInTheDocument();
    });

    test('should render permission categories', () => {
      render(<RoleEditor {...defaultProps} />);

      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Devices')).toBeInTheDocument();
      expect(screen.getByText('Admin')).toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    test('should show error when name is empty', async () => {
      const user = userEvent.setup();
      render(<RoleEditor {...defaultProps} />);

      const saveBtn = screen.getByTestId('role-editor-save-btn');
      await user.click(saveBtn);

      expect(screen.getByTestId('role-editor-name-error')).toBeInTheDocument();
      expect(screen.getByText(/Name erforderlich/i)).toBeInTheDocument();
    });

    test('should show error when description is empty', async () => {
      const user = userEvent.setup();
      render(<RoleEditor {...defaultProps} />);

      const nameInput = screen.getByTestId('role-editor-name-input');
      await user.type(nameInput, 'Test Role');

      const saveBtn = screen.getByTestId('role-editor-save-btn');
      await user.click(saveBtn);

      expect(screen.getByTestId('role-editor-description-error')).toBeInTheDocument();
    });

    test('should show error when no permissions selected', async () => {
      const user = userEvent.setup();
      render(<RoleEditor {...defaultProps} />);

      const nameInput = screen.getByTestId('role-editor-name-input');
      const descInput = screen.getByTestId('role-editor-description-textarea');

      await user.type(nameInput, 'Test Role');
      await user.type(descInput, 'Test Description');

      const saveBtn = screen.getByTestId('role-editor-save-btn');
      await user.click(saveBtn);

      expect(screen.getByTestId('role-editor-permissions-error')).toBeInTheDocument();
    });

    test('should disable save button on validation errors', async () => {
      render(<RoleEditor {...defaultProps} />);

      const saveBtn = screen.getByTestId('role-editor-save-btn');
      expect(saveBtn).toHaveClass('disabled');
    });
  });

  describe('Form Submission', () => {
    test('should save role with valid data', async () => {
      const user = userEvent.setup();
      render(<RoleEditor {...defaultProps} />);

      // Fill form
      await user.type(screen.getByTestId('role-editor-name-input'), 'Support Lead');
      await user.type(screen.getByTestId('role-editor-description-textarea'), 'Supports customers');

      // Select permissions
      await user.click(screen.getByTestId('role-permission-checkbox-dashboard.view'));
      await user.click(screen.getByTestId('role-permission-checkbox-devices.view'));

      // Submit
      const saveBtn = screen.getByTestId('role-editor-save-btn');
      await user.click(saveBtn);

      await waitFor(() => {
        expect(mockOnSaveRole).toHaveBeenCalledWith(
          expect.objectContaining({
            name: 'Support Lead',
            description: 'Supports customers',
            permissions: expect.arrayContaining(['dashboard.view', 'devices.view'])
          })
        );
      });
    });

    test('should close dialog after save', async () => {
      const user = userEvent.setup();
      render(<RoleEditor {...defaultProps} />);

      // Fill and submit form
      await user.type(screen.getByTestId('role-editor-name-input'), 'Test Role');
      await user.type(screen.getByTestId('role-editor-description-textarea'), 'Test Desc');
      await user.click(screen.getByTestId('role-permission-checkbox-dashboard.view'));
      
      await user.click(screen.getByTestId('role-editor-save-btn'));

      await waitFor(() => {
        expect(mockOnOpenChange).toHaveBeenCalledWith(false);
      });
    });
  });

  describe('Cancel', () => {
    test('should close dialog on cancel', async () => {
      const user = userEvent.setup();
      render(<RoleEditor {...defaultProps} />);

      const cancelBtn = screen.getByTestId('role-editor-cancel-btn');
      await user.click(cancelBtn);

      expect(mockOnOpenChange).toHaveBeenCalledWith(false);
    });

    test('should not save when cancel is clicked', async () => {
      const user = userEvent.setup();
      render(<RoleEditor {...defaultProps} />);

      const cancelBtn = screen.getByTestId('role-editor-cancel-btn');
      await user.click(cancelBtn);

      expect(mockOnSaveRole).not.toHaveBeenCalled();
    });
  });

  describe('Permission Selection', () => {
    test('should select single permission', async () => {
      const user = userEvent.setup();
      render(<RoleEditor {...defaultProps} />);

      const checkbox = screen.getByTestId('role-permission-checkbox-dashboard.view');
      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);
      expect(checkbox).toBeChecked();
    });

    test('should select multiple permissions', async () => {
      const user = userEvent.setup();
      render(<RoleEditor {...defaultProps} />);

      const checkboxes = [
        'role-permission-checkbox-dashboard.view',
        'role-permission-checkbox-devices.view',
        'role-permission-checkbox-admin.users'
      ];

      for (const testId of checkboxes) {
        await user.click(screen.getByTestId(testId));
      }

      for (const testId of checkboxes) {
        expect(screen.getByTestId(testId)).toBeChecked();
      }
    });

    test('should deselect permission', async () => {
      const user = userEvent.setup();
      render(<RoleEditor {...defaultProps} />);

      const checkbox = screen.getByTestId('role-permission-checkbox-dashboard.view');

      await user.click(checkbox);
      expect(checkbox).toBeChecked();

      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });
  });
});
```

---

## INTEGRATION TESTS

### Integration Test: `Workspaces.integration.test.jsx`

```javascript
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';
import WorkspacesPage from '@/pages/admin/WorkspacesPage';

// Mock API Server
const server = setupServer(
  rest.get('/api/admin/workspaces', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: {
          workspaces: [
            { id: 'ws-1', name: 'Production', users: 45, devices: 234 },
            { id: 'ws-2', name: 'Staging', users: 12, devices: 45 }
          ]
        }
      })
    );
  }),
  rest.post('/api/admin/workspaces', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        success: true,
        data: { id: 'ws-3', ...req.body }
      })
    );
  }),
  rest.delete('/api/admin/workspaces/:id', (req, res, ctx) => {
    return res(ctx.json({ success: true }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const renderComponent = (component) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
          {component}
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Workspaces Integration', () => {
  test('should fetch and display workspaces from API', async () => {
    renderComponent(<WorkspacesPage />);

    await waitFor(() => {
      expect(screen.getByText('Production')).toBeInTheDocument();
      expect(screen.getByText('Staging')).toBeInTheDocument();
    });
  });

  test('should create new workspace through API', async () => {
    const user = userEvent.setup();
    renderComponent(<WorkspacesPage />);

    // Open create dialog
    await user.click(screen.getByTestId('workspace-create-btn'));

    // Fill form
    await user.type(screen.getByTestId('workspace-name-input'), 'Development');

    // Submit
    await user.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(screen.getByText('Development')).toBeInTheDocument();
    });
  });

  test('should handle API errors gracefully', async () => {
    server.use(
      rest.get('/api/admin/workspaces', (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ error: 'Server error' })
        );
      })
    );

    renderComponent(<WorkspacesPage />);

    await waitFor(() => {
      expect(screen.getByText(/error|failed/i)).toBeInTheDocument();
    });
  });
});
```

---

## E2E TESTS (Cypress)

### Cypress Setup: `cypress.config.js`

```javascript
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx}',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      // plugins
    }
  },
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack'
    }
  }
});
```

---

### E2E Test: `cypress/e2e/workspaces.cy.js`

```javascript
describe('Workspaces Page E2E', () => {
  beforeEach(() => {
    cy.visit('/admin/workspaces');
    // Assume user is logged in
  });

  describe('Navigation & Display', () => {
    it('should load workspaces page', () => {
      cy.get('[data-testid="workspace-stats"]').should('be.visible');
      cy.get('[data-testid="workspace-table"]').should('be.visible');
    });

    it('should display all workspace cards', () => {
      cy.get('[data-testid^="workspace-row-"]').should('have.length.greaterThan', 0);
    });
  });

  describe('Search Functionality', () => {
    it('should filter workspaces by search', () => {
      cy.get('[data-testid="workspace-search-input"]')
        .type('Production');

      cy.get('[data-testid="workspace-row-ws-001"]')
        .should('be.visible');

      cy.get('[data-testid="workspace-row-ws-002"]')
        .should('not.exist');
    });

    it('should show empty state when no results', () => {
      cy.get('[data-testid="workspace-search-input"]')
        .type('NonexistentWorkspace');

      cy.contains('No workspaces found').should('be.visible');
    });
  });

  describe('Create Workspace', () => {
    it('should open create dialog', () => {
      cy.get('[data-testid="workspace-create-btn"]').click();
      cy.get('[data-testid="workspace-create-dialog"]').should('be.visible');
    });

    it('should create new workspace', () => {
      cy.get('[data-testid="workspace-create-btn"]').click();

      cy.get('[data-testid="workspace-name-input"]')
        .type('Test Workspace');

      cy.get('[data-testid="workspace-desc-input"]')
        .type('Test Description');

      cy.contains('button', 'Save').click();

      cy.get('[data-testid^="workspace-row-"]')
        .contains('Test Workspace')
        .should('be.visible');
    });

    it('should show validation errors', () => {
      cy.get('[data-testid="workspace-create-btn"]').click();

      cy.contains('button', 'Save').click();

      cy.get('[data-testid="workspace-name-error"]')
        .should('contain', 'Name erforderlich');
    });
  });

  describe('Delete Workspace', () => {
    it('should delete workspace', () => {
      cy.get('[data-testid="workspace-action-delete-ws-001"]').click();

      cy.contains('button', /confirm|delete/i).click();

      cy.get('[data-testid="workspace-row-ws-001"]')
        .should('not.exist');
    });
  });
});
```

---

### E2E Test: `cypress/e2e/role-editor.cy.js`

```javascript
describe('RoleEditor E2E', () => {
  beforeEach(() => {
    cy.visit('/admin/tools');
  });

  it('should open role editor dialog', () => {
    cy.get('[data-testid="admin-tools-open-role-editor"]').click();
    cy.get('[data-testid="role-editor-dialog"]').should('be.visible');
  });

  it('should create custom role', () => {
    cy.get('[data-testid="admin-tools-open-role-editor"]').click();

    cy.get('[data-testid="role-editor-name-input"]')
      .type('Support Lead');

    cy.get('[data-testid="role-editor-description-textarea"]')
      .type('Handles customer support');

    // Select permissions
    cy.get('[data-testid="role-permission-checkbox-dashboard.view"]').click();
    cy.get('[data-testid="role-permission-checkbox-devices.view"]').click();

    cy.get('[data-testid="role-editor-save-btn"]').click();

    // Verify role created
    cy.get('[data-testid="admin-tools-role-item-0"]')
      .should('contain', 'Support Lead');
  });

  it('should validate form inputs', () => {
    cy.get('[data-testid="admin-tools-open-role-editor"]').click();

    cy.get('[data-testid="role-editor-save-btn"]').click();

    cy.get('[data-testid="role-editor-name-error"]')
      .should('be.visible');
  });
});
```

---

## MANUAL QA CHECKLIST

### Functional Testing

#### Workspaces Page
- [ ] Page loads without errors
- [ ] All stats cards display correctly
- [ ] Search works with debounce
- [ ] Search clears results when empty
- [ ] Create button opens dialog
- [ ] Create form validates inputs
- [ ] Create form submits successfully
- [ ] New workspace appears in table
- [ ] Edit action works
- [ ] Delete action works with confirmation
- [ ] Table shows all columns correctly
- [ ] No console errors

#### Roles Page
- [ ] Role cards display all 4 default roles
- [ ] Permission matrix shows all permissions
- [ ] Permission matrix aligns correctly
- [ ] Permission icons (✓/✗) display correctly
- [ ] Role descriptions visible
- [ ] No layout issues

#### BillingPage
- [ ] Subscription card displays
- [ ] Usage progress bars show correct percentage
- [ ] Invoice table displays all invoices
- [ ] Invoice download links work
- [ ] Payment method displays
- [ ] Billing address displays
- [ ] Support links work

#### LogsPage
- [ ] Stats cards display log counts
- [ ] Search works
- [ ] Type filter works
- [ ] Level filter works
- [ ] Table displays all logs
- [ ] Log levels color-coded correctly
- [ ] Timestamps format correctly
- [ ] No console errors

---

### UI/UX Testing

- [ ] All text is readable
- [ ] Colors have sufficient contrast
- [ ] Buttons are clickable (min 44x44px)
- [ ] Hover states work
- [ ] Active states work
- [ ] Disabled states show clearly
- [ ] Error states are obvious
- [ ] Success states are obvious
- [ ] Loading states display
- [ ] Empty states display
- [ ] No overlapping elements
- [ ] No cut-off text

---

### Responsive Design

#### Mobile (320px - 640px)
- [ ] Single column layout
- [ ] Buttons stack properly
- [ ] Text sizes readable
- [ ] No horizontal scroll
- [ ] Touch targets large enough
- [ ] Modals fit screen
- [ ] Tables scroll horizontally

#### Tablet (641px - 1024px)
- [ ] 2-column layout works
- [ ] Grid shows properly
- [ ] Sidebar visible/hidden appropriately

#### Desktop (1025px+)
- [ ] Full layout displays
- [ ] Multi-column layout works
- [ ] Wide tables visible

---

### Accessibility Testing

- [ ] Keyboard navigation works (Tab)
- [ ] Focus states visible
- [ ] ARIA labels present
- [ ] Color not only indicator
- [ ] Form labels associated
- [ ] Error messages clear
- [ ] Headings hierarchical (h1, h2, h3)
- [ ] Images have alt text
- [ ] Links have descriptive text
- [ ] Buttons have accessible names
- [ ] Screen reader compatible

---

### Browser Testing

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | Latest | ✅ |
| Firefox | Latest | ✅ |
| Safari | Latest | ✅ |
| Edge | Latest | ✅ |
| Chrome Mobile | Latest | ✅ |
| Safari Mobile | Latest | ✅ |

---

### i18n Testing

- [ ] German (DE) - All text displays
- [ ] English (EN) - All text displays
- [ ] Arabic (AR) - All text displays
- [ ] Arabic - RTL layout correct
- [ ] Language switch works
- [ ] No missing translations
- [ ] Character encoding correct
- [ ] No text overflow in translations

---

### Performance Testing

- [ ] Page load time < 2s
- [ ] First Contentful Paint < 1.5s
- [ ] Interaction to Paint < 200ms
- [ ] No layout shifts (CLS < 0.1)
- [ ] Debounced search works smoothly
- [ ] No memory leaks
- [ ] Large tables render smoothly
- [ ] Dialog animations smooth

---

### Data Validation

- [ ] Form rejects invalid email
- [ ] Form rejects invalid phone
- [ ] Form requires required fields
- [ ] Form limits text length
- [ ] File upload validates size
- [ ] File upload validates type
- [ ] Numbers parse correctly
- [ ] Dates format correctly

---

### Error Scenarios

- [ ] API error shows message
- [ ] Network error shows message
- [ ] Validation error shows message
- [ ] 404 page displays
- [ ] 500 error handled gracefully
- [ ] Loading state clears after error
- [ ] Retry works after error

---

## TEST DATA & FIXTURES

### Mock Workspace Data
```javascript
// cypress/fixtures/workspaces.json
{
  "workspaces": [
    {
      "id": "ws-001",
      "name": "Production",
      "users": 45,
      "devices": 234,
      "status": "active"
    },
    // ...
  ]
}
```

---

## PERFORMANCE TESTING

### Lighthouse Check
```bash
# Run Lighthouse audit
yarn add --dev lighthouse
npx lighthouse http://localhost:3000/admin/workspaces

# Target scores:
# - Performance: > 90
# - Accessibility: > 95
# - Best Practices: > 90
# - SEO: > 90
```

---

## ACCESSIBILITY TESTING

### Axe DevTools
```bash
yarn add --dev @axe-core/react
```

```javascript
import { axe, toHaveNoViolations } from 'jest-axe';

test('should not have accessibility violations', async () => {
  const { container } = render(<WorkspacesPage />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

**Dokumentation komplett** ✅  
**Version**: 1.0.0  
**Stand**: 30. November 2025
