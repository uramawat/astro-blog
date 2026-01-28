# ramawat.fyi - Personal Blog Site

Author - Udit Ramawat

A personal blog site built with [Astro](https://astro.build) and deployed on [Vercel](https://vercel.com). Designed for minimal friction in writing and sharing thoughts.

## 🚀 Features

### Core Functionality
- **Drafts System**: Post frontmatter supports `draft: true` to hide content from production builds while keeping it in the repo.
- **Timeline View**: A dedicated `/timeline` page to showcase professional history and milestones.
- **Tagging**: Group posts by topics with auto-generated tag pages (e.g., `/tags/infrastructure`).

### Design & Tech Stack
- **Framework**: Astro (Static Site Generation)
- **Styling**: Vanilla CSS, consolidated globally for consistency.
- **Typography**: Uses the **Liter** font (Google Fonts) for a modern, clean reading experience.
- **Theming**: Dark/Light mode support with auto-detection.
- **Favicon**: Custom "UR" SVG icon.

## 🛠️ Development

### Project Structure
```text
/
├── public/           # Static assets (favicons, images)
├── src/
│   ├── components/   # UI components (Header, Footer)
│   ├── content/      # Markdown blog posts
│   ├── layouts/      # Page wrappers
│   ├── pages/        # Route definitions
│   └── styles/       # Global CSS
└── package.json
```

### Commands

All commands are run from the root of the project:

| Command | Action |
| :--- | :--- |
| `npm install` | Installs dependencies |
| `npm run dev` | Starts local dev server at `localhost:4321` |
| `npm run build` | Build your production site to `./dist/` |

## 📦 Deployment

This site is configured for zero-config deployment on **Vercel**.

1.  Push changes to the `main` branch on GitHub.
2.  Vercel automatically triggers a build (`npm run build`).
3.  The site is deployed to `ramawat.fyi` (managed via Porkbun DNS).
