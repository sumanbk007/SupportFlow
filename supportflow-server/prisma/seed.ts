import "dotenv/config";
import bcrypt from "bcryptjs";

import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "../src/config/env.js";

const databaseUrl = env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined");
}

const adapter = new PrismaPg({
  connectionString: databaseUrl,
});

const prisma = new PrismaClient({
  adapter,
});

const seedAdmin = async () => {
  const firstName = process.env.ADMIN_FIRST_NAME;
  const lastName = process.env.ADMIN_LAST_NAME;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!firstName || !lastName || !email || !password) {
    throw new Error(
      "ADMIN_FIRST_NAME, ADMIN_LAST_NAME, ADMIN_EMAIL and ADMIN_PASSWORD are required",
    );
  }

  const existingAdmin = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingAdmin) {
    console.log(`Admin already exists: ${email}`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      passwordHash,
      role: "ADMIN",
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
    },
  });

  console.log("Admin created successfully:");
  console.log(admin);
};

const DEFAULT_CATEGORIES = [
  { name: "Technical Support", description: "Issues with product functionality or bugs" },
  { name: "Billing", description: "Questions about invoices and billing cycles" },
  { name: "Payment", description: "Payment methods, failures, and refunds" },
  { name: "Account", description: "Account access, profile, and settings" },
  { name: "General", description: "General inquiries that don't fit other categories" },
];

const seedCategories = async () => {
  for (const category of DEFAULT_CATEGORIES) {
    const existing = await prisma.category.findUnique({
      where: { name: category.name },
    });

    if (existing) {
      continue;
    }

    await prisma.category.create({ data: category });
    console.log(`Category created: ${category.name}`);
  }
};

const main = async () => {
  try {
    await seedAdmin();
    await seedCategories();
  } finally {
    await prisma.$disconnect();
  }
};

main().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
