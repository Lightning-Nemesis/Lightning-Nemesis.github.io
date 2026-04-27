## Three small changes

### 1. Download resume as `Resume_Amrit_Mahajan.pdf`
In `src/components/portfolio/Hero.tsx` and `src/components/portfolio/Nav.tsx` (wherever the resume `<a download>` lives), add an explicit filename to the `download` attribute:
```tsx
<a href={profile.resumeUrl} download="Resume_Amrit_Mahajan.pdf">
```
The file on disk stays at `public/resume.pdf` — only the saved filename changes.

### 2. Favicon → lightning symbol
Replace the current Lovable heart favicon with a lightning bolt (matches the `Lightning-Nemesis` GitHub handle).
- Create `public/favicon.svg` with an inline lightning bolt SVG (using the site's primary color so it works on light/dark browsers).
- Delete `public/favicon.ico` so the browser stops auto-requesting the old one.
- In `index.html`, add `<link rel="icon" href="/favicon.svg" type="image/svg+xml" />` inside `<head>`.

### 3. Hero stat: drop "App Reach 40M+ users", fold into Bajaj Finance card
In `src/data/portfolio.ts`, change `heroStats` from 4 cards to 3 by removing the standalone "App Reach" card and updating the Bajaj Finance card to convey both scale and retention:

```ts
export const heroStats = [
  { label: "MS CS @ ASU", value: "4.0 GPA" },
  { label: "Wells Fargo", value: "Gen AI Intern" },
  { label: "Bajaj Finance", value: "40M+ users · +3.8% retention" },
];
```

The Hero grid is already `grid-cols-2 sm:grid-cols-4` — it will reflow cleanly to 3 cards on desktop with no layout fix needed (the last cell just stays empty). If you'd prefer a tighter layout, I can switch it to `sm:grid-cols-3` at the same time — let me know.

### Files touched
- `src/components/portfolio/Hero.tsx` — `download` attribute
- `src/components/portfolio/Nav.tsx` — `download` attribute (if it has a resume link)
- `src/data/portfolio.ts` — `heroStats` array
- `index.html` — favicon link
- `public/favicon.svg` — new lightning bolt icon
- `public/favicon.ico` — deleted
