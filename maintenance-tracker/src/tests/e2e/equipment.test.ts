import { test, expect } from '@playwright/test';

// Equipment Management Tests
test.describe('Equipment Management Tests', () => {
  test('should create new equipment with valid data and expect a popup', async ({ page }) => {
    await page.goto('/equipment/new');

    await page.fill('input[name="name"]', 'Excavator X300');
    await page.fill('input[name="location"]', 'Warehouse A');
    await page.fill('input[name="model"]', 'X300');
    await page.fill('input[name="serialNumber"]', '123-456-789');

    await page.click('button:has-text("Submit")');

    const popup = await page.waitForEvent('dialog');
    expect(popup.message()).toContain('Equipment added successfully');
    await popup.dismiss();
  });

  test('should show validation error for short equipment name', async ({ page }) => {
    await page.goto('/equipment/new');
    await page.fill('input[name="name"]', 'X');
    await expect(page.getByText('Name must be at least 3 characters long')).toBeVisible();
  });

  test('should be able to edit equipment status', async ({ page }) => {
    await page.goto('/equipment');
    const dialogPromise = page.waitForEvent('dialog');
    await page.selectOption('tbody tr:first-child select', 'Maintenance');

    const dialog = await dialogPromise;
    expect(dialog.message()).toContain('Status successfully updated to: Maintenance');
    await dialog.dismiss(); 
  });

  test('should filter equipment table by status and verify all rows match selected status', async ({ page }) => {
    await page.goto('/equipment');
    await page.selectOption('select#statusFilter', 'Operational');

    await page.waitForTimeout(1000); 

    const statusCells = await page.locator('tbody tr td:nth-child(5)').allTextContents(); // Assuming 5th column is the status column

    for (const status of statusCells) {
        expect(status).toBe('Operational');
    }
  });
});

// Maintenance Record Tests
test.describe('Maintenance Record Tests', () => {
  test('should create a new maintenance record and expect a confirmation popup', async ({ page }) => {
        await page.goto('/maintenance/new');
        await page.fill('input[name="equipmentId"]', '1'); 
        await page.fill('input[name="date"]', '2024-01-10');
        await page.fill('input[name="technician"]', 'John Doe');
        await page.fill('input[name="hoursSpent"]', '5');
        await page.fill('textarea[name="description"]', 'Replaced hydraulic filter and inspected the engine');
        await page.fill('input[name="partsReplaced"]', 'Hydraulic Filter, Engine Gasket');

        const dialogPromise = page.waitForEvent('dialog');
        await page.click('button:has-text("Submit")');

        const dialog = await dialogPromise;
        expect(dialog.message()).toContain('Maintenance record added successfully!');
        await dialog.dismiss(); 
    });

    test('should show error when hoursSpent exceeds 24', async ({ page }) => {
      await page.goto('/maintenance/new');
      await page.fill('input[name="hoursSpent"]', '25');
      await page.click('body');
      await expect(page.getByText('Hours spent must be a positive number and cannot exceed 24')).toBeVisible();
  });

  test('should show equipment name in maintenance table', async ({ page }) => {
    await page.goto('/maintenance');
    await expect(page.getByText('Equipment Name')).toBeVisible();
  });

  test('should filter maintenance records by date range', async ({ page }) => {
    await page.goto('/maintenance');
    await page.selectOption('select[name="dateRange"]', 'week');  
    await page.waitForTimeout(1000); 

    const today = new Date();
    const lastWeekStart = new Date();
    lastWeekStart.setDate(today.getDate() - 7);
    const startTimestamp = lastWeekStart.getTime();
    const endTimestamp = today.getTime();
    const dateText = await page.locator('tbody tr:first-child td:nth-of-type(1)').textContent();
    expect(dateText).not.toBeNull(); 
    const rowDate = new Date(dateText!); 
    const rowTimestamp = rowDate.getTime();
    
    expect(rowTimestamp).toBeGreaterThanOrEqual(startTimestamp);
    expect(rowTimestamp).toBeLessThanOrEqual(endTimestamp);
  });
});
