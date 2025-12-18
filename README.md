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

### Exporting graphs from the visual editor

- The web demo includes **Export Graph (Download YAML)** and **Export JSON** buttons that generate a minimal Actionforge graph from the current canvas. Use the YAML export when creating graphs for the Actionforge Action.
- To import an exported YAML into the repository, either:
  - Run `scripts/commit-graph.sh exported-file.yml` locally — it will create a branch `graph-export/<ts>` and push it to origin; the repository has a workflow that will create a pull request to import the file into `.github/workflows/graphs/` automatically.
  - Or manually move the file into `.github/workflows/graphs/` and push.

If you provide a real Actionforge graph file, I can replace the placeholder in `.github/workflows/graphs/example.yml` and enable automatic runs on push.

