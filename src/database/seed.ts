// Seeds initial portfolio data for admin dashboard development.
import "dotenv/config";
import { db } from "./db.js";
import { activityUpdates, profile, projects, skills } from "../schema/index.js";

const now = new Date();

const seedProjects = [
  {
    title: "Personal Portfolio",
    description:
      "Responsive portfolio website with admin panel and CMS-like management.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    projectUrl: "https://portfolio.example.com",
    updatedAt: now,
  },
  {
    title: "E-Commerce Dashboard",
    description:
      "Analytics dashboard with charts, product management, and order tracking.",
    imageUrl: "https://images.unsplash.com/photo-1551281044-8b51d9f2d4f0",
    projectUrl: "https://dashboard.example.com",
    updatedAt: now,
  },
  {
    title: "Task Management App",
    description:
      "Collaborative task manager with role-based access and notifications.",
    imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71",
    projectUrl: "https://tasks.example.com",
    updatedAt: now,
  },
];

const seedSkills = [
  {
    name: "TypeScript",
    level: "Advanced",
    category: "Frontend",
    updatedAt: now,
  },
  {
    name: "ElysiaJS",
    level: "Intermediate",
    category: "Backend",
    updatedAt: now,
  },
  {
    name: "PostgreSQL",
    level: "Intermediate",
    category: "Database",
    updatedAt: now,
  },
  {
    name: "Drizzle ORM",
    level: "Intermediate",
    category: "Backend",
    updatedAt: now,
  },
  { name: "React", level: "Advanced", category: "Frontend", updatedAt: now },
];

const seedProfile = [
  {
    fullName: "John Developer",
    headline: "Full Stack Web Developer",
    bio: "I build maintainable web applications with modern TypeScript stacks.",
    email: "john.developer@example.com",
    location: "Jakarta, Indonesia",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    updatedAt: now,
  },
];

const seedActivityUpdates = [
  {
    mediaType: "image" as const,
    mediaUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952",
    title: "Workshop Session",
    caption:
      "Berbagi sesi hands-on untuk tim frontend tentang clean architecture.",
    activityTime: now,
    uploadedBy: "user",
    updatedAt: now,
  },
  {
    mediaType: "video" as const,
    mediaUrl: "https://example.com/videos/product-demo.mp4",
    title: "Product Demo",
    caption: "Demo fitur baru dashboard kepada stakeholder.",
    activityTime: now,
    uploadedBy: "user",
    updatedAt: now,
  },
];

const runSeed = async () => {
  // Reset tables so seeding is repeatable during development.
  await db.delete(projects);
  await db.delete(skills);
  await db.delete(profile);
  await db.delete(activityUpdates);

  await db.insert(projects).values(seedProjects);
  await db.insert(skills).values(seedSkills);
  await db.insert(profile).values(seedProfile);
  await db.insert(activityUpdates).values(seedActivityUpdates);

  console.log(
    "Seed completed: projects, skills, profile, and activity updates are populated.",
  );
};

runSeed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
