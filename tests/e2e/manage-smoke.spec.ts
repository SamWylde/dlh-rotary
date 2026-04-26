import { expect, test } from '@playwright/test'

const baseURL = 'http://localhost:3000'

test('public pages still load after manage dashboard is added', async ({ page }) => {
  await page.goto(`${baseURL}/`)
  await expect(page.locator('body')).toBeVisible()

  await page.goto(`${baseURL}/login`)
  await expect(page.getByRole('heading', { name: /member login/i })).toBeVisible()

  await page.goto(`${baseURL}/reset-password`)
  await expect(page.getByRole('heading', { name: /set your password/i })).toBeVisible()
})

test('unauthenticated visitors are redirected away from manage', async ({ page }) => {
  await page.goto(`${baseURL}/manage`)
  await expect(page).toHaveURL(/\/login/)
  await expect(page.getByRole('heading', { name: /member login/i })).toBeVisible()
})
