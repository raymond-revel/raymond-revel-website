# DNS Setup Guide for raymondrevelmusic.com

## What Vercel Needs

Vercel requires specific DNS records to connect your domain. You'll see these in your Vercel dashboard under Settings → Domains.

## Typical Vercel DNS Records

Vercel usually requires one of these configurations:

### Option 1: A Record + CNAME (Most Common)

**For the root domain (`raymondrevelmusic.com`):**
```
Type: A
Name: @ (or leave blank, or use "raymondrevelmusic.com")
Value: 76.76.21.21
TTL: 3600 (or Auto)
```

**For www subdomain (`www.raymondrevelmusic.com`):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (or Auto)
```

### Option 2: CNAME Record (Alternative)

Some registrars support CNAME for root domain:
```
Type: CNAME
Name: @ (or leave blank)
Value: cname.vercel-dns.com
TTL: 3600 (or Auto)
```

**Important:** Vercel will show you the EXACT values to use in your dashboard. Use those values, not these examples!

---

## How to Add DNS Records

### Step 1: Find Your Domain Registrar

Your domain registrar is where you bought `raymondrevelmusic.com`. Common registrars:
- GoDaddy
- Namecheap
- Google Domains
- Cloudflare
- Network Solutions
- Hover
- Others

### Step 2: Access DNS Settings

1. Log into your domain registrar account
2. Find "DNS Management" or "DNS Settings" or "Name Servers"
3. Look for "DNS Records" or "Advanced DNS" section

### Step 3: Add the Records

**In Vercel Dashboard:**
1. Go to: Settings → Domains
2. Click on `raymondrevelmusic.com`
3. You'll see the exact DNS records you need
4. Copy each record exactly as shown

**At Your Domain Registrar:**
1. Find "Add Record" or "Add DNS Record" button
2. For each record Vercel shows you:
   - Select the **Type** (A, CNAME, etc.)
   - Enter the **Name** (usually `@` or `www`)
   - Enter the **Value** (the IP or domain Vercel provides)
   - Set **TTL** to 3600 or Auto
   - Click "Save" or "Add Record"

### Step 4: Wait for Propagation

- DNS changes can take 5 minutes to 48 hours
- Usually takes 1-2 hours
- Check status: https://www.whatsmydns.net/#A/raymondrevelmusic.com

---

## Common Registrars - Step by Step

### GoDaddy
1. Log in → My Products → DNS (next to your domain)
2. Click "Add" in the Records section
3. Select Type, enter Name and Value
4. Click "Save"

### Namecheap
1. Log in → Domain List → Manage (next to your domain)
2. Go to "Advanced DNS" tab
3. Click "Add New Record"
4. Select Type, enter Host and Value
5. Click Save

### Cloudflare
1. Log in → Select your domain
2. Go to DNS → Records
3. Click "Add record"
4. Select Type, enter Name and Content
5. Click "Save"

### Google Domains
1. Log in → My domains → DNS
2. Scroll to "Custom resource records"
3. Click "Add"
4. Enter Type, Name, and Data
5. Click "Add"

---

## Verify DNS Records

After adding records, verify they're correct:

1. **Check in Vercel:** Settings → Domains → Your domain
   - Should show "Valid Configuration" ✅
   - May take a few minutes to verify

2. **Check DNS Propagation:**
   - https://www.whatsmydns.net/#A/raymondrevelmusic.com
   - Should show the IP address Vercel provided

3. **Test Your Site:**
   - Visit: `https://raymondrevelmusic.com`
   - Should load your Vercel site

---

## Troubleshooting

### "Invalid Configuration" Error

**Common Causes:**
1. **Wrong IP address** - Make sure you copied the exact IP from Vercel
2. **Wrong record type** - Use A record for root, CNAME for www
3. **DNS not propagated** - Wait 1-2 hours
4. **Old records conflicting** - Remove old A/CNAME records first

**Fix:**
1. Double-check Vercel dashboard shows the exact values
2. Verify records at your registrar match exactly
3. Remove any conflicting records
4. Wait for propagation

### Still Not Working?

1. **Screenshot your DNS records** at registrar
2. **Compare with Vercel's requirements** side-by-side
3. **Check for typos** in IP addresses or domain names
4. **Contact Vercel support** if still stuck: support@vercel.com

---

## Important Notes

- ⚠️ **Don't delete existing records** unless you're sure they're not needed
- ✅ **Keep your Wix site live** until DNS fully propagates
- ⏰ **DNS changes take time** - be patient (usually 1-2 hours)
- 🔒 **SSL certificate** will be automatically issued by Vercel once DNS is verified

---

## Need Help?

If you're stuck, tell me:
1. **Your domain registrar** (GoDaddy, Namecheap, etc.)
2. **What DNS records Vercel is asking for** (screenshot or copy/paste)
3. **What you see in your registrar's DNS settings**

I can provide specific instructions for your registrar!

