
# Build plan: Admin panel, marketplace cart, Click/Payme (sandbox)

Scope is large, so I'll ship it in **3 phases**. Each phase ends in a working site you can use.

## Phase 1 — Foundation (Cloud + schema + admin auth)

1. Enable **Lovable Cloud** (Postgres + Auth + Storage + server functions).
2. Database schema (migrations):
   - `profiles` (id → auth.users, name, phone)
   - `app_role` enum (`admin`, `user`) + `user_roles` table + `has_role()` security-definer fn
   - Trigger on `auth.users` insert: auto-create profile, and auto-grant `admin` role **only** to `pavel.durov.chat@gmail.com` and `nuriddinsamatov99@gmail.com`
   - `products` (slug, name_ru, name_en, desc_ru, desc_en, price_uzs, category, tag, sort_order, is_active)
   - `product_colors` (product_id, name, hex, sort)
   - `product_specs` (product_id, label, value, sort)
   - `product_images` (product_id, storage_path, alt, sort) — many per product
   - `journal_posts` (slug, title_ru/en, excerpt_ru/en, body_md_ru/en, cover_path, published_at, is_published)
   - `media_assets` (storage_path, kind: image|video, label, used_for) — for hero video, about photos, etc.
   - `site_settings` (key/value JSON) — for swapping hero video, homepage copy keys
   - `orders` (id, customer_name, phone, address, city, notes, subtotal_uzs, total_uzs, status: pending|paid|cancelled|fulfilled, payment_provider, provider_txn_id, created_at)
   - `order_items` (order_id, product_id, name_snapshot, color, qty, unit_price_uzs)
   - `payment_transactions` (order_id, provider, raw_payload jsonb, status, created_at) — webhook audit
3. Storage bucket `media` (public read, authenticated write, admin-only delete).
4. RLS everywhere. Products/journal: public can read `is_active=true` / `is_published=true`; admins read/write all. Orders: insertable by anyone (guest checkout), readable only by admins. user_roles: only admins write.
5. **Login page** `/login` (email+password), **`/admin` route** gated by `has_role('admin')`. Non-admins get redirected.
6. One-time **seed migration**: copies the current static `src/lib/products.ts` into the `products`/`product_colors`/`product_specs` tables, with prices converted USD → UZS (× 12 600, rounded to nearest 1 000) so nothing visually breaks.

## Phase 2 — Admin CMS + dynamic site

7. `/admin` panel (responsive, mobile-friendly):
   - Dashboard: order count, revenue, recent orders
   - Products: list / create / edit / delete, drag-to-reorder, multi-image upload, color & spec editors, toggle active, category dropdown
   - Journal: list / create / edit / delete posts, markdown editor (textarea + live preview), cover upload, publish toggle
   - Media: hero video + about photos manager (replace files used across the site)
   - Orders: table with status filter, detail drawer, mark paid/fulfilled
   - Settings: edit homepage hero text, about page text (i18n RU/EN side-by-side)
8. Rewrite **collection pages** and **product detail** to load from DB via `createServerFn` (keep existing visual design — only swap data source).
9. Rewrite **journal page** + post detail to load from DB.
10. Render hero video + about photos from `media_assets` so admin can swap them.
11. Convert site-wide prices from `$` to **`сум`** with grouping (e.g. `315 000 сум`).

## Phase 3 — Cart, checkout, payments

12. **Cart** (zustand, persisted to localStorage): add/remove/qty, drawer from header, badge with item count, mobile-friendly.
13. **Checkout page** `/checkout`:
    - Guest form: name, phone (Uzbek format validation), city, address, notes
    - Order summary, payment method selector (Click / Payme)
    - Creates `orders` + `order_items` via server fn, returns order_id
14. **Click integration** (sandbox/test mode):
    - Server route `/api/public/click/prepare` and `/api/public/click/complete` per Click Shop API spec (signed with md5 of `click_trans_id + service_id + SECRET_KEY + ...`)
    - Server fn `createClickInvoice(order_id)` returns payment URL
    - `SECRET_KEY`, `SERVICE_ID`, `MERCHANT_ID` stored as secrets (placeholder values for now; you replace later)
15. **Payme integration** (sandbox/test mode):
    - Server route `/api/public/payme` implementing Merchant API JSON-RPC (CheckPerformTransaction, CreateTransaction, PerformTransaction, CancelTransaction, CheckTransaction, GetStatement) with Basic-auth header verification
    - Server fn `createPaymeCheckoutUrl(order_id)` builds the `https://checkout.paymeuz.uz/...` base64 URL
    - `PAYME_MERCHANT_ID`, `PAYME_KEY` as secrets (placeholders)
16. **Order confirmation page** `/orders/$id` (lookup by id + last-4-of-phone).
17. SEO/responsiveness pass on all new pages (mobile bottom nav already exists; verify admin works on phones).

## Technical notes (for the curious)

- **Stack**: TanStack Start + Cloud (Supabase) + Tailwind v4. All admin writes go through `createServerFn` with `requireSupabaseAuth` + server-side `has_role('admin')` check (defence in depth — RLS is the backstop).
- **Why two auth checks**: client `_authenticated` layout blocks UI flash; server fn re-verifies admin role so RLS can't be bypassed.
- **Payments are sandbox-only**: Click/Payme webhook logic is real and spec-compliant, but credentials are placeholders. When you get merchant accounts, you paste 5 secrets and flip a `PAYMENT_MODE` flag to `live`. No code changes needed.
- **Currency**: I'll convert at 12 600 UZS/USD rounded to clean thousands. You can edit any price in the admin.
- **Images**: existing AI placeholders stay until you upload real ones through the admin Media manager.

## Out of scope (tell me if you want any of these)

- Email notifications to customers (Lovable Email can be added later)
- Delivery cost calculation / courier integration
- Inventory tracking / stock counts
- Discount codes / promotions
- Multi-admin invitations UI (only the 2 hardcoded emails are admins; more can be added by SQL or a future settings page)
- Real Click/Payme go-live (you provide credentials)

---

Phase 1 alone is ~15 files + 1 migration. Phases 2 and 3 are bigger. I'll ship them as separate messages so you can review at each step.

**Reply "go" to start Phase 1**, or tell me what to adjust.
