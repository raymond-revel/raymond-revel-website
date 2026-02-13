# Fix: GoDaddy DNS Records Greyed Out

## The Problem

If "Add New Record" is greyed out in GoDaddy, your domain is likely using **Wix nameservers** instead of GoDaddy's nameservers. When nameservers point to Wix, GoDaddy can't manage DNS records.

## The Solution

You need to change nameservers back to GoDaddy first, then add DNS records.

---

## Step 1: Check Current Nameservers

### In GoDaddy:
1. Log into GoDaddy
2. Go to **My Products**
3. Find `raymondrevelmusic.com`
4. Click **DNS** (or three dots → **Manage DNS**)
5. Look at the top - it will show "Nameservers"

**If you see Wix nameservers like:**
- `ns1.wixdns.net`
- `ns2.wixdns.net`
- Or similar Wix nameservers

**Then you need to change them back to GoDaddy.**

---

## Step 2: Change Nameservers Back to GoDaddy

### Option A: Use GoDaddy Default Nameservers

1. In GoDaddy DNS page, look for **"Nameservers"** section (usually at the top)
2. Click **"Change"** or **"Edit"** next to Nameservers
3. Select **"I'll use my own nameservers"** or **"Custom"**
4. Enter GoDaddy's default nameservers:
   ```
   ns1.godaddy.com
   ns2.godaddy.com
   ```
5. Click **Save**
6. Wait 5-10 minutes for nameservers to update

### Option B: Use GoDaddy's Quick Setup

1. In Nameservers section, select **"GoDaddy Nameservers"** or **"Default"**
2. Click **Save**
3. Wait 5-10 minutes

---

## Step 3: Wait for Nameserver Update

- Changes take **5-30 minutes** to propagate
- You'll know it's ready when "Add New Record" button becomes clickable
- Refresh the GoDaddy DNS page after 10 minutes

---

## Step 4: Now Add DNS Records

Once nameservers are back to GoDaddy:

1. The **"Add New Record"** button should now be clickable
2. Follow the DNS setup instructions from `GODADDY_DNS_SETUP.md`
3. Add the A record and CNAME record for Vercel

---

## Important: Don't Disconnect from Wix Yet!

**Wait to disconnect from Wix until:**
- ✅ Nameservers are changed back to GoDaddy
- ✅ DNS records are added in GoDaddy
- ✅ Vercel shows "Valid Configuration"
- ✅ DNS has propagated (check at whatsmydns.net)
- ✅ Your site works at raymondrevelmusic.com

**Then** you can disconnect from Wix.

---

## Alternative: Use Vercel Nameservers (Easier Option)

Instead of managing DNS records in GoDaddy, you can use Vercel's nameservers directly:

### In Vercel:
1. Go to Settings → Domains
2. Click on your domain
3. Vercel will show you nameservers like:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`

### In GoDaddy:
1. Change nameservers to Vercel's nameservers
2. Vercel will automatically manage all DNS records
3. No need to add A/CNAME records manually!

**This is often easier** because Vercel manages everything automatically.

---

## Step-by-Step: Change Nameservers in GoDaddy

1. **Log into GoDaddy**
2. **My Products** → Find your domain
3. Click **DNS** or **Manage DNS**
4. Look for **"Nameservers"** section (top of page)
5. Click **"Change"** or **"Edit"**
6. Select **"Custom"** or **"I'll use my own nameservers"**
7. Enter nameservers:
   - **Option 1 (GoDaddy):** `ns1.godaddy.com` and `ns2.godaddy.com`
   - **Option 2 (Vercel):** Use nameservers from Vercel dashboard
8. Click **Save**
9. Wait 10-30 minutes
10. Refresh page - "Add New Record" should now work

---

## Troubleshooting

### Still Greyed Out After Changing Nameservers?

1. **Wait longer** - Nameserver changes can take 30 minutes
2. **Refresh the page** - Hard refresh (Cmd+Shift+R on Mac)
3. **Check nameservers** - Make sure they're not still pointing to Wix
4. **Try different browser** - Sometimes browser cache causes issues

### Which Nameservers Should I Use?

**Option 1: GoDaddy Nameservers** (Manage DNS yourself)
- `ns1.godaddy.com`
- `ns2.godaddy.com`
- Then add A/CNAME records manually

**Option 2: Vercel Nameservers** (Easier - Vercel manages DNS)
- Get from Vercel dashboard
- Usually: `ns1.vercel-dns.com` and `ns2.vercel-dns.com`
- Vercel automatically configures DNS

**Recommendation:** Use Vercel nameservers - it's simpler!

---

## Quick Decision Guide

**Use GoDaddy Nameservers if:**
- You want to manage DNS yourself
- You have other services using DNS records
- You prefer more control

**Use Vercel Nameservers if:**
- You want the easiest setup
- You only need the website
- You want Vercel to manage everything automatically

---

## Next Steps

1. ✅ Change nameservers back to GoDaddy (or to Vercel)
2. ✅ Wait 10-30 minutes
3. ✅ Check if "Add New Record" is now clickable
4. ✅ Add DNS records (if using GoDaddy nameservers)
5. ✅ Wait for Vercel to verify
6. ✅ Test your site

Let me know once nameservers are changed and I can help with the next steps!

