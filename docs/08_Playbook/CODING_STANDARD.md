# Nexora HRMS
# Coding Standards

## General Principles

- Write readable code before clever code.
- Keep components small and focused.
- Avoid duplicate code.
- Use meaningful variable and function names.
- Comment "why", not "what".

---

## Folder Structure

- Shared UI components belong in `src/components`.
- Feature-specific components belong inside their feature folder.
- Business logic belongs in hooks or services.
- Pages should remain lightweight.

---

## Components

- One component per file.
- Use PascalCase for component names.

Example:

EmployeeCard.jsx

DashboardHeader.jsx

---

## Hooks

Custom hooks should begin with:

use

Examples:

useAuth.js

useEmployees.js

---

## Services

Services communicate with Supabase.

Examples:

authService.js

employeeService.js

---

## Commits

Use Conventional Commits.

Examples:

feat:

fix:

refactor:

docs:

style:

test:

chore:

---

## Golden Rule

Every new feature must be:

- Planned
- Built
- Tested
- Committed
- Pushed
- Documented