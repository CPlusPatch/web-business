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

## Administration

### Adding new users (for now)

You may use the following JS scripts to generate a hashed password with Node's `crypto` library:

```js
import { randomBytes, pbkdf2 } from "crypto";

export function createSalt(length = 128) {
	return randomBytes(length).toString("base64");
}

export function createPasswordHash(
	password,
	salt = "",
	iterations = 10000
) {
	return new Promise((resolve, reject) => {
		pbkdf2(password, salt, iterations, 100, "sha256", (err, derivedKey) => {
			if (err) return reject(err);
			return resolve(`${derivedKey.toString("hex")}:${salt}`);
		});
	});
}
```

To use it, run `createSalt` to generate a random salt, then run `createPasswordHash("your password here", salt)` to generate a new salted password.

Passwords are stored as `hash:salt` in the database, and `createPasswordHash` outputs this format.

To continue, you will need some kind of [SQLite browser](https://sqlitebrowser.org/) and a working instance of the web app: more administration tools are coming soon.

Open to the `user` table, and insert the following row:
```
┌────────────┬──────────────────┬───────────────┐
│  username  │   display_name   │ oauthAccounts │
├────────────┼──────────────────┼───────────────┤
│ A username │ New display name │ []            │
└────────────┴──────────────────┴───────────────┘
```

All the other fields may be left blank or will be generated automatically. If the user needs to be an admin, that is a creator of posts, insert this row instead:

```
┌────────────┬───────┬──────────────────┬───────────────┐
│  username  │ role  │   display_name   │ oauthAccounts │
├────────────┼───────┼──────────────────┼───────────────┤
│ A username │ admin │ New display name │ []            │
└────────────┴───────┴──────────────────┴───────────────┘
```

You can save and login with your new credentials now.

## Scripts for development

### Images

Convert all JPEG images to WebP (uses ImageMagick)
```bash
magick mogrify -format webp *.jpeg
```
Convert all JPEG images to WebP (uses ImageMagick)

Resize all images to 250x250 (when adding languages to `/public/static/languages/`)
```bash
mogrify -path . -auto-orient -thumbnail 250x *.png
```

## Writing custom templates

To add custom templates to the CMS block system, open the `templates/` directory, then create two files inside a category folder: `TemplateName.vue` and `TemplateName.js`. You may also create new folders, the location doesn't matter as long as it's inside `templates/`.

Inside the `.vue` file you may write a new Vue component. You will need to add this block of code:

```vue
<script setup lang="ts">
defineProps<{
	editable: boolean;
}>();

const emit = defineEmits(["editField"]);
</script>
```

After this, you may add whatever parameters you want such as `textHeader` for a heading, `list` for a list and more. Please refer to other existing components for more.

You will need to write the contents of the `.js` file according to how the other files are written, please look at those examples.
## Attributions

I will add more attributions when I find the image sources (mostly logos)

Evan You, https://github.com/yyx990803, CC BY 4.0 
<https://creativecommons.org/licenses/by/4.0>, via Wikimedia Commons, for the VueJS logo

## Internals

Data is stored inside `web.sqlite` at the root directory. This may be migrated to PostgreSQL in the future, as this is an early alpha project.

When uploading images, they are converted to WebP inside the browser itself before upload.

---
Licensed under GPLv3. Made with 💕