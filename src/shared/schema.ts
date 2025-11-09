import { z } from "zod";

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

// User schema for frontend validation
export const insertUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = {
  id: string;
  username: string;
  password: string;
};
