## Setup Instructions
**To set up the webapp:**

    cd maintenance-tracker
    npm install
    npx prisma migrate dev --name init
    node prisma/seed.mjs
    npm run dev
    
Type http://localhost:3000 into any browser to view the webapp.

## Testing strategy
**To run E2E tests (Playwright):**

    npm init -y
    npm install --save-dev @playwright/test 
    npx playwright install
    npx playwright test --ui

**Equipment Management:**

- Create New Equipment: Verifies that equipment can be added with valid data to ensure core functionality works as expected.
- Validation Errors for Invalid Equipment: Ensures proper error messages appear when invalid data (like short names) is submitted, maintaining data integrity.
- Edit Existing Equipment: Confirms the ability to modify equipment details, critical for keeping records updated.
- Filter Equipment Table: Tests the status filter dropdown to ensure users can filter records based on equipment status, improving UX.


**Maintenance Record Management:**

- Create New Maintenance Record: Confirms the ability to add a maintenance record successfully.
- Validation Errors (Hours Spent): Ensures error messages appear when entering invalid maintenance hours (e.g., over 24 hours or negative values).
- Display Equipment Name in Table: Checks that the equipment name is properly displayed in the maintenance table based on the equipment ID.
- Filter Maintenance Records: Validates that filtering maintenance records by date range works correctly to ensure data visibility and filter reliability.

On top of Playwright, **Postman** was used for manual API testing
- Verified successful data creation, updates, and retrieval.
- Tested error handling for invalid inputs, such as empty fields and invalid date ranges.
- Confirmed bulk updates and filters worked as expected.

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
**Equipment Endpoints:**
- GET /api/equipment – Fetch all equipments (+ associated maintenance data)
- POST /api/equipment – Create a new equipment
- PUT /api/equipment/:id – Update an existing equipment's status by its ID

**Maintenance Record Endpoints:**
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
