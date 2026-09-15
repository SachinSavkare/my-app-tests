import { test, expect } from '@playwright/test';

test('page test', async ({ page }) => {
  await page.goto('https://invalid.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  
  await expect(page).toHaveTitle(/Swag Labs/);
  await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
});

test('flow test', async ({ page }) => {
  await page.goto('https://invalid.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('1');
});
