import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://susevents-admin.vercel.app/');
  await page.locator('#input-0').click();
  await page.locator('div').filter({ hasText: /^Student ID$/ }).click();
  await page.locator('#input-0').fill('124');
  await page.locator('#input-2').dblclick();
  await page.locator('#input-2').fill('124');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('row', { name: 'Avatar Marieta' }).getByRole('button').first().click();
  await page.getByLabel('Name').dblclick();
  await page.getByLabel('Name').fill('Hello');
  await page.getByRole('button', { name: 'submit' }).click();
  await page.goto('https://susevents-admin.vercel.app/user');
});