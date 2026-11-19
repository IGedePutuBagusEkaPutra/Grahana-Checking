# DEPLOYMENT FRONTEND

## Build
```bash
npm install
npm test
npm run build
```
Hasil build berada di `dist/`.

## GitHub Pages
1. Buat repository GitHub.
2. Sesuaikan `base` di `vite.config.js` dengan nama repository, contoh `/grahana-checking/`.
3. Push branch `main`.
4. Repository → Settings → Pages → Source: GitHub Actions.
5. Workflow `.github/workflows/deploy.yml` akan membangun dan deploy `dist/`.
6. Buka URL Pages dan lakukan smoke test.

Jika memakai Vercel/Netlify, import repository; Build command `npm run build`, output directory `dist`.

Hosting statis tidak menyediakan backend/auth. Jangan menaruh data rahasia pada source atau LocalStorage.
