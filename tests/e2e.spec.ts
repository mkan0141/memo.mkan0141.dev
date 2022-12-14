import { test, expect } from '@playwright/test';

test('should navigate top page to sample entry', async ({ page }) => {
  await page.goto('/');
  await page.click('text=サンプルのタイトルです');
  await expect(page).toHaveURL('/entry/sample');
  await expect(page.locator('h1')).toContainText('サンプルのタイトルです');
});
