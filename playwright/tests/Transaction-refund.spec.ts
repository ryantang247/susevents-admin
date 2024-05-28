import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://susevents-admin.vercel.app/');
  await page.locator('#input-0').click();
  await page.locator('#input-0').fill('124');
  await page.locator('#input-2').click();
  await page.locator('#input-2').fill('124');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('link', { name: 'Transaction History' }).click();
  await page.getByRole('row', { name: '24/05/24 Purchase 40 Refund' }).getByRole('button').click();
  const confirmationMessage = await page.locator('text=Refunded successfully').isVisible();
  await page.goto('https://susevents-admin.vercel.app/transaction');
});