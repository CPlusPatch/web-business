# Web Business

## Downloading and running

This application requires Node.js 19 and the PNPM package manager to be built and deployed.

```bash
git clone https://codeberg.org/CPlusPatch/web-business.git
cd web-business
pnpm install
```

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
### Attributions

I will add more attributions when I find the image sources (mostly logos)

Evan You, https://github.com/yyx990803, CC BY 4.0 
<https://creativecommons.org/licenses/by/4.0>, via Wikimedia Commons, for the VueJS logo

---
Licensed under GPLv3. Made with 💕