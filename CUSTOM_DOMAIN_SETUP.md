# Custom Domain Setup: GoDaddy + Vercel

This guide walks you through buying a domain on GoDaddy and connecting it to your Vercel project **so your live URL stays the same** (e.g. `yourname.com` or `keerthanajayamoorthy.com`). Once set up, you can keep sharing the same link and QR code—only the underlying hosting stays on Vercel.

---

## Fix "Invalid Configuration" — Add DNS at GoDaddy (quick steps)

**Yes — you need to add the records at GoDaddy.** Vercel is waiting for your domain’s DNS to point to them. Until you add these at GoDaddy, the status will stay "Invalid Configuration".

### Records to add (use the values Vercel shows for your domain; below are examples)

| Type  | Name | Value |
|-------|------|--------|
| **A** | `@`  | `216.198.79.1` |
| **CNAME** | `www` | `c94d9150a958a390.vercel-dns-017.com.` |

*(If Vercel shows different values for your project, use those instead.)*

### In GoDaddy

1. Go to **[https://account.godaddy.com](https://account.godaddy.com)** → **My Products**.
2. Find **keethu-jayamoorthy-portfolio.com** → click **DNS** (or **Manage DNS**).
3. In the **DNS Records** section:
   - **Add A record for root domain:**
     - Click **Add** (or **Add Record**).
     - Type: **A**
     - Name: **@** (or leave blank if GoDaddy uses “@” for root).
     - Value: **216.198.79.1** (or the A record value from Vercel).
     - TTL: 600 or 1 Hour is fine. Save.
   - **Add CNAME for www:**
     - Click **Add** again.
     - Type: **CNAME**
     - Name: **www**
     - Value: **c94d9150a958a390.vercel-dns-017.com.** (include the trailing dot if Vercel shows it; some providers add it automatically).
     - TTL: 600 or 1 Hour. Save.
4. **Remove conflicting records (if any):** If you already have an **A** record for `@` or a **CNAME** for `www` pointing somewhere else, delete or replace them so only the Vercel records remain.
5. Wait **5–30 minutes** (sometimes up to a few hours). In Vercel → **Settings → Domains**, click **Refresh** or wait; status should change to **Valid Configuration**.

After it shows Valid Configuration, open **https://keethu-jayamoorthy-portfolio.com** and **https://www.keethu-jayamoorthy-portfolio.com** in your browser; both should load your portfolio.

---

## Part 1: Buy a domain on GoDaddy

1. **Go to GoDaddy**  
   [https://www.godaddy.com](https://www.godaddy.com)

2. **Search for your domain**  
   In the search bar, type the name you want (e.g. `keerthanajayamoorthy`, `keethu-portfolio`, `keerthanajay`).  
   GoDaddy will show available options: `.com`, `.dev`, `.io`, etc.

3. **Choose a domain**  
   - `.com` is most recognizable for recruiters.  
   - Add it to cart and continue.

4. **Checkout**  
   - Create or sign in to your GoDaddy account.  
   - You may see upsells (Privacy, Email, etc.). For just linking to Vercel, you only need the domain.  
   - Complete payment.  
   - After purchase, the domain appears in your **GoDaddy account → My Products → Domains**.

5. **Note:** New domains can take a few minutes to fully activate. You can still add them to Vercel right away.

---

## Part 2: Add the domain in Vercel

1. **Open your Vercel project**  
   Go to [https://vercel.com](https://vercel.com) → **Dashboard** → select your **Int-port** (or portfolio) project.

2. **Open Domain settings**  
   Click **Settings** → **Domains** (in the left sidebar).

3. **Add your domain**  
   - In “Domain”, enter your full domain (e.g. `keerthanajayamoorthy.com`).  
   - Click **Add**.  
   - Vercel will show one of two setups:
     - **Recommended: Use Vercel nameservers** (simplest; GoDaddy points the whole domain to Vercel).  
     - **Or: Add DNS records at GoDaddy** (you keep using GoDaddy’s DNS and only add A/CNAME records).

4. **Choose “Use Vercel nameservers” (easiest)**  
   - Vercel will show **two nameservers**, e.g.:
     - `ns1.vercel-dns.com`
     - `ns2.vercel-dns.com`
   - Keep this tab open; you’ll paste these into GoDaddy next.

---

## Part 3: Point GoDaddy to Vercel (nameserver method)

1. **Go to GoDaddy**  
   [https://account.godaddy.com](https://account.godaddy.com) → **My Products**.

2. **Open your domain**  
   Find the domain you bought → click **DNS** or **Manage DNS**.

3. **Change nameservers**  
   - Find the section **Nameservers** (may say “Nameservers” or “Manage nameservers”).  
   - Choose **Change** or **Custom** (not “Default”).  
   - Replace the existing nameservers with the **two Vercel nameservers**:
     - `ns1.vercel-dns.com`
     - `ns2.vercel-dns.com`
   - Save.

4. **Wait for DNS to update**  
   - Can take from **a few minutes up to 24–48 hours** (often within 1–2 hours).  
   - In Vercel → **Settings → Domains**, the domain will show as “Valid Configuration” once it’s working.

---

## Alternative: Keep GoDaddy DNS (A + CNAME records)

If you prefer not to change nameservers:

1. In **Vercel → Settings → Domains**, add your domain.  
2. Vercel will show the records you need, for example:
   - **A record:** `76.76.21.21` (or the IP Vercel shows)  
   - **CNAME for www:** `cname.vercel-dns.com` (or the target Vercel shows)
3. In **GoDaddy → My Products → your domain → DNS**:
   - Add an **A** record: Host `@`, Value `76.76.21.21` (or Vercel’s IP).  
   - Add a **CNAME** record: Host `www`, Value `cname.vercel-dns.com` (or Vercel’s target).  
4. Save. Wait for DNS to propagate (same as above).

---

## Part 4: Keep your link stable

- **Before custom domain:** Your site might be `int-port.vercel.app` or a generated `*.vercel.app` URL.  
- **After custom domain:** Your site will be `https://yourdomain.com` (and optionally `https://www.yourdomain.com`).

**Important:**  
- **QR codes / links you already gave recruiters:** If they point to a `*.vercel.app` URL, those will keep working as long as you don’t delete the project.  
- **To have one permanent URL:** Use the custom domain (e.g. `keerthanajayamoorthy.com`) for all **new** materials and QR codes. You can add the custom domain and keep the old `*.vercel.app` URL working at the same time—both point to the same project.  
- **Adding more projects/content:** Deployments and “uploading more URLs” (new pages, projects, etc.) are done via Git (push to GitHub). The **domain name** does not change when you add content; only the project is updated.

---

## Quick checklist

- [ ] Domain purchased on GoDaddy  
- [ ] Domain added in Vercel (Settings → Domains)  
- [ ] Nameservers updated at GoDaddy to Vercel’s (or A/CNAME records added)  
- [ ] Waited for DNS propagation; Vercel shows “Valid Configuration”  
- [ ] Visited `https://yourdomain.com` and confirmed the portfolio loads  
- [ ] Use this same URL for future QR codes and resumes so the link never has to change

---

## Troubleshooting

- **“Invalid configuration” in Vercel:** Wait a bit longer for DNS, or double-check nameservers/records.  
- **SSL certificate:** Vercel provisions HTTPS automatically for your domain; no extra step on GoDaddy.  
- **www vs non-www:** In Vercel Domains you can add both `yourdomain.com` and `www.yourdomain.com` and set one as primary (redirect).
