# Web Business

A fast, sleek and beautiful website + full content management system developed with NuxtJS.

It is designed to be minimal but efficient, secure and lightweight.

This application is heavily branded for my usage as a personal website, but you are free to fork it under GPL and modify the branding to your preferences.

Theming options will likely be added later on in this project's development history.

## Requirements

- A system that can run Node.js (Linux is HEAVILY recommended)
- An S3 or S3 compatible bucket (for example, Cloudflare R2)

## Downloading and running

This application requires Node.js 19 and the PNPM package manager to be built and deployed.

```bash
git clone https://codeberg.org/CPlusPatch/web-business.git
cd web-business
pnpm install
```

Then:
```bash
cp .env.example .env
```

Then, fill out .env with a randomly generated string (I suggest that you use at least 16 characters for this), and fill out values for the S3 or S3-compatible bucket (such as Cloudflare R2, which I am using)

For the CDN URL, do not include a trailing slash at the end.

## Building

```bash
pnpm build # Bundles project into JS files

# EITHER
pnpm preview # For testing
pm2 start ecosystem.config.js # For production deployment
```

## Scripts for development

### Images

Convert all JPEG images to WebP (uses ImageMagick)
```bash
magick mogrify -format webp *.jpeg
```

Resize all images to 250x250 (when adding languages to `/public/static/languages/`)
```bash
mogrify -path . -auto-orient -thumbnail 250x *.png
```
## Attributions

I will add more attributions when I find the image sources (mostly logos)

Evan You, https://github.com/yyx990803, CC BY 4.0 
<https://creativecommons.org/licenses/by/4.0>, via Wikimedia Commons, for the VueJS logo

## Internals

Data is stored inside `web.sqlite` at the root directory. This may be migrated to PostgreSQL in the future, as this is an early alpha project.

When uploading images, they are converted to WebP inside the browser itself before upload.

---
Licensed under GPLv3. Made with 💕