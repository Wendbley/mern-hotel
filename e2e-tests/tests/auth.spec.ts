import { test, expect } from '@playwright/test'
const API_URL = 'http://localhost:5173'

test('allow the user to login ', async ({ page }) => {
	await page.goto(API_URL)

	await page.getByRole('link', { name: 'Login' }).click()
	await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible()

	await page.getByRole('textbox', { name: 'Email' }).fill('a@b.com')
	await page.getByRole('textbox', { name: 'Password' }).fill('123456')
	await page.getByRole('button', { name: 'Login' }).click()

	// once user llged in, it should show a success message.
	await expect(page.getByText('User logged in successfully')).toBeVisible()
  await expect(page.getByRole('link', {name: 'My Bookings'})).toBeVisible()
  await expect(page.getByRole('link', {name: 'My Hotels'})).toBeVisible()
  await expect(page.getByRole('button', {name: 'Log out'})).toBeVisible()
})

test('get started link', async ({ page }) => {
	await page.goto('https://playwright.dev/')

	// Click the get started link.
	await page.getByRole('link', { name: 'Get started' }).click()

	// Expects page to have a heading with the name of Installation.
	await expect(
		page.getByRole('heading', { name: 'Installation' })
	).toBeVisible()
})
