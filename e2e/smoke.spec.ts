import { test,expect } from '@playwright/test'
test('dashboard loads',async({page})=>{await page.goto('/');await expect(page.getByText('Your services, under watch.')).toBeVisible();await page.getByText('Monitors').first().click();await expect(page.getByText('Coverage map')).toBeVisible()})
