## Setup Instructions
Run *npm run dev* (or *pnpm dev*) to start the development server. 
Type in http://localhost:3000 to any browser to view the webapp.

## To run E2E tests (Playwright):
npm init -y <br /> 
npm install --save-dev @playwright/test <br /> 
npx playwright install <br /> 
npx playwright test --ui <br /> 

## Completed features:
![image](https://github.com/user-attachments/assets/8a24a4e7-3a7a-40b9-b568-4a57cfa61094)

- Equipment status breakdown (pie chart)
- Maintenance hours by department (bar chart)
- Recent maintenance activities
- Total Equipment
- Maintenance Hours
- Operational Rate
<br />

![image](https://github.com/user-attachments/assets/3418cee6-a164-4a10-987e-c65d33f97fb1)
![image](https://github.com/user-attachments/assets/169718db-68d5-471f-87d4-aca790696e92)

- Add new equipment / maintenance records with Zod validation
- View database tables with filtering and sorting
- Status-based row coloring
- Bulk status updates

## Endpoints
Equipment Endpoints:
- GET /api/equipment – Fetch all equipments (+ associated maintenance data)
- POST /api/equipment – Create a new equipment
- PUT /api/equipment/:id – Update an existing equipment's status by its ID


Maintenance Record Endpoints:
- GET /api/maintenance – Fetch all maintenance records with optional filters
- GET /api/maintenance?type=grouped – Fetch maintenance hours grouped by department
- GET /api/maintenance?dateRange=[24hours|week|month|3months|6months|year] – Fetch maintenance records filtered by date range
- GET /api/maintenance?equipmentType=[Machining|Assembly|Packaging|Shipping] – Fetch maintenance records filtered by equipment type
- POST /api/maintenance – Create a new maintenance record (with validation)

## Key libraries used:
- react
- react-dom
- next
- tailwindcss
- recharts
- react-hook-form
- zod
- @prisma/client
- @playwright/test
- typescript
- uuid

## Architecture decisions:
- Full-stack React (frontend) + Next.js + Prisma ORM (backend - SQLite database)
- Local state management with useState, form handling with react-hook-form, Zod for schema validation
- API Routes in Next.js for server-side data fetching and management
- Tailwind CSS for efficient styling with reusable components and color scheme
- Recharts for data visualization, TypeScript for type safety across codebase

## Known Issues/Limitations:
- Security - no authentication or access control implemented
- Bulk update creates alert popups for every row updated

## Future improvements:
- Generate a PDF maintenance report for selected equipment
- Include maintenance history
- Printing-friendly styling
- Cooler UI features eg spinners / loaders
- Integrate a global state manager like Redux Toolkit (better handling of bulk updates)
