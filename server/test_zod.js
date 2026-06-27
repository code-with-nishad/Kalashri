const { z } = require("zod");

const registerAdminSchema = z.object({
    adminSecret: z.string({ required_error: "Admin secret is required" }),
    firstName: z.string({ required_error: "First name is required" }).trim().min(1, "First name cannot be empty"),
    lastName: z.string({ required_error: "Last name is required" }).trim().min(1, "Last name cannot be empty"),
    email: z.string({ required_error: "Email is required" }).email("Invalid email format").trim().toLowerCase(),
    phone: z.string({ required_error: "Phone number is required" }).trim().min(1, "Phone number cannot be empty"),
    password: z.string({ required_error: "Password is required" }).min(6, "Password must be at least 6 characters long"),
});

const result = registerAdminSchema.safeParse({});
console.log(result.error.errors);
console.log(result.error.issues);
