"use client";

import Link from "next/link";
import { BadgeDollarSign, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        console.log(isMenuOpen);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-999 w-full bg-white shadow-md shadow-slate-500/10 transition-[max-height] duration-500 ease-in-out overflow-hidden ${
                isMenuOpen ? "max-h-96" : "max-h-20"
            }`}
        >
            <div className="inner flex flex-col">
                <div
                    className={`flex items-center justify-between h-20 flex-shrink-0 transition-all duration-500 ${
                        isMenuOpen ? "mb-4" : "mb-0"
                    }`}
                >
                    <Link href="/">
                        <h1 className="flex items-center gap-2">
                            <BadgeDollarSign size={40} color="#0649ed" />
                            <span className="text-2xl font-ns-bold text-primary">
                                AllPays
                            </span>
                        </h1>
                    </Link>
                    <div className="flex items-center gap-2">
                        <p>
                            안녕하세요,{" "}
                            <span className="font-ns-bold text-primary">
                                이재호
                            </span>
                            님
                        </p>
                        <button
                            className="ml-4 cursor-pointer"
                            onClick={toggleMenu}
                        >
                            {isMenuOpen ? (
                                <X className="text-rose-400" />
                            ) : (
                                <Menu />
                            )}
                        </button>
                    </div>
                </div>
                <nav
                    className={`flex items-center justify-center gap-10 transition-all duration-500 overflow-hidden ${
                        isMenuOpen ? "h-fit opacity-100 pb-4" : "h-0 opacity-0"
                    }`}
                >
                    <Link
                        href="/paymentsList"
                        className="font-ns-bold hover:text-primary transition-colors"
                        onClick={toggleMenu}
                    >
                        <span>거래 내역</span>
                    </Link>
                    <Link
                        href="/merchantsList"
                        className="font-ns-bold hover:text-primary transition-colors"
                        onClick={toggleMenu}
                    >
                        <span>가맹점 목록</span>
                    </Link>
                    <Link
                        href="/calculate"
                        className="font-ns-bold hover:text-primary transition-colors"
                        onClick={toggleMenu}
                    >
                        <span>정산</span>
                    </Link>
                </nav>
            </div>
        </header>
    );
}
