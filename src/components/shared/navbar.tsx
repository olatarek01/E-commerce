"use client";
import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faBars,
  faCartShopping,
  faChevronDown,
  faHeart,
  faMagnifyingGlass,
  faPhone,
  faRightFromBracket,
  faUserPlus,
  faTshirt,
  faPersonDress,
  faBaby,
  faSprayCanSparkles,
  faLaptop,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/images/freshcart-logo.svg";
import { useSelector } from "react-redux";
import { AppState } from "@/store/store";
import useLogOut from "@/hooks/useLogOut";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logOut } = useLogOut();
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { isAuthenticated } = useSelector(
    (appState: AppState) => appState.auth,
  );

  const { numOfCartItems } = useSelector((state: AppState) => state.cart)

  return (
    <>
      <header className="bg-white ">
        <div className="container mx-auto px-4">
          {/* Top Navbar - Desktop Only */}
          <div className="hidden lg:flex justify-between items-center text-sm border-b border-gray-200 py-3 text-gray-600">
            <ul className="flex gap-6 items-center">
              <li className="flex items-center gap-2 hover:text-green-500 transition-colors duration-200">
                <FontAwesomeIcon icon={faPhone} className="w-4 h-4 text-green-500" />
                <a href="tel:+ (800) 123-4567">+ (800) 123-4567</a>
              </li>
              <li className="flex items-center gap-2 hover:text-green-500 transition-colors duration-200">
                <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 text-green-500" />
                <a href="mailto:support@freshcart.com">support@freshcart.com</a>
              </li>
            </ul>
            <ul className="flex gap-6 items-center">
              <li className="hover:text-green-500 transition-colors duration-200">
                <Link href="/track-order">Track Order</Link>
              </li>
              <li className="hover:text-green-500 transition-colors duration-200">
                <Link href="/about">About Us</Link>
              </li>
              <li className="hover:text-green-500 transition-colors duration-200">
                <Link href="/contact">Contact Us</Link>
              </li>
            </ul>
            <div className="flex gap-4 items-center">
              <div className="flex gap-4 items-center border-r border-gray-200 pr-4">
                <select className="bg-transparent border-none text-sm cursor-pointer focus:outline-none hover:text-green-500 transition-colors duration-200 appearance-none">
                  <option value="">AED</option>
                  <option value="">SAR</option>
                  <option value="">EGP</option>
                </select>
                <FontAwesomeIcon icon={faChevronDown} className="w-2.5 h-2.5 -ml-3 pointer-events-none text-gray-400" />
              </div>
              <div className="flex gap-4 items-center pr-2">
                <select className="bg-transparent border-none text-sm cursor-pointer focus:outline-none hover:text-green-500 transition-colors duration-200 appearance-none">
                  <option value="en">English</option>
                  <option value="ar">Arabic</option>
                </select>
                <FontAwesomeIcon icon={faChevronDown} className="w-2.5 h-2.5 -ml-3 pointer-events-none text-gray-400" />
              </div>
            </div>
          </div>
          {/* Main Navigation */}
          <nav className="flex items-center justify-between py-4 gap-4">
            {/* Hamburger Button - Below XL */}
            <button
              className="xl:hidden text-gray-700 hover:text-green-500 transition-colors focus:outline-none"
              onClick={() => setIsSidebarOpen(true)}
            >
              <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-8 shrink-0">
              <Link href="/">
                <Image
                  src={logo}
                  alt="FRESH CART LOGO"
                  className="h-8 md:h-9 lg:h-10 w-auto"
                />
              </Link>

              {/* Navigation Links - XL Only */}
              <ul className="hidden xl:flex items-center gap-6 text-gray-700 font-medium">
                <li className="hover:text-green-500 transition-colors duration-200">
                  <Link href="/">Home</Link>
                </li>
                <li className="hover:text-green-500 transition-colors duration-200">
                  <Link href="/brands">Brands</Link>
                </li>
              </ul>
            </div>

            {/* Categories Dropdown - Large and XL */}
            <div ref={dropdownRef} className="relative hidden lg:block">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-sm"
              >
                <FontAwesomeIcon icon={faBars} className="w-4 h-4" />
                <span>All Categories</span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {/* Dropdown Menu */}
              <div
                className={`absolute top-full left-0 mt-2 bg-white shadow-xl rounded-xl w-64 py-2 z-50 transition-all duration-200 transform origin-top ${isOpen
                  ? "opacity-100 scale-y-100 visible"
                  : "opacity-0 scale-y-0 invisible"
                  }`}
              >
                <ul>
                  <li>
                    <Link
                      href="/categories/6439d5b90049ad0b52b90048"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                    >
                      <FontAwesomeIcon
                        icon={faTshirt}
                        className="w-5 h-5 text-green-500"
                      />
                      <span>Men's Fashion</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/categories/6439d58a0049ad0b52b9003f"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                    >
                      <FontAwesomeIcon
                        icon={faPersonDress}
                        className="w-5 h-5 text-green-500"
                      />
                      <span>Women's Fashion</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/categories/6439d40367d9aa4ca97064cc"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                    >
                      <FontAwesomeIcon
                        icon={faBaby}
                        className="w-5 h-5 text-green-500"
                      />
                      <span>Baby & Toys</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/categories/6439d30b67d9aa4ca97064b1"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                    >
                      <FontAwesomeIcon
                        icon={faSprayCanSparkles}
                        className="w-5 h-5 text-green-500"
                      />
                      <span>Beauty & Health</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/categories/6439d2d167d9aa4ca970649f"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                    >
                      <FontAwesomeIcon
                        icon={faLaptop}
                        className="w-5 h-5 text-green-500"
                      />
                      <span>Electronics</span>
                    </Link>
                  </li>
                  <li className="border-t border-dashed border-gray-200 mt-2 pt-2">
                    <Link
                      href="/categories"
                      className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                    >
                      <span>View All Categories</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Search Bar - Hidden on Mobile */}
            <search className="flex-1 max-w-lg relative hidden md:flex">
              <input
                type="text"
                className="w-full py-2.5 px-6 pr-12 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all duration-200"
                placeholder="Search products..."
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="w-4 h-4 absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </search>

            {/* Action Icons */}
            <ul className="flex items-center gap-3 sm:gap-4 lg:gap-6">
              <li className="md:hidden">
                <button className="p-2 text-gray-600 hover:text-green-500 transition-colors">
                  <FontAwesomeIcon icon={faMagnifyingGlass} className="w-5 h-5" />
                </button>
              </li>
              <li>
                <Link
                  href="/wishlist"
                  className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faHeart} className="w-5 h-5" />
                  <span className="hidden xl:inline text-sm">Wishlist</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors duration-200 relative"
                >
                  <FontAwesomeIcon icon={faCartShopping} className="w-5 h-5" />
                  <span className="absolute -top-1.5 -right-1.5 size-4.5 rounded-full bg-primary-600 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                    {numOfCartItems}
                  </span>
                  <span className="hidden xl:inline text-sm">Cart</span>
                </Link>
              </li>
              <li className="hidden sm:block">
                <Link
                  href="/account"
                  className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
                  <span className="hidden xl:inline text-sm">Account</span>
                </Link>
              </li>
              {isAuthenticated ? (
                <li className="hidden xl:block">
                  <button
                    onClick={logOut}
                    className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors duration-200"
                  >
                    <FontAwesomeIcon
                      icon={faRightFromBracket}
                      className="w-5 h-5"
                    />
                    <span className="text-sm">Logout</span>
                  </button>
                </li>
              ) : (
                <div className="hidden xl:flex items-center gap-4">
                  <li>
                    <Link
                      href="/signup"
                      className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors duration-200"
                    >
                      <FontAwesomeIcon icon={faUserPlus} className="w-5 h-5" />
                      <span className="text-sm">Sign up</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/login"
                      className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors duration-200"
                    >
                      <FontAwesomeIcon
                        icon={faAddressCard}
                        className="w-5 h-5"
                      />
                      <span className="text-sm">Login</span>
                    </Link>
                  </li>
                </div>
              )}
            </ul>
          </nav>
        </div>
        {/* Category Navigation - Desktop Only */}

      </header>
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-99 xl:hidden backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      {/* Sidebar Menu */}
      <aside
        className={`fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white z-100 xl:hidden transform transition-transform duration-500 ease-in-out shadow-2xl flex flex-col ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <Link href="/" onClick={() => setIsSidebarOpen(false)}>
            <Image src={logo} alt="FRESH CART LOGO" className="h-8 w-auto" />
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 text-gray-500 hover:text-red-500 transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faXmark} className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Sidebar Search */}
          <div className="relative">
            <input
              type="text"
              className="w-full py-2.5 px-4 pr-12 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-500"
              placeholder="Search products..."
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="w-4 h-4 hide-on-mobile absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
          {/* Main Menu Sections */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2">
              Main Menu
            </h3>
            <nav className="space-y-1">
              <Link
                href="/wishlist"
                className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all font-medium"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  className="w-5 h-5 text-green-500"
                />
                <span>Wishlist</span>
              </Link>
              <Link
                href="/cart"
                className="relative flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all font-medium"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className="w-5 h-5  text-green-500"
                />
                <span className="  absolute top-1  -translate-y-1/2 size-4  rounded-full bg-primary-600 text-white text-xs flex items-center justify-center ">
                  {numOfCartItems}
                </span>
                <span>Cart</span>
              </Link>
              <Link
                href="/account"
                className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all font-medium"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FontAwesomeIcon
                  icon={faUser}
                  className="w-5 h-5 text-green-500"
                />
                <span>Account</span>
              </Link>
            </nav>
          </div>
          {/* Account Section */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2">
              Offers & Categories
            </h3>
            <nav className="space-y-1">
              <Link
                href="/brands"
                className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all font-medium"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FontAwesomeIcon
                  icon={faPersonDress}
                  className="w-5 h-5 text-green-500"
                />
                <span>Brands</span>
              </Link>
            </nav>
          </div>
          {/* Auth Account Section */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2">
              Account
            </h3>
            <nav className="space-y-1">
              {isAuthenticated ? (
                <button
                  onClick={logOut}
                  className="w-full flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all font-medium text-left"
                >
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    className="w-5 h-5 text-red-500"
                  />
                  <span>Logout</span>
                </button>
              ) : (
                <>
                  <Link
                    href="/signup"
                    className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all font-medium"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <FontAwesomeIcon
                      icon={faUserPlus}
                      className="w-5 h-5 text-green-500"
                    />
                    <span>Sign up</span>
                  </Link>
                  <Link
                    href="/login"
                    className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all font-medium"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <FontAwesomeIcon
                      icon={faAddressCard}
                      className="w-5 h-5 text-green-500"
                    />
                    <span>Login</span>
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
}
