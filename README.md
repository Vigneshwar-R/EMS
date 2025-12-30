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

## Database Setup
- Create database and load schema:
```powershell
psql -U postgres -h localhost -p 5432 -c "CREATE DATABASE ems;"
psql -U postgres -h localhost -d ems -f "c:\Users\cuber\OneDrive\Documents\VSCode Projects\EMS\schema.sql"
```
- Set password for backend:
```powershell
setx DB_PASSWORD "root"
```

## Backend
- Configuration: backend/src/main/resources/application.properties
  - jdbc:postgresql://localhost:5432/ems
  - Hibernate dialect: PostgreSQLDialect
- Run:
```powershell
cd "c:\Users\cuber\OneDrive\Documents\VSCode Projects\EMS\backend"
.\mvnw.cmd spring-boot:run
```

## Frontend
- Install and run:
```powershell
cd "c:\Users\cuber\OneDrive\Documents\VSCode Projects\EMS\frontend"
npm install
npm run dev
```

## API Endpoints
- POST /api/employees/
- GET  /api/employees/{id}
- GET  /api/employees/AllEmployees
- PUT  /api/employees/{id}
- DELETE /api/employees/{id}

## Troubleshooting
- If backend sources show red, ensure packages are `ems.*` and files are under `src/main/java/ems`.
- Verify PostgreSQL credentials and that DB_PASSWORD is set.
- Rebuild backend: `.\mvnw.cmd clean compile`.

