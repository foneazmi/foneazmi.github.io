# CSP and React Plugin Error Review

## Summary

Both errors are caused by the **CSP `script-src 'self'` directive in development mode**. This is a configuration conflict, not a code bug.

---

## Error 1: CSP Violation

**Error Message:**
> "Executing inline script violates the following Content Security Policy directive 'script-src 'self''"

**Root Cause:**
The CSP header configured in `vite.config.ts:41` blocks inline scripts:

```typescript
"script-src 'self';"
```

In **development mode**, Vite's React plugin (`@vitejs/plugin-react`) injects inline scripts for Fast Refresh (HMR). The browser enforces CSP and blocks these inline scripts, causing the violation.

**Evidence:**
- `vite.config.ts:41` - CSP header only allows `'self'` for scripts
- `index.html:42` (production build) - Contains `<script type="module" crossorigin src="/assets/index-D4p67apX.js"></script>` which is external, not inline
- The production build works because Vite outputs scripts as external files, not inline

**Impact:**
- Development: **Broken** - HMR and React Fast Refresh will not work
- Production: **Not affected** - Scripts are external files

---

## Error 2: React Plugin Preamble Error

**Error Message:**
> "@vitejs/plugin-react can't detect preamble. Something is wrong."

**Root Cause:**
The `@vitejs/plugin-react` injects a preamble (inline script) into the HTML for React Fast Refresh. When CSP blocks this inline script, the plugin cannot detect if the preamble was successfully injected, causing this error.

This is a **symptom** of Error 1, not a separate issue.

**Evidence:**
- The plugin expects to inject inline code for Fast Refresh
- CSP `script-src 'self'` blocks inline scripts
- The plugin detects the blockage and reports the preamble error

---

## Is This a Production Concern?

**No.** This is a **development-only issue**:

1. **Production CSP should come from server headers**, not Vite dev server config
2. The `server.headers` configuration in `vite.config.ts` only applies to `vite dev`
3. Production builds output scripts as external files (`/assets/index-*.js`), which comply with `script-src 'self'`

---

## Recommended Fix

**Option A: Relax CSP for development only (Recommended)**

Modify `vite.config.ts` to use a permissive CSP in development:

```typescript
export default defineConfig({
  // ... other config
  server: {
    headers: process.env.NODE_ENV === 'production'
      ? {
          "Content-Security-Policy":
            "default-src 'self'; " +
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
            "font-src 'self' https://fonts.gstatic.com; " +
            "img-src 'self' https: data:; " +
            "script-src 'self'; " +
            "connect-src 'self' https://api.khan.my.id",
        }
      : {}, // No CSP in development
  },
});
```

**Option B: Allow inline scripts with nonce/hash (More complex)**

Add `'unsafe-inline'` to `script-src` for development, but this weakens security:

```typescript
"script-src 'self' 'unsafe-inline';"
```

**Option C: Remove CSP from Vite config entirely**

Since CSP headers should be set by your production server (Cloudflare, nginx, etc.), remove the `server.headers` block and configure CSP at the hosting layer instead.

---

## Findings

| Aspect | Status |
|--------|--------|
| Code correctness | Correct - no bugs in component code |
| CSP configuration | Conflicts with Vite dev server needs |
| Development experience | Broken due to CSP |
| Production build | Unaffected - works correctly |
| FloatingDock.tsx | Not the source of errors |

---

## Correct: What is already good

- The React components are correctly implemented
- Production build outputs compliant external scripts
- CSP policy is appropriate for production security

## Fixed: N/A

This is a configuration issue, not a code bug. No code fixes applied.

## Blocker

**Development environment is non-functional** due to CSP blocking Vite's Fast Refresh scripts. Must resolve before development can proceed normally.

## Note

Consider moving CSP configuration to your deployment platform (Cloudflare Pages, nginx, etc.) rather than Vite config. This allows:
- Development to work without CSP restrictions
- Production CSP to be managed at the edge/server level
- Different CSP policies per environment
