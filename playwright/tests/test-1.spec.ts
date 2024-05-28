import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://susevents-admin.vercel.app/');
  await page.locator('#input-0').click();
  await page.locator('#input-0').fill('124');
  await page.locator('#input-2').click();
  await page.locator('#input-2').fill('124');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('link', { name: 'Events' }).click();
  await page.getByRole('link', { name: 'Avatar Add Event' }).click();
  await page.getByLabel('Event Name').click();
  await page.getByLabel('Event Name').fill('tennis ');
  await page.getByLabel('Event Name').click();
  await page.getByLabel('Event Name').fill('tennis Exam');
  await page.getByLabel('Organizer').click();
  await page.getByLabel('Organizer').fill('Sport');
  await page.getByLabel('Description').click();
  await page.getByLabel('Description').fill('tennis');
  await page.getByLabel('Venue').click();
  await page.getByRole('dialog').getByRole('img').first().click({
    button: 'right'
  });
  await page.locator('div:nth-child(2) > .v-img__img').first().click();
  await page.locator('#input-18').click({
    button: 'right'
  });
  await page.locator('#input-18').click();
  await page.getByRole('button', { name: '27' }).click();
  await page.getByText('SMTWTFS12345678910111213141516171819202122232425262728293031').click({
    button: 'right'
  });
  await page.getByRole('button', { name: '15' }).click();
  await page.getByLabel('Contact Number').fill('1504343434343');
  await page.locator('div').filter({ hasText: /^Select category$/ }).nth(3).click();
  await page.getByRole('option', { name: 'Competition' }).click();
  await page.getByLabel('Select Event Thumbnail', { exact: true }).click();
  await page.getByLabel('Select Event Thumbnail', { exact: true }).setInputFiles('\\susevents-admin\\assets\\stadium.png');
  await page.getByPlaceholder('Enter capacity').click();
  await page.getByPlaceholder('Enter capacity').fill('50');
  await page.getByPlaceholder('Enter category').click();
  await page.getByPlaceholder('Enter category').fill('hello');
  await page.getByPlaceholder('Enter price').click();
  await page.getByPlaceholder('Enter price').fill('100');
  await page.getByRole('button', { name: 'submit' }).click();
  await page.goto('https://susevents-admin.vercel.app/events');
});