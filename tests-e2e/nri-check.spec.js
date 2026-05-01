import { test, expect } from '@playwright/test';

test('NRI Registration - Form 6A Stability Check', async ({ page }) => {
  await page.goto('http://localhost:5188/?lang=en');
  await page.waitForLoadState('networkidle');
  
  // Click "General Elector" card
  const voterCard = page.locator('text=General Elector').first();
  await expect(voterCard).toBeVisible({ timeout: 15000 });
  await voterCard.click();
  
  await page.waitForTimeout(2000);
  
  // Click "EXECUTE PROTOCOL" on the first quest card
  const executeBtn = page.locator('button:has-text("EXECUTE PROTOCOL")').first();
  await expect(executeBtn).toBeVisible({ timeout: 15000 });
  await executeBtn.click();
  
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'nri-quest-view-debug.png' });
  
  // Now we should be in QuestView where CONSULT AGENT exists
  const agentBtn = page.locator('button:has-text("CONSULT AGENT")').first();
  await expect(agentBtn).toBeVisible({ timeout: 15000 });
  await agentBtn.click();
  
  const input = page.locator('input[type="text"]');
  await input.fill('Why Form 6A?');
  await page.keyboard.press('Enter');
  
  await page.waitForTimeout(8000);
  await page.screenshot({ path: 'nri-result-debug.png' });
  
  console.log('[NRI_AUDIT] SUCCESS: Navigation and Agent query completed.');
});
