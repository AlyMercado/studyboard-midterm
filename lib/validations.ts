import { z } from "zod";

// TODO (Step 3): Define registerSchema.
// Fields: name (string, required, max 100), email (valid email),
// password (string, min 8 characters)
export const registerSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Input a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// TODO (Step 4): Define createGroupSchema.
// Fields: name (string, required, max 100), subject (string, required,
// max 100), memberCount (optional positive integer)
export const createGroupSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  subject: z.string().trim().min(1, "Subject is required").max(100),
  memberCount: z.number().int().positive().optional(),
});

// TODO (Step 4): Derive updateGroupSchema from createGroupSchema, making
// every field optional (hint: there's a Zod method for exactly this -
// look up ".partial()" in the Zod docs)
export const updateGroupSchema = createGroupSchema.partial();

// TODO (Step 5): Define createTaskSchema.
// Fields: title (string, required, max 200)
export const createTaskSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
});

// TODO (Step 5): Define updateTaskSchema.
// Fields: title (optional string, max 200), done (optional boolean)
export const updateTaskSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200).optional(),
  done: z.boolean().optional(),
});