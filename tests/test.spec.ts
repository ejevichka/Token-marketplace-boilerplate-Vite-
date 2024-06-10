// tests/search.spec.ts
import { test, expect } from '@playwright/test';

test('search functionality', async ({ page }) => {
  // Go to the app's URL
  await page.goto('http://localhost:5173');

  // Select the input field and type a query
  const searchInput = page.locator('[data-testid="search-input"]');
  await searchInput.fill('test');

  // Wait for the debounced search to trigger
  await page.waitForTimeout(800);

  // Check if loading state is displayed
  const loading = page.locator('[data-testid="loading"]');
  await expect(loading).toBeVisible();

  // Wait for the search results to load
  await page.waitForSelector('[data-testid="no-results"]', { state: 'detached' });

  // Check if results are displayed
  const results = page.locator('[data-testid="paginated-list"]'); // Adjust this selector based on your component
  await expect(results).toBeVisible();

  // Check pagination controls
  const nextButton = page.locator('button', { hasText: 'Next' });
  await expect(nextButton).toBeVisible();
});
