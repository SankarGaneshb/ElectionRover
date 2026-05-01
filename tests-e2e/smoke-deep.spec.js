import { test, expect } from '@playwright/test';

test('Deep Interactive Smoke Test - Feeling the User Pain', async ({ page }) => {
  test.setTimeout(90000); 
  
  await page.goto('http://localhost:5188/?lang=en');
  await page.waitForLoadState('networkidle');
  
  console.log('[SMOKE] Navigating to Voter Dashboard...');
  await page.click('text=General Elector');
  await page.waitForTimeout(2000);
  
  console.log('[SMOKE] Executing Protocol Phase 1...');
  await page.click('text=EXECUTE PROTOCOL');
  await page.waitForTimeout(2000);
  
  // 1. Consult Agent - Question 1
  console.log('[SMOKE] Consulting Agent: Question 1...');
  await page.click('text=CONSULT AGENT');
  const input = page.locator('input[type="text"]');
  await input.fill('Why Form 6A is needed for NRI?');
  await page.keyboard.press('Enter');
  
  // WAIT FOR REAL INDICATOR
  console.log('[SMOKE] Waiting for AI to start Analyzing...');
  const indicator = page.locator('text=ANALYZING PROTOCOL...');
  await expect(indicator).toBeVisible({ timeout: 10000 });
  
  console.log('[SMOKE] Waiting for AI to finish (Q1)...');
  await expect(indicator).toBeHidden({ timeout: 45000 });
  
  // 2. Give Feedback
  console.log('[SMOKE] Providing Sentiment Feedback (🤩)...');
  await page.screenshot({ path: 'smoke-feedback-debug.png' });
  const feedbackBtn = page.getByLabel('Feedback 🤩').first();
  await expect(feedbackBtn).toBeVisible({ timeout: 15000 });
  await feedbackBtn.click();
  await page.waitForTimeout(1000);
  
  // 3. Consult Agent - Question 2
  console.log('[SMOKE] Consulting Agent: Question 2 (Follow-up)...');
  await input.fill('What happens if I visit India?');
  await page.keyboard.press('Enter');
  
  await expect(indicator).toBeVisible({ timeout: 10000 });
  await expect(indicator).toBeHidden({ timeout: 45000 });
  
  const allBubbles = page.locator('div.bg-white\\/5');
  await expect(allBubbles).toHaveCount(2, { timeout: 15000 });
  
  // 4. Move to Next Step
  console.log('[SMOKE] Completing Phase 1 -> Moving to Phase 2...');
  const proceedBtn = page.locator('button:has-text("Proceed")').first();
  await expect(proceedBtn).toBeVisible({ timeout: 10000 });
  await proceedBtn.click();
  
  await page.waitForTimeout(3000);
  console.log('[SMOKE] Verifying Phase 2 Transition...');
  const phaseIndicator = page.locator('text=2 / 3');
  await expect(phaseIndicator).toBeVisible({ timeout: 15000 });
  
  console.log('[SMOKE] SUCCESS: Interactive flow completed flawlessly.');
});
