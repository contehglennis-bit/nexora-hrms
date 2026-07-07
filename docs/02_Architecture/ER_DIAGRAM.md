# Nexora HRMS
## Entity Relationship Diagram (ERD)

Version: 1.0

Status: Draft

Owner: Engineering Team

Last Updated: July 2026

---

# Purpose

This document describes the relationships between the core entities of Nexora HRMS.

The ER Diagram serves as the blueprint for database implementation and helps developers understand how data flows throughout the system.

The diagram focuses on the foundational entities required for Version 1 (MVP).

---

# Relationship Overview

The core relationships are shown below.

```
                           Organization
                                │
      ┌─────────────────────────┼─────────────────────────┐
      │                         │                         │
      ▼                         ▼                         ▼
 Departments               Employees                 Profiles
      │                         │                         │
      │                         │                         │
      ▼                         ▼                         ▼
 Job Titles              User Roles                  Supabase Auth
      │                         │
      │                         ▼
      └──────────────► Roles ◄──────────────┐
                              │             │
                              ▼             │
                     Role Permissions       │
                              │             │
                              ▼             │
                         Permissions ◄──────┘
```

---

# Entity Relationships

## Organization

Relationship Summary

An Organization owns almost every business record inside Nexora.

Relationships

- One Organization has many Departments.
- One Organization has many Employees.
- One Organization has many Profiles.
- One Organization has many Roles.
- One Organization has one Organization Settings.

Cardinality

Organization (1) → (Many) Departments

Organization (1) → (Many) Employees

Organization (1) → (Many) Profiles

Organization (1) → (Many) Roles

Organization (1) → (1) Organization Settings

---

## Department

A Department belongs to exactly one Organization.

Relationships

- One Department contains many Employees.

Cardinality

Department (1) → (Many) Employees

---

## Job Title

A Job Title belongs to one Organization.

Relationships

- One Job Title can be assigned to many Employees.

Cardinality

Job Title (1) → (Many) Employees

---

## Employee

Represents an individual employed by an Organization.

Relationships

- Belongs to one Organization.
- Belongs to one Department.
- Has one Job Title.
- May report to another Employee (Manager).
- May have one Profile.

Cardinality

Employee (Many) → (1) Department

Employee (Many) → (1) Job Title

Employee (Many) → (1) Organization

Employee (0..1) → (1) Profile

Employee (Many) → (0..1) Manager

---

## Profile

Represents a login account inside Nexora.

Relationships

- Belongs to one Organization.
- May belong to one Employee.
- Can have multiple Roles.
- References one Supabase Authentication user.

Cardinality

Profile (Many) → (1) Organization

Profile (0..1) → (1) Employee

Profile (Many) ↔ (Many) Roles

---

## Role

Represents a collection of permissions.

Relationships

- Belongs to one Organization.
- Assigned to many Profiles.
- Contains many Permissions.

Cardinality

Role (Many) ↔ (Many) Profiles

Role (Many) ↔ (Many) Permissions

---

## Permission

Represents one action that may be performed within Nexora.

Examples

- employee.view
- employee.create
- employee.update
- payroll.process
- leave.approve

Relationships

Permissions are assigned to Roles.

Permissions are global across the platform.

---

# Many-to-Many Relationships

The following relationships require junction tables.

Profiles ←→ Roles

Implemented using:

user_roles

Roles ←→ Permissions

Implemented using:

role_permissions

---

# One-to-Many Relationships

Organization

↓

Departments

↓

Employees

Organization

↓

Roles

Department

↓

Employees

Job Title

↓

Employees

---

# One-to-One Relationships

Organization

↓

Organization Settings

Employee

↓

Profile (Optional)

---

# Self Relationship

Employees may report to another Employee.

Example

CEO

↓

HR Director

↓

HR Manager

↓

HR Officer

This relationship is implemented using:

manager_id

inside the Employees table.

---

# Business Rules

The following rules must always be enforced.

- Every Department belongs to exactly one Organization.
- Every Employee belongs to exactly one Organization.
- Every Employee belongs to one Department.
- Every Employee has one Job Title.
- Profiles cannot exist without an Organization.
- Roles cannot exist without an Organization.
- Permissions are global.
- Organizations cannot access another Organization's records.

---

# Multi-Tenancy Strategy

Every business table contains:

- organization_id

This enables Row Level Security (RLS) within Supabase and ensures complete isolation between organizations.

---

# Future Relationships

The following entities will be connected in future versions.

Employee

├── Attendance

├── Leave Requests

├── Payroll

├── Performance Reviews

├── Documents

├── Assets

└── Training Records

Recruitment

├── Jobs

├── Candidates

├── Applications

└── Interviews

---

# Design Philosophy

The ER Diagram follows the following architectural principles.

- Separation of Concerns
- Single Responsibility
- Multi-Tenant Design
- Security by Default
- High Cohesion
- Low Coupling
- Scalability
- Maintainability

---

# Conclusion

This ER Diagram represents the core data relationships of Nexora HRMS.

Future modules will extend this diagram while maintaining the same architectural principles.