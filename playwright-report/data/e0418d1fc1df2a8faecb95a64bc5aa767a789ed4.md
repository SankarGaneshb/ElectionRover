# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke-deep.spec.js >> Deep Interactive Smoke Test - Feeling the User Pain
- Location: tests-e2e\smoke-deep.spec.js:3:1

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('div.bg-white\\/5')
Expected: 2
Received: 3
Timeout:  15000ms

Call log:
  - Expect "toHaveCount" with timeout 15000ms
  - waiting for locator('div.bg-white\\/5')
    18 × locator resolved to 3 elements
       - unexpected value "3"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6] [cursor=pointer]:
        - img "Election Rover Logo" [ref=e8]
        - generic [ref=e9]:
          - heading "ELECTION ROVER" [level=1] [ref=e10]
          - generic [ref=e11]: Constitutional Intelligence
      - generic [ref=e13]:
        - button "English" [ref=e14]
        - button "हिन्दी" [ref=e15]
        - button "தமிழ்" [ref=e16]
        - button "తెలుగు" [ref=e17]
        - button "ಕನ್ನಡ" [ref=e18]
        - button "বাংলা" [ref=e19]
        - button "മലയാളം" [ref=e20]
        - button "मराठी" [ref=e21]
        - button "ગુજરાતી" [ref=e22]
        - button "ଓଡ଼ିଆ" [ref=e23]
        - button "ਪੰਜਾਬੀ" [ref=e24]
  - generic [ref=e27]:
    - generic [ref=e29]:
      - generic [ref=e30]:
        - img [ref=e31]
        - generic [ref=e34]: Active Protocol Initialization
      - generic [ref=e35]:
        - text: Phase
        - paragraph [ref=e36]:
          - text: "1"
          - generic [ref=e37]: / 3
    - heading "The Registration Trail" [level=2] [ref=e38]
    - paragraph [ref=e39]: Ensure you are on the electoral roll and ready to vote.
    - generic [ref=e40]:
      - generic [ref=e41]:
        - generic [ref=e42]: Current Objective
        - heading "Eligibility Check" [level=3] [ref=e43]
        - paragraph [ref=e44]: Are you 18? Are you a citizen?
      - generic [ref=e45]:
        - button "Consult Agent" [ref=e46]:
          - img [ref=e47]
          - generic [ref=e50]: Consult Agent
        - generic [ref=e51]: Need clarification on this phase? Ask the Educator Agent for deep-dive insights.
    - generic [ref=e53]:
      - generic [ref=e54]:
        - generic [ref=e55]:
          - img [ref=e57]
          - generic [ref=e62]: Why Form 6A is needed for NRI?
        - generic [ref=e63]:
          - img [ref=e65]
          - generic [ref=e68]:
            - generic [ref=e70]: Form 6A is used by Non-Resident Indians (NRIs) to register as "Overseas Electors." It allows Indian citizens living abroad, who have not acquired citizenship of another country, to include their names in the electoral roll of their home constituency so they can vote in Indian elections.
            - generic [ref=e71]:
              - generic [ref=e72]: Feedback?
              - generic [ref=e73]:
                - button "Feedback 🤩" [ref=e74]: 🤩
                - button "Feedback 🙂" [ref=e75]: 🙂
                - button "Feedback 😐" [ref=e76]: 😐
                - button "Feedback 😕" [ref=e77]: 😕
        - generic [ref=e78]:
          - img [ref=e80]
          - generic [ref=e85]: What happens if I visit India?
        - generic [ref=e86]:
          - img [ref=e88]
          - generic [ref=e91]:
            - generic [ref=e93]:
              - text: If you are registered as an Overseas Elector, you can vote in person at your designated polling station during an election. You must present your
              - strong [ref=e94]: original Indian Passport
              - text: for identification at the booth. Note that NRIs currently cannot vote from abroad; physical presence in your constituency on polling day is mandatory.
            - generic [ref=e95]:
              - generic [ref=e96]: Feedback?
              - generic [ref=e97]:
                - button "Feedback 🤩" [ref=e98]: 🤩
                - button "Feedback 🙂" [ref=e99]: 🙂
                - button "Feedback 😐" [ref=e100]: 😐
                - button "Feedback 😕" [ref=e101]: 😕
      - generic [ref=e102]:
        - textbox "Ask anything about this step..." [active] [ref=e103]
        - button [ref=e104]:
          - img [ref=e105]
    - button "Proceed to Next Phase" [ref=e111]:
      - generic [ref=e112]: Proceed to Next Phase
      - img [ref=e113]
  - contentinfo [ref=e115]:
    - paragraph [ref=e117]: Election Rover 2026 Protocol
    - generic [ref=e118]:
      - link "Privacy" [ref=e119] [cursor=pointer]:
        - /url: "#"
      - link "Security" [ref=e120] [cursor=pointer]:
        - /url: "#"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('Deep Interactive Smoke Test - Feeling the User Pain', async ({ page }) => {
  4  |   test.setTimeout(90000); 
  5  |   
  6  |   await page.goto('http://localhost:5188/?lang=en');
  7  |   await page.waitForLoadState('networkidle');
  8  |   
  9  |   console.log('[SMOKE] Navigating to Voter Dashboard...');
  10 |   await page.click('text=General Elector');
  11 |   await page.waitForTimeout(2000);
  12 |   
  13 |   console.log('[SMOKE] Executing Protocol Phase 1...');
  14 |   await page.click('text=EXECUTE PROTOCOL');
  15 |   await page.waitForTimeout(2000);
  16 |   
  17 |   // 1. Consult Agent - Question 1
  18 |   console.log('[SMOKE] Consulting Agent: Question 1...');
  19 |   await page.click('text=CONSULT AGENT');
  20 |   const input = page.locator('input[type="text"]');
  21 |   await input.fill('Why Form 6A is needed for NRI?');
  22 |   await page.keyboard.press('Enter');
  23 |   
  24 |   // WAIT FOR REAL INDICATOR
  25 |   console.log('[SMOKE] Waiting for AI to start Analyzing...');
  26 |   const indicator = page.locator('text=ANALYZING PROTOCOL...');
  27 |   await expect(indicator).toBeVisible({ timeout: 10000 });
  28 |   
  29 |   console.log('[SMOKE] Waiting for AI to finish (Q1)...');
  30 |   await expect(indicator).toBeHidden({ timeout: 45000 });
  31 |   
  32 |   // 2. Give Feedback
  33 |   console.log('[SMOKE] Providing Sentiment Feedback (🤩)...');
  34 |   await page.screenshot({ path: 'smoke-feedback-debug.png' });
  35 |   const feedbackBtn = page.getByLabel('Feedback 🤩').first();
  36 |   await expect(feedbackBtn).toBeVisible({ timeout: 15000 });
  37 |   await feedbackBtn.click();
  38 |   await page.waitForTimeout(1000);
  39 |   
  40 |   // 3. Consult Agent - Question 2
  41 |   console.log('[SMOKE] Consulting Agent: Question 2 (Follow-up)...');
  42 |   await input.fill('What happens if I visit India?');
  43 |   await page.keyboard.press('Enter');
  44 |   
  45 |   await expect(indicator).toBeVisible({ timeout: 10000 });
  46 |   await expect(indicator).toBeHidden({ timeout: 45000 });
  47 |   
  48 |   const allBubbles = page.locator('div.bg-white\\/5');
> 49 |   await expect(allBubbles).toHaveCount(2, { timeout: 15000 });
     |                            ^ Error: expect(locator).toHaveCount(expected) failed
  50 |   
  51 |   // 4. Move to Next Step
  52 |   console.log('[SMOKE] Completing Phase 1 -> Moving to Phase 2...');
  53 |   const proceedBtn = page.locator('button:has-text("Proceed")').first();
  54 |   await expect(proceedBtn).toBeVisible({ timeout: 10000 });
  55 |   await proceedBtn.click();
  56 |   
  57 |   await page.waitForTimeout(3000);
  58 |   console.log('[SMOKE] Verifying Phase 2 Transition...');
  59 |   const phaseIndicator = page.locator('text=2 / 3');
  60 |   await expect(phaseIndicator).toBeVisible({ timeout: 15000 });
  61 |   
  62 |   console.log('[SMOKE] SUCCESS: Interactive flow completed flawlessly.');
  63 | });
  64 | 
```