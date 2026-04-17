'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEnvelope,
    faKey,
    faLock,
    faArrowLeft,
    faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import forgetPasswordSchema, { ForgetPasswordType } from '../../schemas/ForgetPassword.schema';
import ForgetPasswordAction from '../../server/ForgetPassword.action';
import { toast } from 'react-toastify';
import logo from '../../../../assets/images/freshcart-logo.svg';

const ForgetPasswordForm: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ForgetPasswordType>({
        resolver: zodResolver(forgetPasswordSchema),
        defaultValues: {
            email: '',
        },
    });

    const onSubmit: SubmitHandler<ForgetPasswordType> = async (values) => {
        setIsLoading(true);
        setIsSuccess(false);

        try {
            const result = await ForgetPasswordAction(values);

            if (result.success) {
                setIsSuccess(true);
                setSuccessMessage(result.message || 'Reset link sent to your email');
                reset();
            } else {
                toast.error(result.message || 'Failed to send reset code');
            }
        } catch (error) {
            toast.error('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-[500px] bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center">
                <div className="mb-8">
                    <Image src={logo} alt="FreshCart Logo" width={160} height={31} />
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-[#21313C] mb-2 tracking-tight">Forgot Password?</h1>
                    <p className="text-gray-500 text-base">
                        No worries, we'll send you a reset code
                    </p>
                </div>

                <div className="flex items-center justify-center w-full mb-10">
                    <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-[#0AAD0A] flex items-center justify-center text-white shadow-lg shadow-[#0AAD0A]/20 ring-8 ring-[#0AAD0A]/10">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </div>
                        <div className="w-16 h-[2px] bg-gray-200"></div>
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                            <FontAwesomeIcon icon={faKey} />
                        </div>
                        <div className="w-16 h-[2px] bg-gray-200"></div>
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                            <FontAwesomeIcon icon={faLock} />
                        </div>
                    </div>
                </div>

                {isSuccess && (
                    <div className="w-full mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-lg text-sm text-center border border-emerald-100">
                        {successMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-[#21313C] mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </div>
                            <input
                                type="email"
                                {...register('email')}
                                placeholder="Enter your email address"
                                className={`w-full pl-11 pr-4 py-4 rounded-xl border bg-white outline-none transition-all ${errors.email
                                    ? 'border-red-500 ring-4 ring-red-500/10'
                                    : 'border-gray-200 focus:border-[#0AAD0A] focus:ring-4 focus:ring-[#0AAD0A]/10'
                                    }`}
                            />
                        </div>
                        {errors.email && <p className="mt-2 text-sm text-red-500 font-medium">Email is required</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center bg-[#0AAD0A] hover:bg-[#099609] text-white font-bold py-4 rounded-xl transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#0AAD0A]/20 text-lg"
                    >
                        {isLoading ? (
                            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                        ) : (
                            'Send Reset Code'
                        )}
                    </button>

                    <div className="flex justify-center mt-6">
                        <Link href="/login" className="flex items-center gap-2 text-[#0AAD0A] font-semibold hover:text-[#099609] transition-colors">
                            <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
                            <span>Back to Sign In</span>
                        </Link>
                    </div>
                </form>

                <div className="w-full border-t border-gray-100 mt-10 pt-8 text-center text-gray-600 font-medium">
                    <p>
                        Remember your password?{' '}
                        <Link href="/login" className="text-[#0AAD0A] font-bold hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgetPasswordForm;
