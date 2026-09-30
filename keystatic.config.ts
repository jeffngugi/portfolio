import { config, fields, collection, singleton } from "@keystatic/core";

// Local mode edits files on disk (use with `yarn dev`). Set
// PUBLIC_KEYSTATIC_GITHUB_REPO=jeffngugi/portfolio to switch to GitHub mode,
// where every save becomes a commit and Cloudflare redeploys the site.
const githubRepo = import.meta.env.PUBLIC_KEYSTATIC_GITHUB_REPO as
  | `${string}/${string}`
  | undefined;

export default config({
  storage: githubRepo ? { kind: "github", repo: githubRepo } : { kind: "local" },
  ui: {
    brand: { name: "Geoffrey Ngugi" },
    navigation: {
      Blog: ["blog"],
      Portfolio: ["profile", "projects", "experience", "skills"],
    },
  },
  singletons: {
    profile: singleton({
      label: "Profile",
      path: "src/content/profile",
      format: { data: "json" },
      schema: {
        name: fields.text({ label: "Name", validation: { isRequired: true } }),
        role: fields.text({ label: "Role" }),
        location: fields.text({ label: "Location" }),
        about: fields.text({ label: "About", multiline: true }),
        email: fields.text({ label: "Email" }),
        avatar: fields.url({ label: "Avatar URL" }),
        github: fields.url({ label: "GitHub URL" }),
        linkedin: fields.url({ label: "LinkedIn URL" }),
        website: fields.url({ label: "Website URL" }),
        formspreeUrl: fields.text({ label: "Formspree form URL" }),
        seoDescription: fields.text({ label: "SEO description", multiline: true }),
        seoKeywords: fields.text({ label: "SEO keywords" }),
      },
    }),
    projects: singleton({
      label: "Projects",
      path: "src/content/projects",
      format: { data: "json" },
      schema: {
        items: fields.array(
          fields.object({
            title: fields.text({ label: "Title", validation: { isRequired: true } }),
            description: fields.text({ label: "Description", multiline: true }),
            tags: fields.array(fields.text({ label: "Tag" }), {
              label: "Tags",
              itemLabel: (props) => props.value,
            }),
            link: fields.text({ label: "Link" }),
            pinned: fields.checkbox({
              label: "Pinned",
              description: "Show on the home page",
            }),
          }),
          { label: "Projects", itemLabel: (props) => props.fields.title.value },
        ),
      },
    }),
    experience: singleton({
      label: "Experience",
      path: "src/content/experience",
      format: { data: "json" },
      schema: {
        items: fields.array(
          fields.object({
            title: fields.text({ label: "Title", validation: { isRequired: true } }),
            date: fields.text({ label: "Dates", description: "e.g. Dec 2021 – Present" }),
            description: fields.text({ label: "Description", multiline: true }),
          }),
          { label: "Roles", itemLabel: (props) => props.fields.title.value },
        ),
      },
    }),
    skills: singleton({
      label: "Tech Stack",
      path: "src/content/skills",
      format: { data: "json" },
      schema: {
        items: fields.array(
          fields.object({
            name: fields.text({ label: "Name", validation: { isRequired: true } }),
            icon: fields.text({
              label: "Icon",
              description: "Path in /public (e.g. /react.svg) or an image URL",
            }),
          }),
          { label: "Skills", itemLabel: (props) => props.fields.name.value },
        ),
      },
    }),
  },
  collections: {
    blog: collection({
      label: "Blog",
      slugField: "title",
      path: "src/content/blog/*",
      format: { contentField: "content" },
      entryLayout: "content",
      columns: ["title", "publishedDate"],
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Summary", multiline: true }),
        publishedDate: fields.date({
          label: "Published date",
          defaultValue: { kind: "today" },
          validation: { isRequired: true },
        }),
        draft: fields.checkbox({
          label: "Draft",
          description: "Drafts are hidden from the site",
        }),
        content: fields.mdx({ label: "Content", extension: "md" }),
      },
    }),
  },
});
