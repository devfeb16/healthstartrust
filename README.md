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

2. The project is a static website. Simply open `index.html` in a web browser or serve it using a local web server.

3. For local development, you can use:
   - Python: `python -m http.server 8000`
   - Node.js: `npx http-server`
   - VS Code Live Server extension

4. The project structure:
   - `index.html` - Main HTML file
   - `static/` - CSS and JavaScript files
   - `css/` - Inline styles
   - `js/` - Inline scripts
   - Various asset directories for images and external resources

