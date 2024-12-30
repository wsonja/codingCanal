import { test, expect } from '@playwright/test';

test('should create new equipment with valid data', async ({ page }) => {
  await page.goto('/');
  await page.fill('input[name="name"]', 'Machine 1');
  await page.click('button:has-text("Submit")');
  expect(await page.locator('text=Machine 1')).toBeVisible();
});