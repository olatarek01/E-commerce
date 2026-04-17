"use client";

import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import { useAppSelector } from "@/store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faUser } from "@fortawesome/free-solid-svg-icons";

export default function AccountScreen() {
    const { userInfo } = useAppSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        name: userInfo?.name || "",
        email: userInfo?.email || "",
        phone: userInfo?.phone || "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmitInfo = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Saving info:", formData);
    };

    if (!userInfo) return null;

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-8">
                    <Sidebar user={userInfo} />

                    <div className="flex-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 md:p-8">

                                <div className="mb-8">
                                    <h1 className="text-2xl font-bold text-gray-900">Account Details</h1>
                                    <p className="text-gray-500 mt-1">Manage your profile information</p>
                                </div>

                                <form onSubmit={handleSubmitInfo}>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                            <FontAwesomeIcon icon={faUser} />
                                        </div>
                                        <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                                                placeholder="Enter your full name"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all bg-gray-50 text-gray-500"
                                                placeholder="Enter your email"
                                            />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                                                placeholder="Enter your phone number"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="px-6 py-3 bg-[#0AAD0A] hover:bg-[#099609] text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
                                        >
                                            <FontAwesomeIcon icon={faSave} />
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
