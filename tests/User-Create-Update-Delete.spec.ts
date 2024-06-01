import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://susevents-admin.vercel.app/');
  await page.locator('#input-0').click();
  await page.locator('#input-0').fill('12111428');
  await page.locator('#input-0').press('ControlOrMeta+a');
  await page.locator('#input-0').press('ControlOrMeta+c');
  await page.locator('#input-2').click({
    modifiers: ['ControlOrMeta']
  });
  await page.locator('#input-2').fill('12111428');
  await page.locator('#input-0').dblclick();
  await page.locator('#input-0').fill('12111428');
  await page.locator('#input-0').press('ControlOrMeta+a');
  await page.locator('#input-0').press('ControlOrMeta+c');
  await page.locator('#input-2').dblclick();
  await page.locator('#input-2').fill('12111428');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.locator('.v-list-item__content > .v-btn').click();
  await page.getByLabel('Student ID').click();
  await page.getByLabel('Student ID').fill('12111010');
  await page.getByLabel('Student ID').press('ControlOrMeta+a');
  await page.getByLabel('Student ID').press('ControlOrMeta+c');
  await page.getByLabel('Name').click({
    modifiers: ['ControlOrMeta']
  });
  await page.getByLabel('Name').fill('12111010');
  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill('12111010');
  await page.getByLabel('Email').fill('12111010');
  await page.getByLabel('Email').click({
    modifiers: ['ControlOrMeta']
  });
  await page.getByLabel('Email').fill('12111010@gmail.com');
  await page.getByLabel('Admin').check();
  await page.getByRole('button', { name: 'submit' }).click();
  await page.locator('#notification_1 div').filter({ hasText: 'SuccessSuccess in creating' }).getByRole('img').click();
  await page.getByRole('link', { name: 'Users' }).click();
  await page.getByRole('row', { name: 'Avatar 12111010' }).getByRole('button').first().click({
    button: 'right'
  });
  await page.getByRole('row', { name: 'Avatar 12111010' }).getByRole('button').first().click();
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').click({
    button: 'right'
  });
  await page.getByLabel('Email').dblclick({
    button: 'right'
  });
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').press('ArrowLeft');
  await page.getByLabel('Email').press('ArrowLeft');
  await page.getByLabel('Email').press('ArrowLeft');
  await page.getByLabel('Email').press('ArrowLeft');
  await page.getByLabel('Email').press('ArrowLeft');
  await page.getByLabel('Email').press('ArrowLeft');
  await page.getByLabel('Email').press('ArrowLeft');
  await page.getByLabel('Email').press('ArrowLeft');
  await page.getByLabel('Email').press('ArrowLeft');
  await page.getByLabel('Email').press('ArrowLeft');
  await page.getByLabel('Email').press('ArrowLeft');
  await page.getByLabel('Email').press('ArrowLeft');
  await page.getByLabel('Email').press('ArrowLeft');
  await page.getByLabel('Email').fill('010@gmail.com');
  await page.getByRole('button', { name: 'submit' }).click();
  await page.goto('https://susevents-admin.vercel.app/user');
  await page.getByRole('row', { name: 'Avatar 12111010' }).getByRole('button').nth(1).click();
  await page.locator('#notification_1 div').filter({ hasText: 'Success!User successfully' }).getByRole('img').click();
  await page.goto('https://susevents-admin.vercel.app/user');

});