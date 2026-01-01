import { z } from 'zod';

export const logSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
  category: z.string().min(1, 'Category is required'),
  duration: z.number().min(1, 'Duration must be positive'),
  date: z.string().min(1, 'Date is required'),
  notes: z.string().optional(),
});

export const snippetSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
  language: z.string().min(1, 'Language is required'),
  code: z.string().min(1, 'Code is required'),
  description: z.string().optional(),
});

export const goalSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
  targetHours: z.number().min(1, 'Target hours must be positive'),
  currentHours: z.number().min(0, 'Current hours cannot be negative'),
  deadline: z.string().min(1, 'Deadline is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().optional(),
});

export const profileSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').max(30, 'Username too long'),
  email: z.string().email('Invalid email address'),
  profilePicture: z.string().url('Invalid URL').optional().or(z.literal('')),
  password: z.string().min(6, 'Password must be at least 6 characters').optional(),
  confirmPassword: z.string().optional(),
}).refine((data) => !data.password || data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const authSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').max(30, 'Username too long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const validateForm = (schema, data) => {
  try {
    schema.parse(data);
    return { isValid: true, errors: {} };
  } catch (error) {
    const errors = {};
    error.errors.forEach((err) => {
      const path = err.path.join('.');
      errors[path] = err.message;
    });
    return { isValid: false, errors };
  }
};
