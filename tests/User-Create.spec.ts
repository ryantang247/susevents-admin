import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://susevents-admin.vercel.app/');
  await page.locator('#input-0').click();
  await page.locator('#input-0').click();
  await page.locator('#input-0').fill('124');
  await page.locator('#input-0').press('Tab');
  await page.locator('#input-2').fill('124');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.locator('.v-list-item__content > .v-btn').click();
  await page.getByLabel('Student ID').click();
  await page.getByLabel('Student ID').fill('12113055');
  await page.getByLabel('Name').click({
    button: 'right'
  });
  await page.getByLabel('Name').click();
  await page.getByLabel('Name').fill('sreyny');
  await page.getByLabel('Student ID').click();
  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill('12113053');
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('12113055@gmail.com');
  await page.getByLabel('User').check();
  await page.getByRole('button', { name: 'submit' }).click();
  await page.getByRole('link', { name: 'Users' }).click();
});