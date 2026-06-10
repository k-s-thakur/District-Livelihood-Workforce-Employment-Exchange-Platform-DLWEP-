# Technical Specification

# District Livelihood Workforce & Employment Exchange Platform (DLWEP)

Version: 1.0

---

# 1. System Architecture

## Architecture Style

Modular Monolith

Reason:

* Faster development
* Lower operational complexity
* Easier maintenance
* Suitable for one district to multi-district growth
* Can later evolve into microservices

---

## High-Level Architecture

┌─────────────────────────┐
│         Users           │
├─────────────────────────┤
│ Citizens               │
│ Workers                │
│ Contractors            │
│ Students               │
│ College Staff          │
└──────────┬──────────────┘
│
▼

┌─────────────────────────┐
│      Next.js PWA        │
│   (Frontend Layer)      │
└──────────┬──────────────┘
│
▼

┌─────────────────────────┐
│      API Layer          │
│    Supabase APIs        │
└──────────┬──────────────┘
│
▼

┌─────────────────────────────────┐
│ Business Modules                │
├─────────────────────────────────┤
│ Authentication                  │
│ Worker Management               │
│ Skill Management                │
│ Service Marketplace             │
│ Matching Engine                 │
│ Contractor Hiring               │
│ Training Management             │
│ Certification                   │
│ Ratings & Trust Engine          │
│ Reporting & Analytics           │
└──────────┬──────────────────────┘
│
▼

┌─────────────────────────┐
│ PostgreSQL Database     │
└─────────────────────────┘

---

# 2. Technology Stack

## Frontend

Framework:

* Next.js 15

Language:

* TypeScript

UI:

* Tailwind CSS
* shadcn/ui

State Management:

* Zustand

Forms:

* React Hook Form
* Zod

Maps:

* OpenStreetMap
* Leaflet

PWA:

* next-pwa

---

## Backend

Platform:

* Supabase

Services:

* Authentication
* Database
* Storage
* Edge Functions
* Realtime

---

## Database

PostgreSQL

Features:

* Row Level Security
* Indexing
* Views
* Functions

---

## Storage

Supabase Storage

Used For:

* Profile Photos
* Certificates
* Documents

---

## Hosting

Frontend:

* Vercel

Backend:

* Supabase

---

# 3. Core Domains

1. User Domain
2. Worker Domain
3. Skill Domain
4. Service Request Domain
5. Job Domain
6. Rating Domain
7. Contractor Domain
8. Training Domain
9. Certificate Domain
10. Analytics Domain

---

# 4. Data Models

## Users

id (uuid)
name
email
mobile
role
created_at

Role:

* citizen
* worker
* contractor
* student
* staff

---

## Workers

id
user_id
photo_url
district
block
village
experience_years
availability_status
trust_score
rating_average

---

## Skills

id
name
category

Examples:

Electrician
Plumber
Driver
Welder
Tailor

---

## WorkerSkills

id
worker_id
skill_id
is_primary

Many-to-many relationship

---

## ServiceRequests

id
customer_id
service_category
description
location
latitude
longitude
status
created_at

Status:

* created
* matched
* worker_selected
* completed
* auto_closed

---

## ServiceRequestWorkers

id
request_id
worker_id
status

Status:

* sent
* accepted
* declined
* expired

---

## Jobs

id
request_id
worker_id
customer_id
status
started_at
completed_at

Status:

* assigned
* in_progress
* completed
* auto_closed

---

## Ratings

id
job_id
worker_id
customer_id
rating
review

---

## Contractors

id
user_id
company_name
address

---

## JobRequirements

id
contractor_id
title
description
location
required_workers
status

---

## Applications

id
job_requirement_id
worker_id
status

---

## Courses

id
title
description
duration
start_date
end_date
seats

---

## Batches

id
course_id
name
capacity
start_date
end_date

---

## Enrollments

id
student_id
batch_id
status

Status:

* pending
* approved
* rejected
* completed

---

## Certificates

id
student_id
course_id
certificate_url
issued_at

---

# 5. API Specification

Base URL

/api/v1

---

Authentication

POST /auth/register

POST /auth/login

POST /auth/logout

POST /auth/reset-password

---

Worker APIs

GET /workers

GET /workers/{id}

POST /workers

PUT /workers/{id}

DELETE /workers/{id}

PATCH /workers/availability

---

Skill APIs

GET /skills

POST /skills

GET /skills/{id}

---

Worker Skill APIs

POST /worker-skills

DELETE /worker-skills/{id}

---

Service Request APIs

POST /service-requests

GET /service-requests

GET /service-requests/{id}

PATCH /service-requests/{id}

---

Matching APIs

POST /matching/run/{requestId}

GET /matching/{requestId}

---

Job APIs

POST /jobs

GET /jobs/{id}

PATCH /jobs/{id}/complete

PATCH /jobs/{id}/close

---

Rating APIs

POST /ratings

GET /ratings/worker/{id}

---

Contractor APIs

POST /contractors

GET /contractors

---

Job Requirement APIs

POST /requirements

GET /requirements

GET /requirements/{id}

PATCH /requirements/{id}

---

Application APIs

POST /applications

GET /applications

PATCH /applications/{id}

---

Course APIs

POST /courses

GET /courses

PUT /courses/{id}

DELETE /courses/{id}

---

Batch APIs

POST /batches

GET /batches

PATCH /batches/{id}

---

Enrollment APIs

POST /enrollments

GET /enrollments

PATCH /enrollments/{id}

---

Certificate APIs

POST /certificates

GET /certificates

GET /certificates/{id}

---

Analytics APIs

GET /analytics/employment

GET /analytics/training

GET /analytics/geography

GET /analytics/dashboard

---

# 6. Matching Engine Logic

Worker Score Formula

score =
(skill_match × 40)
+
(distance_score × 25)
+
(trust_score × 15)
+
(rating_score × 10)
+
(jobs_completed × 10)

Top workers receive requests first.

---

# 7. Trust Engine

Trust Score Components

Mobile Verified
+10

Livelihood Certified
+40

Completed Jobs
+2 each

5 Star Review
+3

Repeat Customer
+5

Complaint
-10

No Show
-15

---

# 8. Security Requirements

Authentication:

* Supabase Auth

Authorization:

* Row Level Security

Security Features:

* Password Hashing
* JWT Authentication
* HTTPS
* Rate Limiting
* Input Validation
* Audit Logs

---

# 9. Development Phases

PHASE 1
Marketplace MVP

Duration:
3–4 Weeks

Features:

* Authentication
* Worker Profiles
* Skills
* Service Requests
* Matching Engine
* Ratings

Deliverable:
First job successfully completed

---

PHASE 2
Contractor Hiring

Duration:
2–3 Weeks

Features:

* Contractor Profiles
* Bulk Hiring
* Applications

Deliverable:
First contractor hiring completed

---

PHASE 3
Training Management

Duration:
2–3 Weeks

Features:

* Courses
* Batches
* Enrollments
* Certificates

Deliverable:
First training batch managed

---

PHASE 4
Analytics & Reporting

Duration:
1–2 Weeks

Features:

* Employment Dashboard
* Training Dashboard
* Geographic Analytics

Deliverable:
Government reporting dashboard

---

PHASE 5
Multi-District Expansion

Duration:
2 Weeks

Features:

* Multi-district support
* Advanced search
* Performance optimization

Deliverable:
Production-ready multi-district deployment

---

# 10. Final Deliverables

## Product Deliverables

1. Progressive Web App
2. Worker Marketplace
3. Contractor Hiring System
4. Training Management System
5. Certificate Management
6. Employment Tracking
7. Government Dashboard

---

## Technical Deliverables

1. Database Schema
2. API Documentation
3. ER Diagram
4. System Architecture Diagram
5. Deployment Guide
6. Admin Guide
7. User Guide

---

## Success Criteria

The platform is considered successful when:

* Workers receive real jobs
* Contractors hire through the platform
* Training outcomes are measurable
* Employment reports are automatically generated
* The system operates with near-zero administrative effort
