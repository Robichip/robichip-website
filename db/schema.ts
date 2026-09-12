import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const inquiries = sqliteTable(
  "inquiries",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    intent: text("intent").notNull(),
    fullName: text("full_name").notNull(),
    email: text("email").notNull(),
    company: text("company").notNull(),
    jobTitle: text("job_title").notNull().default(""),
    phone: text("phone").notNull().default(""),
    region: text("region").notNull().default(""),
    application: text("application").notNull(),
    projectStage: text("project_stage").notNull().default(""),
    preferredWindow: text("preferred_window").notNull().default(""),
    timeZone: text("time_zone").notNull().default(""),
    quantity: text("quantity").notNull().default(""),
    targetTiming: text("target_timing").notNull().default(""),
    details: text("details").notNull(),
    consent: integer("consent", { mode: "boolean" }).notNull(),
    consentAt: text("consent_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    status: text("status").notNull().default("new"),
    owner: text("owner").notNull().default(""),
    followUpNote: text("follow_up_note").notNull().default(""),
    sourcePath: text("source_path").notNull().default("/contact"),
  },
  (table) => [
    index("inquiries_created_at_idx").on(table.createdAt),
    index("inquiries_status_created_at_idx").on(table.status, table.createdAt),
    index("inquiries_intent_created_at_idx").on(table.intent, table.createdAt),
    index("inquiries_email_idx").on(table.email),
  ],
);
