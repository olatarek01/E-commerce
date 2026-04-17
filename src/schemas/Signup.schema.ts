import {z} from 'zod';

export const SignupSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long').max(50, 'Name must be at most 50 characters long'),
    email: z.email('Invalid email address'),
    phone: z.string().min(11, 'Phone number must be at least 11 digits long').max(15, 'Phone number must be at most 15 digits long').regex(/^\+20(10|11|12|15)[0-9]{8}$/gm, 'Invalid Egyptian phone number'),
    password: z.string().min(8, 'Password must be at least 8 characters long').max(100, 'Password must be at most 100 characters long').regex(/[A-Z]/, 'Password must contain at least one uppercase letter').regex(/[a-z]/, 'Password must contain at least one lowercase letter').regex(/[0-9]/, 'Password must contain at least one number').regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    rePassword: z.string(),
    terms: z.boolean().refine((value)=> value === true, { error:'You must accept the terms and conditions'}),
}).refine((data) => data.password === data.rePassword, {
    message: 'Passwords do not match',
    path: ['rePassword']
})