# Creator

A small scaffold to demo a visual drag-and-drop layout editor (HTML / JS) and provide a place to integrate ActionForge in this repository.

## What I added ✅

- `web/` — lightweight HTML/JS demo showcasing visual drag-and-drop using SortableJS (`index.html`, `app.js`, `style.css`).
- `package.json` — project metadata and scripts (`start`, `setup-actionforge`).
- `scripts/setup-actionforge.sh` — placeholder script the CI workflow runs to install or configure ActionForge. Update it with the correct install commands or repo URL.
- `.github/workflows/actionforge-setup.yml` — GitHub Actions workflow that runs the setup script on pushes to `main` and `feature/actionforge-setup`.

## Running the demo locally 🔧

1. Install dependencies:

```bash
npm install
```

2. Start a simple server and open the demo:

```bash
npm run start
# Then open http://localhost:8080 in your browser
```

3. Drag components from the left palette onto the canvas to build a layout.

## ActionForge integration (next steps) 💡

- The included CI workflow will run `npm run setup-actionforge` which executes `scripts/setup-actionforge.sh`.
- Edit `scripts/setup-actionforge.sh` with the correct *ActionForge* install command (npm package name or repository) and any required configuration.

If you tell me the exact ActionForge package or repo URL I can update the script to install and configure it automatically.

