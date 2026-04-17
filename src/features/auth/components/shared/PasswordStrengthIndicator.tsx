'use client';

import React, { useMemo } from 'react';

interface PasswordStrengthIndicatorProps {
    password?: string;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password = '' }) => {
    const strength = useMemo(() => {
        if (!password) return { score: 0, label: 'None', color: 'bg-gray-100', text: 'text-gray-400' };

        const hasLetters = /[a-zA-Z]/.test(password);
        const hasNumbers = /[0-9]/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasSpecial = /[^A-Za-z0-9]/.test(password);

        if (password.length >= 8 && hasUpper && hasLower && hasNumbers && hasSpecial) {
            return { score: 3, label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-500' };
        }

        if (password.length >= 6 && hasLetters && hasNumbers) {
            return { score: 2, label: 'Medium', color: 'bg-yellow-500', text: 'text-yellow-500' };
        }

        return { score: 1, label: 'Weak', color: 'bg-red-500', text: 'text-red-500' };
    }, [password]);

    if (!password) return null;

    return (
        <div className="password-strength pt-3 transition-all duration-500">
            <div className="bar flex gap-1.5 h-1.5 mb-2">
                <div className={`flex-1 rounded-full transition-all duration-500 ${strength.score >= 1 ? strength.color : 'bg-gray-100'}`}></div>
                <div className={`flex-1 rounded-full transition-all duration-500 ${strength.score >= 2 ? strength.color : 'bg-gray-100'}`}></div>
                <div className={`flex-1 rounded-full transition-all duration-500 ${strength.score >= 3 ? strength.color : 'bg-gray-100'}`}></div>
            </div>
            <div className="flex justify-between items-center px-1">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Password Security</span>
                <span className={`text-[10px] font-black uppercase tracking-widest transition-colors duration-500 ${strength.text}`}>
                    {strength.label}
                </span>
            </div>
        </div>
    );
};

export default PasswordStrengthIndicator;
