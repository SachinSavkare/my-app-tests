import { test, expect } from '@playwright/test';

test('page test', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  await expect(page).toHaveTitle(/Toolshop/);
  await expect(page.locator('.card')).toHaveCount(9);
});

test('flow test', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  await page.locator('[data-test="search-query"]').fill('pliers');
  await page.locator('[data-test="search-submit"]').click();
  await page.locator('.card', { hasText: 'Combination Pliers' }).click();
  await page.locator('[data-test="add-to-cart"]').click();
  await expect(page.locator('[data-test="nav-cart"]')).toContainText('1');
});

test('API test', async ({ request }) => {
  const response = await request.get('https://api.practicesoftwaretesting.com/products');
  expect(response.status()).toBe(200);
  
  const body = await response.json();
  expect(body.total).toBe(50);
  expect(body.data).toHaveLength(9);
  
  for (const product of body.data) {
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('price');
  }
});
