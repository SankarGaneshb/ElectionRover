import { describe, it, expect } from 'vitest';
import { resources } from './i18n';
import { QUEST_I18N } from './questI18n';

describe('SRE Linguistic Integrity Tests', () => {
  
  it('should ensure non-English blocks in i18n.js contain NO English letters', () => {
    Object.keys(resources).forEach(lang => {
      if (lang === 'en') return;
      
      const strings = resources[lang].translation;
      Object.keys(strings).forEach(key => {
        const val = strings[key];
        if (typeof val === 'string') {
          // Ignore key names, verify values
          const engLetters = val.match(/[A-Za-z]/g);
          // If there are English letters, throw an automated failure trace
          expect(engLetters, `Language Leak Detected in [i18n.js / ${lang} / ${key}]: "${val}" contains English letters.`).toBeNull();
        }
      });
    });
  });

  it('should ensure non-English blocks in questI18n.js contain NO English letters', () => {
    Object.keys(QUEST_I18N).forEach(lang => {
      if (lang === 'en') return;
      
      const local = QUEST_I18N[lang];
      // Check top level keys
      Object.keys(local).forEach(key => {
        if (key === 'steps') return;
        const val = local[key];
        if (typeof val === 'string') {
          const engLetters = val.match(/[A-Za-z]/g);
          expect(engLetters, `Language Leak Detected in [questI18n.js / ${lang} / ${key}]: "${val}" contains English letters.`).toBeNull();
        }
      });

      // Check steps arrays
      if (local.steps) {
        Object.keys(local.steps).forEach(questId => {
          local.steps[questId].forEach((step, idx) => {
            const titleLetters = step.title.match(/[A-Za-z]/g);
            expect(titleLetters, `Language Leak Detected in [questI18n.js / ${lang} / steps / ${questId} / index ${idx} / title]: "${step.title}" contains English letters.`).toBeNull();
            
            const contentLetters = step.content.match(/[A-Za-z]/g);
            expect(contentLetters, `Language Leak Detected in [questI18n.js / ${lang} / steps / ${questId} / index ${idx} / content]: "${step.content}" contains English letters.`).toBeNull();
          });
        });
      }
    });
  });

  it('should ensure English blocks contain NO regional/Non-ASCII characters', () => {
    // Check i18n.js en
    const enStrings = resources.en.translation;
    Object.keys(enStrings).forEach(key => {
      const val = enStrings[key];
      const nonAscii = val.match(/[^\x00-\x7F\u2013\u2014\u2018\u2019\u201C\u201D\u2026]/g);
      expect(nonAscii, `Foreign Script Leak in [i18n.js / en / ${key}]: "${val}"`).toBeNull();
    });

    // Check questI18n.js en
    const enQuest = QUEST_I18N.en;
    Object.keys(enQuest).forEach(key => {
      if (key === 'steps') return;
      const val = enQuest[key];
      const nonAscii = val.match(/[^\x00-\x7F\u2013\u2014\u2018\u2019\u201C\u201D\u2026]/g);
      expect(nonAscii, `Foreign Script Leak in [questI18n.js / en / ${key}]: "${val}"`).toBeNull();
    });

    if (enQuest.steps) {
      Object.keys(enQuest.steps).forEach(questId => {
        enQuest.steps[questId].forEach((step, idx) => {
          const titleNonAscii = step.title.match(/[^\x00-\x7F\u2013\u2014\u2018\u2019\u201C\u201D\u2026]/g);
          expect(titleNonAscii, `Foreign Script Leak in [questI18n.js / en / steps / ${questId} / idx ${idx} / title]: "${step.title}"`).toBeNull();
          
          const contentNonAscii = step.content.match(/[^\x00-\x7F\u2013\u2014\u2018\u2019\u201C\u201D\u2026]/g);
          expect(contentNonAscii, `Foreign Script Leak in [questI18n.js / en / steps / ${questId} / idx ${idx} / content]: "${step.content}"`).toBeNull();
        });
      });
    }
  });

});
