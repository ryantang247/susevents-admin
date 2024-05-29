import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  test.setTimeout(60000);
  await page.goto('https://susevents-admin.vercel.app/');
  await page.locator('#input-0').click();
  await page.locator('#input-0').fill('124');
  await page.locator('#input-2').click();
  await page.locator('#input-2').fill('124');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('link', { name: 'Events' }).click();
  await page.getByRole('button').nth(2).click();
  await page.getByLabel('Event Name').click();
  await page.getByLabel('Event Name').fill('Sleeping Competition');
  await page.getByLabel('Description').click({
    clickCount: 3
  });
  await page.getByLabel('Description').fill('Amazing');
  await page.getByRole('button', { name: 'submit' }).click();
  await page.getByRole('link', { name: 'Events' }).click();
});