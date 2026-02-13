# GoDaddy DNS Setup for Vercel

## Step-by-Step Instructions

### Step 1: Get DNS Records from Vercel

1. Go to your Vercel dashboard
2. Click on your project
3. Go to **Settings** → **Domains**
4. Click on `raymondrevelmusic.com`
5. You'll see DNS records that look like this:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
6. **Copy these exact values** - you'll need them!

---

### Step 2: Log into GoDaddy

1. Go to: https://www.godaddy.com/
2. Click **Sign In** (top right)
3. Enter your GoDaddy username and password

---

### Step 3: Access DNS Management

1. After logging in, click **My Products** (top menu)
2. Find `raymondrevelmusic.com` in your domain list
3. Click the **DNS** button (or three dots → **Manage DNS**)

---

### Step 4: Add DNS Records

You'll see a list of existing DNS records. You need to add/modify these:

#### Record 1: A Record for Root Domain

1. Scroll down to the **Records** section
2. Click **Add** button
3. Fill in:
   - **Type**: Select **A** from dropdown
   - **Name**: Enter `@` (or leave blank - GoDaddy will auto-fill)
   - **Value**: Enter the IP address from Vercel (usually `76.76.21.21`)
   - **TTL**: Leave as default (usually 600 seconds)
4. Click **Save**

#### Record 2: CNAME Record for www

1. Click **Add** button again
2. Fill in:
   - **Type**: Select **CNAME** from dropdown
   - **Name**: Enter `www`
   - **Value**: Enter `cname.vercel-dns.com` (or what Vercel shows)
   - **TTL**: Leave as default
3. Click **Save**

---

### Step 5: Remove Conflicting Records (Important!)

**Before adding new records, check for conflicts:**

1. Look for existing **A records** for `@` or blank name
2. Look for existing **CNAME records** for `www`
3. **If you find any**, you have two options:
   - **Option A**: Edit them to match Vercel's values
   - **Option B**: Delete them and add new ones

**To Edit:**
- Click the pencil icon (✏️) next to the record
- Update the Value to match Vercel's requirements
- Click Save

**To Delete:**
- Click the trash icon (🗑️) next to the record
- Confirm deletion

---

### Step 6: Verify Records

After adding/editing, your DNS records should look like:

```
Type    Name    Value                    TTL
A       @       76.76.21.21              600
CNAME   www     cname.vercel-dns.com     600
```

**Important:** Use the EXACT values Vercel shows you, not these examples!

---

### Step 7: Wait for DNS Propagation

1. **Save all changes** in GoDaddy
2. **Go back to Vercel** → Settings → Domains
3. Vercel will automatically verify your DNS
4. This can take **5 minutes to 48 hours** (usually 1-2 hours)
5. You'll see a green checkmark ✅ when verified

---

### Step 8: Check Status

**In Vercel:**
- Go to Settings → Domains
- Status should change from "Invalid Configuration" to "Valid Configuration"
- May show "Pending" while DNS propagates

**Check DNS Propagation:**
- Visit: https://www.whatsmydns.net/#A/raymondrevelmusic.com
- Should show the IP address you added (76.76.21.21)

---

## Troubleshooting

### Still Showing "Invalid Configuration"?

1. **Double-check values:**
   - A record Name: `@` (or blank)
   - A record Value: Exact IP from Vercel
   - CNAME Name: `www`
   - CNAME Value: Exact domain from Vercel

2. **Remove old records:**
   - Delete any old A records pointing to Wix or other IPs
   - Delete any old CNAME records for www

3. **Wait longer:**
   - DNS can take up to 48 hours
   - Usually works within 1-2 hours

4. **Check for typos:**
   - IP address must be exact (no spaces)
   - Domain name must be exact (cname.vercel-dns.com)

### Common GoDaddy Issues

**Issue: "Name already exists"**
- You already have a record with that name
- Edit the existing record instead of creating new one

**Issue: "Invalid value"**
- Check IP address format (should be numbers only: 76.76.21.21)
- Check CNAME value (should be a domain, not IP)

**Issue: Changes not saving**
- Make sure you clicked "Save" after each record
- Refresh the page and check if records appear

---

## Visual Guide

**GoDaddy DNS Page Layout:**
```
┌─────────────────────────────────────┐
│ Records                             │
├─────────────────────────────────────┤
│ Type │ Name │ Value │ TTL │ Actions│
├─────────────────────────────────────┤
│  A   │  @   │  ...  │ 600 │ ✏️ 🗑️  │
│ CNAME│ www  │  ...  │ 600 │ ✏️ 🗑️  │
└─────────────────────────────────────┘
         [Add] button here
```

---

## After DNS is Verified

Once Vercel shows "Valid Configuration" ✅:

1. **SSL Certificate** will be automatically issued (takes a few minutes)
2. Your site will be live at:
   - `https://raymondrevelmusic.com`
   - `https://www.raymondrevelmusic.com`
3. **Disconnect from Wix** (after DNS fully propagates - wait 24-48 hours)

---

## Need More Help?

If you're still stuck:
1. **Screenshot your GoDaddy DNS records** page
2. **Copy the exact DNS values** Vercel is asking for
3. Share both with me and I can help troubleshoot!

---

## Quick Checklist

- [ ] Got DNS values from Vercel dashboard
- [ ] Logged into GoDaddy
- [ ] Opened DNS Management for raymondrevelmusic.com
- [ ] Added/edited A record for `@` with Vercel's IP
- [ ] Added/edited CNAME record for `www` with Vercel's domain
- [ ] Removed any conflicting old records
- [ ] Saved all changes
- [ ] Waiting for DNS propagation (1-2 hours)
- [ ] Checked Vercel dashboard for verification status

