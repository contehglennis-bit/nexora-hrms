# Nexora HRMS - Domain Model

Version: 1.0
Status: Draft

---

# Purpose

This document defines the core business entities of Nexora HRMS, their responsibilities, and how they relate to one another.

The Domain Model serves as the foundation for database design, API development, frontend architecture, and business rules.

---

# Core Entities

## Organization

Represents a company or institution using Nexora.

Responsibilities:

- Owns all business data.
- Defines departments.
- Employs employees.
- Manages users.
- Configures company settings.
- Controls branding.

Business Rules:

- Every organization is isolated from others.
- Organizations cannot access each other's data.
- Every organization has at least one administrator.

---

## User

Represents a login account.

Responsibilities:

- Authenticate into the system.
- Receive permissions through roles.
- Perform actions within the application.

Business Rules:

- A user belongs to one organization.
- A user may or may not be linked to an employee.
- Every user has at least one role.

---

## Employee

Represents a person employed by an organization.

Responsibilities:

- Store employment information.
- Track career history.
- Participate in HR processes.

Business Rules:

- Every employee belongs to one organization.
- Every employee belongs to one department.
- Not every employee requires a user account.

---

## Department

Represents a functional division within an organization.

Examples:

- HR
- Finance
- IT
- Operations

Business Rules:

- Departments belong to one organization.
- Departments contain many employees.

---

## Role

Represents a collection of permissions.

Examples:

- HR Manager
- Recruiter
- Payroll Officer
- Employee

Business Rules:

- Roles belong to one organization.
- Users can have multiple roles.

---

## Permission

Represents a single system capability.

Examples:

- View Employees
- Edit Employees
- Approve Leave
- Process Payroll

Business Rules:

- Permissions are assigned through roles.
- Permissions should never be hardcoded into application logic.

---

# Entity Relationships

Organization

├── Departments

├── Employees

├── Users

├── Roles

└── Settings

Departments

└── Employees

Users

└── Roles

Roles

└── Permissions

Employees

├── Attendance

├── Leave

├── Payroll

├── Documents

└── Recruitment History

---

# Architectural Principles

The domain model follows these principles:

- Separation of Concerns
- Single Responsibility
- Multi-Tenant by Design
- Security by Default
- Reusability
- Scalability

---

# Future Domain Entities

The following entities will be introduced in later versions:

- Attendance
- Leave Request
- Payroll
- Job Posting
- Candidate
- Interview
- Performance Review
- Training
- Asset
- Expense
- Notification
- Announcement
