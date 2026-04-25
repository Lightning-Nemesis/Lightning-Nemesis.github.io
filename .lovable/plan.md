## Plan

Copy your uploaded resume to `public/resume.pdf` so the existing Download buttons work with no code changes.

### Step
- Copy `user-uploads://Resume_Amrit_Mahajan_DS.pdf` → `public/resume.pdf`

### Why this location
- `profile.resumeUrl` in `src/data/portfolio.ts` is already set to `/resume.pdf`.
- Files in `public/` are served at the site root, so `/resume.pdf` resolves immediately.
- Both the Hero "Download Resume" button and the Nav "Resume" button will work with no code changes.

### Verification
After the copy, visiting `<preview-url>/resume.pdf` should open the PDF, and both download buttons should trigger a download.

### Not changing
- No code changes needed — `profile.resumeUrl` already points to `/resume.pdf`.
- Filename normalized to lowercase, no spaces, so the URL stays clean.