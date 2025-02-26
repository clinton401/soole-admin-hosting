import { z } from "zod";

export const LoginSchema = z.object({
  contactInfo: z.string(),
  password: z.string(),
});

export const RegisterSchema = z.object({
    name: z
      .string()
      .trim()
      .min(3, { message: "Name must be at least 3 characters long." })
      .max(50, { message: "Name must not exceed 50 characters." }),
  
    workEmail: z
      .string()
      .trim()
      .email({ message: "Invalid  email format." }),
    personalEmail: z
      .string()
      .trim()
      .email({ message: "Invalid  email format." }),
  
    password: z
      .string()
      .trim()
      .min(6, { message: "Password must be at least 6 characters long." }),
  
 
  
    phone: z
      .string()
      .regex(/^\d+$/, { message: "Phone number must contain only digits." })
      .min(10, { message: "Phone number must be at least 10 digits long." })
      .max(15, { message: "Phone number must not exceed 15 digits." }),
  });
  