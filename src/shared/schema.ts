import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type Marketplace = 'daraz' | 'temu' | 'aliexpress' | 'telemart' | 'priceoye';

export type Product = {
  id: string;
  title: string;
  image: string;
  marketplace: Marketplace;
  currentPrice: number;
  originalPrice?: number;
  discount?: number;
  rating?: number;
  reviews?: number;
  shipping?: string;
  inStock: boolean;
  affiliateLink: string;
};

export type PriceHistory = {
  date: string;
  price: number;
  marketplace: Marketplace;
};

export type FakeSaleStatus = 'genuine' | 'fair' | 'suspicious';

export type ProductDetail = Product & {
  description?: string;
  priceHistory: PriceHistory[];
  fakeSaleStatus: FakeSaleStatus;
  averagePrice: number;
  lowestPrice: number;
  highestPrice: number;
};
