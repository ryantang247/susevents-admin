import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  test.setTimeout(60000);
  await page.locator('html').click();
  await page.goto('https://susevents-admin.vercel.app/');
  await page.locator('#input-0').click();
  await page.locator('#input-0').fill('124');
  await page.locator('#input-2').click();
  await page.locator('#input-2').fill('124');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.goto('https://susevents-admin.vercel.app/');
  await page.goto('https://susevents-admin.vercel.app/venue');
  await page.getByRole('link', { name: 'Venues' }).click();
  await page.getByRole('button').nth(1).click();
  await page.goto('https://susevents-admin.vercel.app/venue');
});