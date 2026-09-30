import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const transactions = sqliteTable("transactions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  description: text("description").notNull(),
  category: text("category").notNull().default("Outros"),
  account: text("account").notNull(),
  type: text("type", { enum: ["income", "expense"] }).notNull(),
  recurrence: text("recurrence", { enum: ["one_time", "monthly", "installment"] }).notNull(),
  amountCents: integer("amount_cents").notNull(),
  startDate: text("start_date").notNull(),
  installmentCount: integer("installment_count").notNull().default(1),
  paid: integer("paid", { mode: "boolean" }).notNull().default(false),
  paidAt: text("paid_at"),
  createdAt: text("created_at").notNull(),
});
