"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faTachometerAlt,
    faBoxOpen,
    faHeart,
    faStar,
    faMapMarkerAlt,
    faCreditCard,
    faCog,
    faSignOutAlt,
    faKey,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { User } from "@/features/auth/store/auth.slice";
import { usePathname } from "next/navigation";

const navItems = [
    { label: "Dashboard", icon: faTachometerAlt, href: "/" },
    { label: "Orders", icon: faBoxOpen, href: "/orders" },
    { label: "Wishlist", icon: faHeart, href: "/wishlist" },
    { label: "Favorites", icon: faStar, href: "/wishlist" },
    {
        label: "Addresses",
        icon: faMapMarkerAlt,
        href: "/profile",
    },
    {
        label: "Payment Methods",
        icon: faCreditCard,
        href: "/profile",
    },
    { label: "Account Details", icon: faCog, href: "/account" },
    { label: "Reset Password", icon: faKey, href: "/reset-password" },
    { label: "Logout", icon: faSignOutAlt, href: "/" },
];

export default function Sidebar({ user }: { user: User }) {
    const pathname = usePathname();

    return (
        <aside className="w-full lg:w-72 shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-primary-500 flex items-center justify-center text-white text-xl font-bold shadow-md">
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-base">{user.name}</h3>
                            <p className="text-sm text-gray-500 mt-0.5">{user.email}</p>
                        </div>
                    </div>
                </div>

                <nav className="p-3">
                    <ul className="space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                            ? "bg-primary-50 text-primary-600"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                            }`}
                                    >
                                        <FontAwesomeIcon
                                            icon={item.icon}
                                            className={`w-4 h-4 ${isActive ? "text-primary-500" : "text-gray-400"
                                                }`}
                                        />
                                        {item.label}
                                        {isActive && (
                                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-500" />
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </aside>
    );
}
