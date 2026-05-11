# CSP Issue Resolution Summary

**Date:** 2026-05-11  
**Issue:** CSP blocking Vite's React Fast Refresh in development  
**Status:** ✅ Fixed

---

## Problem

Two errors were occurring in development:

1. **CSP Violation:**
   ```
   Executing inline script violates the following Content Security Policy directive 'script-src 'self''
   ```

2. **React Plugin Error:**
   ```
   @vitejs/plugin-react can't detect preamble. Something is wrong.
   ```

**Root Cause:** CSP headers in `vite.config.ts` `server.headers` were blocking inline scripts that Vite's React plugin needs for Fast Refresh (HMR).

---

## Oracle Analysis

The oracle identified this as **over-engineering security for a personal portfolio**:

**Key Insights:**
- CSP belongs at **deployment layer**, not build tool config
- Personal portfolio has **low security risk** (no user data, no auth, no payments)
- Development should not have CSP restrictions - it breaks tooling
- GitHub Pages doesn't support custom headers anyway
- Cloudflare Pages can have CSP via `_headers` file

**Strategic Decision:** Remove CSP from Vite config, add to Cloudflare Pages deployment layer.

---

## Implementation

### Changes Made

**1. Removed CSP from `vite.config.ts`:**
```typescript
// BEFORE: Had server.headers with CSP
server: {
  headers: {
    "Content-Security-Policy": "default-src 'self'; ..."
  }
}

// AFTER: No server.headers block
// CSP moved to deployment layer
```

**2. Created `public/_headers` for Cloudflare Pages:**
```
/*
  Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' https: data:; script-src 'self'; connect-src 'self' https://api.khan.my.id
```

**3. Files Modified:**
- `vite.config.ts` - Removed `server.headers` block
- `public/_headers` - Created for Cloudflare Pages deployment

---

## Verification

✅ **ESLint:** Clean (no errors/warnings)  
✅ **Tests:** 82 tests pass (all tests pass)  
✅ **Build:** 223ms, 257.69 kB bundle (builds successfully)  
✅ **TypeScript:** Compilation successful  
✅ **PWA:** 9 entries precached (292.10 KiB)

**Development Environment Now Works:**
- No CSP errors in console
- React Fast Refresh/HMR works
- No plugin preamble errors
- Development server starts cleanly

---

## Deployment Strategy

| Environment | CSP Status | Implementation |
|-------------|------------|----------------|
| **Local Development** | No CSP | Vite dev server without headers |
| **GitHub Pages** | No CSP | Static hosting doesn't support headers |
| **Cloudflare Pages** | CSP via `_headers` | `public/_headers` file deployed |

**Rationale:**
- Development: No CSP needed, breaks tooling
- GitHub Pages: Can't implement CSP (static hosting limitation)
- Cloudflare Pages: CSP via `_headers` file (defense-in-depth)

---

## Security Assessment

**Threat Model (Personal Portfolio):**
- No user authentication
- No sensitive data storage
- No user input forms
- Static content with read-only API calls
- Low security risk

**CSP Value:** Defense-in-depth, not essential for this threat model.

**Acceptable Risk:** GitHub Pages deployment without CSP is fine for a personal portfolio.

---

## Lessons Learned

1. **Context Matters:** Enterprise security practices ≠ personal portfolio needs
2. **Right Layer:** CSP belongs at deployment layer, not build tool config
3. **Developer Experience:** Don't break development for theoretical security
4. **Simplicity:** Personal projects should prioritize working code over perfect security

**The Mistake:** Previous implementation added CSP to Vite config because "it's a best practice" without considering the context (personal portfolio) and impact (breaks development).

**The Fix:** Move CSP to where it belongs (deployment layer) and only where it works (Cloudflare Pages).

---

## Next Steps

1. **Deploy to Cloudflare Pages:**
   ```bash
   bun run build && wrangler pages deploy dist
   ```

2. **Verify CSP in Production:**
   - Check response headers contain CSP
   - Test site functionality
   - Verify no CSP violations in console

3. **Deploy to GitHub Pages:**
   ```bash
   bun run build && gh-pages -d dist
   ```

4. **Monitor:** Watch for any CSP violations in production

---

## Final Status

**Issue:** ✅ **RESOLVED**  
**Development:** ✅ **WORKING**  
**Production Build:** ✅ **SUCCESSFUL**  
**Security:** ✅ **APPROPRIATE FOR THREAT MODEL**

The CSP configuration is now correctly implemented at the deployment layer, allowing development to work properly while providing security where it's supported and appropriate.
