import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faTwitter, faInstagram, faYoutube, faPinterest } from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link'
import Image from 'next/image'
export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="container mx-auto px-4 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-800">FreshCart</h2>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            We deliver the best quality groceries right to your doorstep. Fresh products, fast delivery, and excellent customer service.
                        </p>
                        {/* Social Media Icons */}
                        <ul className="flex justify-center md:justify-start gap-4 pt-2">
                            <li>
                                <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-green-500 hover:text-white transition-all duration-200">
                                    <FontAwesomeIcon icon={faFacebookF} className="w-4 h-4" />
                                </a>
                            </li>
                            <li>
                                <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-green-500 hover:text-white transition-all duration-200">
                                    <FontAwesomeIcon icon={faTwitter} className="w-4 h-4" />
                                </a>
                            </li>
                            <li>
                                <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-green-500 hover:text-white transition-all duration-200">
                                    <FontAwesomeIcon icon={faInstagram} className="w-4 h-4" />
                                </a>
                            </li>
                            <li>
                                <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-green-500 hover:text-white transition-all duration-200">
                                    <FontAwesomeIcon icon={faYoutube} className="w-4 h-4" />
                                </a>
                            </li>
                            <li>
                                <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-green-500 hover:text-white transition-all duration-200">
                                    <FontAwesomeIcon icon={faPinterest} className="w-4 h-4" />
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Categories Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/categories/vegetables" className="text-gray-600 text-sm hover:text-green-500 transition-colors duration-200">
                                    Vegetables & Fruits
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/dairy" className="text-gray-600 text-sm hover:text-green-500 transition-colors duration-200">
                                    Dairy & Eggs
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/beverages" className="text-gray-600 text-sm hover:text-green-500 transition-colors duration-200">
                                    Beverages
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/snacks" className="text-gray-600 text-sm hover:text-green-500 transition-colors duration-200">
                                    Snacks & Biscuits
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/bakery" className="text-gray-600 text-sm hover:text-green-500 transition-colors duration-200">
                                    Bakery & Bread
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="text-gray-600 text-sm hover:text-green-500 transition-colors duration-200">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-600 text-sm hover:text-green-500 transition-colors duration-200">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-gray-600 text-sm hover:text-green-500 transition-colors duration-200">
                                    FAQs
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-gray-600 text-sm hover:text-green-500 transition-colors duration-200">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/careers" className="text-gray-600 text-sm hover:text-green-500 transition-colors duration-200">
                                    Careers
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800">Customer Service</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/account" className="text-gray-600 text-sm hover:text-green-500 transition-colors duration-200">
                                    My Account
                                </Link>
                            </li>
                            <li>
                                <Link href="/orders" className="text-gray-600 text-sm hover:text-green-500 transition-colors duration-200">
                                    Track Order
                                </Link>
                            </li>
                            <li>
                                <Link href="/returns" className="text-gray-600 text-sm hover:text-green-500 transition-colors duration-200">
                                    Returns & Refunds
                                </Link>
                            </li>
                            <li>
                                <Link href="/shipping" className="text-gray-600 text-sm hover:text-green-500 transition-colors duration-200">
                                    Shipping Info
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-gray-600 text-sm hover:text-green-500 transition-colors duration-200">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-200">
                <div className="container mx-auto px-4 py-6">
                    <p className="text-center text-gray-500 text-sm">
                        © 2026 FreshCart. All rights reserved.
                    </p>
                   
                </div>
            </div>
        </footer>
    )
}
