import { z } from "zod";

// TODO (Step 1): Define a Zod schema validating our required env vars.
// This should fail LOUDLY and IMMEDIATELY if the app is misconfigured,
// rather than letting a missing DATABASE_URL surface as a confusing
// Prisma error three requests later.
//
// Fields needed:
//   DATABASE_URL   - a non-empty string
//   NEXTAUTH_SECRET - a string, at least 32 characters long
//
const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is Required"),
  NEXTAUTH_SECRET: z.string().min(32, "NEXTAUTH_SECRET should be at least 32 characters"),
});

// TODO (Step 1): Parse process.env against your schema and export the
// result. .parse() (not .safeParse()) is correct here — we WANT this to
// throw and crash the app immediately if the environment is misconfigured.
//
export const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
});