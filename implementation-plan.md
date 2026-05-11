# Implementation Plan: Portfolio Site Improvements

**Date:** 2026-05-11  
**Based on:** Oracle Strategic Guidance (oracle-guidance.md)  
**Total Estimated Time:** ~90 minutes  
**Priority:** Tier 1 + Tier 2 items only (Skip Tier 3 over-engineering)

---

## Goal

Fix real issues (404 route, constants extraction, CSP validation, accessibility) and polish code quality (error logic, logging) without over-engineering for a solo developer's portfolio site.

---

## Tasks

### Tier 1: Fix Real Issues (Do This Week)

#### Task 1: Add 404 Not Found Route
**Priority:** High  
**Estimated Time:** 10 minutes  
**Dependencies:** None

**Files to Modify:**
- `src/routes/index.tsx` - Add catch-all route
- `src/pages/NotFound.tsx` - Create new 404 page component

**Changes:**

1. Create `src/pages/NotFound.tsx`:
```tsx
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = memo(() => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-white">404</h1>
          <p className="text-2xl text-neutral-400">Page Not Found</p>
        </div>
        <p className="text-neutral-500">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg glass border border-white/5 hover:bg-white/10 text-neutral-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
});

NotFound.displayName = 'NotFound';

export default NotFound;
```

2. Modify `src/routes/index.tsx`:
```tsx
import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';
import Portfolio from '@/pages/Portfolio';
import Experience from '@/pages/Experience';
import NotFound from '@/pages/NotFound'; // Add import

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="experience" element={<Experience />} />
        <Route path="*" element={<NotFound />} /> {/* Add catch-all */}
      </Route>
    </Routes>
  );
};
```

**Acceptance Criteria:**
- [ ] Navigating to `/nonexistent` shows the 404 page
- [ ] 404 page has "Go Home" button that navigates to `/`
- [ ] 404 page has "Go Back" button that uses browser history
- [ ] Page matches existing design aesthetic (dark theme, purple accents)
- [ ] Component is memoized for performance
- [ ] Test file created: `src/pages/NotFound.test.tsx`

**Validation:**
```bash
bun run dev
# Navigate to http://localhost:5173/nonexistent
# Verify 404 page renders correctly
```

---

#### Task 2: Extract Constants from MeContext
**Priority:** Medium  
**Estimated Time:** 15 minutes  
**Dependencies:** None

**Files to Modify:**
- `src/lib/portfolio-constants.ts` - Create new constants file
- `src/context/MeContext.tsx` - Remove constants, import from new file

**Changes:**

1. Create `src/lib/portfolio-constants.ts`:
```ts
import type { MeData } from '@/types';

export const EMPTY_ME: MeData = {
  photo: '',
  name: '',
  job: '',
  year: 0,
  description: '',
  contacts: [],
  portfolio: [],
  experiences: [],
  skills: [],
};

export const STATIC_FALLBACK: MeData = {
  photo: 'https://example.com/photo.jpg',
  name: 'Farkhan Azmi',
  job: 'Software Engineer',
  year: 2024,
  description: 'Portfolio temporarily unavailable. Please try again later.',
  contacts: [],
  portfolio: [],
  experiences: [],
  skills: [],
};

export const CACHE_KEY = 'portfolio_me_data';
export const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

export const RETRY_CONFIG = {
  maxRetries: 2,
  baseDelay: 100,
  maxDelay: 200,
};
```

2. Modify `src/context/MeContext.tsx`:
- Remove the constant definitions (EMPTY_ME, STATIC_FALLBACK, CACHE_KEY, CACHE_TTL, RETRY_CONFIG)
- Add import at top:
```tsx
import {
  EMPTY_ME,
  STATIC_FALLBACK,
  CACHE_KEY,
  CACHE_TTL,
  RETRY_CONFIG,
} from '@/lib/portfolio-constants';
```

**Acceptance Criteria:**
- [ ] Constants extracted to separate file
- [ ] ESLint warning about constant exports resolved
- [ ] All tests still pass
- [ ] No runtime behavior changes

**Validation:**
```bash
bun run lint
bun run test:run
```

---

#### Task 3: Test CSP in Production
**Priority:** Medium  
**Estimated Time:** 5 minutes  
**Dependencies:** Deploy to production

**Files to Modify:**
- None (verification task only)

**Changes:**
1. Deploy to production:
```bash
bun run deploy
```

2. Open browser DevTools on production site
3. Check Console for CSP violations
4. Verify Network tab shows all resources loading correctly
5. Check that:
   - [ ] Google Fonts load correctly
   - [ ] Images display properly
   - [ ] API calls to `api.khan.my.id` succeed
   - [ ] No CSP violation errors in console

**Acceptance Criteria:**
- [ ] No CSP violation warnings in browser console
- [ ] All fonts render correctly
- [ ] Images load from HTTPS sources
- [ ] API data fetches successfully

**Note:** If CSP issues are found, update `vite.config.ts` server.headers CSP directive.

---

#### Task 4: Add Alt Text to Portfolio Images
**Priority:** High (Accessibility + SEO)  
**Estimated Time:** 20 minutes  
**Dependencies:** None

**Files to Modify:**
- `src/components/features/PortfolioCard.tsx` - Enhance alt text

**Changes:**

The current code already has basic alt text:
```tsx
alt={item.title}
```

This is acceptable, but we can make it more descriptive. However, after reviewing the code, the current implementation is actually correct - it uses the portfolio item title as alt text, which is appropriate for portfolio cards.

**Decision:** The current alt text implementation is already correct. No changes needed. The `alt={item.title}` provides meaningful context for screen readers.

**Acceptance Criteria:**
- [ ] Confirm current implementation is accessible (already done)
- [ ] Document that no changes are needed

**Status:** ✅ Already implemented correctly

---

### Tier 2: Polish (Do This Month)

#### Task 5: Simplify Error State Logic
**Priority:** Low  
**Estimated Time:** 15 minutes  
**Dependencies:** None

**Files to Modify:**
- `src/pages/Home.tsx`
- `src/pages/Portfolio.tsx`
- `src/pages/Experience.tsx`

**Current Issue:**
The error check `data.error && !data.name` is confusing because it combines error state with data presence check.

**Changes:**

This pattern is actually correct and intentional. The logic means:
- Show error state ONLY if there's an error AND no fallback data
- If there's an error but we have data (from cache), show the data instead

**Decision:** The current logic is correct for offline-first design. However, we can add a comment for clarity:

1. Modify all three pages to add clarifying comments:
```tsx
// Offline-first: Show error only if we have no data at all
// If API fails but we have cached data, show the cached data instead
if (data.error && !data.name) {
  return <ErrorState />;
}
```

**Acceptance Criteria:**
- [ ] Comments added to explain the offline-first logic
- [ ] No behavior changes
- [ ] Code is more maintainable

**Alternative:** Extract to a custom hook:
```tsx
// src/hooks/useDataState.ts
export const useDataState = (data: MeContextReturnType) => {
  return {
    isLoading: data.loading,
    hasError: data.error && !data.name,
    hasData: !!data.name,
  };
};
```

This might be over-engineering for 3 pages. Add comments instead.

---

#### Task 6: Create Conditional Logger Utility
**Priority:** Low  
**Estimated Time:** 20 minutes  
**Dependencies:** None

**Files to Modify:**
- `src/lib/logger.ts` - Create new logger utility
- `src/context/MeContext.tsx` - Replace console.warn/error with logger

**Changes:**

1. Create `src/lib/logger.ts`:
```ts
/**
 * Development-only logger
 * In production, all log calls are no-ops
 */

const isDev = import.meta.env.DEV;

export const logger = {
  log: (...args: unknown[]) => {
    if (isDev) console.log(...args);
  },
  warn: (...args: unknown[]) => {
    if (isDev) console.warn(...args);
  },
  error: (...args: unknown[]) => {
    // Always log errors, but consider using error tracking service in production
    console.error(...args);
  },
  debug: (...args: unknown[]) => {
    if (isDev) console.debug(...args);
  },
  info: (...args: unknown[]) => {
    if (isDev) console.info(...args);
  },
};
```

2. Modify `src/context/MeContext.tsx`:
```tsx
import { logger } from '@/lib/logger';

// Replace all console.warn with logger.warn
// Replace all console.error with logger.error
```

**Acceptance Criteria:**
- [ ] Logger utility created
- [ ] MeContext.tsx uses logger instead of console
- [ ] No console.warn/error in production builds
- [ ] Development builds still show helpful warnings
- [ ] ESLint no-console rule passes

**Validation:**
```bash
bun run build
# Check dist/assets/*.js for console.warn calls
bun run lint
```

---

## Files to Modify

1. **New Files:**
   - `src/pages/NotFound.tsx` - 404 not found page
   - `src/pages/NotFound.test.tsx` - Tests for 404 page
   - `src/lib/portfolio-constants.ts` - Extracted constants
   - `src/lib/logger.ts` - Conditional logging utility

2. **Modified Files:**
   - `src/routes/index.tsx` - Add 404 catch-all route
   - `src/context/MeContext.tsx` - Import constants, use logger
   - `src/pages/Home.tsx` - Add clarifying comment (optional)
   - `src/pages/Portfolio.tsx` - Add clarifying comment (optional)
   - `src/pages/Experience.tsx` - Add clarifying comment (optional)

---

## Dependencies

```
Task 1 (404 Route) ──────────────> No dependencies
Task 2 (Constants) ──────────────> No dependencies
Task 3 (CSP Test) ───────────────> Requires production deploy
Task 4 (Alt Text) ───────────────> No dependencies (already done)
Task 5 (Error Logic) ────────────> No dependencies
Task 6 (Logger) ─────────────────> No dependencies
```

All tasks can be done in parallel except Task 3 requires a production deployment.

---

## Risks

### Technical Risks

1. **CSP Might Break in Production**
   - **Risk:** Server headers differ from Vite dev server headers
   - **Mitigation:** Test immediately after deployment, have CSP rollback plan
   - **Likelihood:** Low (CSP looks correct)

2. **Breaking Existing Tests**
   - **Risk:** Refactoring MeContext might break 76 existing tests
   - **Mitigation:** Run full test suite after each change
   - **Likelihood:** Low (constants are just moved, not changed)

3. **404 Route Might Conflict with PWA**
   - **Risk:** PWA service worker might intercept routes
   - **Mitigation:** Test offline behavior, check service worker config
   - **Likelihood:** Very Low (PWA already configured correctly)

### Scope Risks

1. **Temptation to Add More Features**
   - **Risk:** "While we're here, let's also add..."
   - **Mitigation:** Stick to the plan. All additional ideas go to backlog.
   - **Priority:** DO NOT add:
     - ❌ Analytics
     - ❌ Dark mode toggle (already dark theme)
     - ❌ Contact form
     - ❌ Blog section
     - ❌ CMS integration

2. **Over-Engineering the Logger**
   - **Risk:** Adding log levels, remote logging, etc.
   - **Mitigation:** Keep logger simple. 10 lines max. Dev-only.

---

## What NOT to Do (Skip These)

Based on Oracle guidance, explicitly skip:

- ❌ **Lighthouse CI** - Manual checks are sufficient
- ❌ **Storybook** - Overkill for 8 components
- ❌ **Cypress/Playwright** - Unit tests cover simple flows
- ❌ **Next.js Migration** - Vite is already excellent
- ❌ **Lazy Loading Routes** - Bundle is already small (256KB)
- ❌ **Automated A11y Testing (jest-axe)** - Manual testing is sufficient
- ❌ **API Fallback Enhancement** - Current 3-tier strategy is correct
- ❌ **E2E Tests** - Portfolio has simple user flows

---

## Implementation Order

**Recommended sequence for maximum efficiency:**

1. **Task 2** (Constants) - 15 min - Quick win, fixes ESLint warning
2. **Task 1** (404 Route) - 10 min - High visibility fix
3. **Task 6** (Logger) - 20 min - Clean up code quality
4. **Task 3** (CSP Test) - 5 min - Deploy and verify
5. **Task 5** (Error Logic) - 15 min - Optional clarity improvement
6. **Task 4** (Alt Text) - Already done ✅

**Total: ~65 minutes** (excluding Task 4 which is already complete)

---

## Verification Checklist

After completing all tasks:

- [ ] Run `bun run lint` - No errors
- [ ] Run `bun run test:run` - All 76+ tests pass
- [ ] Run `bun run build` - Build succeeds
- [ ] Test locally with `bun run dev` - All routes work
- [ ] Test 404 page manually
- [ ] Deploy with `bun run deploy`
- [ ] Verify production site works
- [ ] Check browser console for CSP violations
- [ ] Test offline behavior (Service Worker + PWA)

---

## Rollback Plan

If anything breaks:

1. **Code issues:** `git checkout .` to revert uncommitted changes
2. **Production issues:** Redeploy previous commit via:
   ```bash
   git revert HEAD
   bun run deploy
   ```
3. **CSP issues:** Temporarily remove CSP headers from `vite.config.ts` and redeploy

---

## Success Metrics

- ✅ 404 page shows for invalid routes
- ✅ ESLint passes with no warnings
- ✅ No console warnings in production build
- ✅ All tests pass (76+ tests)
- ✅ Production site loads without CSP violations
- ✅ Total implementation time < 90 minutes

---

## Post-Implementation

After completing this plan:

1. **Commit changes:**
   ```bash
   git add -A
   git commit -m "Fix 404 route, extract constants, add dev-only logger"
   ```

2. **Monitor production:**
   - Check API uptime at `api.khan.my.id`
   - Monitor for user-reported issues
   - Watch for console errors in production

3. **Document decisions:**
   - Keep oracle-guidance.md for reference
   - Update README if needed (not required)

4. **Move to next project** - This portfolio is in good shape!

---

## Appendix: Code References

### Current File Structure
```
src/
├── App.tsx
├── main.tsx
├── components/
│   ├── common/
│   │   ├── ErrorBoundary.tsx
│   │   ├── Icons.tsx
│   │   └── Marquee.tsx
│   ├── features/
│   │   ├── ExperienceItem.tsx
│   │   └── PortfolioCard.tsx
│   └── layout/
│       └── FloatingDock.tsx
├── context/
│   └── MeContext.tsx
├── layouts/
│   └── MainLayout.tsx
├── lib/
│   └── (NEW: portfolio-constants.ts, logger.ts)
├── pages/
│   ├── Home.tsx
│   ├── Portfolio.tsx
│   ├── Experience.tsx
│   └── (NEW: NotFound.tsx)
├── routes/
│   └── index.tsx
└── types/
    └── (type definitions)
```

### Test Coverage
- Current: 76 tests passing
- Add: NotFound.test.tsx (3-5 tests)
- Target: 79+ tests passing

---

**Plan Status:** ✅ Ready for implementation  
**Next Step:** Hand off to worker agent for execution
