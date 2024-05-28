import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  test.setTimeout(60000);
  await page.goto('https://susevents-admin.vercel.app/');
  await page.locator('#input-0').click();
  await page.locator('#input-0').fill('124');
  await page.locator('#input-2').click();
  await page.locator('#input-2').fill('124');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('link', { name: 'Venues' }).click();
  await page.getByRole('link', { name: 'Add Venue' }).click();
  await page.getByLabel('Name').click();
  await page.getByLabel('Name').fill('sustech pool party');
  await page.getByLabel('Name').press('ControlOrMeta+a');
  await page.getByLabel('Name').press('ControlOrMeta+x');
  await page.getByLabel('Name').press('ControlOrMeta+z');
  await page.getByLabel('Name').press('ControlOrMeta+c');
  await page.getByLabel('Description').click();
  await page.getByLabel('Description').fill('sustech pool');
  await page.locator('#xcoord').click();
  await page.getByRole('img').first().click();
  await page.locator('canvas').click({
    position: {
      x: 515,
      y: 179
    }
  });
  await page.getByLabel('Select Thumbnail', { exact: true }).click();
  await page.getByLabel('Select Thumbnail', { exact: true }).setInputFiles('\\susevents-admin\\assets\\stadium.png');
  await page.getByRole('button', { name: 'submit' }).click();
});