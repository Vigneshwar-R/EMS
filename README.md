# EMS (Employee Management System)

Spring Boot + React application using PostgreSQL.

## Project Structure
```
EMS/
├── backend/            # Spring Boot (Java 21)
│   ├── pom.xml
│   └── src/
├── frontend/           # React + Vite
│   ├── package.json
│   └── src/
├── schema.sql          # PostgreSQL DDL + seed data
├── README.md
└── .gitignore
```

## Prerequisites
- Java 21 and Maven (or Maven Wrapper)
- Node.js 18+
- PostgreSQL running on localhost:5432


## API Endpoints
- POST /api/employees/
- GET  /api/employees/{id}
- GET  /api/employees/AllEmployees
- PUT  /api/employees/{id}
- DELETE /api/employees/{id}



