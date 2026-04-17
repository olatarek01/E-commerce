import {z} from 'zod'


const loginSchema = z.object({
    email: z.string().nonempty('email is required').pipe(z.email('Please enter a valid email address')),
    password: z.string().nonempty('password is requierd'),
    rememberMe: z.boolean().optional()
});

export type LoginScreenType = z.infer<typeof loginSchema>

export default loginSchema;