'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faSpinner, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';
import { SignupFormValues } from '../../types/Signup.types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupSchema } from '../../schemas/Signup.schema';
import signupActions from '../../server/Signup.actions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import PasswordStrengthIndicator from '../shared/PasswordStrengthIndicator';

export default function SignupForm() {
    const Router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting }, setError, watch } = useForm<SignupFormValues>({
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            password: '',
            rePassword: '',
            terms: false,
        },
        resolver: zodResolver(SignupSchema),
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
    });

    const passwordValue = watch('password');


    const onSubmit: SubmitHandler<SignupFormValues> = async (values) => {
        try {
            const result = await signupActions(values);
            if (result && result.success) {
                toast.success(result.message);
                setTimeout(() => {
                    Router.push('/login')
                }, 2000)
            } else if (result) {
                if (result.errors) {
                    Object.keys(result.errors).forEach((key) => {
                        const errors = result.errors as Record<string, string>;
                        setError(key as keyof SignupFormValues, { message: errors[key] || 'Error' })
                    });
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    }
    return (
        <>
            <div className="bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 w-full max-w-lg mx-auto transform transition-all">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">Create an account</h2>
                    <p className="text-gray-500 font-medium">Start your journey with us today</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                    <button className="flex-1 flex items-center justify-center gap-3 py-3.5 border border-gray-200 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all font-bold text-gray-700 active:scale-95">
                        <FontAwesomeIcon icon={faGoogle} className="text-red-500 text-xl" />
                        <span>Google</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-3 py-3.5 border border-gray-200 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all font-bold text-gray-700 active:scale-95">
                        <FontAwesomeIcon icon={faFacebook} className="text-blue-600 text-xl" />
                        <span>Facebook</span>
                    </button>
                </div>
                <div className="relative mb-10">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-100"></div>
                    </div>
                    <div className="relative flex justify-center text-sm font-bold uppercase tracking-widest">
                        <span className="px-5 bg-white text-gray-400">Or continue with</span>
                    </div>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="group">
                        <label className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2 block ml-1 group-focus-within:text-primary-600 transition-colors" htmlFor="name">Full Name</label>
                        <input className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-gray-300 bg-gray-50/50 focus:bg-white " type="text" id="name" placeholder="Enter your full name" {...register("name")} />
                    </div>
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    <div className="group">
                        <label className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2 block ml-1 group-focus-within:text-primary-600 transition-colors" htmlFor="email">Email Address</label>
                        <input className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-gray-300 bg-gray-50/50 focus:bg-white" type="email" id="email" placeholder="Enter your email address" {...register("email")} />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    <div className="group">
                        <label className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2 block ml-1 group-focus-within:text-primary-600 transition-colors" htmlFor="phone">Phone Number</label>
                        <input className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-gray-300 bg-gray-50/50 focus:bg-white" type="text" id="phone" placeholder="Enter your phone number" {...register("phone")} />
                    </div>
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                    <div className="group">
                        <label className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2 block ml-1 group-focus-within:text-primary-600 transition-colors" htmlFor="password">Password</label>
                        <div className="relative">
                            <input className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-gray-300 bg-gray-50/50 focus:bg-white" type="password" id="password" placeholder="Enter your password" {...register("password")} />
                        </div>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        <PasswordStrengthIndicator password={passwordValue} />
                    </div>
                    <div className="group">
                        <label className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2 block ml-1 group-focus-within:text-primary-600 transition-colors" htmlFor="confirmPassword">Confirm Password</label>
                        <input className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-gray-300 bg-gray-50/50 focus:bg-white" type="password" id="confirmPassword" placeholder="Confirm your password" {...register("rePassword")} />
                    </div>
                    {errors.rePassword && <p className="text-red-500 text-sm mt-1">{errors.rePassword.message}</p>}
                    <div className="terms flex items-start gap-4 py-3 group/terms">
                        <div className="relative flex items-center">
                            <input type="checkbox" id='terms' className="peer appearance-none w-6 h-6 border-2 border-gray-200 rounded-lg checked:bg-primary-500 checked:border-primary-500 transition-all cursor-pointer focus:ring-4 focus:ring-primary-500/10 outline-none"  {...register("terms")} />
                            <svg className="absolute w-4 h-4 text-white left-1 hidden peer-checked:block pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                        <label htmlFor="terms" className="text-sm font-medium text-gray-500 select-none cursor-pointer leading-tight group-hover/terms:text-gray-700 transition-colors">
                            I agree to the <Link href="/terms-of-service" className="text-primary-600 font-bold hover:underline underline-offset-4 decoration-2">Terms of Service</Link> and <Link href="/privacy-policy" className="text-primary-600 font-bold hover:underline underline-offset-4 decoration-2">Privacy Policy</Link>
                        </label>
                    </div>
                    {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms.message}</p>}
                    <button disabled={isSubmitting} type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white font-black py-5 rounded-[1.25rem] flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-xl shadow-primary-500/30 text-lg uppercase tracking-widest mt-4">
                        {isSubmitting ? <>
                            <FontAwesomeIcon icon={faSpinner} spin className='me-2' />
                            <span>creating an account</span>
                        </> : <>
                            <FontAwesomeIcon icon={faUserPlus} />
                            <span>Create My Account</span>
                        </>
                        }
                    </button>
                </form>
                <p className="mt-10 text-center text-gray-500 font-bold text-sm">
                    Already have an account? <Link href={'/login'} className="text-primary-600 font-black hover:underline underline-offset-8 decoration-2 ml-2 tracking-tight">Log In Now</Link>
                </p>
            </div>
        </>
    )
}