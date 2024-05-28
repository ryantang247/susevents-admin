import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://susevents-admin.vercel.app/');
  await page.locator('#input-0').click();
  await page.locator('#input-0').fill('124');
  await page.locator('#input-2').click();
  await page.locator('#input-2').fill('124');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('link', { name: 'Notification' }).click();
  await page.getByLabel('Notification title').click();
  await page.getByLabel('Notification title').fill('Hello SE Project');
  await page.getByLabel('Description').click();
  await page.getByLabel('Description').fill('This is week 15. Enjoy....');
  await page.locator('div').filter({ hasText: /^Select category$/ }).nth(3).click();
  await page.getByRole('option', { name: 'All users' }).click();
  await page.getByRole('button', { name: 'submit' }).click();
  await page.getByRole('link', { name: 'Notification' }).click();
});