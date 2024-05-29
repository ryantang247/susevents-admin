import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://susevents-admin.vercel.app/');
  await page.locator('#input-0').click();
  await page.locator('#input-0').fill('12113050');
  await page.locator('#input-0').press('ControlOrMeta+a');
  await page.locator('#input-0').press('ControlOrMeta+c');
  await page.locator('#input-2').click();
  await page.locator('#input-2').fill('12113050');
  await page.getByRole('button', { name: 'Sign in' }).click();
});