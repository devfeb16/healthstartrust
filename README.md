# Project Setup

## .gitignore

This project uses a `.gitignore` file to exclude unnecessary files from version control. The following are ignored:

- **OS Files**: `.DS_Store`, `Thumbs.db`, `desktop.ini`, etc.
- **Editor Files**: `.vscode/`, `.idea/`, `*.swp`, etc.
- **Temporary Files**: `*.tmp`, `*.log`, `*.cache`
- **Archive Files**: `*.zip`, `*.tar`, `*.rar`, etc.
- **Node Modules**: `node_modules/` (if build tools are added later)
- **Environment Files**: `.env`, `.env.local`
- **Build Outputs**: `dist/`, `build/` (if build tools are added)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd neweron
   ```

2. Install dependencies if you plan to rebuild the optimized assets:
   ```bash
   npm install
   ```

3. The project is a static website. Simply open `index.html` in a web browser or serve it using a local web server.

4. For local development, you can use:
   - Python: `python -m http.server 8000`
   - Node.js: `npx http-server`
   - VS Code Live Server extension

5. Rebuild the minified CSS/JS bundle (writes to `dist/assets`) whenever you modify files under `static/css/` or `js/`:
   ```bash
   npm run build
   ```

6. The project structure:
   - `index.html` - Main HTML file
   - `static/` - CSS and JavaScript files
   - `css/` - Inline styles
   - `js/` - Inline scripts
   - Various asset directories for images and external resources
 
## GEMINI / Agent Support

- **Local GEMINI file**: A `GEMINI.md` file is available in the project root with project context and agent guidance.
- **Local settings**: A repository-local `.gemini/settings.json` exists for convenience. To make these settings available to agents globally, copy it to `%USERPROFILE%\\.gemini\\settings.json` (Windows) or `~/.gemini/settings.json` (Linux/macOS).

Refer to `GEMINI.md` for more details.

