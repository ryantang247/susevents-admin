import { test, expect } from '@playwright/test';

test('Add comment', async ({ page }) => {
  await page.goto('https://susticket-main.vercel.app/');
  await page.goto('https://susticket-main.vercel.app/events/66082f64-6683-495c-8fe7-f5bb94145676');
  await page.goto('https://susticket-main.vercel.app/events/giveComment/66082f64-6683-495c-8fe7-f5bb94145676');
  await page.goto('https://susticket-main.vercel.app/events/66082f64-6683-495c-8fe7-f5bb94145676');
  await page.goto('https://susticket-main.vercel.app/events/giveComment/66082f64-6683-495c-8fe7-f5bb94145676');
  await page.goto('https://susticket-main.vercel.app/events/66082f64-6683-495c-8fe7-f5bb94145676');
});