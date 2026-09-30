// Content is edited through Keystatic (/keystatic) and stored as JSON in
// src/content. This module maps it to the shapes the components use.
import profile from "../content/profile.json";
import skillsData from "../content/skills.json";
import projectsData from "../content/projects.json";
import experienceData from "../content/experience.json";

export const about = {
  name: profile.name,
  role: profile.role,
  location: profile.location,
  avatar: profile.avatar,
  about: profile.about,
  email: profile.email,
};

export const seo = {
  title: `${profile.name} | Software Engineer`,
  description: profile.seoDescription,
  keywords: profile.seoKeywords,
};

export const forms = {
  formspreeUrl: profile.formspreeUrl,
};

export const skills = skillsData.items.map((skill) => ({
  ...skill,
  alt: `${skill.name} logo`,
}));

export const socials = {
  github: profile.github,
  linkedin: profile.linkedin,
  website: profile.website,
};

export const projects = {
  pinProjects: projectsData.items.filter((p) => p.pinned),
  otherProjects: projectsData.items.filter((p) => !p.pinned),
};

export const experience = experienceData.items;
