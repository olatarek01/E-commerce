'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faKey,
    faEnvelope,
    faLock,
    faEye,
    faEyeSlash,
    faCheckCircle,
    faCircle,
    faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [rules, setRules] = useState({
        length: false,
        uppercase: false,
        number: false,
    });

    useEffect(() => {
        setRules({
            length: newPassword.length >= 8,
            uppercase: /[A-Z]/.test(newPassword),
            number: /[0-9]/.test(newPassword),
        });
    }, [newPassword]);

    const isFormValid =
        email &&
        rules.length &&
        rules.uppercase &&
        rules.number &&
        newPassword === confirmPassword;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        setIsLoading(true);
        try {
            const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
                email,
                newPassword
            });

            if (response.data.statusMsg === 'success' || response.data.token) {
                setIsSuccess(true);
                toast.success('Password reset successfully!');
            }
        } catch (error: any) {
            const message = error.response?.data?.message || 'Failed to reset password. Please try again.';
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-[420px] bg-white rounded-xl shadow-lg p-8 relative mb-6">
                <div className="flex justify-center -mt-16 mb-6">
                    <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center text-emerald-600 border-4 border-white">
                        <FontAwesomeIcon icon={faKey} size="lg" />
                    </div>
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Reset Password</h1>
                    <p className="text-gray-500 text-sm">
                        Please enter your email and choose a strong new password to secure your account.
                    </p>
                </div>

                {isSuccess && (
                    <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-lg text-sm text-center">
                        Your password has been successfully reset. You can now sign in with your new password.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white outline-none transition-all pr-12 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                required
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white outline-none transition-all pr-12 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                required
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-4 gap-3 text-gray-400">
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="hover:text-emerald-600 transition-colors"
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </button>
                                <FontAwesomeIcon icon={faLock} />
                            </div>
                        </div>

                        <div className="mt-3 space-y-2 ml-1">
                            <div className={`flex items-center gap-2 text-xs ${rules.length ? 'text-emerald-600' : 'text-gray-400'}`}>
                                <FontAwesomeIcon icon={rules.length ? faCheckCircle : faCircle} className={rules.length ? '' : 'text-[6px]'} />
                                <span>At least 8 characters</span>
                            </div>
                            <div className={`flex items-center gap-2 text-xs ${rules.uppercase ? 'text-emerald-600' : 'text-gray-400'}`}>
                                <FontAwesomeIcon icon={rules.uppercase ? faCheckCircle : faCircle} className={rules.uppercase ? '' : 'text-[6px]'} />
                                <span>One uppercase letter</span>
                            </div>
                            <div className={`flex items-center gap-2 text-xs ${rules.number ? 'text-emerald-600' : 'text-gray-400'}`}>
                                <FontAwesomeIcon icon={rules.number ? faCheckCircle : faCircle} className={rules.number ? '' : 'text-[6px]'} />
                                <span>One number</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                className={`w-full px-4 py-3 rounded-lg border bg-white outline-none transition-all pr-12 ${confirmPassword && newPassword !== confirmPassword
                                    ? 'border-red-500 focus:ring-red-500/20'
                                    : 'border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20'
                                    }`}
                                required
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-4 gap-3 text-gray-400">
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="hover:text-emerald-600 transition-colors"
                                >
                                    <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                                </button>
                                <FontAwesomeIcon icon={faLock} />
                            </div>
                        </div>
                        {confirmPassword && newPassword !== confirmPassword && (
                            <p className="mt-1.5 text-xs text-red-500 ml-1">Passwords do not match</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={!isFormValid || isLoading}
                        className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg mt-4"
                    >
                        {isLoading ? (
                            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                        ) : (
                            'Reset Password'
                        )}
                    </button>
                </form>

                <div className="text-center mt-8">
                    <p className="text-sm text-gray-600">
                        Remember your password?{' '}
                        <a href="/login" className="text-emerald-600 font-semibold hover:underline">
                            Sign In
                        </a>
                    </p>
                </div>
            </div>

            <div className="text-center">
                <p className="text-sm text-gray-500">
                    Need help? <a href="#" className="text-emerald-600 font-medium hover:underline">Contact Support</a>
                </p>
            </div>
        </div>
    );
};

export default ResetPassword;
