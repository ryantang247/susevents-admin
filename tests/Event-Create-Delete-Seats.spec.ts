import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://susevents-admin.vercel.app/');
  await page.locator('#input-0').click();
  await page.locator('#input-0').fill('12111428');
  await page.locator('#input-2').click();
  await page.locator('#input-2').fill('12111428');
  await page.getByRole('button', { name: 'Sign in' }).click();
  
  await page.getByRole('link', { name: 'Events' }).click();
  await page.getByRole('link', { name: 'Avatar Add Event' }).click();
  await page.goto('https://susevents-admin.vercel.app/events/addevent');await page.getByLabel('Event Name').click();
  await page.getByLabel('Event Name').fill('Z Testing event with price!');
  await page.getByLabel('Organizer').click();
  await page.getByLabel('Organizer').fill('Me');
  await page.getByLabel('Description').click();
  await page.getByLabel('Description').fill('Another cool event');
  await page.getByLabel('Venue').click();
  await page.getByText('Zhicheng Acitivity Room', { exact: true }).click();
  await page.locator('#input-18').click();
  await page.getByText('13').click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#input-20').click();
  await page.getByText('15').click();
  await page.getByRole('button', { name: 'Close' }).click();

  await page.getByLabel('Contact Number').fill('123');
  await page.locator('div').filter({ hasText: /^Select category$/ }).nth(1).click();
  await page.getByRole('option', { name: 'Competition' }).click();
  await page.getByLabel('Select Event Thumbnail', { exact: true }).setInputFiles('./assets/singing.jpg');await page.getByLabel('Enable Seating Mechanism').check();
  await page.frameLocator('iframe[title="seating chart"]').locator('div').filter({ hasText: /^Without sectionsBest suited for venues accommodating less than 1,000 people\.$/ }).first().click();
  await page.frameLocator('iframe[title="seating chart"]').getByRole('button', { name: ' Skip' }).click();
await page.frameLocator('iframe[title="seating chart"]').getByText('Welcome to').click();
await page.frameLocator('iframe[title="seating chart"]').getByText('Chart Designer').click();
await page.waitForTimeout(3000); // Adds a delay of 5000 milliseconds (5 seconds)
await page.frameLocator('iframe[title="seating chart"]').getByRole('button', { name: ' Skip' }).click();

await page.frameLocator('iframe[title="seating chart"]').getByRole('button', { name: ' Row tool r' }).first().click();
await page.frameLocator('iframe[title="seating chart"]').getByRole('button', { name: ' Row tool r' }).first().click();
await page.frameLocator('iframe[title="seating chart"]').getByRole('button', { name: ' Row tool r' }).nth(1).click();

await page.frameLocator('iframe[title="seating chart"]').getByRole('img').click();
await page.frameLocator('iframe[title="seating chart"]').getByRole('img').click();
await page.frameLocator('iframe[title="seating chart"]').getByRole('button', { name: ' Select tool v' }).click();
await page.frameLocator('iframe[title="seating chart"]').getByRole('img').click();

await page.frameLocator('iframe[title="seating chart"]').getByRole('button', { name: ' Manage' }).click();
await page.frameLocator('iframe[title="seating chart"]').locator('div').filter({ hasText: /^Create new category$/ }).nth(2).click();
await page.frameLocator('iframe[title="seating chart"]').getByRole('textbox', { name: 'Key:' }).fill('1');

await page.frameLocator('iframe[title="seating chart"]').getByRole('img').click();
await page.frameLocator('iframe[title="seating chart"]').getByTitle('No category assigned').locator('div').first().click();
await page.frameLocator('iframe[title="seating chart"]').locator('#panel-right').getByTitle('Key:').click();
await page.frameLocator('iframe[title="seating chart"]').locator('#Label').click();
await page.frameLocator('iframe[title="seating chart"]').locator('#Label').fill('1');
await page.frameLocator('iframe[title="seating chart"]').getByText('Labels', { exact: true }).click();
await page.frameLocator('iframe[title="seating chart"]').getByRole('combobox').click()
await page.frameLocator('iframe[title="seating chart"]').getByRole('combobox').selectOption('1, 2, 3, ...');

// await page.frameLocator('iframe[title="seating chart"]').getByText('1Created with Raphaël')

await page.frameLocator('iframe[title="seating chart"]').getByText('1Created with Raphaël').click();
await page.waitForTimeout(1500);
await page.frameLocator('iframe[title="seating chart"]').getByText('1Created with Raphaël').click();
await page.waitForTimeout(1000);
await page.getByRole('button', { name: 'Save' }).click();
await page.waitForTimeout(1500);
await page.getByLabel('1').click();
await page.getByLabel('1').fill('23');
await page.getByRole('button', { name: 'submit' }).click();
await page.getByText('Sucessfully created event!').click();
await page.locator('#notification_3 div').filter({ hasText: 'SuccessSucessfully created' }).getByRole('img').click();
await page.waitForTimeout(1000);
const index = 2; // Replace with the actual index value
await page.getByText('Name: Z Testing event with price!Another cool event').hover()
await page.waitForTimeout(2000);
await page.locator(`#delete`).click();
await page.waitForTimeout(2000);
await page.getByText('Sucess deleting event.').click();
await page.locator('#notification_4 div').filter({ hasText: 'SuccessSucess deleting event.' }).locator('path').click();


});