# GEMINI — Project Context for Agents

Purpose
- Provide concise instructions and project context for automated agents (MCP/GEMINI).

Project overview
- Name: healthstartrust
- Location: `d:\promgramming\copywebsite\neweron`
- Primary files: `index.html`, `about-us.html`, `contact.html`, `components/` (header/footer), `css/`, `js/`.

How agents should help
- When asked to modify files, prefer small, targeted edits using project style.
- For UI changes, edit `components/header.html` and `components/footer.html` where possible.
- For global styles, edit files under `css/` or `ldsiq_public.s3.us_east_2.amazonaws.com/static/css`.

Local development notes
- This is a static site with assets stored in the repo and in `ldsiq_public.s3.us_east_2.amazonaws.com/static`.
- The workspace is Windows-based; path examples use backslashes (e.g., `d:\promgramming\copywebsite\neweron`).

MCP / GEMINI guidance
- Add MCP server configs to `~/.gemini/settings.json` to extend agent capabilities.
- A repository-local `.gemini/settings.json` is provided for convenience; move it to `~/.gemini/settings.json` if you want it globally available.

Contact / Maintainer
- Repo owner: `devfeb16`
- Branch: `main`

Additional notes
- If asked to run commands, use PowerShell syntax; chain commands with `;`.
- If any change touches many files, ask for confirmation first.
