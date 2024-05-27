import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://susevents-admin.vercel.app/');
  await page.locator('#input-0').click();
  await page.locator('#input-0').fill('12113053');
  await page.locator('#input-2').click();
  await page.locator('#input-2').fill('11111111');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.locator('#input-0').click({
    clickCount: 3
  });
  await page.locator('#input-0').fill('124');
  await page.locator('#input-2').click({
    clickCount: 3
  });
  await page.locator('#input-2').fill('124');
  await page.getByRole('button', { name: 'Sign in' }).click();
});