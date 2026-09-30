# Portfolio

Personal portfolio and articles built with Astro, deployed to Cloudflare Workers.
Content is managed with [Keystatic](https://keystatic.com) and stored as files
in this repo — there is no database.

## Commands

| Command        | Action                                                  |
| :------------- | :------------------------------------------------------ |
| `yarn install` | Install dependencies (Node >= 22.12)                    |
| `yarn dev`     | Start the site at `localhost:4321` (Cloudflare runtime) |
| `yarn cms`     | Start the site with the CMS enabled (Node runtime)      |
| `yarn build`   | Build for production to `./dist/`                       |
| `yarn preview` | Preview the production build locally                    |

## Editing content

1. Run `yarn cms` and open <http://localhost:4321/keystatic>.
2. Edit an article or the portfolio sections (profile, projects, experience,
   tech stack) and save. Keystatic writes the changes straight to
   `src/content/`.
3. Check the result at <http://localhost:4321>, then commit and push:

   ```sh
   git add src/content
   git commit -m "Add post: <title>"
   git push
   ```

Pushing to `main` triggers a Cloudflare rebuild; the change is live once the
deploy finishes.

The CMS is not available on the live site. To enable browser editing there,
see the GitHub mode note at the top of `keystatic.config.ts`.

## Where content lives

| Path                           | Content                                   |
| :----------------------------- | :---------------------------------------- |
| `src/content/blog/*.md`        | Articles (`draft: true` hides an article) |
| `src/content/profile.json`     | Name, bio, links, SEO                     |
| `src/content/projects.json`    | Projects (`pinned` shows on the home page) |
| `src/content/experience.json`  | Work history                              |
| `src/content/skills.json`      | Tech stack                                |

`src/data/data.js` maps these files to the shapes the components use.
