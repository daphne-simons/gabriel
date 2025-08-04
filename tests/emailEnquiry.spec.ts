import { test, expect } from '@playwright/test';

test('User launches website and successfully fills out enquiry form', async ({ page }) => {
  // Navigate to Home page
  await page.goto('/');
  await expect(page).toHaveTitle(/Gabriel/);
  // click the search bar and click first item on nav
  await page.click('[data-testid="search-bar"]');
  await page.click('[data-testid="category-link"]');

  // Wait for navigation to search results and verify URL
  await page.waitForURL('/search-results?category=a%2520design%2520subscription&tier=Sapphire');
  await expect(page).toHaveURL('/search-results?category=a%2520design%2520subscription&tier=Sapphire');

  // Click additional elements on search results page
  await page.click('[data-testid="enquire-button"]');

  // Wait for navigation to enquiry page and verify URL with all parameters
  await page.waitForURL('/enquiry?category=a%2520design%2520subscription&gem=Sapphire&level=Essential&cost=2000-4000');
  await expect(page).toHaveURL('/enquiry?category=a%2520design%2520subscription&gem=Sapphire&level=Essential&cost=2000-4000');

  // Fill out the enquiry form
  await page.fill('[data-testid="name-input"]', 'Jane Playwright');
  await page.fill('[data-testid="email-input"]', 'jane@example.com');

  // Mock the email API call with a successful response 
  await page.route('**/api/send', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        messageId: 'test-enquiry-123',
        message: 'Enquiry sent successfully'
      })
    });
  });

  // Wait for the email API call when form is submitted
  const emailPromise = page.waitForResponse('**/api/send');

  // Submit the enquiry form
  await page.click('[data-testid="submit-enquiry-button"]');

  // Verify the email was sent
  const emailResponse = await emailPromise;
  expect(emailResponse.status()).toBe(200);

  // Check if redirected back to the home page 
  await expect(page).toHaveURL('/');

  // // Optional: Verify success state in UI (adjust selector based on your success message)
  // await expect(page.locator('[data-testid="success-message"]')).toBeVisible();

  // // Optional: Verify success message content
  // await expect(page.locator('[data-testid="success-message"]')).toContainText('enquiry sent');

});