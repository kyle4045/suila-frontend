# SuiLa 水啦 — phone app (frontend)

The phone app for the SuiLa smart water-bottle base. It runs as a website on
the phone and is built with React, Vite and TypeScript. The text is in
繁體中文 and English.

## Run it

Needs Node.js 22 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:8443. With no backend set, the app runs on its own
sample data.

## Connect your backend

1. Copy `.env.example` to `.env.local`.
2. Set `VITE_API_URL` to your backend's address, for example
   `VITE_API_URL=http://localhost:3000`.
3. Restart `npm run dev`.

**[BACKEND.md](BACKEND.md) lists every call the app makes**, with what it
sends and what it expects back, plus the CORS and login-cookie setup the
backend must allow. All server calls live in one file, `src/api/index.ts`. If
your addresses or field names differ, only that file needs to change.

## Where things are

| Path | What it holds |
|---|---|
| `src/api/index.ts` | Every backend call, with the sample-data fallback |
| `src/data/mock.ts` | The sample data, shaped like real data |
| `src/screens/` | One file per screen |
| `src/components/` | Shared pieces (header, buttons, dialogs) |
| `src/i18n/` | All visible text, one file per language |
| `src/index.css` | All styles |

## Other commands

- `npm run build` builds the site into `dist/`.
- `npm test` runs the small self-checks.

## More

- [CHANGES.md](CHANGES.md): what changed from the first Figma version and why,
  grouped by screen.
- [PRODUCT.md](PRODUCT.md): product facts and decisions.
- Hidden demo panel for presentations: tap 「水啦 SuiLa」 in the top bar five
  times quickly.
