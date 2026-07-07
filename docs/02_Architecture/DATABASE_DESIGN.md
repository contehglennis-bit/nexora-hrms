# Nexora HRMS
## Database Design

Version: 1.0

Status: Draft

Owner: Engineering Team

Last Updated: July 2026

---

# Purpose

This document defines the database structure for Nexora HRMS.

Its purpose is to document every core database table required for the foundation of the application before implementation in Supabase.

The database is designed using PostgreSQL and follows modern SaaS architecture principles including:

- Multi-tenancy
- Normalization
- Security
- Scalability
- Maintainability

---

# Database Design Principles

The following principles guide the database architecture.

## 1. Multi-Tenant Architecture

Every organization owns its own data.

Business tables include an `organization_id` column to ensure complete data isolation between organizations.

No organization should ever have access to another organization's data.

---

## 2. UUID Primary Keys

Every table uses UUIDs instead of auto-incrementing integers.

Reasons:

- Better security
- Better scalability
- Easier API development
- Prevent predictable IDs

---

## 3. Audit Columns

Every business table should include:

- id
- created_at
- updated_at

Future versions may also include:

- created_by
- updated_by
- deleted_at
- deleted_by

---

## 4. Normalization

Data should only exist in one place.

Example:

Employee records should reference departments using `department_id` instead of storing department names.

---

## 5. Module Separation

Each module owns its own data.

For example:

Employee information belongs in the Employee module.

Payroll information belongs in the Payroll module.

Attendance belongs in the Attendance module.

This keeps the system modular and maintainable.

---

# Core Database Tables

The following tables form the foundation of Nexora HRMS.

---

# Organizations

Purpose

Stores companies or institutions using Nexora.

Table

organizations

Columns

- id (UUID, Primary Key)
- name
- slug
- email
- phone
- logo_url
- industry
- country
- status
- created_at
- updated_at

Relationships

- One Organization has many Departments.
- One Organization has many Employees.
- One Organization has many Users.
- One Organization has many Roles.

---

# Organization Settings

Purpose

Stores organization-specific settings.

Table

organization_settings

Columns

- id
- organization_id
- timezone
- date_format
- theme_color
- created_at
- updated_at

Relationships

Belongs to one Organization.

---

# Profiles

Purpose

Extends Supabase Authentication.

Supabase manages authentication.

Nexora stores additional profile information here.

Table

profiles

Columns

- id
- organization_id
- auth_user_id
- employee_id (nullable)
- full_name
- avatar_url
- is_active
- created_at
- updated_at

Relationships

Belongs to one Organization.

May belong to one Employee.

---

# Departments

Purpose

Represents organizational departments.

Examples

- HR
- Finance
- IT
- Operations

Table

departments

Columns

- id
- organization_id
- name
- description
- manager_id
- created_at
- updated_at

Relationships

Belongs to one Organization.

Contains many Employees.

---

# Job Titles

Purpose

Stores available job positions.

Examples

- HR Officer
- Software Engineer
- Accountant

Table

job_titles

Columns

- id
- organization_id
- title
- level
- description
- created_at
- updated_at

Relationships

Belongs to one Organization.

Assigned to many Employees.

---

# Employees

Purpose

Stores employee records.

Table

employees

Columns

- id
- organization_id
- department_id
- job_title_id
- employee_number
- first_name
- last_name
- email
- phone
- gender
- date_of_birth
- hire_date
- employment_status
- manager_id
- created_at
- updated_at

Relationships

Belongs to one Organization.

Belongs to one Department.

Belongs to one Job Title.

May report to another Employee.

Notes

Salary information is intentionally excluded.

Payroll data belongs to the Payroll module.

Attendance information belongs to the Attendance module.

---

# Roles

Purpose

Defines user roles.

Examples

- Company Admin
- HR Manager
- Recruiter
- Payroll Officer
- Employee

Table

roles

Columns

- id
- organization_id
- name
- description
- created_at
- updated_at

Relationships

Belongs to one Organization.

Assigned to many Users.

---

# Permissions

Purpose

Defines system permissions.

Examples

- employee.view
- employee.create
- employee.update
- payroll.process
- leave.approve

Table

permissions

Columns

- id
- key
- description
- created_at
- updated_at

Relationships

Permissions are assigned to Roles.

Notes

Permissions are global.

Organizations do not create their own permissions.

---

# User Roles

Purpose

Assigns roles to users.

Table

user_roles

Columns

- id
- profile_id
- role_id
- created_at

Relationships

Links Profiles and Roles.

Supports multiple roles per user.

---

# Role Permissions

Purpose

Assigns permissions to roles.

Table

role_permissions

Columns

- id
- role_id
- permission_id
- created_at

Relationships

Links Roles and Permissions.

Supports many-to-many relationships.

---

# Database Relationship Summary

Organization

- Has many Departments
- Has many Employees
- Has many Profiles
- Has many Roles
- Has one Organization Settings

Department

- Has many Employees

Job Title

- Has many Employees

Employee

- May have one Profile
- May report to another Employee

Profile

- May belong to one Employee
- Has many Roles

Role

- Has many Permissions

Permission

- Can belong to many Roles

---

# Design Decisions

## Employees and Users are Separate

An Employee represents a person employed by the organization.

A Profile represents a user account used to access Nexora.

Not every Employee requires a login account.

---

## Authentication

Authentication is handled entirely by Supabase Authentication.

Passwords are never stored inside Nexora's database.

---

## Multi-Tenancy

Every business record belongs to one Organization.

This allows multiple companies to safely share the same Nexora application while keeping their data completely isolated.

---

# Future Tables

The following tables will be added in future development phases.

- attendance
- shifts
- leave_requests
- leave_types
- payroll
- payslips
- jobs
- candidates
- applications
- interviews
- assets
- documents
- performance_reviews
- training
- notifications
- announcements
- audit_logs

---

# Conclusion

This database design establishes the foundation of Nexora HRMS.

Future modules will extend this architecture while maintaining the same principles of modularity, security, scalability, and maintainability.