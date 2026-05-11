# CSP Issue - Oracle Strategic Guidance

**Date:** 2026-05-11  
**Decision Context:** Personal portfolio site with development CSP blocking Vite's React Fast Refresh

---

## Inherited Decisions & Context

From previous workflow:
- This is a **personal portfolio site**, not enterprise software
- Deployed to GitHub Pages and Cloudflare Pages
- Solo developer maintaining the site
- Current CSP was added in previous worker implementation

---

## Diagnosis

The CSP issue is **self-inflicted configuration problem**, not a security vulnerability:

1. **Root Cause:** CSP header in `vite.config.ts` `server.headers` applies to development server
2. **Why It Breaks:** `script-src 'self'` blocks inline scripts that Vite's React plugin needs for Fast Refresh
3. **Production Status:** Works fine because Vite outputs external script files in production builds
4. **The Mistake:** Previous implementation added CSP to `server.headers` which affects development

**This is an example of over-engineering security for a personal portfolio.**

---

## Strategic Analysis

### Question 1: Should we fix CSP in development or remove it?

**Recommendation: Remove CSP from Vite config entirely.**

**Rationale:**
- CSP headers belong at the **deployment layer**, not build tool config
- `vite.config.ts` → `server.headers` only affects `vite dev`, not production
- Cloudflare Pages supports CSP headers via `_headers` file or dashboard
- GitHub Pages doesn't support custom headers (limitation of static hosting)
- Development should not have CSP restrictions - it breaks tooling

### Question 2: What's the best approach for a personal portfolio?

**Recommendation: Configure CSP only in production via Cloudflare Pages.**

**Rationale:**
- Personal portfolio has **low security risk** - no user data, no authentication, no payments
- CSP is defense-in-depth, not a critical security requirement for static sites
- GitHub Pages deployment doesn't benefit from CSP (headers not supported)
- Cloudflare Pages deployment can have CSP via `_headers` file
- Simplicity > theoretical security for a solo developer

### Question 3: How should CSP be handled across environments?

**Recommended Strategy:**

| Environment | CSP | Why |
|-------------|-----|-----|
| **Local Development** | None | Breaks Vite HMR, no security benefit |
| **GitHub Pages** | None | Headers not supported, static hosting only |
| **Cloudflare Pages** | Yes, via `_headers` file | Supported, provides production security |

**Implementation:**
1. Remove `server.headers` from `vite.config.ts` entirely
2. Create `public/_headers` file for Cloudflare Pages deployment
3. CSP only applies when deployed to Cloudflare, not in development

### Question 4: What are the security implications?

**Risk Assessment:**

| Scenario | Risk Level | CSP Benefit |
|----------|------------|-------------|
| Local development | **None** | No benefit, breaks tooling |
| GitHub Pages deployment | **Low** | Can't implement (no header support) |
| Cloudflare Pages deployment | **Low** | Defense-in-depth for static site |

**Threat Model for Personal Portfolio:**
- No user authentication
- No sensitive data
- No user input forms
- Static content only
- API calls to `api.khan.my.id` (read-only portfolio data)

**Conclusion:** CSP is **nice-to-have, not essential** for this threat model. The current approach (CSP in Vite dev server) actively harms development with minimal security benefit.

---

## Drift Detection

**Previous worker implementation added CSP to `vite.config.ts`**

This was a **well-intentioned but misapplied security practice**:
- Correct instinct: Add security headers
- Wrong implementation: Added to dev server config instead of production deployment layer
- Impact: Breaks development, no production benefit

**This is a case where "following best practices" caused real problems because the context (personal portfolio vs enterprise app) wasn't considered.**

---

## Recommendation

### Preferred Fix (Simple, Correct, Maintainable)

**Step 1: Remove CSP from `vite.config.ts`**

Delete the `server.headers` block entirely:

```typescript
export default defineConfig({
  plugins: [react(), tailwindcss(), VitePWA({ /* ... */ })],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  // Remove server.headers entirely - CSP belongs at deployment layer
});
```

**Step 2: Add CSP for Cloudflare Pages (Optional)**

Create `public/_headers` file:

```
/*
  Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' https: data:; script-src 'self'; connect-src 'self' https://api.khan.my.id
```

This file is automatically deployed to Cloudflare Pages and applies headers to your site.

**Step 3: For GitHub Pages (No CSP)**

GitHub Pages doesn't support custom headers. Accept that this deployment won't have CSP. This is fine for a personal portfolio.

---

## Alternative Approaches (Not Recommended)

### Alternative 1: Environment-based CSP in Vite config

```typescript
server: {
  headers: process.env.NODE_ENV === 'production' ? { /* CSP */ } : {}
}
```

**Why not recommended:**
- `process.env.NODE_ENV` in Vite config is always `'development'` during config evaluation
- This would never apply CSP even in production builds
- CSP should be at deployment layer, not build layer

### Alternative 2: Add `'unsafe-inline'` to script-src

```typescript
"script-src 'self' 'unsafe-inline';"
```

**Why not recommended:**
- Defeats the purpose of CSP for XSS protection
- Better to remove CSP from dev entirely
- Adds complexity for no security benefit

### Alternative 3: Use nonce/hash for inline scripts

**Why not recommended:**
- Over-engineering for a personal portfolio
- Complex to implement correctly
- Maintenance burden for solo developer

---

## Risks & Assumptions

### Risks of Recommended Approach

1. **GitHub Pages deployment has no CSP**
   - **Risk Level:** Very Low
   - **Mitigation:** Content is static, no user input, no authentication
   - **Acceptable:** Yes, for personal portfolio

2. **Cloudflare Pages deployment relies on `_headers` file**
   - **Risk Level:** Low
   - **Mitigation:** Verify `_headers` file is deployed correctly
   - **Test:** Check response headers in production

### Risks of NOT Fixing

1. **Development environment remains broken**
   - **Impact:** High - can't develop effectively
   - **Urgency:** Immediate fix required

2. **Wasted time on each `bun run dev` startup**
   - **Impact:** Medium - developer experience friction
   - **Urgency:** Fix now

---

## Decision Recommendation

**Execute the preferred fix immediately:**

1. Remove `server.headers` from `vite.config.ts`
2. Create `public/_headers` for Cloudflare Pages (optional)
3. Restart dev server to verify fix
4. Test both GitHub Pages and Cloudflare Pages deployments

**Time Estimate:** 5 minutes

**Validation:**
- `bun run dev` should start without CSP errors
- React Fast Refresh should work
- No console errors about inline scripts
- Production build should succeed (`bun run build`)

---

## Oracle Assessment

**Is this a security issue?** No. This is a configuration error that breaks development.

**Should we implement complex CSP?** No. Personal portfolio doesn't need enterprise-grade security.

**What matters most?** Developer productivity and correct production deployment.

**Verdict:** The previous CSP implementation was over-engineered. Remove it from Vite config, add to deployment layer if needed. Focus on what matters for a personal portfolio: working dev environment and correct production builds.

---

## Next Steps for Worker

If this guidance is approved, the worker should:

1. **Edit `vite.config.ts`:** Remove `server.headers` block
2. **Create `public/_headers`:** Add CSP for Cloudflare Pages (optional, can be separate task)
3. **Verify:** Run `bun run dev` and confirm no CSP errors
4. **Test:** Run `bun run build` and verify production build still works

**Worker Prompt:**
```
Remove CSP from Vite dev server configuration and add it to Cloudflare Pages deployment layer.

Changes:
1. Remove server.headers block from vite.config.ts
2. Create public/_headers file with CSP for Cloudflare Pages

Verification:
- bun run dev should start without CSP errors
- React Fast Refresh should work
- bun run build should succeed
- No console errors about inline scripts
```

---

**Oracle Decision:** Fix the configuration error now. CSP belongs at deployment layer, not in Vite dev server config.
