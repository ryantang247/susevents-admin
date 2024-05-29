import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://susevents-admin.vercel.app/');
  await page.locator('#input-0').click();
  await page.locator('#input-0').fill('124');
  await page.locator('#input-2').click();
  await page.locator('#input-2').fill('124');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('link', { name: 'Events' }).click();
  await page.getByRole('link', { name: 'Events' }).click();
  await page.getByRole('link', { name: 'Avatar Add Event' }).click();
  await page.locator('#input-18').click();
  await page.getByRole('button', { name: '28' }).click();
  await page.locator('#input-20').click();
  await page.getByRole('button', { name: '30' }).click();
});