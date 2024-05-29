import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://susevents-admin.vercel.app/');
  await page.locator('#input-0').click();
  await page.locator('#input-0').fill('124');
  await page.locator('#input-2').click();
  await page.locator('#input-2').fill('124');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('link', { name: 'Customer Services' }).click();
  await page.locator('div:nth-child(4) > .ce-chat-card').click();
  await page.getByPlaceholder('Write a message...').click();
  await page.getByPlaceholder('Write a message...').fill('Hi, welcome to sus ticket web');
  await page.getByRole('button', { name: 'caret-up' }).click();
});