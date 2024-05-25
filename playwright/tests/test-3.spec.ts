import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://susevents-admin.vercel.app/');
  await page.locator('#input-0').click();
  await page.locator('#input-0').fill('124');
  await page.locator('#input-2').click();
  await page.locator('#input-2').fill('124');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.goto('https://susevents-admin.vercel.app/');
  await page.goto('https://susevents-admin.vercel.app/user');
  await page.getByRole('link', { name: 'Events' }).click({
    button: 'right'
  });
  await page.getByRole('link', { name: 'Events' }).click();
  await page.getByRole('link', { name: 'Avatar Add Event' }).click();
  await page.getByLabel('Event Name').click();
  await page.getByLabel('Event Name').fill('dinner');
  await page.getByLabel('Event Name').press('ControlOrMeta+a');
  await page.getByLabel('Event Name').press('ControlOrMeta+c');
  await page.getByLabel('Organizer').click();
  await page.getByLabel('Organizer').fill('dinner');
  await page.getByLabel('Description').click();
  await page.getByLabel('Description').fill('dinner');
  await page.getByLabel('Venue').click();
  await page.getByRole('dialog').getByRole('img').first().click();
  await page.getByText('Start date').click({
    button: 'right'
  });
  await page.getByText('Start date').click();
  await page.locator('#input-18').click({
    button: 'right'
  });
  await page.locator('#input-18').click();
  await page.getByRole('button', { name: '29' }).click();
  await page.getByRole('button', { name: '31' }).click();
  await page.getByLabel('Contact Number').fill('123434');
  await page.locator('div').filter({ hasText: /^Select category$/ }).nth(3).click();
  await page.getByRole('option', { name: 'Fair' }).click();
  await page.getByLabel('Select Event Thumbnail', { exact: true }).click();
  await page.getByLabel('Select Event Thumbnail', { exact: true }).setInputFiles('event.png');
  await page.getByPlaceholder('Enter capacity').click();
  await page.getByPlaceholder('Enter capacity').fill('100');
  await page.getByPlaceholder('Enter category').click();
  await page.getByPlaceholder('Enter category').fill('hello');
  await page.getByPlaceholder('Enter price').click();
  await page.getByPlaceholder('Enter price').fill('100');
  await page.getByRole('button', { name: 'submit' }).click();
});