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
  await page.getByRole('link', { name: 'Avatar Add Event' }).click({
    button: 'right'
  });
  await page.getByRole('link', { name: 'Avatar Add Event' }).click();
  await page.getByLabel('Event Name').click();
  await page.getByLabel('Event Name').fill('TALK SHOW');
  await page.getByLabel('Organizer').dblclick();
  await page.getByLabel('Organizer').fill('SUSTech dfdf');
  await page.getByLabel('Description').click();
  await page.getByLabel('Description').fill('hello dfdf');
  await page.getByLabel('Venue').click();
  await page.locator('div:nth-child(6) > .v-card > .v-responsive > .v-img__img').click();
  await page.locator('#input-18').click();
  await page.getByRole('button', { name: '28' }).click();
  await page.locator('#input-20').click();
  await page.getByRole('button', { name: '30' }).click();
  await page.getByLabel('Contact Number').click();
  await page.getByLabel('Contact Number').fill('2434344');
  await page.locator('div').filter({ hasText: /^Select category$/ }).nth(3).click();
  await page.getByRole('option', { name: 'Competition' }).click();
  await page.getByLabel('Select Event Thumbnail', { exact: true }).click();
  await page.getByLabel('Select Event Thumbnail', { exact: true }).setInputFiles('\\susevents-admin\\assets\\stadium.png');
  await page.getByPlaceholder('Enter capacity').click();
  await page.getByPlaceholder('Enter capacity').fill('100');
  await page.getByPlaceholder('Enter category').click();
  await page.getByPlaceholder('Enter category').fill('VIP');
  await page.getByPlaceholder('Enter price').click();
  await page.getByPlaceholder('Enter price').fill('100');
  await page.getByRole('button', { name: 'submit' }).click();
});