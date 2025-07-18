# Dashboard Components

This directory contains the refactored components for the API Manager dashboard. The components are organized into logical groups for better maintainability.

## Structure

```
components/
├── layout/           # Layout components (Sidebar, Header)
├── ui/              # Reusable UI components (Notification, ConfirmDeleteModal)
├── dashboard/       # Dashboard-specific components (PlanCard, ApiKeyModal, ApiKeysTable)
├── index.js         # Export all components for easier imports
└── README.md        # This file
```

## Components

### Layout Components (`layout/`)

- **Sidebar.js** - Main navigation sidebar with logo, navigation menu, and user profile
- **Header.js** - Top header with breadcrumbs, status indicator, and action buttons

### UI Components (`ui/`)

- **Notification.js** - Success notification toast component
- **ConfirmDeleteModal.js** - Confirmation modal for delete operations

### Dashboard Components (`dashboard/`)

- **PlanCard.js** - Displays current plan information and usage
- **ApiKeyModal.js** - Modal for creating/editing API keys
- **ApiKeysTable.js** - Table displaying API keys with actions

## Custom Hooks

- **useApiKeys.js** - Custom hook that manages all API key related state and operations

## Usage

```javascript
import { 
  Sidebar, 
  Header, 
  Notification, 
  ConfirmDeleteModal,
  PlanCard,
  ApiKeyModal,
  ApiKeysTable 
} from '../components';
import { useApiKeys } from '../hooks/useApiKeys';
```

## Benefits of Refactoring

1. **Separation of Concerns** - Each component has a single responsibility
2. **Reusability** - Components can be reused across different parts of the application
3. **Maintainability** - Easier to find and fix issues in smaller, focused components
4. **Testability** - Individual components can be tested in isolation
5. **Readability** - Main dashboard component is now much cleaner and easier to understand
6. **State Management** - All API key logic is centralized in a custom hook

## State Management

The `useApiKeys` hook manages all the state and operations related to API keys:
- API key data fetching
- Create/Update/Delete operations
- Modal state management
- Notification handling
- Form data management

This approach makes the main component much cleaner and easier to maintain. 