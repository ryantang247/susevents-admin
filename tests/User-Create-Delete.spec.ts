import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://susevents-admin.vercel.app/');
  await page.locator('#input-0').click();
  await page.locator('#input-0').fill('12113050');
  await page.locator('#input-0').press('ControlOrMeta+a');
  await page.locator('#input-0').press('ControlOrMeta+c');
  await page.locator('#input-2').dblclick();
  await page.locator('#input-2').fill('12113050');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.locator('.v-list-item__content > .v-btn').click();
  await page.getByLabel('Student ID').click();
  await page.getByLabel('Student ID').fill('12345678');
  await page.getByLabel('Student ID').press('ControlOrMeta+a');
  await page.getByLabel('Student ID').press('ControlOrMeta+c');
  await page.getByLabel('Name').click();
  await page.getByLabel('Name').fill('12345678');
  await page.getByLabel('Password', { exact: true }).click({
    modifiers: ['ControlOrMeta']
  });
  await page.getByLabel('Password', { exact: true }).fill('12345678');
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('12345678@gmail.com');
  await page.getByText('Admin', { exact: true }).click();
  await page.getByRole('button', { name: 'submit' }).click();
  await page.getByRole('link', { name: 'Users' }).click();
  await page.getByRole('row', { name: 'Avatar 12345678' }).getByRole('button').nth(1).click();
  await page.goto('https://susevents-admin.vercel.app/user');
});