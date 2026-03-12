// Defines database tables for projects, skills, and profile.
import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 150 }).notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  projectUrl: text("project_url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  level: varchar("level", { length: 50 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const profile = pgTable("profile", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 120 }).notNull(),
  headline: varchar("headline", { length: 180 }).notNull(),
  bio: text("bio").notNull(),
  email: varchar("email", { length: 180 }).notNull(),
  location: varchar("location", { length: 120 }).notNull(),
  avatarUrl: text("avatar_url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 180 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type ProjectInsert = typeof projects.$inferInsert;
export type SkillInsert = typeof skills.$inferInsert;
export type ProfileInsert = typeof profile.$inferInsert;
export type AdminUserInsert = typeof adminUsers.$inferInsert;
