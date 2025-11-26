'use client';

import Link from "next/link";

export default function SideBar() {
    return (
        <nav className="w-64 h-full bg-white shadow-md shadow-slate-500/10">
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/contact">Contact</Link></li>
            </ul>
        </nav>
    );
}